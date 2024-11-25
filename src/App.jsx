import React, { useState } from "react";
import { ethers } from "ethers";
import { pinata } from "pinata";
import "./App.css";

// Contract Address
const contractAddress = "0x99aFF0cbBb2561d1898b6B14C46b2cb994F9eDEC";

// Contract ABI
import { abi as contractAbi } from "./artifacts/contracts/IpfsHashStorage.sol/IpfsHashStorage.json";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");
}

export default App;
