import React, { useState } from "react";
import { ethers } from "ethers";
import { pinata } from "./config";
import "./App.css";

// Contract ABI
import { abi } from "./artifacts/contracts/IpfsHashStorage.sol/IpfsHashStorage.json";

// Contract Address
const contractAddress = "0x99aFF0cbBb2561d1898b6B14C46b2cb994F9eDEC";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");

  // Handler Function
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to Store IPFS on the Blockchain
  const storeHashOnBlockchain = async (hash) => {
    // Check if Metamask is installed
    if (typeof window.ethereum !== "undefined") {
      // Connect to Ethereum provider (Metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        // Send transaction to store IPFS Hash on the blockchain
        const txResponse = await contract.setIPFSHash(hash);
        await txResponse.wait();
      } catch (error) {
        console.log("Failed to store IPFS Hash on blockchain", error);
      }
    }
  };

  // Function to Retrieve Hash from the Blockchain
  const retrieveHashFromBlockchain = async () => {
    // Check if Metamask is installed
    if (typeof window.ethereum !== "undefined") {
      // Connect to Ethereum provider (Metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        // Send transaction to retrieve IPFS Hash from the blockchain
        const storedHash = await contract.getIPFSHash();
        setStoredHash(storedHash);
      } catch (error) {
        console.log("Failed to retrieve IPFS Hash from blockchain", error);
      }
    }
  };

  //   const storeHashOnBlockchain = async (hash) => {
  //     if (typeof window.ethereum !== "undefined") {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(contractAddress, abi, signer);
  //       const tx = await contract.setIPFSHash(hash);
  //       await tx.wait();
  //     }
  //   };

  // Upload Function
  const handleUpload = async () => {
    console.log("Upload button clicked");
    const response = await pinata.upload.file(selectedFile);
    const ipfsHash = response.cid;
    setIpfsHash(ipfsHash);
    await storeHashOnBlockchain(ipfsHash);
    setIpfsHash(" ");
  };

  return (
    <>
      <div className="app-container">
        <h1>Store IPFS On-chain</h1>
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
        {ipfsHash && (
          <div className="result-section">
            <p>IPFS Hash: {ipfsHash}</p>
          </div>
        )}
        <div className="retrieve-section">
          <button
            className="retrieve-button"
            onClick={retrieveHashFromBlockchain}
          >
            Retrieve Hash
          </button>
        </div>
        {storedHash && (
          <div>
            <p>Retrieved Hash: {storedHash}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
