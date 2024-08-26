import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/loader";

export const Login = () => {
  const [scrolling, setScrolling] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        "https://axionbackend.betsphere.com.ng/api/login",
        {
          email,
          password,
        }
      );
      setError(data.data.message);
      localStorage.setItem("user", JSON.stringify(data.data.userDetails));
      console.log(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      // alert(error.message);
      setError(error.response.data.message);

      setTimeout(() => {
        setError("");
      }, 5000);
      setLoading(false);
    }
  };
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

  const [cartqty, setCartQty] = useState(0);

  const getCartQuantity = () => {
    const qty = localStorage.getItem("cart");

    if (qty) {
      const parsed = JSON.parse(qty);
      setCartQty(parsed.length);
    }
  };
  useEffect(() => {
    getCartQuantity();
  }, []);

  const [user, setUser] = useState(null);

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    !user && (
      <div>
        <header
          className="main-header header-style-four px-4 myheader"
          style={{
            backgroundColor: scrolling ? "rgb(207, 207, 207)" : "transparent",
            marginTop: "-10px",
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
                  <a
                    className="user-box flaticon-user-3"
                    href="/login"
                    style={{
                      marginRight: "3px",
                    }}
                  />
                  {/* Like Box */}

                  {/* Cart Box */}
                  <div
                    className="cart-box-two"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    <a className="flaticon-shopping-bag" href="/cart" />
                    <span className="total-like">{cartqty}</span>
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

        <section
          className="ftco-section  mb-5"
          style={{
            marginTop: "100px",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(mattress4.jpg)" }}
                  ></div>
                  <div className="login-wrap p-4 p-md-5">
                    <div className="d-flex">
                      <div className="w-100">
                        <h3 className="mb-4">Sign In</h3>
                      </div>
                    </div>
                    <form
                      action="#"
                      className="signin-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        login();
                      }}
                    >
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="name">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control accountinput mt-2"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control accountinput mt-2"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <h4
                        style={{
                          // textAlign: "center",
                          textTransform: "uppercase",
                          fontSize: "13px",
                        }}
                        className=" text-danger mb-2 text-uppercase "
                      >
                        {error}
                      </h4>
                      <div className="form-group">
                        {!loading ? (
                          <button
                            type="submit"
                            className="form-control btn rounded text-light submit px-3"
                            style={{ backgroundColor: "#1486CC" }}
                          >
                            Sign In
                          </button>
                        ) : (
                          <button
                            // type="submit"
                            className="form-control btn rounded text-light submit px-3"
                            style={{ backgroundColor: "grey" }}
                          >
                            Loading...
                          </button>
                        )}
                      </div>
                      {/* <div className="form-group d-md-flex">
                        <div className="w-100 text-md-right mt-4 mb-2">
                          <a href="#">Forgot Password</a>
                        </div>
                      </div> */}
                    </form>
                    <p className="">
                      Don't have an account yet?{" "}
                      <a data-toggle="tab" href="/register">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Loader></Loader>
      </div>
    )
  );
};
