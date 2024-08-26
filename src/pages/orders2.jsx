import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export const Orders2 = () => {
  const [isScrolling, setScrolling] = useState();
  const [cartItems, setCartItems] = useState([]);

  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState();

  const handleClose = () => {
    setShow(false);
    navigate("/orders");
  };
  const handleShow = () => setShow(true);

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
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);

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

  const getOrders = async () => {
    try {
      const newData = await axios.get(
        `https://axionbackend.betsphere.com.ng/api/getalluserorders/${user?.email}`
      );
      console.log(newData);
      setOrders(newData?.data?.data || []);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, [user]);
  return (
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
          <h2>Orders Page</h2>
          <ul className="bread-crumb clearfix">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Pages</li>
            <li>Orders</li>
          </ul>
        </div>
      </section>

      <div
        className="mx-4"
        style={{
          margin: "130px 0",
        }}
      >
        {orders?.length > 0 && (
          <h4 className="text-center mb-3">Your Orders</h4>
        )}

        {orders?.length === 0 ? (
          <h4 className="text-center">You have no orders yet</h4>
        ) : (
          <div
            style={{
              margin: "70px 0",
              overflowX: "scroll",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th className="">Products</th>
                  <th>Status</th>
                  <th>Payment method</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((eachOrder, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{eachOrder?.createdAt?.split("T")[0]}</td>
                      <td
                        style={{
                          width: "250px",
                        }}
                      >
                        {JSON.parse(eachOrder.products).map((eachproduct) => {
                          // console.log(eachproduct.images);
                          return (
                            <p
                              className="text-dark d-flex align-items-center"
                              style={{
                                fontSize: "12px",
                                margin: "0px 0",
                                lineHeight: "23px",
                                width: "200px",
                              }}
                            >
                              <img
                                src={eachproduct.images[0]}
                                alt=""
                                className="me-2"
                                style={{
                                  width: "30px",
                                }}
                              />{" "}
                              {eachproduct.name}
                            </p>
                          );
                        })}
                      </td>
                      <td>
                        {eachOrder?.delivered ? "Delivered" : "Not Delivered"}
                      </td>
                      <td>{eachOrder?.method || "Not Specified"}</td>
                      <td>
                        {dollarRate &&
                          Math.round(Number(eachOrder?.price) / dollarRate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      {/* End Page Title */}
      {/* Checkout Section */}

      <div></div>
      <Footer></Footer>
      <Loader></Loader>
    </div>
  );
};
