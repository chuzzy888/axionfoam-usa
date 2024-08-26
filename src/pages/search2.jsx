import React, { useEffect, useState } from "react";
import { mattressData } from "../components/mytemp/mattress";
import { EachproductSearch } from "../components/eachproductsearch";
import { Footer } from "../components/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Search2 = () => {
  const [displayedData, setDisplayedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue !== "") {
      const filtered = originalData.filter((item) => {
        return (
          item.name.toUpperCase().includes(searchValue.toUpperCase()) ||
          item.category.toUpperCase().includes(searchValue.toUpperCase())
        );
      });
      setDisplayedData(filtered);
    } else {
      setDisplayedData([]);
    }
  }, [searchValue, originalData]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://axionbackend.betsphere.com.ng/api/getproducts"
      );
      console.log(response?.data?.data);
      setOriginalData(response?.data?.data);
      // setFilteredProducts(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
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

  useEffect(() => {
    getUser();
  }, []);

  return (
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
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          backgroundColor: "rgba(220, 220, 220, 0.178)",
          marginTop: "105px",
          borderBottom: "2px dotted rgba(0, 0, 0, 0.097)",
        }}
      >
        <a href="/" className="fs-6 me-2 text-dark">
          Home
        </a>{" "}
        {">"} <p className="pt-3 ms-2">Search</p>
      </div>
      <div
        className="d-flex  justify-content-center"
        style={
          {
            //   borderTop: "2px dotted rgba(0, 0, 0, 0.237)",
          }
        }
      >
        <form action="" className="mb-4">
          <input
            type="text"
            placeholder="Type to search"
            className="filter-input"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="shops-outer px-3 bg-gray-300 py-5">
        <div className="row clearfix">
          {/* Shop Item */}
          {displayedData.map((item) => {
            return <EachproductSearch item={item}></EachproductSearch>;
          })}
          {displayedData.length === 0 && (
            <div className="fs-5  text-center mt-1">
              {searchValue === ""
                ? "Start typing to search for products"
                : " No product matches your search"}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
