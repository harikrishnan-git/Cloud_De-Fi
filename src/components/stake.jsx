import React from "react";
import dai from "../dai.png";

export default function stake({
  inputRef,
  daiTokenBalance,
  handleStake,
  handleUnstake,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
  unstakingBonus,
}) {
  return (
    <div>
      <form className="mb-3" onSubmit={handleStake}>
        <div>
          <label className="float-left text-white">
            <b>Stake Tokens</b>
          </label>
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
              <img src={dai} height="32" alt="DAI Token" />
              &nbsp;&nbsp;&nbsp; mDAI
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-success btn-block btn-lg"
        >
          STAKE!
        </button>
      </form>
      <button className="btn btn-link btn-block btn-sm" onClick={handleUnstake}>
        UN-STAKE...
      </button>
    </div>
  );
}
