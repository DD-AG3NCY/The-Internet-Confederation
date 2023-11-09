import {
  Client,
  Context,
  ContextParams,
  MultisigClient,
} from "@aragon/sdk-client";
import { providers } from "ethers";

// just create a regular wallet
const provider = new providers.JsonRpcProvider({
  url: "http://127.0.0.1:1248",
  headers: {
    Origin: "http://MyCustomAppName",
  },
  allowInsecureAuthentication: true,
});
await provider.send("wallet_switchEthereumChain", [{ chainId: "5" }]);
console.log({ network: await provider.getNetwork() });

// get signer
const signer = provider.getSigner();

export const contextParams: ContextParams = {
  network: "goerli",
  signer, //  Wallet.createRandom(),
  web3Providers: ["https://rpc.ankr.com/eth_goerli"],
  ipfsNodes: [
    {
      url: "https://test.ipfs.aragon.network/api/v0",
      headers: { "X-API-KEY": "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt" },
    },
  ],
};

export const context: Context = new Context(contextParams);

export const client = new Client(context);
export const multisigClient = new MultisigClient(context);
