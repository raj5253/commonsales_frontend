import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const PlaceOrder = () => {
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(
    "pk_test_51MkkYdSDNqeO4XdQYomowl6BFKux5KHkCQ3ZNlWZQMsh6UHp5lak0scvLEJdMj6CjWrtIY02vJEQaMJ8DcK7IOl2002RtdoDdf"
  );

  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BASE_URL}/orders/createPaymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    }).then(async (res) => {
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="App">
      <h1>React Stripe payment elements</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PlaceOrder;
