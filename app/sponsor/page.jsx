"use client"
import React from 'react';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

const Sponsor = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const config = {
        reference: (new Date()).getTime().toString(), // Unique transaction ID
        email: email,                    // Customer email
        amount: parseFloat(amount) * 100,                           // Amount in Kobo (e.g., 5000 NGN)
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,  // Get this from Paystack Dashboard
    };

    // Success handler
    const onSuccess = (reference) => {
        // This runs after a successful payment
        console.log("Payment Successful! Reference:", reference);
        alert("Thank you for your support!");
    };

    // Close handler
    const onClose = () => {
        // This runs if the user closes the modal without paying
        console.log('Payment modal closed');
    };

    const initializePayment = usePaystackPayment(config);
    const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !amount || amount <= 0) {
      alert("Please enter a valid email and amount.");
      return;
    }

    initializePayment(onSuccess, onClose);
  };

  return (
    // <div className="payment-section">
    //   <h3>Support My Portfolio</h3>
    //   <form>

    //   </form>
    //   <button 
    //     onClick={() => initializePayment(onSuccess, onClose)}
    //     style={{ padding: '10px 20px', backgroundColor: '#3bb75e', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
    //   >
    //     Pay Now
    //   </button>
    // </div>
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Support My Work</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <input
          type="number"
          placeholder="Amount (NGN)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#3bb75e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Pay {amount ? `₦${amount}` : ""}
        </button>
      </form>
    </div>
  );
};

export default Sponsor;