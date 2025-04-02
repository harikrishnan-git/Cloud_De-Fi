import React, { useRef } from "react";
import dai from "../dai.png"; // Ensure the correct path

function Stake({ daiTokenBalance, stakeTokens, unstakeTokens, unstakingBonus }) {
  const inputRef = useRef(null);

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

  return (
    <>
      <form className="mb-3" onSubmit={handleStake}>
        <div>
          <label className="float-left text-white"><b>Stake Tokens</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(daiTokenBalance, "Ether")}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            ref={inputRef}
            className="form-control form-control-lg"
            placeholder="0"
            required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={dai} height="32" alt="" />
              &nbsp;&nbsp;&nbsp; mDAI
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success btn-block btn-lg">
          STAKE!
        </button>
      </form>
      <center>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={handleUnstake}
        >
          UN-STAKE...
        </button>
      </center>
    </>
  );
}

export default Stake;
