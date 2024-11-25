require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");

const { RPC_URL, DEV_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.25",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    morphTestnet: {
      chainId: 2810,
      url: RPC_URL,
      accounts: [DEV_PRIVATE_KEY],
      gasPrice: 2000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
