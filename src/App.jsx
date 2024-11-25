import React, { useState } from "react";
import { ethers } from "ethers";
import { pinata } from "./config";
import "./App.css";

// Contract Address
const contractAddress = "0x99aFF0cbBb2561d1898b6B14C46b2cb994F9eDEC";

// Contract ABI
import { abi as contractABI } from "./artifacts/contracts/IpfsHashStorage.sol/IpfsHashStorage.json";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");

  //Handler Function
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Store IPFS on Blockchain Function
  const storeIpfsOnBlockchain = async (hash) => {
    // Check if Metamask is installed
    if (typeof window.ethereum !== "undefined") {
      // Connect to Ethereum provider (Metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      // send transaction to store the IPFS Hash on the blockchain
      const tx = await contract.setIpfsHash(hash);
      await tx.wait();
    }
  };

  // Upload Function
  const handleUpload = async () => {
    console.log("Upload button clicked");
    const response = await pinata.upload.file(selectedFile);
    const ipfsHash = response.cid;
    // setIpfsHash(ipfsHash);
    // await storeIpfsOnBlockchain(ipfsHash);
    // setIpfsHash("");
  };

  return (
    <>
      <div className="app-container">
        <div className="upload-section">
          <label className="form-label">Choose File</label>
          <input
            type="file"
            onChange={changeHandler}
            className="file-input"
          ></input>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
