// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract IpfsHashStorage {
    string private ipfsHash;

    // Hash Setter Function
    function setIPFSHash (string memory _ipfsHash) public view {
        _ipfsHash = ipfsHash;
    }

    // Hash Getter Function
    function getIPFSHash() public view returns(string memory) {
        return ipfsHash;
    }
}