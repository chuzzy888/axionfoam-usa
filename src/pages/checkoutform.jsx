import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

export const CheckoutForm = ({
  products,
  user,
  total,
  dollarRate,
  handleAddOrder,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsprocessing] = useState(false);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    navigate("/orders");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsprocessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsprocessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await handleAddOrder(paymentIntent.id); // Pass the payment intent ID as a reference if needed
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
      setIsprocessing(false);
    } else {
      // Handle cases where further action is required (e.g., 3D Secure authentication)
      setIsprocessing(false);
    }
  };

  return (
    stripe &&
    elements && (
      <>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <div className="button-box">
            {stripe && elements && (
              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-outline-danger mt-4 w-100"
              >
                {isProcessing ? "Processing" : "Pay now"}
              </button>
            )}
          </div>
          {errorMessage && <div>{errorMessage}</div>}
        </form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <svg
              class="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>

            <div className="mt-4 text-center text-2xl">
              Order Placed Successfully
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};
