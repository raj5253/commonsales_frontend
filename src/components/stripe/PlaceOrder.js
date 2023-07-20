import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutFormm from "./CheckoutFormm";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const [clientSecret, setClientSecret] = useState("");
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch(`${BASE_URL}/orders/createPaymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        console.log(data);
      })
      .catch((error) =>
        console.log("failed in performing fetch to server" + error)
      );
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <h1>React Stripe payment elements</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutFormm />
        </Elements>
      )}
    </div>
  );
};

export default PlaceOrder;
