import React, { useState, useEffect } from "react";
import fapshiAPI from "./api/Payment"; // Import the API module
import "bootstrap/dist/css/bootstrap.min.css";

export default function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [balance, setBalance] = useState(null);

  // Automatically remove the response message after 30 seconds
  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(null);
      }, 10000); // 30 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or update
    }
  }, [responseMessage]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    setResponseMessage(null);

    const paymentData = {
      amount: parseInt(amount),
      phone,
      medium: "mobile money",
      name: "John Doe",
      email: "john.doe@example.com",
      userId: "12345",
      externalId: "12345",
      message: "Testing the APIs",
    };

    try {
      const response = await fapshiAPI.directPay(paymentData);
      setResponseMessage(response.message);
      console.log(response);
    } catch (error) {
      setResponseMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!transactionId) {
      setResponseMessage("Transaction ID is required to check the status.");
      return;
    }

    setLoading(true);
    try {
      const response = await fapshiAPI.paymentStatus(transactionId);
      setResponseMessage(response.message || `Status: ${response.status}`);
    } catch (error) {
      setResponseMessage("Failed to fetch payment status.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetBalance = async () => {
    setLoading(true);
    try {
      const response = await fapshiAPI.balance();
      setBalance(response.balance);
    } catch (error) {
      setResponseMessage("Failed to fetch balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Make a Payment</h3>
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label className="form-label">Amount (XAF)</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {/* Show Loading Indicator */}
        {loading && (
          <div className="mt-3 alert alert-warning text-center">
            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></div>
            Processing payment...
          </div>
        )}

        {/* Response Messages (Auto-disappears after 30 sec) */}
        {responseMessage && (
          <div className="mt-3 alert alert-info text-center">
            {responseMessage}
          </div>
        )}

        {/* Transaction ID input and Check Status */}
        <div className="mt-4">
          <h4 className="mb-3">Check Payment Status</h4>
          <div className="mb-3">
            <label className="form-label">Transaction ID</label>
            <input
              type="text"
              className="form-control"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={handleCheckStatus}
            disabled={loading}
          >
            {loading ? "Fetching Status..." : "Check Status"}
          </button>
        </div>

        {/* Balance Display */}
        <div className="mt-4">
          <h4 className="mb-3">Check Balance</h4>
          <button
            type="button"
            className="btn btn-info w-100"
            onClick={handleGetBalance}
            disabled={loading}
          >
            {loading ? "Fetching Balance..." : "Get Balance"}
          </button>
          {balance !== null && (
            <div className="mt-3 alert alert-success text-center">
              <strong>Balance:</strong> {balance} XAF
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
