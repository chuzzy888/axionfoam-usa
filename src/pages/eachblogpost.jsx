import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Loader } from "../components/loader";
import axios from "axios";
import { blogdata } from "../assets/blogdata";

export const Eachblogpost = () => {
  const [isScrolling, setScrolling] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [blogItem, setblogItem] = useState({});

  const { title, content, image, date } = blogItem;

  useEffect(() => {
    const blogid = localStorage.getItem("blogid");

    const foundItem = blogdata.find((item) => {
      console.log(item.id === blogid);
      return Number(item.id) === Number(blogid);
    });
    setblogItem(foundItem);

    console.log(foundItem);
  }, []);
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
            <h2>Blog</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Blog page</li>
              <li>{blogItem?.title}</li>
            </ul>
          </div>
        </section>
        {/* End Page Title */}
        {/* Contact Page Section */}
        {/* <div className="contact-page-section">
          <div className="auto-container">
            <div className="max-w-4xl mx-auto">
              <img
                src={image}
                alt={title}
                className="w-full mb-4 rounded-lg shadow-lg"
              />
              <h1 className="fs-4 font-bold mb-4">{title}</h1>
              <p className="text-gray-600 mb-4">{date}</p>
              {content?.map((item, index) => (
                <div key={index} className="mb-6">
                  <h2 className="fs-5 font-semibold">{item.subtitle}</h2>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <div className="contact-page-section">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <img
                  src={image}
                  alt={title}
                  className="img-fluid w-100 mb-4 rounded-lg shadow-lg"
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
                <div className="px-3">
                  <h1 className="fs-4 fw-bold mb-4">{title}</h1>
                  <p className="text-muted mb-4">{date}</p>
                  {content?.map((item, index) => (
                    <div key={index} className="mb-6">
                      <h2 className="fs-5 fw-semibold">{item.subtitle}</h2>
                      <p className="text-dark">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
        {/* End Main Footer */}
      </div>
    </div>
  );
};
