import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Loader } from "../components/loader";
import axios from "axios";
import { blogdata } from "../assets/blogdata";
import { useNavigate } from "react-router-dom";

export const Blogpage = () => {
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
  const navigate = useNavigate();

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
        `https://axionbackend.betsphere.com.ng/api/addmessage`,
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
            <h2>Blog posts</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Blog posts</li>
            </ul>
          </div>
        </section>
        {/* End Page Title */}
        {/* Contact Page Section */}
        <div className="contact-page-section">
          <div className="auto-container">
            <div class="container">
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {blogdata.map((eachBlog) => {
                  return (
                    <div class="col mb-4">
                      <div class="card h-100">
                        <img
                          src={eachBlog.image}
                          class="card-img-top"
                          alt="Card image cap"
                          style={{
                            height: "220px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            localStorage.setItem("blogid", eachBlog.id);
                            navigate(`/eachblogpost`);
                          }}
                        />
                        <div class="card-body">
                          <h5
                            class="card-title fs-5"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              localStorage.setItem("blogid", eachBlog.id);
                              navigate(`/eachblogpost`);
                            }}
                          >
                            {eachBlog.title}
                          </h5>

                          <p class="-text">
                            <small class="text-muted">{eachBlog.date}</small>
                          </p>

                          <p
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "8px",
                            }}
                            onClick={() => {
                              localStorage.setItem("blogid", eachBlog.id);
                              navigate(`/eachblogpost`);
                            }}
                            className="text-primary"
                          >
                            Read More
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

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
