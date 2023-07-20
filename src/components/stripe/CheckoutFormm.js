import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";

export default function CheckoutFormm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stripe) {
      console.log("---");
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded! Don't close the window.");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_SERVER_URL;

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // console.log("here I make call to server"); // debug
      console.log(paymentIntent); //<--- this is the point where you can you anyhting after completion of payment.
      axios
        .post(`${BASE_URL}/orders`, cart, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.status === "ok") {
            console.log(res.data);

            localStorage.removeItem("cart");
            dispatch(
              cartActions.replaceData({
                items: [],
                totalPrice: 0,
                totalQuantity: 0,
              })
            ); //<--- empty the cart
            const { amount, created, currency, id, receipt_email } =
              paymentIntent;
            navigate("/success", {
              state: {
                amount: amount,
                created: created,
                currency: currency,
                id: id,
                receipt_email: receipt_email,
                mssg: "hello raghav",
              },
            });
          } else if (res.data.status === "error") {
            console.log("Payment made but order not placed!", res.data.mssg);
            setMessage("Payment made but order not placed!");
            navigate("/failure");
          }
        });
    } else {
      console.log(error);
      setMessage("An unexpected error occurred " + e.message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value)} //don't use e.target.value, bc in this case e is a DOM element, and so has no "target" property. direct value is there.
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
