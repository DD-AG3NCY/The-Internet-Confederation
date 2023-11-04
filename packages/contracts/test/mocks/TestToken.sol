// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.17;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) { }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
