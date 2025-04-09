require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { version } = require("react");
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATEKEY],
          providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMYAPIKEY}`,
        }),
      network_id: 11155111,
      gas: 4000000,
      confirmations: 2,
      timeoutBlocks: 500,
      networkCheckTimeout: 100000,
      skipDryRun: true,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "petersburg",
    },
  },
};
