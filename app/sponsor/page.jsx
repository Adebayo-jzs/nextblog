"use client";

import { useState } from "react";

export default function SponsorPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const payWithPaystack = () => {
    if (typeof window === "undefined") return;

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
      email,
      amount: Number(amount) * 100,
      callback: function (response) {
        alert("Payment successful: " + response.reference);
      },
      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <>
      {/* Load Paystack script ONLY in browser */}
      <script src="https://js.paystack.co/v1/inline.js"></script>

      <div style={{ maxWidth: 400, margin: "40px auto" }}>
        <h2>Sponsor Me</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (NGN)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={payWithPaystack}>Pay</button>
      </div>
    </>
  );
}