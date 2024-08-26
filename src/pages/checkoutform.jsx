import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  // Hardcoded client secret for test environment
  const clientSecret =
    "sk_test_51PooCQ05e2FEIXLCIbWGYVqm5wc3i5ugrQwpzvr9rZRCwr9up7lCv7qxFdAt46s6PdkV06JCbQsbklrNkyrCW77p00yfXdTAt9";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="button-box">
        {(stripe || elements) && (
          <button
            type="submit"
            disabled={!stripe || !elements}
            className="btn btn-outline-danger mt-4 w-100"
          >
            Pay Online Now
          </button>
        )}
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
