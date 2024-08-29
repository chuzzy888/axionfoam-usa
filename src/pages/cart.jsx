import React, { useState } from "react";
import { Footer } from "../components/footer";
import { useEffect } from "react";
import { Eachcart } from "../components/eachcart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Cart = () => {
  const [isScrolling, setScrolling] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const getSubTotal = () => {
    const allcart = localStorage.getItem("cart");

    if (allcart) {
      const parsed = JSON.parse(allcart);
      // setCartItems(parsed);
      const subtotal = parsed.reduce((acc, item) => {
        const itemSubtotal = item.originalPrice * item.quantity;

        return acc + itemSubtotal;
      }, 0);
      setTotal(subtotal);
      return subtotal;
    }
  };

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

  useEffect(() => {
    getSubTotal();
  }, [cartItems]);

  const [user, setUser] = useState(null);

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      setUser(JSON.parse(userInLocal));
    }
  };

  const [dollarRate, setDollarRate] = useState(null);

  const getDollarRate = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getdollarrate"
      );
      setDollarRate(response?.data[0]?.currentrate || 0);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDollarRate();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        {/* Main Header / Header Style Four */}
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
                          <a href="/shop?category=mattress">Shop</a>
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
            <h2>Cart Page</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Cart Page</li>
            </ul>
          </div>
        </section>
        {/* End Page Title */}
        {/* Shoping Cart Section */}
        {cartItems.length > 0 ? (
          <section className="shoping-cart-section">
            <div className="auto-container">
              <div className="row clearfix">
                {/* Cart Column */}
                <div className="cart-column col-lg-8 col-md-12 col-sm-12">
                  <div className="inner-column">
                    {/*Cart Outer*/}
                    <div className="cart-outer">
                      <div className="table-outer">
                        <table className="cart-table">
                          <thead className="cart-header">
                            <tr>
                              <th className="prod-column">product</th>
                              <th>&nbsp;</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((item, _index) => {
                              return (
                                <Eachcart
                                  item={item}
                                  _index={_index}
                                  getCartItems={getCartItems}
                                  getSubTotal={getSubTotal}
                                ></Eachcart>
                              );
                            })}
                          </tbody>
                        </table>

                        <h4
                          className="text-danger fs-6 my-4"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.removeItem("cart");
                            setCartItems([]);
                          }}
                        >
                          X Clear cart
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Total Column */}
                <div className="total-column col-lg-4 col-md-12 col-sm-12">
                  <div className="inner-column">
                    {/* Cart Total Outer */}
                    <div className="cart-total-outer">
                      {/* Title Box */}
                      <div className="title-box">
                        <h6>Cart Total</h6>
                      </div>
                      <div className="cart-total-box">
                        <ul className="cart-totals">
                          <li>
                            Total :{" "}
                            <span>
                              $
                              {dollarRate &&
                                Math.round(Number(total) / dollarRate)}
                            </span>
                          </li>
                        </ul>

                        {/* Buttons Box */}
                        <div className="buttons-box">
                          <a
                            href="/checkout"
                            className="theme-btn proceed-btn"
                            onClick={() => {
                              localStorage.setItem("subtotal", total);
                            }}
                          >
                            Proceed To Checkout
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p
            className="text-center  fs-4"
            style={{
              margin: "70px 0",
            }}
          >
            Cart is Empty
          </p>
        )}
        {/* End Shoping Cart Section */}
        {/* Gallery Section */}
        <section className="gallery-section">
          <div className="outer-container">
            <div className="instagram-carousel owl-carousel owl-theme">
              {/* Insta Gallery */}
              <div className="insta-gallery">
                <img src="images/gallery/1.jpg" alt="" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <a
                      className="lightbox-image icon flaticon-instagram"
                      href="images/gallery/1.jpg"
                    />
                  </div>
                </div>
              </div>
              {/* Insta Gallery */}
              <div className="insta-gallery">
                <img src="images/gallery/2.jpg" alt="" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <a
                      className="lightbox-image icon flaticon-instagram"
                      href="images/gallery/1.jpg"
                    />
                  </div>
                </div>
              </div>
              {/* Insta Gallery */}
              <div className="insta-gallery">
                <img src="images/gallery/3.jpg" alt="" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <a
                      className="lightbox-image icon flaticon-instagram"
                      href="images/gallery/3.jpg"
                    />
                  </div>
                </div>
              </div>
              {/* Insta Gallery */}
              <div className="insta-gallery">
                <img src="images/gallery/4.jpg" alt="" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <a
                      className="lightbox-image icon flaticon-instagram"
                      href="images/gallery/4.jpg"
                    />
                  </div>
                </div>
              </div>
              {/* Insta Gallery */}
              <div className="insta-gallery">
                <img src="images/gallery/5.jpg" alt="" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <a
                      className="lightbox-image icon flaticon-instagram"
                      href="images/gallery/5.jpg"
                    />
                  </div>
                </div>
              </div>
              {/* Insta Gallery */}
              <div className="insta-gallery">
                <img src="images/gallery/6.jpg" alt="" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <a
                      className="lightbox-image icon flaticon-instagram"
                      href="images/gallery/6.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Gallery Section */}
        {/* Main Footer */}
        <Footer></Footer>
        {/* End Main Footer */}
      </div>
    </div>
  );
};
