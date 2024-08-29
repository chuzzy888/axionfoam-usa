import React, { useState, useEffect } from "react";
import { Loader } from "../components/loader";
import { mattressData } from "../components/mytemp/mattress";
import { useLocation, useNavigate } from "react-router-dom";
import { Eachproduct } from "../components/eachproduct";
import { Footer } from "../components/footer";
import axios from "axios";

export const Shop = () => {
  const appLink = import.meta.env.REACT_APP_LINK;

  // console.log(appLink);
  const [category9, setCategory] = useState("all");
  const [goTo, setGoTo] = useState("");
  const [displayedData, setDisplayedData] = useState([]);
  const [numberDisplayed, setNumberDisplayed] = useState(6);
  const [isScrolling, setScrolling] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const getCategory = () => {
    const category1 = searchParams.get("category");
    setCategory(category1 || "all");
    console.log(category1);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getproducts");
      console.log(response?.data?.data);
      setProductData(response?.data?.data);
      setFilteredProducts(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getData = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const category = queryParams.get("category");

    // Use the 'category' value as needed
    if (category) {
      console.log("Selected category:", category);
      // Perform any additional actions with the category value
    }
    if (category?.toUpperCase() === "ALL") {
      setDisplayedData(productData);
    } else if (category?.toUpperCase() === "MATTRESS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "MATTRESS";
      });
      console.log(data);
      setDisplayedData(data);
    } else if (category?.toUpperCase() === "TOPPERS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "TOPPER";
      });
      setDisplayedData(data);
    } else if (category?.toUpperCase() === "PILLOWS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "PILLOW";
      });
      setDisplayedData(data);
    } else if (category?.toUpperCase() === "BEDBASE") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "BEDBASE";
      });
      setDisplayedData(data);
    } else if (category?.toUpperCase() === "PROTECTORS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "PROTECTOR";
      });

      setDisplayedData(data);
    } else if (category?.toUpperCase() === "MATS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "MATS";
      });
      setDisplayedData(data);
    } else if (category?.toUpperCase() === "CUSHION") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "CUSHION";
      });

      setDisplayedData(data);
    } else if (category?.toUpperCase() === "COMPRESSION") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "COMPRESSION";
      });

      setDisplayedData(data);
    } else if (category?.toUpperCase() === "TRAVEL") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "TRAVEL";
      });

      setDisplayedData(data);
    }
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
  }, []);
  useEffect(() => {
    getData();
  }, [productData]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getCategory();

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
  return (
    <div>
      <div className="page-wrapper">
        {/* Preloader */}
        {/* <div className="loader-wrap">
          <div className="preloader">
            <div className="preloader-close">x</div>
            <div id="handle-preloader" className="handle-preloader">
              <div className="animation-preloader">
                <div className="spinner" />
                <div className="txt-loading">
                  <span data-text-preloader="A" className="letters-loading">
                    A
                  </span>
                  <span data-text-preloader="X" className="letters-loading">
                    X
                  </span>
                  <span data-text-preloader="I" className="letters-loading">
                    I
                  </span>
                  <span data-text-preloader="O" className="letters-loading">
                    O
                  </span>
                  <span data-text-preloader="N" className="letters-loading">
                    N
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Preloader End */}
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
                          <a href="#">Shop</a>
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
        {/* End Main Header */}
        {/* Page Title */}
        <section className="page-title titlebg">
          <div className="auto-container">
            <h2>Shop Page</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Shop Page</li>
            </ul>
          </div>
        </section>

        {/* <div className="titlebg">
          <div className="">
            <h2>Shop Page</h2>
            <ul className="d-flex justify-content-center mt-3">
              <li className="me-3">
                <a
                  href="/ "
                  className="text-dark fs-6"
                  style={{ fontWeight: "600" }}
                >
                  Home
                </a>{" "}
                <span className="ms-1 fs-6">></span>
              </li>
              <li className="me-3" style={{ fontWeight: "600" }}>
                Pages <span className="ms-1 fs-6">></span>
              </li>
              <li style={{ fontWeight: "600" }}>Shop Page</li>
            </ul>
          </div>
        </div> */}
        {/* End Page Title */}
        {/* Sidebar Page Container */}
        <div className="sidebar-page-container belowtitle">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Content Side */}
              <div className="content-side col-lg-9 col-md-12 col-sm-12">
                {/* Filter Box */}
                <div className="filter-box">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    {/* Left Box */}
                    <div className="left-box d-flex align-items-center">
                      {/* <div className="results">Showing 1–12 of 54 results</div> */}
                    </div>
                    {/* Right Box */}
                    <div className="right-box d-flex">
                      <div class="myselect">
                        <select
                          onChange={(e) => {
                            navigate(`/shop?category=${e.target.value}`);
                            window.scrollTo(0, 0);
                            getData();
                          }}
                        >
                          <option value="" selected disabled>
                            Select a category
                          </option>
                          <option value="all">All</option>
                          <option value="mattress">Mattresses</option>
                          <option value="toppers">Toppers</option>
                          <option value="pillows">Pillows</option>
                          <option value="cushion">Cushion</option>
                          <option value="bedbase">Bed Base</option>
                          <option value="protectors">Protectors</option>
                          <option value="mats">Mats</option>
                          <option value="compression">Compression</option>
                          <option value="travel">Travel</option>
                        </select>
                        <div class="custom-arrow"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Filter Box */}
                <div className="shops-outer">
                  <div className="row clearfix">
                    {/* Shop Item */}
                    {displayedData.slice(0, numberDisplayed).map((item) => {
                      return <Eachproduct item={item}></Eachproduct>;
                    })}
                    {displayedData.length === 0 && (
                      <div className="text-center mt-5">
                        No products available in this category currently
                      </div>
                    )}
                  </div>
                </div>

                {displayedData?.length > numberDisplayed && (
                  <div className="d-flex justify-content-center">
                    <h3
                      className="text-center hover bg-secondary text-light   mt-5 py-3 rounded px-3  fs-6"
                      style={{
                        cursor: "pointer",
                        color: "white",
                        width: "140px",
                      }}
                      onClick={() => {
                        setNumberDisplayed(numberDisplayed + 4);
                      }}
                    >
                      + View more
                    </h3>
                  </div>
                )}
              </div>
              {/* Sidebar Side */}
              <div className="sidebar-side col-lg-3 col-md-12 col-sm-12 ">
                <aside className="sidebar sticky">
                  {/* Category Widget */}
                  <div className="sidebar-widget category-widget">
                    <div className="widget-content">
                      {/* Sidebar Title */}
                      <div className="sidebar-title">
                        <h6>Product Catagories</h6>
                      </div>
                      {/* Category List */}
                      <ul className="category-list">
                        <li>
                          <a href={`/shop?category=all`}>
                            All <span>({productData.length})</span>
                          </a>
                        </li>
                        <li>
                          <a href={`/shop?category=mattress`}>
                            Mattresses{" "}
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "MATTRESS"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>

                        <li>
                          <a href={`/shop?category=toppers`}>
                            Toppers{" "}
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "TOPPER"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>

                        <li>
                          <a href={`/shop?category=cushion`}>
                            Cushion{" "}
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "CUSHION"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>

                        <li>
                          <a href={`/shop?category=pillows`}>
                            Pillows{" "}
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "PILLOW"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={`/shop?category=bedbase`}>
                            Bed base{" "}
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "BEDBASE"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={`/shop?category=protectors`}>
                            Protectors{" "}
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "PROTECTOR"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={`/shop?category=mats`}>
                            Mats
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "MATS"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={`/shop?category=compression`}>
                            Compression
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "COMPRESSION"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={`/shop?category=travel`}>
                            Travel
                            <span>
                              (
                              {
                                productData.filter((eachMattress) => {
                                  return (
                                    eachMattress.category.toUpperCase() ===
                                    "TRAVEL"
                                  );
                                }).length
                              }
                              )
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Trending Widget */}
                  <div className="sidebar-widget trending-widget">
                    <div className="widget-content">
                      <div className="content">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage: "url(images/icons/vector-3.png)",
                          }}
                        />
                        {/* <div className="title">Trending</div> */}
                        <h4>
                          Best <span>Mattress</span> <br /> Collection
                        </h4>
                        <a className="buy-btn theme-btn" href="#">
                          Buy Now
                        </a>
                        <div className="icon">
                          <img src="cooling.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {/* End Gallery Section */}
        {/* Main Footer */}
        <Footer></Footer>
        {/* End Main Footer */}
      </div>
      <Loader></Loader>
    </div>
  );
};
