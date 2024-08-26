import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Loader } from "../components/loader";
import axios from "axios";
import { Eachproducthome } from "../components/eachproducthome";
import { Eachproductcompare } from "../components/eachproductcompare";
// import ScrollToTop from "react-scroll-to-top";

export const Compare = () => {
  const [isScrolling, setScrolling] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [showing, setShowing] = useState("Mattress");
  const [displayedData, setDisplayedData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [productoneid, setproductoneid] = useState(0);
  const [producttwoid, setproducttwoid] = useState(0);
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

  const getData = () => {
    // const queryParams = new URLSearchParams(window.location.search);
    // const category = showing;

    // Use the 'category' value as needed
    if (showing) {
      console.log("Selected category:", showing);
      // Perform any additional actions with the category value
    }
    if (showing?.toUpperCase() === "ALL") {
      setDisplayedData(productData);
    } else if (showing?.toUpperCase() === "MATTRESS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "MATTRESS";
      });
      console.log(data);
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "TOPPERS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "TOPPER";
      });
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "PILLOWS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "PILLOW";
      });
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "BED BASE") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "BEDBASE";
      });
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "PROTECTORS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "PROTECTOR";
      });
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "MATS") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "MATS";
      });
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "COMPRESSION") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "COMPRESSION";
      });
      setDisplayedData(data);
    } else if (showing?.toUpperCase() === "TRAVEL") {
      const data = productData.filter((eachMattress) => {
        return eachMattress?.category?.toUpperCase() === "TRAVEL";
      });
      setDisplayedData(data);
    }
  };
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://axionbackend2.betsphere.com.ng/api/getproducts"
        // "https://axionbackend2.betsphere.com.ng/api/getproducts"
      );
      setProductData(response?.data?.data);

      // setFilteredProducts(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  //   console.log("running");
  useEffect(() => {
    getData();
  }, [productData, showing]);

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(displayedData);

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
            </nav>
          </div>
          {/* End Mobile Menu */}
        </header>
        {/* End Main Header */}
        {/* Page Title */}
        <section className="page-title">
          <div className="auto-container">
            <h2>Compare Products</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Conpare products</li>
            </ul>
          </div>
        </section>

        <div className=" py-5">
          <div
            style={{
              flexWrap: "wrap",
              gap: "10px",
            }}
            className="d-flex justify-content-between  mx-4"
          >
            <h4>Compare {showing}</h4>

            <div class="myselect">
              <select
                onChange={(e) => {
                  setShowing(e.target.value);
                  getData();
                }}
              >
                <option value="" selected disabled>
                  Select a category
                </option>

                <option value="Mattress">Mattress</option>
                <option value="Toppers">Toppers</option>
                <option value="Pillows">Pillows</option>
                <option value="Bedbase">Bed Base</option>
                <option value="Protectors">Protectors</option>
                <option value="Mats">Mats</option>
                <option value="Compression">Compression</option>
                <option value="Travel">Travel</option>
              </select>
              <div class="custom-arrow"></div>
            </div>
          </div>
        </div>

        {displayedData?.length > 0 && (
          <div
            style={{
              gap: "10px",
            }}
            className="d-flex flex-wrap mx-3 mb-4"
          >
            <div className="d">
              <h4 className="mb-2 fs-6">Product One</h4>
              <div class="myselect">
                <select
                  onChange={(e) => {
                    setproductoneid(e.target.value);
                    getData();
                  }}
                >
                  {displayedData.map((eachDisplay, index) => {
                    return <option value={index}>{eachDisplay.name}</option>;
                  })}
                </select>
                <div class="custom-arrow"></div>
              </div>
            </div>
            <div className="ms-2">
              <h4 className="mb-2 fs-6">Product two</h4>
              <div class="myselect">
                <select
                  onChange={(e) => {
                    setproducttwoid(e.target.value);
                    getData();
                  }}
                >
                  {displayedData.map((eachDisplay, index) => {
                    return <option value={index}>{eachDisplay.name}</option>;
                  })}
                </select>
                <div class="custom-arrow"></div>
              </div>
            </div>
          </div>
        )}
        {displayedData?.length > 0 ? (
          <div
            className="comparediv mx-3"
            // style={{
            //   width: "100vw",
            // }}
          >
            <div className="col-md-6">
              <Eachproductcompare
                item={displayedData[productoneid]}
              ></Eachproductcompare>
              <h4 className="mb-3">Sizes</h4>
              <div className="d-flex mb-4 sizes">
                {JSON.parse(displayedData[productoneid].sizes).map(
                  (eachsize) => {
                    return (
                      <div className="me-3 ">
                        <div
                          classNam=" rounded mt-3"
                          style={{
                            backgroundColor: "grey",
                            width: "fit-content",
                            padding: "10px 20px",
                            color: "white",
                          }}
                        >
                          {eachsize.name} $
                          {dollarRate &&
                            Math.round(Number(eachsize.price) / dollarRate)}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              <h4 className="mb-3">Description</h4>
              <p className="desc mb-5">
                {displayedData[productoneid].description}
              </p>
            </div>
            <div className="mx-3">
              <div
                className="horline"
                style={{
                  height: "100%",
                  width: "2px",
                  backgroundColor: "grey",
                }}
              ></div>
            </div>

            <div
              className="varline mb-3"
              style={{
                height: "2px",
                width: "100vw",
                backgroundColor: "grey",
              }}
            ></div>
            <div className="col-md-6 pe-2">
              <Eachproductcompare
                item={displayedData[producttwoid]}
              ></Eachproductcompare>
              <h4 className="mb-3">Sizes</h4>
              <div className="d-flex mb-4 sizes">
                {JSON.parse(displayedData[producttwoid].sizes).map(
                  (eachsize) => {
                    return (
                      <div className="me-3 ">
                        <div
                          classNam=" rounded mt-3"
                          style={{
                            backgroundColor: "grey",
                            width: "fit-content",
                            padding: "10px 20px",
                            color: "white",
                          }}
                        >
                          {eachsize.name} $
                          {dollarRate &&
                            Math.round(Number(eachsize.price) / dollarRate)}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <h4 className="mb-3">Description</h4>
              <p className="desc mb-5">
                {displayedData[producttwoid].description}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center mb-5 fs-4">
            No product is available in this category for now
          </div>
        )}

        <Footer></Footer>
        {/* End Main Footer */}
      </div>

      <div>{/* <ScrollToTop smooth /> */}</div>
    </div>
  );
};
