import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { mattressData } from "../components/mytemp/mattress";
import { Loader } from "../components/loader";
import { Eachproducthome } from "../components/eachproducthome";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import axios from "axios";
import { EachBlog } from "./eachblog";
import { blogdata } from "../assets/blogdata";
import Accordion from "react-bootstrap/Accordion";

// import $ from "jquery";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [cartqty, setCartQty] = useState(0);

  const [productData, setProductData] = useState([]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timeout on component unmount
  }, []);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getproducts"
        // "http://localhost:3000/api/getproducts"
      );
      console.log(response?.data?.data);
      setProductData(response?.data?.data);
      setFilteredProducts(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [user, setUser] = useState(null);

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      setUser(JSON.parse(userInLocal));
    }
  };

  useEffect(() => {
    getUser();
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <header className="main-header header-style-three">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container d-flex justify-content-between align-items-center flex-wrap">
                {/* Logo Box */}
                <div className="logo-box d-flex align-items-center">
                  <div className="nav-toggle-btn a-nav-toggle navSidebar-button">
                    {/* <span className="hamburger">
                      <span className="top-bun" />
                      <span className="meat" />
                      <span className="bottom-bun" />
                    </span> */}
                  </div>
                  {/* Logo */}
                  <div className="logo">
                    <a href="#">
                      <img
                        src="axionlogo.png"
                        alt=""
                        title
                        className="mylogo"
                      />
                    </a>
                  </div>
                </div>
                {/* Search Box */}
                {/* <div className="search-box">
                  <form
                    method="post"
                    action="https://html.themexriver.com/axion/contact.html"
                  >
                    <div className="form-group">
                      <select name="currency" className="custom-select-box">
                        <option>Search For Product</option>
                      </select>
                      <input
                        type="search"
                        name="search-field"
                        value={searchValue}
                        // defaultValue
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                        placeholder="Search Product"
                        required
                      />
                      <button type="submit">
                        <span className="icon fa fa-search" />
                      </button>
                    </div>
                  </form>
                </div> */}
                {/* Options Box */}
                <div className="options-box d-flex align-items-center">
                  {/* Search Box */}
                  {/* User Box */}
                  <div className="cart-box-two">
                    <a className="flaticon-shopping-bag" href="/cart" />
                    <span className="total-like">{cartqty}</span>
                  </div>
                  <span
                    className=""
                    style={{ marginLeft: "6px", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Cart
                  </span>
                  {!user ? (
                    <a
                      href="/login"
                      className="user-box flaticon-user-3 ms-3 d-flex align-items-center"
                    >
                      <span className="fs-6 acct" style={{ cursor: "pointer" }}>
                        Account
                      </span>
                    </a>
                  ) : (
                    <a
                      href="/profile"
                      className="user-box flaticon-user-3 ms-3 d-flex align-items-center"
                    >
                      <span className="fs-6 acct" style={{ cursor: "pointer" }}>
                        Account
                      </span>
                    </a>
                  )}
                  {/* Like Box */}
                  {/* Cart Box */}
                </div>
              </div>
            </div>
          </div>
          {/* End Header Lower */}
          {/* Header Lower */}

          <div class="header-lower">
            <div class="auto-container">
              <div class="nav-outer d-flex justify-content-between align-items-center flex-wrap">
                {/* <!-- Select Categories --> */}
                <div class="select-categories">
                  <div class="category">
                    <span class="icon flaticon-menu-3"></span> Select categories{" "}
                    <span class="arrow flaticon-down-arrow"></span>
                  </div>
                  <ul class="categories-list">
                    <li class="active">
                      <a href="/shop?category=mattress">
                        <span class="icon">
                          <img
                            src="mattress.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Mattresses
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=toppers">
                        <span class="icon">
                          <img
                            src="toppers.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Toppers
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=pillows">
                        <span class="icon">
                          <img
                            src="pillows.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Pillows
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=bedbase">
                        <span class="icon">
                          <img
                            src="base.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Bedbase
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=protectors">
                        <span class="icon">
                          <img
                            src="protectors.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Protectors
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End Select Categories -->
					
					<!-- Main Menu --> */}
                <nav class="main-menu show navbar-expand-md">
                  <div class="navbar-header">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>

                  <div
                    class="navbar-collapse collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul class="navigation clearfix ">
                      <li class="dropdown mydrop">
                        <a href="#" className="tablink">
                          Explore
                        </a>
                        <ul>
                          <li>
                            <a href="/" className="dhead">
                              Home
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=all" className="dhead">
                              Shop
                            </a>
                          </li>
                          <li>
                            <a href="/compare" className="dhead">
                              Compare products
                            </a>
                          </li>
                          <li>
                            <a href="/contact" className="dhead">
                              Contact us
                            </a>
                          </li>
                          {!user ? (
                            <li>
                              <a href="/login" className="dhead">
                                Account
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a href="/profile" className="dhead">
                                Account
                              </a>
                            </li>
                          )}
                          <li>
                            <a href="/search" className="dhead">
                              Search for Products
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown ">
                        <a href="/shop?category=mattress" className="tablink ">
                          Mattresses
                        </a>
                        <ul>
                          <li class="dropdown">
                            <a href="/shop?category=mattress" className="dhead">
                              Axion Premier Mattress
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Memory Foam
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Cooling Gel
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Graphite
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Latex
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Copper
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Green tea
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=mattress" className="dhead">
                              Axion Hybrid Mattress
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Classic Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Cooling Gel
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Latex Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Premium (Gold) Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Copper Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Platinum Hybrid
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=mattress" className="dhead">
                              Axion Hotel Collection
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Comfort
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Elite
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li class="dropdown">
                        <a
                          href="/shop?category=toppers"
                          className="tablink dhead"
                        >
                          Toppers
                        </a>
                        <ul>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Memory Foam Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Down Alternative Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Latex Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Waterproof Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Mattress pad
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li class="dropdown">
                        <a
                          href="/shop?category=bedbase"
                          className="tablink dhead"
                        >
                          Bedbase
                        </a>
                        <ul>
                          <li>
                            <a href="/shop?category=bedbase" className="dhead">
                              Adjustable base
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=bedbase" className="dhead">
                              Platform base
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=bedbase" className="dhead">
                              Boxspring base
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown">
                        <a
                          href="/shop?category=cushion"
                          className="tablink dhead"
                        >
                          Cushion
                        </a>
                        <ul>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Lumbar support
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Knee pillow
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Leg support pillow
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Cervical cushion
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Neck support
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Baby pillow
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li class="dropdown ">
                        <a href="/shop?category=mattress" className="tablink ">
                          Accessories
                        </a>
                        <ul>
                          <li class="dropdown">
                            <a href="/shop?category=pillows" className="dhead">
                              Pillows
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Luxury Fiber Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Luxury Cotton Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Memory Foam Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Latex Foam Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Geese Feather Pillow
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a
                              href="/shop?category=protectors"
                              className="dhead"
                            >
                              Protectors
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=protectors"
                                  className="subbtext"
                                >
                                  Mattress Protectors
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=protectors"
                                  className="subbtext"
                                >
                                  Pillow Protectors
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=travel" className="dhead">
                              Travel items
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=travel"
                                  className="subbtext"
                                >
                                  Neck support pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=travel"
                                  className="subbtext"
                                >
                                  Driver seat support
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=travel"
                                  className="subbtext"
                                >
                                  Cervical head pillow
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a
                              href="/shop?category=compression"
                              className="dhead"
                            >
                              Compression/Braces
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=compression"
                                  className="subbtext"
                                >
                                  Knee braces
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=compression"
                                  className="subbtext"
                                >
                                  Ankle socks
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=mats" className="dhead">
                              Mats
                            </a>
                            <ul>
                              <li>
                                <a href="/shop?category=mats" className="dhead">
                                  Anti-fatigue mat
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </nav>
                {/* <!-- Main Menu End--> */}

                {/* <!-- Outer Box --> */}
                <div class="outer-box d-flex justify-content-between align-items-center me-4">
                  {/* <!-- Social Box --> */}
                  {/* <div class="language dropdown">
                    <button
                      class="btn dropdown-toggle"
                      type="button"
                      // id="dropdownMenu"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="flag">
                        <img src="images/icons/usa-flag.png" alt="" />
                      </span>
                      English &nbsp;<span class="fa fa-angle-down"></span>
                    </button>
                     <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenu"
                    ></div> 
                  </div> */}
                  {/* <!-- Mobile Navigation Toggler --> */}
                  <div className=" d-flex align-items-center justify-content-between nomax">
                    {/* Search Box */}
                    {/* User Box */}
                    <div className="d-flex">
                      <div className="cart-box-two">
                        <a className="flaticon-shopping-bag" href="/cart" />
                        <span className="total-like">{cartqty}</span>
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
                      {!user ? (
                        <a
                          href="/login"
                          className="user-box text-dark ms-3 d-flex align-items-center"
                        >
                          <span
                            className="fs-6 acct"
                            style={{ cursor: "pointer" }}
                          >
                            Account
                          </span>
                        </a>
                      ) : (
                        <a
                          href="/profile"
                          className="user-box text-dark ms-3 d-flex align-items-center"
                        >
                          <span
                            className="fs-6 acct"
                            style={{ cursor: "pointer" }}
                          >
                            Account
                          </span>
                        </a>
                      )}
                    </div>
                    <div class="mobile-nav-toggler">
                      <span class="icon flaticon-menu"></span>
                    </div>
                    {/* Like Box */}
                    {/* Cart Box */}
                  </div>
                </div>
                {/* <!-- End Outer Box --> */}
              </div>
            </div>
          </div>

          {/* Sticky Header  */}
          <div className="sticky-header ">
            <div className="px-4 ">
              <div className="d-flex justify-content-between align-items-center">
                {/* Logo */}
                <div className="logo">
                  <a href="/" title>
                    <img src="axionlogo.png" alt="" title className="mylogo" />
                  </a>
                </div>
                {/* Right Col */}
                <div className="right-box">
                  {/* Main Menu */}
                  <div className="d-flex">
                    <nav className="main-menu">
                      {/*Keep This Empty / Menu will come through Javascript*/}
                    </nav>
                    {/* Main Menu End*/}
                    <div className="d-flex">
                      <div className="d-flex align-items-center">
                        <div className="cart-box-two">
                          <a className="flaticon-shopping-bag" href="/cart" />
                          <span className="total-like">{cartqty}</span>
                        </div>
                        <span
                          className=""
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                          onClick={() => {
                            navigate("/cart");
                          }}
                        >
                          Cart
                        </span>
                        {!user ? (
                          <a
                            href="/login"
                            className="user-box text-dark ms-3 d-flex align-items-center"
                          >
                            <span
                              className="fs-6 acct pt-1"
                              style={{ cursor: "pointer", fontWeight: "500" }}
                            >
                              Account
                            </span>
                          </a>
                        ) : (
                          <a
                            href="/profile"
                            className="user-box text-dark ms-3 d-flex align-items-center"
                          >
                            <span
                              className="fs-6 acct pt-1"
                              style={{ cursor: "pointer", fontWeight: "500" }}
                            >
                              Account
                            </span>
                          </a>
                        )}
                      </div>
                      <div className="mobile-nav-toggler">
                        <span className="icon flaticon-menu" />
                      </div>
                    </div>
                  </div>
                  {/* Mobile Navigation Toggler */}
                </div>
              </div>
            </div>
          </div>
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

              <div className="menu-outer">
                {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
              </div>
              {/* <div className="d-flex">
                <div className="cart-box-two">
                  <a className="flaticon-shopping-bag" href="/cart" />
                  <span className="total-like">{cartqty}</span>
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
        {/* Sidebar Cart Item */}
        <div className="xs-sidebar-group info-group">
          <div className="xs-overlay xs-bg-black" />
          <div className="xs-sidebar-widget">
            <div className="sidebar-widget-container">
              <div className="widget-heading">
                <a href="#" className="close-side-widget">
                  X
                </a>
              </div>
              <div className="sidebar-textwidget">
                {/* Sidebar Info Content */}
                <div className="sidebar-info-contents">
                  <div className="content-inner">
                    <div className="logo">
                      <a href="#">
                        <img src="images/logo.png" alt="" title />
                      </a>
                    </div>
                    <div className="content-box">
                      <h6>Services</h6>
                      {/* <ul className="sidebar-services-list">
                        <li>
                          <a href="#">Laptops &amp; Computers</a>
                        </li>
                        <li>
                          <a href="#">Cameras &amp; Photography</a>
                        </li>
                        <li>
                          <a href="#">Smart Phones &amp; Tablets</a>
                        </li>
                        <li>
                          <a href="#">Video Games &amp; Consoles</a>
                        </li>
                        <li>
                          <a href="#">TV &amp; Audio</a>
                        </li>
                        <li>
                          <a href="#">LED Table</a>
                        </li>
                      </ul> */}
                      <h6>Contact info</h6>
                      {/* List Style One */}
                      <ul className="list-style-one">
                        <li>
                          <span className="icon flaticon-maps-and-flags" />
                          <strong>Our office</strong>
                          A-1, Envanto Headquarters, <br /> Melbourne,
                          Australia.
                        </li>
                        <li>
                          <span className="icon flaticon-call-1" />
                          <strong>Phone</strong>
                          <a href="tel:+00-999-999-9999">+(00) 999 999 9999</a>
                          <br />
                          <a href="tel:+000-000-0000">000 000 0000</a>
                        </li>
                        <li>
                          <span className="icon flaticon-mail" />
                          <strong>Email</strong>
                          <a href="mailto:contact@axion.com">
                            contact@Axion.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END sidebar widget item */}
        {/* Main Section Three */}
        <section className="main-slider-three">
          <div className="auto-container">
            <div className="inner-container">
              <div className="main-slider-carousel owl-carousel owl-theme">
                {/* Slide One */}
                <div className="slide">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-5 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-5.png)",
                          }}
                        />
                        <div className="title">Eco-friendly materials</div>
                        <h1>Built for your comfort.</h1>
                        <div className="text">
                          Also supports sleepers over 250lbs. <br />
                          Try it with our 100 nights risk free trial
                        </div>

                        {/* Button Box */}
                        <div className="button-box">
                          <a href="/shop" className="theme-btn btn-style-one">
                            See Collection{" "}
                            <span className="icon flaticon-right-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="circle-box" />
                        <div
                          className="vector-icon-two"
                          style={{
                            backgroundImage: "url(images/icons/pattern-1.png)",
                          }}
                        />
                        <div
                          className="vector-icon-three"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-6.png)",
                          }}
                        />
                        <div className="image">
                          <img src="images/main-slider/image-3.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Slide One */}
                {/* Slide Two */}
                <div className="slide">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-5 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-5.png)",
                          }}
                        />
                        <div className="title">Worldwide shipping</div>
                        <h1>Best Quality and Durable sleepers</h1>
                        <div className="text">
                          Handcrafted with the highest quality materials.
                        </div>
                        {/* <div className="price">
                          Starting From <span>$560.99</span>
                        </div> */}
                        {/* Button Box */}
                        <div className="button-box">
                          <a href="/shop" className="theme-btn btn-style-one">
                            See Collection{" "}
                            <span className="icon flaticon-right-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="circle-box" />
                        <div
                          className="vector-icon-two"
                          style={{
                            backgroundImage: "url(images/icons/pattern-1.png)",
                          }}
                        />
                        <div
                          className="vector-icon-three"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-6.png)",
                          }}
                        />
                        <div className="image">
                          <img src="images/main-slider/image-3.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Slide Two */}
                {/* Slide Three */}
                <div className="slide">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-5 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-5.png)",
                          }}
                        />
                        <div className="title">Secure Payments</div>
                        <h1>Best Mattress At The Best Price</h1>
                        <div className="text">
                          10yrs Warranty (Registration required upon purchase)
                        </div>
                        {/* <div className="price">
                          Starting From <span>$560.99</span>
                        </div> */}
                        {/* Button Box */}
                        <div className="button-box">
                          <a href="/shop" className="theme-btn btn-style-one">
                            See Collection{" "}
                            <span className="icon flaticon-right-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="circle-box" />
                        <div
                          className="vector-icon-two"
                          style={{
                            backgroundImage: "url(images/icons/pattern-1.png)",
                          }}
                        />
                        <div
                          className="vector-icon-three"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-6.png)",
                          }}
                        />
                        <div className="image">
                          <img src="images/main-slider/image-3.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Slide Three */}
              </div>
            </div>
          </div>
        </section>
        {/* End Main Section Three */}
        {/* Featured Section */}
        <section className="featured-section">
          <div className="auto-container">
            <div className="inner-container">
              <div className="row clearfix">
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-fast" />
                      <strong>Free Shipping</strong>
                      <div className="text">Free shipping over $100</div>
                    </div>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12 px-1">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-padlock" />
                      <strong>Payment Secure</strong>
                      <div className="text">Get 100% Payment Safe</div>
                    </div>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12 px-1">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-headphones-1" />
                      <strong>Support 24/7</strong>
                      <div className="text">We Offer 24/7 Support</div>
                    </div>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-wallet" />
                      <strong>100% Money Back</strong>
                      <div className="text">30 days money back guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Featured Section */}

        {/* <div className="py-5 my-5 categories">
          <div
            className="text-center fs-3  mb-5 text-italic"
            style={{
              fontStyle: "inherit",
              fontFamily: "cursive",
            }}
          >
            Shop by Category
          </div>

          <div class="container my-4">
            <div class="row " style={{ rowGap: "20px" }}>
              <div
                class="col-md-6 zoom-container "
                onClick={() => {
                  navigate("/shop?category=mattress");
                }}
              >
                <div
                  class="categorycard1 card "
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                    justifyContent: "end",
                    cursor: "pointer",
                  }}
                >
                  <div class="card-body">
                    <h5 class="card-title text-light pb-3 ps-4">Mattresses</h5>
                  </div>
                </div>
              </div>
              <div
                class="col-md-6 zoom-container "
                onClick={() => {
                  navigate("/shop?category=toppers");
                }}
              >
                <div
                  class="categorycard2 card"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",

                    cursor: "pointer",
                  }}
                >
                  <div class="card-body">
                    <h5 class="card-title text-dark pb-3 ps-4">Toppers</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div class="container mt-2">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h2 class="h2 fw-bold">Shop by Category</h2>
            <p class="text-muted text-center">
              "Explore premium bedding essentials for ultimate comfort and
              support."
            </p>
          </div>
          <div class="row g-4">
            <div
              class="col-12 col-sm-6 col-lg-3 "
              onClick={() => {
                navigate("/shop?category=mattress");
              }}
              style={{ cursor: "pointer" }}
            >
              <div class="p-4 bg-light dark:bg-dark rounded tre">
                <img
                  style={{ height: "30px", objectFit: "cover" }}
                  src="data:image/png;base64,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"
                  alt="Living Room Icon"
                  class="mb-2"
                />
                <h3 class="h4 fw-bold mb-1">Mattress</h3>
                <p class="text-muted">Comfortable and supportive.</p>
              </div>
            </div>
            <div
              class="col-12 col-sm-6 col-lg-3"
              onClick={() => {
                navigate("/shop?category=toppers");
              }}
              style={{ cursor: "pointer" }}
            >
              <div class="p-4 bg-light dark:bg-dark rounded">
                <img
                  style={{ height: "30px", objectFit: "cover" }}
                  src="data:image/jpeg;base64,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"
                  alt="Bedroom Icon"
                  class="mb-2"
                />
                <h3 class="h4 fw-bold mb-1">Toppers</h3>
                <p class="text-muted">Enhance your sleep quality.</p>
              </div>
            </div>
            <div
              class="col-12 col-sm-6 col-lg-3"
              onClick={() => {
                navigate("/shop?category=cushion");
              }}
              style={{ cursor: "pointer" }}
            >
              <div class="p-4 bg-light dark:bg-dark rounded">
                <img
                  style={{ height: "30px", objectFit: "cover" }}
                  src="data:image/png;base64,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"
                  alt="Kitchen Icon"
                  class="mb-2"
                />
                <h3 class="h4 fw-bold mb-1">Cushion</h3>
                <p class="text-muted">Comfort for every seat.</p>
              </div>
            </div>
            <div
              class="col-12 col-sm-6 col-lg-3"
              onClick={() => {
                navigate("/shop?category=pillows");
              }}
              style={{ cursor: "pointer" }}
            >
              <div class="p-4 bg-light dark:bg-dark rounded">
                <img
                  style={{ height: "30px", objectFit: "cover" }}
                  src="data:image/png;base64,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"
                  alt="Outdoor Icon"
                  class="mb-2"
                />
                <h3 class="h4 fw-bold mb-1">Pillow</h3>
                <p class="text-muted">Support for every sleeper.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="products-section-six" id="popular">
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title">
              <h4>
                <span>Popular</span> Products!
              </h4>
              <button
                className="viewall"
                onClick={() => {
                  navigate("/shop?category=all");
                }}
              >
                View All
              </button>
            </div>
            <div className="row clearfix">
              {productData
                .filter((item) => {
                  return item.popular === "true" || item.popular === true;
                })
                .slice(0, 4)
                .map((item) => {
                  return <Eachproducthome item={item}></Eachproducthome>;
                })}
            </div>
            {/* Lower Box */}
            <div className="lower-box mt-5 pt-5">
              <div className="row clearfix">
                {/* Feature Block Three */}
                <div className="feature-block-three col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="inner-box d-flex justify-content-between align-items-center flex-wrap">
                    <div className="content">
                      <div
                        className="off"
                        style={{ textTransform: "capitalize" }}
                      >
                        Long-lasting Products
                      </div>
                      <h5>
                        <a href="/shop?category=all">
                          10yrs Warranty on our <br /> purchased products
                        </a>
                      </h5>
                      <a className="buy-now" href="/shop?category=all">
                        Shop Now
                      </a>
                    </div>
                    <div className="image">
                      <div className="off-box2 fs-6">
                        10yrs<i></i>{" "}
                        <span className="" style={{ fontSize: "8px" }}>
                          Warranty
                        </span>
                      </div>
                      <div className="circle-layer" />
                      <img
                        src="hybrid.png"
                        alt=""
                        style={{ width: "250px", marginLeft: "-10px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* Feature Block Three */}
                <div className="feature-block-three col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="inner-box d-flex flex-wrap flex-md-nowrap  justify-content-between align-items-center ">
                    <div className="content">
                      <div className="off">Worldwide Shipping</div>
                      <h5>
                        <a href="/shop?category=all">
                          Get Your Products Delivered <br /> Across The World
                        </a>
                      </h5>
                      <a className="buy-now" href="/shop?category=all">
                        Shop Now
                      </a>
                    </div>
                    <div className="image">
                      <div className="off-box">
                        7<i>%</i> <span>off</span>
                      </div>
                      <div className="circle-layer" />
                      <img
                        src="cooling.png"
                        alt=""
                        style={{ width: "300px", marginLeft: "-10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sec-title ms-3">
          <h4>
            <span>Some of</span> Our Products !
          </h4>
          {/* <button className="viewall">View All</button> */}
        </div>
        <div className="mx-3">
          <Slider {...settings}>
            {/* <img src="displaypictures/rfoam2.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam11.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam12.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam3.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam4.jpg" alt="" className="dp" />
            <img src="displaypictures/mtopper1.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam5.jpg" alt="" className="dp" />
            <img src="displaypictures/mtopper2.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam6.jpg" alt="" className="dp" />
            <img src="displaypictures/mtopper1.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam7.jpg" alt="" className="dp" />
            <img src="displaypictures/downtopper4.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam8.jpg" alt="" className="dp" />
            <img src="displaypictures/downtopper2.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam13.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam9.jpg" alt="" className="dp" />

            <img src="displaypictures/downtopper3.jpg" alt="" className="dp" />

            <img src="displaypictures/rfoam11.jpg" alt="" className="dp" /> */}

            <img src="displaypictures/ax1 (1).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (2).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (3).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (4).jpeg" alt="" className="dp" />
            {/* <img src="displaypictures/ax1 (5).jpeg" alt="" className="dp" /> */}
            <img src="displaypictures/ax1 (6).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (7).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (8).jpeg" alt="" className="dp" />
            {/* <img src="displaypictures/ax1 (9).jpeg" alt="" className="dp" /> */}
            {/* <img src="displaypictures/ax1 (10).jpeg" alt="" className="dp" /> */}
            <img src="displaypictures/ax1 (11).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (12).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (13).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (14).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (15).jpeg" alt="" className="dp" />
            <img src="displaypictures/ax1 (16).jpeg" alt="" className="dp" />

            {/* <img src="displaypictures/ax1 (17).jpeg" alt="" className="dp" /> */}

            <img src="displaypictures/ax1 (18).jpeg" alt="" className="dp" />
          </Slider>
        </div>

        <section className="sale-section-two ">
          {/* <div
            className="collection"
            style={{ backgroundImage: "url(mattress.png)" }}
          /> */}
          <div className="auto-container">
            <div className="row clearfix justify-content-around">
              {/* Content Column */}
              <div className="content-column col-lg-7 col-md-12 col-sm-12 ps-5">
                <div className="inner-column">
                  <div className="title">100% best sleep solutions</div>
                  <h2>
                    IT'S JUST LIKE SLEEPING <br /> ON THE CLOUD
                  </h2>
                  <div className="text">
                    Our safe and high quality materials gives you a comfortable
                    and safe sleep
                  </div>
                  {/* Product Time Countdown */}

                  <a href="/shop?category=all" className="shop-now">
                    Shop Now
                  </a>
                </div>
              </div>
              {/* Image Column */}
              <div className="image-column col-lg-5 col-md-12 col-sm-12 pe-5">
                <div className="inner-column">
                  <div className="circle-layer" />
                  <div
                    className="vector-icon-one"
                    style={{
                      backgroundImage: "url(images/icons/pattern-1.png)",
                    }}
                  />
                  <div
                    className="vector-icon-two"
                    style={{
                      backgroundImage: "url(images/icons/pattern-4.png)",
                    }}
                  />
                  <div className="image">
                    {/* Price Tag */}

                    <div
                      className="price-tag"
                      style={{ fontSize: "20px", lineHeight: "19px" }}
                    >
                      Shop now
                    </div>

                    <img src="images/resource/pillow.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="vw-100 mt-2 pt-4">
          <h3 className=" ms-3 mb-5 text-center  fs-4 w-full text-primary">
            Sleep <span className="text-danger ">reimagined</span>, your story
            begins with Axion
            <span className="text-danger ms-1">Foam</span>
          </h3>
        </div>
        <div className="d-flex justify-content-center mb-5">
          {/* <div class="video-container">
            <video
              width="640"
              height="360"
              controls
              muted
              autoPlay={"autoplay"}
              preLoad="auto"
              loop
            >
              <source src="axionvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> */}

          <div className="row mb-5 px-3" style={{ marginTop: "-40px" }}>
            <div className="col-md-6 mt-3">
              {" "}
              <video
                width="640"
                height="360"
                controls
                muted
                autoPlay={"autoplay"}
                preLoad="auto"
                loop
              >
                <source src="axionvid1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-6 mt-3">
              {" "}
              <video
                width="640"
                height="360"
                controls
                muted
                autoPlay={"autoplay"}
                preLoad="auto"
                loop
              >
                <source src="axionvid2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <section
          className="newsletter-section"
          style={{ backgroundImage: "url(images/background/pattern-6.png)" }}
        >
          <div id="newsletter" className="auto-container">
            <div className="row clearfix">
              {/* Form Column */}
              <div className="form-column col-lg-6 col-md-12 col-sm-12 px-[4px]  md:!pl-[20px]">
                <div className="inner-column">
                  <h2>Newsletter</h2>
                  <div className="text">
                    Enter your email here to get regular updates about our
                    products and services
                  </div>
                  {/* Subscribe Box Two */}
                  <div className="subscribe-box-two">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="email"
                          name="search-field"
                          placeholder="Enter your Email"
                          required
                        />
                        <button
                          onClick={() => {
                            setTimeout(() => {
                              alert("You have subscribed successfully");
                            }, 2000);
                          }}
                          type="submit"
                          className="theme-btn submit-btn"
                        >
                          subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Image Column */}
              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image">
                    <img
                      src="mattressicon.png"
                      alt=""
                      className=""
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="products-section-six" id="popular">
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title">
              <h4>
                <span>Our Blog</span>
              </h4>
              <button
                className="viewall"
                onClick={() => {
                  navigate("/blogpage");
                }}
              >
                View All
              </button>
            </div>
            <div className="row clearfix">
              {blogdata.slice(0, 4).map((item) => {
                return <EachBlog item={item}></EachBlog>;
              })}
            </div>
          </div>
        </section>

        <section
          className="products-section-six"
          id="faq"
          style={{
            marginTop: "-100px",
          }}
        >
          <div className="auto-container">
            <div className="sec-title">
              <h4>
                <span>Frequently Asked Questions</span>
              </h4>
            </div>
            <Accordion
              defaultActiveKey="0"
              style={{
                maxWidth: "1200px",
                margin: "auto",
              }}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {" "}
                  Where can I get original Axion products?
                </Accordion.Header>
                <Accordion.Body>
                  You can get original Axion products from any of our accredited
                  distributors nationwide and our Sleep Galleries. You can also
                  purchase on our website, it's safe and fast!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header> How much Sleep do I need?</Accordion.Header>
                <Accordion.Body>
                  Averagely, you need 7-8 hours of sleep every night, but it
                  differs for every person. Some people may need as much as 10
                  hours a night and others need much less.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {" "}
                  Do I need a mattress protector or mattress pad for my Axion
                  mattress?
                </Accordion.Header>
                <Accordion.Body>
                  Mattress protectors are a great choice to protect your
                  mattress from life's little accidents. So we suggest you pick
                  one to keep your mattress fresh.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  {" "}
                  How do I become an Axion distributor?
                </Accordion.Header>
                <Accordion.Body>
                  You can become a Axion distributor by calling our customer
                  service centre (0811 380 5555) for enquiries. You can also
                  visit our head office in Lagos or Port Harcourt to get
                  information on how to become an accredited Axion distributor.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  {" "}
                  Does my Axion mattress come with a warranty?
                </Accordion.Header>
                <Accordion.Body>
                  Yes! Both our memory foam mattresses and hybrid models are
                  covered with a 10-year warranty. If there are any structural
                  or manufacturer defects with your mattress, please contact us.
                  We've got your back.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  {" "}
                  How long can I expect my mattress to last?
                </Accordion.Header>
                <Accordion.Body>
                  All our mattresses come with a 10-year warranty, and we
                  believe our mattress can last 10 years or more
                  with proper use.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>

        <Footer></Footer>
      </div>
      <Loader></Loader>
    </div>
  );
};
