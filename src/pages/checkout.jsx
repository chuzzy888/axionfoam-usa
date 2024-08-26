import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PaystackButton } from "react-paystack";

import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkoutform";

export const Checkout = () => {
  const [isScrolling, setScrolling] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(localStorage.getItem("subtotal"));
  const [products, setProducts] = useState(localStorage.getItem("cart"));
  const [show, setShow] = useState(false);
  const [showPay, setShowPay] = useState(false);

  // Stripe Beginning

  const stripePromise = loadStripe(import.meta.env.VITE_API_PUBLICKEY);

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {
      /*...*/
    },
  };

  // Stripe End

  const handleClose = () => {
    setShow(false);
    navigate("/orders");
  };
  const handleCloseStripePay = () => {
    setShowPay(false);
  };

  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Payment on delivery");
  const navigate = useNavigate();
  const getCartItems = () => {
    const allcart = localStorage.getItem("cart");
    if (allcart) {
      const parsed = JSON.parse(allcart);
      setCartItems(parsed);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      // console.log(window.scrollY);
      if (window.scrollY > 30) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [user, setUser] = useState(null);

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      setUser(JSON.parse(userInLocal));
    } else {
      alert("Please create an account or log in to an existing account");
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [dollarRate, setDollarRate] = useState(null);

  const getDollarRate = async () => {
    try {
      const response = await axios.get(
        "https://axionbackend2.betsphere.com.ng/api/getdollarrate"
      );
      setDollarRate(response?.data[0]?.currentrate || 0);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDollarRate();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!phoneNumber) {
        throw new Error("Phone number is required");
      }
      if (!state) {
        throw new Error("State is required");
      }
      if (!city) {
        throw new Error("City is required");
      }
      if (!address) {
        throw new Error("Address is required");
      }
      if (!user.email) {
        throw new Error("Email is required");
      }

      console.log(JSON.parse(products));
      const newData = await axios.post(
        "https://axionbackend2.betsphere.com.ng/api/addorder",
        // "https://axionbackend2.betsphere.com.ng/api/addorder",
        {
          username: user.email,
          products: JSON.parse(products),
          price: total,
          phoneNumber,
          state,
          country: city,
          address,
          email: user.email,
          method: "Payment on delivery",
        }
      );
      console.log(newData);
      // alert("Order placed successfully");
      handleShow();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const validate = () => {
    try {
      if (!phoneNumber) {
        alert("Phone number is required");
        throw new Error("");
      }
      if (!state) {
        alert("State is required");
        throw new Error("");
      }
      if (!city) {
        alert("City is required");
        throw new Error("");
      }
      if (!address) {
        alert("Address is required");
        throw new Error("");
      }
      if (!user.email) {
        alert("Email is required");
        throw new Error("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_live_eedc7ffbdd5dbbdb114d9549e984f755794ea763",
  };

  const handlePaystackSuccessAction = async (reference) => {
    console.log(reference);
    try {
      console.log(JSON.parse(products));
      const newData = await axios.post(
        "https://axionbackend2.betsphere.com.ng/api/addorder",
        // "https://axionbackend2.betsphere.com.ng/api/addorder",
        {
          username: user.email,
          products: JSON.parse(products),
          price: total,
          phoneNumber,
          state,
          country: city,
          address,
          email: user.email,
          method: "Online payment",
        }
      );
      console.log(newData);
      // alert("Order placed successfully");
      handleShow();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handlePaystackCloseAction = () => {
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: ` Online payment`,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="page-wrapper">
      <header
        className="main-header header-style-four px-4 myheader"
        style={{
          backgroundColor: isScrolling ? "rgb(207, 207, 207)" : "transparent",
        }}
      >
        <div className="header-lower">
          <div className="auto-container">
            <div className="inner-container d-flex justify-content-between align-items-center">
              <div className="logo-box d-flex align-items-center">
                <div className="logo">
                  <a href="/">
                    <img
                      src="axionlogo.png"
                      alt=""
                      title
                      style={{ width: "120px" }}
                    />
                  </a>
                </div>
              </div>
              <div className="nav-outer clearfix">
                <nav className="main-menu show navbar-expand-md">
                  <div className="navbar-header">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                  </div>
                  <div
                    className="navbar-collapse collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li className="dropdown">
                        <a href="/">Home</a>
                      </li>

                      <li className="dropdown">
                        <a href="/shop?category=all">Shop</a>
                      </li>
                      <li className="dropdown">
                        <a href="/contact">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </nav>
                {/* Main Menu End*/}
              </div>
              {/* Options Box */}
              <div className="options-box d-flex align-items-center">
                {/* Search Box */}
                <div
                  className="search-box-outer"
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  <div className="search-box-btn">
                    <span className="flaticon-search-1" />
                  </div>
                </div>
                {/* User Box */}
                {!user ? (
                  <a
                    className="user-box flaticon-user-3"
                    href="/login"
                    style={{
                      marginRight: "3px",
                    }}
                  />
                ) : (
                  <a
                    className="user-box flaticon-user-3"
                    href="/profile"
                    style={{
                      marginRight: "3px",
                    }}
                  />
                )}
                {/* Like Box */}

                {/* Cart Box */}
                <div
                  className="cart-box-two"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <a className="flaticon-shopping-bag" href="/cart" />
                  <span className="total-like">{cartItems.length}</span>
                </div>
                {/* Mobile Navigation Toggler */}
                <div className="mobile-nav-toggler">
                  <span className="icon flaticon-menu" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Lower */}
        {/* Sticky Header  */}

        {/* End Sticky Menu */}
        {/* Mobile Menu  */}

        <div className="mobile-menu">
          <div className="menu-backdrop" />
          <div className="close-btn">
            <span className="icon flaticon-multiply" />
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <a href="/">
                <img src="axionlogo.png" alt="" title />
              </a>
            </div>
            {/* Search */}

            <div className="menu-outer">
              {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
      </header>
      {/* End Main Header */}
      {/* Page Title */}
      <section className="page-title">
        <div className="auto-container">
          <h2>Checkout Page</h2>
          <ul className="bread-crumb clearfix">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Pages</li>
            <li>Checkout</li>
          </ul>
        </div>
      </section>
      {/* End Page Title */}
      {/* Checkout Section */}
      <section className="checkout-section">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Form Column */}
            <div className="form-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <h4>Delivery Information</h4>
                {/* Shipping Form */}
                <div className="shipping-form">
                  <form method="post">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter Your Phone Number"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your Full Name"
                          required
                          value={name}
                          onChange={(e) => {
                            console.log(name);
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your State"
                          required
                          value={state}
                          onChange={(e) => {
                            // console.log(name);
                            setState(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your City"
                          required
                          value={city}
                          onChange={(e) => {
                            // console.log(name);
                            setCity(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <textarea
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          className
                          name="message"
                          placeholder="Enter your House Address, Please include closest landmarks and Bus-stops"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* End Shipping Form */}
              </div>
            </div>
            {/* Order Column */}
            <div className="order-column col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <h4>Order Summary</h4>
                {/* Order Box */}
                <div className="order-box">
                  <ul className="order-totals">
                    <li>
                      Subtotal
                      <span>
                        {" "}
                        ${dollarRate && Math.round(Number(total) / dollarRate)}
                      </span>
                    </li>
                    <li>
                      Shipping Fee<span>$0</span>
                    </li>
                  </ul>

                  {/* Order Total */}
                  <div className="order-total">
                    Total
                    <span>
                      ${dollarRate && Math.round(Number(total) / dollarRate)}
                    </span>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="" className="fs-6">
                      Choose method of payment
                    </label>
                    <br />

                    <select
                      name=""
                      className="w-full border  py-2 px-3 rounded mt-2 shadow-md"
                      id=""
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                      }}
                    >
                      <option value="Payment on delivery">
                        Payment on delivery
                      </option>
                      <option value="Online payment">Online payment</option>
                    </select>
                  </div>
                  <div className="button-box">
                    {paymentMethod === "Payment on delivery" ? (
                      <button
                        className="theme-btn pay-btn"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Payment on delivery
                      </button>
                    ) : (
                      <>
                        {!phoneNumber ||
                        !state ||
                        !city ||
                        !address ||
                        !user.email ? (
                          <button
                            className="theme-btn pay-btn"
                            onClick={() => {
                              validate();
                            }}
                          >
                            Pay Online Now
                          </button>
                        ) : (
                          <button
                            className="theme-btn pay-btn"
                            onClick={() => {
                              setShowPay(true);
                            }}
                          >
                            Pay Online Now
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="myPopup">
        <Modal show={showPay} onHide={handleCloseStripePay}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStripePay}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
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
      <Footer></Footer>
      <Loader></Loader>
    </div>
  );
};
