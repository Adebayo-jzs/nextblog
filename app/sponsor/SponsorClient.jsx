"use client";

import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";

export default function SponsorClient() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Number(amount) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: name,
        },
      ],
    },
  };

  const onSuccess = (reference) => {
    console.log("Payment Successful:", reference);
    alert("Thank you for your support!");
  };

  const onClose = () => {
    console.log("Payment modal closed");
  };

  const initializePayment = usePaystackPayment(config);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !amount || Number(amount) <= 0) {
      alert("Please enter a valid email and amount.");
      return;
    }

    initializePayment(onSuccess, onClose);
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2 style={{ textAlign: "center" }}>Support My Work</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount (NGN)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">
          Pay {amount ? `₦${amount}` : ""}
        </button>
      </form>
    </div>
  );
}