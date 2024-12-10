require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    development: {
      url: "http://127.0.0.1:8545", // Ganache default RPC
      accounts: [`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`], // Replace with private key from MetaMask or Ganache
    },
  },
};
