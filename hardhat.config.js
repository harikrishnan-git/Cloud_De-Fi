/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-ignition");

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {}, // Ensure the Hardhat network is defined
  },
};
