require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "http://127.0.0.1:8545", // Default RPC URL for Ganache
      chainId: 1337, // Use Ganache's default chain ID (or set accordingly)
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        // Add more private keys as necessary
      ], // Use private keys from your Ganache accounts
    },
  },
};
