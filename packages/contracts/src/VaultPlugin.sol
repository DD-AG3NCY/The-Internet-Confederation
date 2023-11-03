// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.17;

import { PluginUUPSUpgradeable, IDAO } from "@aragon/osx/core/plugin/PluginUUPSUpgradeable.sol";
import {
    ERC4626Upgradeable,
    ERC20Upgradeable,
    IERC20MetadataUpgradeable,
    SafeERC20Upgradeable,
    IERC20Upgradeable
} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";

/**
 * @title ERC4626 Vault Plugin
 * @author pythonpete32
 * @notice This contract is an ERC4626 vault that uses an Aragon DAO for storage and management of the underlying asset.
 * It introduces a transfer toggle feature, allowing the DAO to enable or disable transfers of the token.
 *
 * @dev The contract inherits from PluginUUPSUpgradeable and ERC4626Upgradeable. It introduces a new state variable
 * `transfersEnabled` which can be toggled to enable or disable transfers of the token. This is in addition to the
 * standard ERC4626 functionality.
 *
 * The contract also overrides several methods from the base contracts to integrate with a DAO. The token balance is of
 * the deposit asset is held by the DAO, not the VaultPlugin contract itself enabling the DAO to use the deposit asset
 * as
 * it sees fit. The redeem feature is maintained, allowing depositors to claim their pro-rata share of the underlying
 * assets.
 */
contract VaultPlugin is PluginUUPSUpgradeable, ERC4626Upgradeable {
    /// @notice Permission ID for toggling transfers
    bytes32 public constant TOGGLE_TRANSFER_PERMISSION_ID = keccak256("TOGGLE_TRANSFER_PERMISSION");

    /// @notice A boolean flag to indicate if transfers are enabled or not
    bool public transfersEnabled;

    /// @dev Emitted when transfers are disabled
    error TransfersDisabled();

    /// @notice Initializes the plugin when build 1 is installed.
    /// @param _asset Set the underlying asset contract.
    function initialize(IDAO _dao, IERC20MetadataUpgradeable _asset) external initializer {
        __PluginUUPSUpgradeable_init(_dao);
        __ERC4626_init(_asset);
    }

    /// @notice Toggles the state of transfers
    /// @dev This function can only be called by an account with the `TOGGLE_TRANSFER_PERMISSION_ID` permission
    function toggleTransfers() external auth(TOGGLE_TRANSFER_PERMISSION_ID) {
        transfersEnabled = !transfersEnabled;
    }

    /// @notice Returns the total assets held by the DAO
    /// @dev See {IERC4626-totalAssets}.
    function totalAssets() public view virtual override returns (uint256) {
        return IERC20MetadataUpgradeable(asset()).balanceOf(address(dao()));
    }

    /// @notice Overrides the _deposit function from the ERC4626 contract to deposit assets into the DAO instead of this
    /// contract.
    /// @dev See {IERC4626-_deposit}.
    /// @param caller The address of the caller.
    /// @param receiver The address of the receiver.
    /// @param assets The amount of assets to deposit.
    /// @param shares The amount of shares to issue.
    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal virtual override {
        // If _asset is ERC777, `transferFrom` can trigger a reenterancy BEFORE the transfer happens through the
        // `tokensToSend` hook. On the other hand, the `tokenReceived` hook, that is triggered after the transfer,
        // calls the vault, which is assumed not malicious.
        //
        // Conclusion: we need to do the transfer before we mint so that any reentrancy would happen before the
        // assets are transfered and before the shares are minted, which is a valid state.
        // slither-disable-next-line reentrancy-no-eth
        SafeERC20Upgradeable.safeTransferFrom({
            token: IERC20Upgradeable(asset()),
            from: caller,
            to: address(dao()),
            value: assets
        });
        _mint(receiver, shares);

        emit Deposit(caller, receiver, assets, shares);
    }

    /// @notice Overrides the _withdraw function from the ERC4626 contract to withdraw assets from the DAO instead of
    /// this contract.
    /// @dev See {IERC4626-_withdraw}.
    /// @param caller The address of the caller.
    /// @param receiver The address of the receiver.
    /// @param owner The address of the owner.
    /// @param assets The amount of assets to withdraw.
    /// @param shares The amount of shares to burn.
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    )
        internal
        virtual
        override
    {
        if (caller != owner) {
            _spendAllowance(owner, caller, shares);
        }

        // If _asset is ERC777, `transfer` can trigger a reentrancy AFTER the transfer happens through the
        // `tokensReceived` hook. On the other hand, the `tokensToSend` hook, that is triggered before the transfer,
        // calls the vault, which is assumed not malicious.
        //
        // Conclusion: we need to do the transfer after the burn so that any reentrancy would happen after the
        // shares are burned and after the assets are transfered, which is a valid state.
        _burn(owner, shares);
        _withdrawFromDao(receiver, assets);

        emit Withdraw(caller, receiver, owner, assets, shares);
    }

    /// @notice Overrides the transfer function from the ERC20Upgradeable contract.
    /// @dev See {IERC4626-transfer}. This override is necessary to ensure that transfers are only
    /// allowed when they are enabled.
    function transfer(
        address to,
        uint256 amount
    )
        public
        virtual
        override(ERC20Upgradeable, IERC20Upgradeable)
        returns (bool)
    {
        if (!transfersEnabled) revert TransfersDisabled();

        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    /// @dev Withdraws the specified amount of assets from the DAO to the specified address.
    /// @param to The address to transfer the assets to.
    /// @param assets The amount of assets to withdraw.
    function _withdrawFromDao(address to, uint256 assets) internal {
        // Create a new action to be executed by the DAO
        IDAO.Action[] memory action = new IDAO.Action[](1);
        action[0] = IDAO.Action({
            to: asset(),
            value: 0,
            data: abi.encodeWithSignature("transfer(address,uint256)", to, assets)
        });
        // Execute the action
        dao().execute({ _callId: bytes32(abi.encodePacked(to, assets)), _actions: action, _allowFailureMap: 0 });
    }

    /// @notice This empty reserved space is put in place to allow future versions to add new variables without shifting
    /// down storage in the inheritance chain (see [OpenZepplins guide about storage
    /// gaps](https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps)).
    uint256[49] private __gap;
}
