import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import dotenv from "dotenv";
import contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json";
import { AbiItem } from "web3-utils";

dotenv.config();

const API_URL = process.env.API_URL;

if (API_URL) {
  const web3 = createAlchemyWeb3(API_URL);

  console.log(JSON.stringify(contract.abi));

  const contractAddress = "0x5253ecce623c6d7bd2316daccc34f9e97de45999";

  const nftContract = new web3.eth.Contract(
    contract.abi as AbiItem[],
    contractAddress
  );
}
