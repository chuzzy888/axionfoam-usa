import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Loader } from "../components/loader";
import axios from "axios";

export const Contact2 = () => {
  const [isScrolling, setScrolling] = useState();
  const [cartItems, setCartItems] = useState([]);
  const getCartItems = () => {
    const allcart = localStorage.getItem("cart");

    if (allcart) {
      const parsed = JSON.parse(allcart);
      setCartItems(parsed);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getCartItems();

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
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      setUser(JSON.parse(userInLocal));
    }
  };
  const sendMessage = async () => {
    try {
      setLoading(true);
      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      function isNumeric(str) {
        // Use a regular expression to check if the string contains only numbers
        return /^[0-9]+$/.test(str);
      }

      if (!name) {
        throw new Error("Name Required");
      }
      if (!email) {
        throw new Error("Email Required");
      }
      if (!validateEmail(email)) {
        throw new Error("Email is invalid");
      }
      if (!phone) {
        throw new Error("Phone number Required");
      }
      if (!isNumeric(phone)) {
        throw new Error("Invalid phone number");
      }
      if (!message) {
        throw new Error("Message Required");
      }

      console.log({ name, email, phone, message });

      const data = await axios.post(
        `https://axionbackend2.betsphere.com.ng/api/addmessage`,
        {
          name,
          email,
          phonenumber: phone,
          message,
        }
      );

      alert("Message sent successfully");
      setMessage("");
      setName("");
      setPhone("");
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error.message || "An Error Occured");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Loader></Loader>
      <div className="page-wrapper">
        <header
          className="main-header header-style-four px-4 myheader"
          style={{
            backgroundColor: isScrolling ? "rgb(207, 207, 207)" : "transparent",
          }}
        >
          {/* Header Lower */}
          <div className="header-lower">
            <div className="auto-container">
              <div className="inner-container d-flex justify-content-between align-items-center">
                <div className="logo-box d-flex align-items-center">
                  {/* Logo */}
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
                  {/* Main Menu */}
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
              {/* <div className="d-flex">
                <div className="cart-box-two">
                  <a className="flaticon-shopping-bag" href="/cart" />
                  <span className="total-like">0</span>
                </div>
                <span
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className=""
                  style={{ marginLeft: "6px", cursor: "pointer" }}
                >
                  Cart
                </span>
                <a
                  href="/login"
                  className="user-box text-dark ms-3 d-flex align-items-center"
                >
                  <span className="fs-6 acct" style={{ cursor: "pointer" }}>
                    Account
                  </span>
                </a>
              </div> */}
            </nav>
          </div>
          {/* End Mobile Menu */}
        </header>
        {/* End Main Header */}
        {/* Page Title */}
        <section className="page-title">
          <div className="auto-container">
            <h2>Contact Us</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </section>
        {/* End Page Title */}
        {/* Contact Page Section */}

        <div className="contact-page-section">
          <div className="contact-boxed">
            {/* Title Box */}
            <div className="title-box">
              <h3>Send a message</h3>
              <div className="text">
                Your email address will not be published. Required fields are
                marked *
              </div>
            </div>
            {/* Contact Form */}
            <div className="contact-form">
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Your name"
                      required
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                      }}
                      style={{
                        borderColor: "gray",
                      }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Email Address*"
                      required
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                      style={{
                        borderColor: "gray",
                      }}
                    />
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                      required
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                      }}
                      style={{
                        borderColor: "gray",
                      }}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <textarea
                      className
                      name="message"
                      placeholder="Enter Your Message here"
                      defaultValue={""}
                      value={message}
                      onChange={e => {
                        setMessage(e.target.value);
                      }}
                      style={{
                        borderColor: "gray",
                      }}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <div className="buttons-box">
                      {!loading ? (
                        <button
                          onClick={() => {
                            sendMessage();
                          }}
                          className="theme-btn btn-style-one"
                        >
                          Send message
                        </button>
                      ) : (
                        <button className="theme-btn btn-style-one">
                          Loading...
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
          <div className="auto-container">
            <div className="row clearfix">
              {/* Info Column */}
              <div className="info-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column">
                  {/* Info Box */}
                  <div className="info-box">
                    <div className="box-inner d-flex align-items-center">
                      <div className="icon flaticon-email-1" />
                      <div className="content">
                        <strong>Mail address</strong>
                        <a href="mailto:Axionfoam.ng@gmail.com">
                          Axionfoam@gmail.com
                        </a>
                        <br />
                      </div>
                    </div>
                  </div>
                  {/* Info Box */}
                  <div className="info-box">
                    <div className="box-inner d-flex align-items-center">
                      <div className="icon flaticon-map" />
                      <div className="content">
                        <strong>Axion </strong>
                        {/* <div className="text">
                          Adunni Mall, 30 Addo Road Lekki-Ajah
                        </div>
                        <div className="text">
                          41 Okuru link road, Odili road, Port Harcourt
                        </div> */}
                        <div className="text">
                          24353 Chippewa CT <br /> Farmington Hills, Michigan
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Info Box */}
                  <div className="info-box">
                    <div className="box-inner d-flex align-items-center">
                      <div className="icon flaticon-call" />
                      <div className="content">
                        <strong>Phone Number</strong>
                        <a href="tel:+12482823277">+12482823277</a>
                        <br />
                        {/* <a href="tel:08113805555">08113805555</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Column */}
              <div className="map-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  {/*Map Outer*/}
                  <div className="map-outer">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119551.22632250299!2d-108.28111676307412!3d36.75898831316367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873b8f00ad0c7ec7%3A0xc823b1b63b534e1a!2sFarmington%2C%20NM%2C%20USA!5e0!3m2!1sen!2sng!4v1709137173685!5m2!1sen!2sng"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row mx-4 mb-4"
              style={{
                width: "100vw",
                rowGap: "50px",
              }}
            >
              {/* <div className="col-md-4 mt-4">
                <span className="fs-5 fw-bold">List of outlet in Abuja</span>{" "}
                <br />
                <li className="fs-5 mt-3"> 1). Sahad store Abuja </li>
                <li className="fs-5 mt-3"> 2). NATO furniture Abuja </li>
                <li className="fs-5 mt-3"> 3). Decorum furniture Abuja </li>
                <li className="fs-5 mt-3"> 4). Fizas furniture Abuja </li>
                <li className="fs-5 mt-3">
                  {" "}
                  5). Nato furniture gweripa Abuja{" "}
                </li>
                <li className="fs-5 mt-3"> 6). Megzee furniture kagbo </li>
              </div>
              <div className="col-md-4 mt-4">
                <span className="fs-5 fw-bold">List of outlet in kaduna</span>{" "}
                <br />
                <li className="fs-5 mt-3"> 1). Sahad store kaduna</li>
                <li className="fs-5 mt-3"> 2). Afnice furniture kaduna </li>
                <li className="fs-5 mt-3"> 3). Super execluive furniture </li>
                <li className="fs-5 mt-3"> 4). Cmore global kaduna </li>
                <li className="fs-5 mt-3"> 5). Gold shied furniture kaduna</li>
              </div> */}
            </div>
            {/* Contact Boxed */}

            {/* End Contact Boxed */}
          </div>
        </div>
        {/* End Contact Page Section */}
        {/* Gallery Section */}

        {/* End Gallery Section */}
        {/* Main Footer */}
        <Footer></Footer>
        {/* End Main Footer */}
      </div>
    </div>
  );
};
