import React, { useRef, useState } from "react";
import dai from "../dai.png";
import dapp from "../dapp.png";
import Stake from "./stake.jsx";
import Transfer from "./Transfer.jsx";

const Main = ({
  stakingBalance,
  dappTokenBalance,
  daiTokenBalance,
  stakeTokens,
  unstakeTokens,
  unstakingBonus,
}) => {
  const inputRef = useRef(null);

  const [page, setPage] = useState("stake");

  const handleStake = (event) => {
    event.preventDefault();
    let amount = inputRef.current.value.toString();
    amount = window.web3.utils.toWei(amount, "Ether");
    stakeTokens(amount);
  };

  const handleUnstake = (event) => {
    event.preventDefault();
    unstakeTokens();
    console.log("Unstaking completed!");
    console.log("Bonus:", unstakingBonus);
  };

  const handleTransfer = (event) => {
    event.preventDefault();
  };

  return (
    <div id="content" className="mt-3">
      <center>
        <h1 className="text-dark">De-Fi Token Farming</h1>
      </center>
      <br />
      <br />
      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">
              <img src={dai} alt="DAI Token" />
            </th>
            <th scope="col">
              <img src={dapp} alt="Dapp Token" />
            </th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} mDAI</td>
            <td>{window.web3.utils.fromWei(dappTokenBalance, "Ether")} DAPP</td>
          </tr>
        </tbody>
      </table>

      <div className="card mb-4">
        <div className="card-body bg-dark">
          <button
            className="btn btn-outline-primary"
            onClick={(e) => {
              setPage("stake");
            }}
          >
            STAKE
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={(e) => {
              setPage("transfer");
            }}
          >
            TRANSFER
          </button>
          {page == "stake" ? (
            <Stake
              inputRef={inputRef}
              daiTokenBalance={daiTokenBalance}
              handleStake={handleStake}
              handleUnstake={handleUnstake}
              stakingBalance={stakingBalance}
              stakeTokens={stakeTokens}
              unstakeTokens={unstakeTokens}
              unstakingBonus={unstakingBonus}
            />
          ) : (
            <Transfer
              inputRef={inputRef}
              daiTokenBalance={daiTokenBalance}
              handleTransfer={handleTransfer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
