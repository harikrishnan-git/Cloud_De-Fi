import React from "react";

export default function({ inputRef, daiTokenBalance, handleTransfer }) {
  return (
    <div>
      <form className="mb-3" onSubmit={handleTransfer}>
        <div>
          <label className="float-left text-white">
            <b>Transfer Tokens</b>
          </label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(daiTokenBalance, "Ether")}
          </span>
        </div>
        <div className="input-group mb-4">
          <label className="float-left text-white">
            <b>Reciever account</b>
          </label>
          <input
            type="text"
            ref={inputRef}
            className="form-control form-control-lg"
            placeholder="0"
            required
          />
        </div>
        <div className="input-group mb-4">
          <label className="float-left text-white">
            <b>Amount of tokens</b>
          </label>
          <input
            type="text"
            ref={inputRef}
            className="form-control form-control-lg"
            placeholder="0"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-success btn-block btn-lg"
        >
          TRANSFER
        </button>
      </form>
    </div>
  );
}
