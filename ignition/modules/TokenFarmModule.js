const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenFarmModule", (m) => {
  // Deploy the DaiToken contract
  const daiToken = m.contract("DaiToken");

  // Deploy the DappToken contract
  const dappToken = m.contract("DappToken");

  // Deploy the TokenFarm contract, passing the addresses of the other tokens
  const tokenFarm = m.contract("TokenFarm", [dappToken, daiToken]);

  // Transfer 1 million DappTokens to TokenFarm
  m.call(dappToken, "transfer", [
    tokenFarm,
    ethers.parseUnits("1000000", "ether"),
  ]);

  return { daiToken, dappToken, tokenFarm };
});
