import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/loader";
import { Footer } from "../components/footer";

export const Profile = () => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();

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
      setUser(JSON.parse(userInLocal));
    }
  };

  console.log(user);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
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
                          <a href="/contact">Contact</a>
                        </li>

                        <li className="dropdown">
                          <a href="/shop?category=all">Logout</a>
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
                    href="/profile"
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

        {/* <div className="py-5 bg-dark " style={{ marginTop: "100px" }}></div> */}

        <div className="profile grayy">
          <div className="avatar-div">
            <img src="user.png" alt="" className="userIcon" />
            <h4 className="mt-3 mb-4">{user?.email}</h4>
            <button
              className="mb-3 profilebutton"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
            <button
              className="mb-3 profilebutton"
              onClick={() => {
                navigate("/orders");
              }}
            >
              {" "}
              Orders
            </button>
            <button
              className="mb-3 profilebutton"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* <Loader></Loader> */}
      <Footer></Footer>
    </div>
  );
};
