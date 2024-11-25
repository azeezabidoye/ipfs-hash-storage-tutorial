import React, { useState } from "react";
import { ethers } from "ethers";
import { pinata } from "./config";
import "./App.css";

// Contract Address
const contractAddress = "0x99aFF0cbBb2561d1898b6B14C46b2cb994F9eDEC";

// Contract ABI
import { abi } from "./artifacts/contracts/IpfsHashStorage.sol/IpfsHashStorage.json";

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
        // Send the transaction to store IPFS Hash on the blockchain
        const txResponse = await contract.setIPFSHash(hash);
        const txReceipt = await txResponse.wait(1);
        return txReceipt;
      } catch (error) {
        console.log("Failed to store IPFS Hash on blockchain", error);
      }
    }
  };

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
      </div>
    </>
  );
}

export default App;
