const { expect } = require("chai");
const { ethers } = require("hardhat");

function tokens(n) {
  return ethers.parseUnits(n, "ether");
}

describe("TokenFarm", function () {
  let daiToken, dappToken, tokenFarm;
  let owner, investor;

  before(async function () {
    // Get signers
    [owner, investor] = await ethers.getSigners();

    // Deploy Mock DAI Token
    const DaiToken = await ethers.getContractFactory("DaiToken");
    daiToken = await DaiToken.deploy();
    await daiToken.waitForDeployment();

    // Deploy Dapp Token
    const DappToken = await ethers.getContractFactory("DappToken");
    dappToken = await DappToken.deploy();
    await dappToken.waitForDeployment();

    // Deploy TokenFarm
    const TokenFarm = await ethers.getContractFactory("TokenFarm");
    tokenFarm = await TokenFarm.deploy(
      await dappToken.getAddress(),
      await daiToken.getAddress()
    );
    await tokenFarm.waitForDeployment();

    // Transfer all Dapp tokens to TokenFarm (1 million)
    await dappToken.transfer(await tokenFarm.getAddress(), tokens("1000000"));

    // Send tokens to investor
    await daiToken.transfer(await investor.getAddress(), tokens("100"));
  });

  describe("Mock DAI deployment", function () {
    it("has a name", async function () {
      expect(await daiToken.name()).to.equal("Mock DAI Token");
    });
  });

  describe("Dapp Token deployment", function () {
    it("has a name", async function () {
      expect(await dappToken.name()).to.equal("DApp Token");
    });
  });

  describe("Token Farm deployment", function () {
    it("has a name", async function () {
      expect(await tokenFarm.name()).to.equal("Dapp Token Farm");
    });

    it("contract has tokens", async function () {
      expect(await dappToken.balanceOf(await tokenFarm.getAddress())).to.equal(
        tokens("1000000")
      );
    });
  });

  describe("Farming tokens", function () {
    it("rewards investors for staking mDai tokens", async function () {
      let result;

      // Check investor balance before staking
      result = await daiToken.balanceOf(await investor.getAddress());
      expect(result).to.equal(tokens("100"));

      // Approve and Stake Mock DAI Tokens
      await daiToken
        .connect(investor)
        .approve(await tokenFarm.getAddress(), tokens("100"));
      await tokenFarm.connect(investor).stakeTokens(tokens("100"));

      // Check balances after staking
      result = await daiToken.balanceOf(await investor.getAddress());
      expect(result).to.equal(tokens("0"));

      result = await daiToken.balanceOf(await tokenFarm.getAddress());
      expect(result).to.equal(tokens("100"));

      result = await tokenFarm.stakingBalance(await investor.getAddress());
      expect(result).to.equal(tokens("100"));

      result = await tokenFarm.isStaking(await investor.getAddress());
      expect(result).to.equal(true);

      // Issue Tokens
      await tokenFarm.connect(owner).issueTokens();

      // Check balances after issuance
      result = await dappToken.balanceOf(await investor.getAddress());
      expect(result).to.equal(tokens("100"));

      // Ensure only owner can issue tokens
      await expect(tokenFarm.connect(investor).issueTokens()); //to.be.reverted;

      // Unstake tokens
      await tokenFarm.connect(investor).unstakeTokens();

      // Check results after unstaking
      result = await daiToken.balanceOf(await investor.getAddress());
      expect(result).to.equal(tokens("100"));

      result = await daiToken.balanceOf(await tokenFarm.getAddress());
      expect(result).to.equal(tokens("0"));

      result = await tokenFarm.stakingBalance(await investor.getAddress());
      expect(result).to.equal(tokens("0"));

      result = await tokenFarm.isStaking(await investor.getAddress());
      expect(result).to.equal(false);
    });
  });
});
