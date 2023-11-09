import {
  CreateDaoParams,
  DaoCreationSteps,
  DaoMetadata,
  MultisigClient,
  MultisigPluginInstallParams,
} from "@aragon/sdk-client";
import { client } from "./sdk";
import { defaultAbiCoder } from "ethers/lib/utils";
import {
  GasFeeEstimation,
  PluginInstallItem,
  hexToBytes,
} from "@aragon/sdk-client-common";

// DAO Params ====================================================================================================

const NETWORK = "goerli";
const USDC_ADDRESS = "0x69043055582d4d8ae331E12350f3a9A412ce0DcD";
const MULTISIG_MEMBERS: string[] = [
  "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a",
  "0x4819D292c5b4B85a0e8c58CD9746d5AB401D01F6",
];
const MULTISIG_SETTINGS = {
  minApprovals: 1,
  onlyListed: true, // only members can create votes
};

const DAO_METADATA: DaoMetadata = {
  name: "The-Internet-Confederation",
  description: "This is a description",
  avatar: "https://avatars.githubusercontent.com/u/114408349?s=48&v=4",
  links: [
    {
      name: "Web site",
      url: "https://github.com/DD-AG3NCY/The-Internet-Confederation",
    },
  ],
};
const ENS_DOMAIN = "the-internet-confederation-test-23423423";
// ==============================================================================================================

// PLUGINS ======================================================================================================

// multisig.plugin.dao.eth
const multisigPluginIntallParams: MultisigPluginInstallParams = {
  votingSettings: MULTISIG_SETTINGS,
  members: MULTISIG_MEMBERS,
};

const multisigPluginInstallItem: PluginInstallItem =
  MultisigClient.encoding.getPluginInstallItem(
    multisigPluginIntallParams,
    NETWORK
  );

// tsc-vault.plugin.dao.eth
const vaultInstallData = defaultAbiCoder.encode(["address"], [USDC_ADDRESS]);

const tscVault: PluginInstallItem = {
  id: "0x1d7e9D43303fbfAA5062cf6BaE5dcF08C3D23D9c",
  data: hexToBytes(vaultInstallData), // the encoded parameters
};

// budget.plugin.dao.eth
// const budgetInstallData = `0x${"0".repeat(40)}`;
// console.log({ budgetInstallData });
// const budget: PluginInstallItem = {
//   id: "0x1d7e9D43303fbfAA5062cf6BaE5dcF08C3D23D9c",
//   data: hexToBytes("0x00"), // the encoded parameters
// };

// ==============================================================================================================

const metadataUri = await client.methods.pinMetadata(DAO_METADATA);
console.log({ metadataUri });

const createParams: CreateDaoParams = {
  metadataUri,
  ensSubdomain: ENS_DOMAIN,
  plugins: [multisigPluginInstallItem, tscVault], //, budget],
};

// Estimate gas for the transaction.
const estimatedGas: GasFeeEstimation = await client.estimation.createDao(
  createParams
);
console.log({ avg: estimatedGas.average, max: estimatedGas.max });

// Creates a DAO with a Multisig plugin installed.
const steps = client.methods.createDao(createParams);
for await (const step of steps) {
  try {
    switch (step.key) {
      case DaoCreationSteps.CREATING:
        console.log({ txHash: step.txHash });
        break;
      case DaoCreationSteps.DONE:
        console.log({
          daoAddress: step.address,
          pluginAddresses: step.pluginAddresses,
        });
        break;
    }
  } catch (err) {
    console.error(err);
  }
}
