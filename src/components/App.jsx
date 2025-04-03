import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";
import DappToken from "../abis/DappToken.json";
import TokenFarm from "../abis/TokenFarm.json";
import Header from "./Header";
import Main from "./Main";
import "./App.css";


const App = () => {
  const [account, setAccount] = useState("0x0");
  const [daiToken, setDaiToken] = useState({});
  const [dappToken, setDappToken] = useState({});
  const [tokenFarm, setTokenFarm] = useState({});
  const [daiTokenBalance, setDaiTokenBalance] = useState("0");
  const [dappTokenBalance, setDappTokenBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [unstakingBonus, setUnstakingBonus] = useState("0");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("stake");

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };
    init();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      const ALCHEMY_API_KEY = "your-alchemy-api-key";
      const provider = new Web3.providers.HttpProvider(
        `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
      );
      window.web3 = new Web3(provider);
      console.log("Connected to Alchemy RPC");
    }
  };

  const loadBlockchainData = async () => {
    const web3 =
      window.web3 ||
      new Web3(
        new Web3.providers.HttpProvider(
          `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
        )
      );
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiTokenInstance = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      setDaiToken(daiTokenInstance);
      let balance = await daiTokenInstance.methods
        .balanceOf(accounts[0])
        .call();
      setDaiTokenBalance(balance.toString());
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappTokenInstance = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );
      setDappToken(dappTokenInstance);
      let balance = await dappTokenInstance.methods
        .balanceOf(accounts[0])
        .call();
      setDappTokenBalance(balance.toString());
    } else {
      window.alert("DappToken contract not deployed to detected network.");
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarmInstance = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );
      setTokenFarm(tokenFarmInstance);
      let stakingBal = await tokenFarmInstance.methods
        .stakingBalance(accounts[0])
        .call();
      setStakingBalance(stakingBal.toString());
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }

    setLoading(false);
  };

  const stakeTokens = (amount) => {
    setLoading(true);
    daiToken.methods
      .approve(tokenFarm._address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        tokenFarm.methods
          .stakeTokens(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };

  const unstakeTokens = () => {
    setLoading(true);
    tokenFarm.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  const getUnstakingBonus = async () => {
    setLoading(true);
    try {
      const bonus = await tokenFarm.methods.getBonus().call();
      setUnstakingBonus(bonus.toString());
      alert("Obtained bonus: " + bonus);
    } catch (error) {
      console.error("Error getting unstaking bonus:", error);
    }
    setLoading(false);
  };

  const transferToken = async (to, amount) => {
    setLoading(true);
    tokenFarm.methods
      .transferToken(to, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  return (
    <div className="h-full">
      <Header setPage={setPage} className="" />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></a>

              {loading ? (
                <p id="loader" className="text-center">
                  Loading...
                </p>
              ) : (
                <Main
                  daiTokenBalance={daiTokenBalance}
                  dappTokenBalance={dappTokenBalance}
                  stakingBalance={stakingBalance}
                  stakeTokens={stakeTokens}
                  unstakeTokens={unstakeTokens}
                  unstakingBonus={unstakingBonus}
                  transferToken={transferToken}
                  page={page}
                  account={account}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
