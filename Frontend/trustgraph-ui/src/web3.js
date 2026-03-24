import { ethers } from "ethers";

// 🔴 Dummy contract address (baad me change karna)
const contractAddress = "0x0000000000000000000000000000000000000000";

// 🔴 Minimal ABI (sirf demo ke liye)
const abi = [
  {
    inputs: [{ name: "score", type: "uint256" }],
    name: "setScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// 🟢 CONNECT WALLET
export async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    alert("Wallet Connected: " + address);

    return address;

  } catch (error) {
    console.log(error);
    alert("Wallet connection failed");
  }
}

// 🟣 SAVE SCORE ON BLOCKCHAIN
export async function saveScore(score) {
  try {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    if (!score) {
      alert("No score found");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    await contract.setScore(score);

    alert("Score saved on blockchain 🚀");

  } catch (error) {
    console.log(error);
    alert("Transaction failed");
  }
}