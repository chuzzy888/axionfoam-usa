import React, { useEffect, useState } from "react";
import { Loader } from "../components/loader";
import { Footer } from "../components/footer";
import { mattressData } from "../components/mytemp/mattress";
import { Eachproduct } from "../components/eachproduct";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";

// import { useCart } from "react-use-cart";

export const Eachproductpage = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [isScrolling, setScrolling] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [newSize, setNewSize] = useState("");
  const [relatedDataArray, setRelatedDataArray] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [reviews, setreviews] = useState([]);
  const [show, setShow] = useState(false);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [reviewerName, setreviewerName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    // console.log("ID changed:", id);
  }, [id]);
  const [quantity, setQuantity] = useState(1);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [productData, setProductData] = useState([]);

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

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://axionbackend2.betsphere.com.ng/api/getproducts"
        // "https://axionbackend2.betsphere.com.ng/api/getproducts"
      );
      console.log(response?.data?.data);
      setProductData(response?.data?.data);
      // setFilteredProducts(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const addreview = async () => {
    try {
      if (!reviewerName) {
        alert("Your name is required");
        throw new Error("");
      }
      if (!review) {
        alert("Review is required");
        throw new Error("");
      }

      const response = await axios.put(
        "https://axionbackend2.betsphere.com.ng/api/addreview",
        // "https://axionbackend2.betsphere.com.ng/api/addreview",
        {
          id: pageData?.id,
          reviewername: reviewerName,
          review: review,
          rating: stars,
        }
      );

      getAllProducts();
      setShow(false);
      setreviewerName("");
      setReview("");
      alert("Review submitted successfully");
      // setFilteredProducts(response?.data?.data);
      // console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getData = () => {
    const data = productData.find(item => {
      return Number(item.id) === Number(id);
    });
    window.scrollTo(0, 0);

    if (data?.reviews) {
      setreviews(data.reviews);
    }
    setPageData(data);
  };

  const addToCart = productToAdd => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      item =>
        item.productId === productToAdd.productId &&
        item.size === productToAdd.size
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity = productToAdd?.quantity;
      existingCart[existingProductIndex].price = productToAdd?.price;
    } else {
      const newItem = { ...productToAdd, quantity: productToAdd?.quantity };
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    getCartQuantity();
  };
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

  // Example usage:
  useEffect(() => {
    if (pageData?.id) {
      setSize(
        `${JSON.parse(pageData?.sizes)[0]?.name} ${
          JSON.parse(pageData?.sizes)[0]?.width
        } X ${JSON.parse(pageData?.sizes)[0]?.height} ${
          JSON.parse(pageData?.sizes)[0]?.unit
        }`
      );
    }
    // console.log(pageData);
  }, [pageData]);
  useEffect(() => {
    getData();
  }, [productData]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
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
  }, [id]);

  useEffect(() => {
    if (pageData?.id) {
      setPrice(JSON.parse(pageData?.sizes)[0]?.price);
      setUpdatedPrice(JSON.parse(pageData?.sizes)[0]?.price);
    }
  }, [pageData]);
  useEffect(() => {
    setUpdatedPrice(Number(price) * Number(quantity));
  }, [price, quantity]);

  console.log(updatedPrice);

  useEffect(() => {
    const category = pageData?.category;
    const relatedData = productData.filter(item => {
      return (
        item?.category?.toUpperCase() === category?.toUpperCase() &&
        item.id !== pageData?.id
      );
    });
    setRelatedDataArray(relatedData);
  }, [pageData]);

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
  useEffect(() => {
    console.log(price);
  }, [price]);

  return (
    pageData?.id && (
      <div>
        <div className="page-wrapper">
          <header
            className="main-header header-style-four px-4 myheader"
            style={{
              backgroundColor: isScrolling
                ? "rgb(207, 207, 207)"
                : "transparent",
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
                            <a href="/contact" style={{ marginLeft: "-14px" }}>
                              Contact us
                            </a>
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
                    <div className="cart-box-two">
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

            {/* End Mobile Menu */}
          </header>
          {/* End Main Header */}
          {/* Page Title */}
          <section className="page-title">
            <div className="auto-container">
              <h2>Product Page</h2>
              <ul className="bread-crumb clearfix">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Pages</li>
                <li>Product Page</li>
              </ul>
            </div>
          </section>
          {/* End Page Title */}
          {/* Shop Detail Section */}
          <section className="shop-detail-section bg-3">
            <div className="auto-container">
              {/* Upper Box */}
              <div className="upper-box">
                <div className="row clearfix">
                  {/* Gallery Column */}
                  <div className="gallery-column col-lg-6 col-md-12 col-sm-12 ps-md-5 ">
                    <div className="inner-column">
                      <div className="carousel-outer">
                        {/* Swiper */}
                        <div className="swiper-container content-carousel">
                          <div className="swiper-wrapper">
                            {JSON.parse(pageData?.images)?.map(eachImage => {
                              return (
                                <div className="swiper-slide">
                                  <figure className="image figureimage">
                                    <a
                                      href={eachImage}
                                      className="lightbox-image"
                                    >
                                      <p>Click image to view</p>
                                      <img
                                        src={eachImage}
                                        alt=""
                                        className="figureimage"
                                      />
                                    </a>
                                  </figure>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div class=" my-4 text-dark d-none d-sm-block">
                      <h2 class="h4 mb-4">Got questions?</h2>
                      <p class="mb-4">
                        Our friendly Sleep Specialists are here to help. Give us
                        a call now <br /> or visit your local store.
                      </p>
                      <a href="tel:+18884980003" class="d-flex  mb-4">
                        Give us a call: +1 888.498.0003
                      </a>
                      <a
                        href="#"
                        class="d-inline-flex align-items-center text-secondary"
                      >
                        <span>Try it in a store near you</span>
                        <svg
                          class="ms-2"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h4V4a1 1 0 011-1z" />
                        </svg>
                      </a>

                      <h3 class="h5 mt-4 mb-2">Don't Lose Sleep</h3>
                      <div class="row g-3">
                        <div class="col-md-4">
                          <div class="bg-secondary text-light p-3 rounded text-center">
                            Free, no-contact delivery*
                          </div>
                        </div>
                    
                        <div class="col-md-4">
                          <div class="bg-secondary text-light p-3 rounded text-center">
                            10-year limited warranty*
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  {/* Content Column */}
                  <div className="content-column col-lg-6 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <h3>{pageData?.name}</h3>

                      {/* Price */}
                      <div className="price ">
                        {" "}
                        ${dollarRate && Math.round(updatedPrice / dollarRate)}
                      </div>
                      <div className="text">{pageData?.intro}</div>
                      <div className="d-flex flex-wrap">
                        {/* Model */}
                        <div className="model">
                          <span className="model-title">Model:</span>
                        </div>
                        {/* Select Size */}
                        <div className="select-size-box clearfix">
                          {JSON.parse(pageData?.sizes).map(item => {
                            return (
                              <div className="select-box">
                                <input
                                  type="radio"
                                  name="payment-group"
                                  id="radio-one"
                                  // defaultChecked
                                />
                                <label htmlFor="radio-one">{item.name}</label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <select
                        name=""
                        id=""
                        className=" mt-3 productSelect"
                        // defaultValue={2 + 2}
                        onChange={e => {
                          setNewSize(e.target.value.split("-")[0]);

                          setSize(e.target.value.split("-")[0]);

                          // setPrice(e.target.value.split("-")[1]);\
                          setPrice(e.target.value.split("-")[1]);
                          // setUpdatedPrice(
                          //   e.target.value.split("-")[1] * quantity
                          // );
                        }}
                      >
                        {JSON.parse(pageData?.sizes)?.map(eachsize => {
                          return (
                            <option
                              key={eachsize.name}
                              value={`${eachsize.name} ${eachsize.width} X ${eachsize.height} ${eachsize.unit} -${eachsize.price}`}
                              className="myoption text-light"
                            >
                              {eachsize.name} {eachsize.width} X{" "}
                              {eachsize.height} {eachsize.unit}
                            </option>
                          );
                        })}
                      </select>
                      <div className="price ">
                        ${dollarRate && Math.round(updatedPrice / dollarRate)}
                      </div>

                      <div className="d-flex align-items-center flex-wrap mt-4">
                        {/* Button Box */}
                        <div
                          className="button-box"
                          onClick={() => {
                            // const productToAdd = {
                            //   productId: 123,
                            //   productName: "Example Product",
                            //   size: "M",
                            // };
                            console.log({
                              ...pageData,
                              productId: pageData.id,
                              quantity,
                              price: updatedPrice,
                              size,
                            });
                            addToCart({
                              ...pageData,
                              productId: pageData.id,
                              quantity,
                              price: updatedPrice,
                              size,
                              originalPrice: price,
                            });
                          }}
                        >
                          <a
                            // href="shop"
                            className="theme-btn btn-style-one"
                          >
                            Add to cart
                          </a>
                        </div>
                        {/* Quantity Box */}

                        <td
                          className="d-flex "
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="py-1"
                            style={{
                              width: "30px",
                              display: "flex",
                              justifyContent: "center",
                              backgroundColor: "black",
                              color: "white",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (quantity > 1) {
                                setQuantity(quantity - 1);
                              }
                            }}
                          >
                            -
                          </div>
                          <div
                            className="py-1"
                            style={{
                              width: "30px",
                              display: "flex",
                              justifyContent: "center",
                              backgroundColor: "grey",
                              color: "black",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                          >
                            {quantity}
                          </div>
                          <div
                            className="py-1"
                            style={{
                              width: "30px",
                              display: "flex",
                              justifyContent: "center",
                              backgroundColor: "black",
                              color: "white",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setQuantity(quantity + 1);
                            }}
                          >
                            +
                          </div>
                        </td>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Upper Box */}
              {/* Lower Box */}
              <div className="lower-box">
                {/* Product Info Tabs */}
                <div className="product-info-tabs">
                  {/* Product Tabs */}
                  <div className="prod-tabs tabs-box mx-lg-4">
                    {/* Tab Btns */}
                    <ul className="tab-btns tab-buttons clearfix">
                      <li
                        data-tab="#prod-details"
                        className="tab-btn active-btn"
                      >
                        Product Details
                      </li>
                    </ul>
                    {/* Tabs Container */}
                    <div className="tabs-content">
                      {/* Tab / Active Tab */}
                      <div
                        className="tab active-tab"
                        id="prod-details"
                        style={{
                          maxWidth: "500px",
                        }}
                      >
                        <div className="content">
                          <p>{pageData?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* REMOVE REVIEW FEATURE */}

                {/* <div className="prod-tabs tabs-box">
                  
                  <ul className="tab-btns tab-buttons clearfix">
                    <div className="d-flex justify-content-between">
                      <li
                        data-tab="#prod-details"
                        className="tab-btn active-btn"
                      >
                        Reviews
                      </li>
                      {user && (
                        <li
                          // data-tab="#prod-details"
                          className="tab-btn bg-primary px-3 rounded text-light"
                          onClick={() => {
                            handleShow();
                          }}
                        >
                          + Add new Review
                        </li>
                      )}
                    </div>
                  </ul>
                </div> */}

                {/* {reviews.length > 0 ? (
                  <div className="mt-5 ">
                    {reviews.map((eachRev) => {
                      return (
                        <div className="d-flex mt-5 ">
                          <div
                            className=""
                            style={{
                              height: "40px",
                              width: "40px",
                              backgroundColor: "black",
                              borderRadius: "50%",
                              marginRight: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textTransform: "uppercase",
                              color: "white",
                              fontSize: "23px",
                            }}
                          >
                            {eachRev?.name?.charAt(0)}
                            {eachRev?.name?.charAt(1)}
                          </div>
                          <div className="">
                            <h5
                              className="fs-5"
                              style={{
                                maxWidth: "600px",
                              }}
                            >
                              {eachRev.review}
                            </h5>
                            <h5
                              className="fs-6"
                              style={{
                                marginTop: "-10px",
                                fontWeight: "300",
                              }}
                            >
                              {eachRev.name}
                            </h5>
                            <div
                              className="d-flex"
                              style={{
                                marginTop: "-10px",
                              }}
                            >
                              {[...Array(Number(eachRev.rating))].map(
                                (_, index) => (
                                  <div key={index}>
                                    <div
                                      className={`rounded d-flex align-items-center justify-content-center  bg-primary text-white mt-0 me-3`}
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                      }}
                                    >
                                      <i class="bi bi-star-fill fs-6"></i>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="fs-5 mt-4">No reviews yet</div>
                )} */}

                {/*End Product Info Tabs*/}
              </div>
              {/* End Lower Box */}
            </div>
          </section>
          {/* End Shop Page Section */}
          {/* Products Section Six */}
          <section className="products-section-six">
            <div className="auto-container">
              {/* Sec Title */}
              <div className="sec-title">
                <h4>
                  <span>Related</span> Products!
                </h4>
              </div>
              <div className="row clearfix">
                {/* Shop Item Two */}

                {relatedDataArray.slice(0, 3).map(item => {
                  return <Eachproduct item={item}></Eachproduct>;
                })}
              </div>
            </div>
          </section>
          {/* End Products Section Six */}

          {/* Main Footer */}
          <Footer></Footer>
          {/* End Main Footer */}
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          className="d-flex justify-content-center"
          style={{
            maxWidth: "100vw",
          }}
        >
          <Modal.Header
            closeButton
            style={{
              minWidth: "400px",
            }}
          >
            <Modal.Title>
              <h5 className="text-dark">Add new Review</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="">
              <label htmlFor="" className="mb-2 fs-6">
                Your name
              </label>
              <br />
              <input
                type="text"
                style={{
                  border: "1px solid black ",
                  fontSize: "12px",
                  minWidth: "400px",
                }}
                className="mb-3 rounded py-1 px-2"
                value={reviewerName}
                onChange={e => {
                  setreviewerName(e.target.value);
                }}
              />
              <br />

              <label htmlFor="" className="mb-2 fs-6">
                Enter review
              </label>
              <br />
              <textarea
                name=""
                id=""
                cols="30"
                className="rounded p-2 "
                style={{
                  border: "1px solid black",
                  fontSize: "12px",
                  minWidth: "400px",
                }}
                value={review}
                onChange={e => {
                  setReview(e.target.value);
                }}
              ></textarea>
              <br />
              <label htmlFor="" className="mb-2 fs-6">
                Choose rating
              </label>
              <div className="d-flex ">
                <div
                  onClick={() => {
                    setStars(1);
                  }}
                  className={`rounded d-flex align-items-center justify-content-center ${
                    stars === 1 && "bg-primary text-white"
                  }`}
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <i class="bi bi-star-fill fs-3"></i>
                </div>
                <div
                  onClick={() => {
                    setStars(2);
                  }}
                  className={`rounded d-flex align-items-center justify-content-center ${
                    stars === 2 && "bg-primary text-white"
                  }`}
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <i class="bi bi-star-fill fs-3"></i>
                </div>
                <div
                  onClick={() => {
                    setStars(3);
                  }}
                  className={`rounded d-flex align-items-center justify-content-center ${
                    stars === 3 && "bg-primary text-white"
                  }`}
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <i class="bi bi-star-fill fs-3"></i>
                </div>
                <div
                  onClick={() => {
                    setStars(4);
                  }}
                  className={`rounded d-flex align-items-center justify-content-center ${
                    stars === 4 && "bg-primary text-white"
                  }`}
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <i class="bi bi-star-fill fs-3"></i>
                </div>
                <div
                  onClick={() => {
                    setStars(5);
                  }}
                  className={`rounded d-flex align-items-center justify-content-center ${
                    stars === 5 && "bg-primary text-white"
                  }`}
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <i class="bi bi-star-fill fs-3"></i>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addreview();
              }}
            >
              Submit Review
            </Button>
          </Modal.Footer>
        </Modal>
        <Loader></Loader>
      </div>
    )
  );
};
