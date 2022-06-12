import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { config } from "dotenv";
import contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json";
import { AbiItem } from "web3-utils";

config();

const API_URL = process.env.API_URL || "";
const PUBLIC_KEY = process.env.PUBLIC_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const web3 = createAlchemyWeb3(API_URL);

console.log(JSON.stringify(contract.abi));

const contractAddress = "0x5253ecce623c6d7bd2316daccc34f9e97de45999";

const nftContract = new web3.eth.Contract(
  contract.abi as AbiItem[],
  contractAddress
);

async function mintNFT(tokenURI: string) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  signPromise
    .then((signedTx) => {
      if (!signedTx.rawTransaction) return;

      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmVMuhzgsjrh1Jyv8BZwJgPvRwuCtTgxa7FWPHgwH8WU7d"
);
