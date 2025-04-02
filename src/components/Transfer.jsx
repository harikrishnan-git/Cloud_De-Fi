import React, { useRef, useState } from "react";
import Web3 from "web3"; // Import Web3.js

export default function TransferForm({
  daiTokenBalance,
  handleTransfer,
  account,
}) {
  const [loading, setLoading] = useState(false);
  const receiverRef = useRef(null);
  const amountRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const receiver = receiverRef.current.value.trim();
    const amount = amountRef.current.value.trim().toString();

    // Validate Ethereum address
    if (!Web3.utils.isAddress(receiver)) {
      alert("Invalid Ethereum address. Please enter a valid address.");
      return;
    }

    // Validate token amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount of tokens.");
      return;
    }

    handleTransfer(receiver, amount);
  };

  return (
    <div>
      <form className="mb-3" onSubmit={onSubmit}>
        <div className="text-center mb-4">
          <h2 className="text-white">Transfer Tokens</h2>
          <span className="text-black">
            Balance: {window.web3.utils.fromWei(daiTokenBalance, "Ether")} DAI
            <br />
            Account: {account}
          </span>
        </div>

        {/* Receiver Address Input */}
        <div className="form-group">
          <label className="text-white" htmlFor="receiverAddress">
            <b>Receiver Account</b>
          </label>
          <input
            type="text"
            id="receiverAddress"
            ref={receiverRef}
            className="form-control form-control-lg"
            placeholder="0x..."
            required
          />
          <small className="form-text text-muted">
            Enter the Ethereum address of the receiver.
          </small>
        </div>

        {/* Token Amount Input */}
        <div className="form-group">
          <label className="text-white" htmlFor="tokenAmount">
            <b>Amount of Tokens</b>
          </label>
          <input
            type="number"
            id="tokenAmount"
            ref={amountRef}
            className="form-control form-control-lg"
            placeholder="0"
            required
            min="1" // Ensure the amount is at least 1
          />
          <small className="form-text text-muted">
            Enter the amount of tokens to transfer.
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          disabled={loading} // Disable button if loading
        >
          {loading ? "Transferring..." : "TRANSFER"}
        </button>
      </form>
    </div>
  );
}
