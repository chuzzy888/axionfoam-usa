import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Loader } from "../components/loader";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

// adm@axion.com
// Axionfoams@2023

// admin@axion.com
// Axionfoams@2023

export const Admin = () => {
  const [images, setImages] = useState([]);
  const [numImages, setNumImages] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("all");
  const [popular, setPopular] = useState(false);

  const [loading, setLoading] = useState(false);

  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  const [numSizes, setnumSizes] = useState(1);
  const [sizes, setSizes] = useState([]);
  const [displaying, setDisplaying] = useState("main");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [show, setShow] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showIntro, setshowIntro] = useState(false);
  const [showDescription, setshowDescription] = useState(false);
  const [showImage, setshowImage] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [numberOfExistingSizes, setNumberOfExistingSizes] = useState(0);
  const [updatingContent, setUpdatingContent] = useState(true);
  const [user, setUser] = useState(null);
  const [isScrolling, setScrolling] = useState();
  const [tabActive, setTabActive] = useState("dashboard");
  const [cartItems, setCartItems] = useState([]);
  const [currentProductName, setCurrentProductName] = useState("");
  const [currentProductIntro, setcurrentProductIntro] = useState("");
  const [currentProductDescription, setcurrentProductDescription] =
    useState("");
  const [currentProductImage, setcurrentProductImage] = useState("");
  const [allDisplayingSizes, setAllDisplayingSizes] = useState([]);
  const [originalOrders, setoriginalOrders] = useState(null);
  const [orders, setOrders] = useState(null);
  const [status, setStatus] = useState("all");
  const [allUsers, setAllusers] = useState(0);
  const [allProductsLen, setAllProductsLen] = useState(0);
  const [allOrders, setAllOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [settledOrders, setSettledOrders] = useState(0);
  const [messages, setMessages] = useState([]);
  const [messageLen, setMessageLen] = useState(0);
  const [orderShowing, setOrderShowing] = useState({});
  const [addingproduct, setAddingProduct] = useState(false);
  const [editingproduct, seteditingProduct] = useState(false);
  const [dollarRate, setDollarRate] = useState(null);
  const [newRate, setNewRate] = useState(0);

  // console.log(orderShowing);
  const navigate = useNavigate();
  const handleShowOrder = () => {
    setShowOrder(true);
  };
  const handleCloseOrder = () => {
    setShowOrder(false);
  };

  function filterStatus() {
    if (status?.toUpperCase() === "SPAM") {
      let newstatus = originalOrders.filter((eachorder) => {
        return eachorder.spam === true;
      });

      setOrders(newstatus || null);
    } else if (status?.toUpperCase() === "NOTSPAM") {
      let newstatus = originalOrders.filter((eachorder) => {
        return eachorder.spam === false;
      });

      setOrders(newstatus || null);
    } else if (status?.toUpperCase() === "DELIVERED") {
      let newstatus = originalOrders.filter((eachorder) => {
        return eachorder.delivered === true;
      });

      setOrders(newstatus || null);
    } else if (status?.toUpperCase() === "ALL") {
      setOrders(originalOrders);
    } else if (status?.toUpperCase() === "NOTDELIVERED") {
      let newstatus = originalOrders.filter((eachorder) => {
        return eachorder.delivered === false;
      });

      setOrders(newstatus || null);
    }
  }

  const getCartItems = () => {
    const allcart = localStorage.getItem("cart");

    if (allcart) {
      const parsed = JSON.parse(allcart);
      setCartItems(parsed);
    }
  };
  const handleClose = () => {
    setUpdatingContent(true);
    setShow(false);
  };
  const handleCloseSize = () => {
    setShowSize(false);
  };
  const handleCloseIntro = () => {
    setshowIntro(false);
  };
  const handleCloseDescription = () => {
    setshowDescription(false);
  };
  const handleCloseImage = () => {
    setshowImage(false);
  };
  useEffect(() => {
    console.log(sizes);
  }, [sizes]);

  const handleFileChange = (e, index) => {
    // console.log("red");
    const selectedImage = e.target.files[0];
    // console.log(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const exists = images.find((item) => {
          return item?.id === index;
        });

        if (exists) {
          console.log("does");
          const filtered = images.filter((item) => {
            return item.id !== index;
          });
          setImages([...filtered, { id: index, image: e.target.result }]);
        } else {
          console.log("Doesn't");
          images.push({ id: index, image: e.target.result });
        }
      };
      reader.readAsDataURL(selectedImage);
    }
    console.log(images);
  };
  const handleNameChange = (e, index) => {
    console.log(index, e.target.value);
    setSizes((prevSizes) => {
      const indexToUpdate = prevSizes.findIndex((item) => item?.id === index);

      if (indexToUpdate !== -1) {
        console.log("exists");
        const updatedItem = {
          ...prevSizes[indexToUpdate],
          name: e.target.value,
        };
        const updatedSizes = [
          ...prevSizes.slice(0, indexToUpdate),
          updatedItem,
          ...prevSizes.slice(indexToUpdate + 1),
        ];
        return updatedSizes;
      } else {
        console.log("does not exist");
        // const newId = Math.max(...prevSizes.map((item) => item.id), -1) + 1;
        const newId = index;
        return [
          ...prevSizes,
          {
            id: newId,
            name: e.target.value,
            width: 0,
            height: 0,
            price: 0,
            unit: "ft",
          },
        ];
      }
    });
  };
  const handleWidthChange = (e, index) => {
    setSizes((prevSizes) => {
      const indexToUpdate = prevSizes.findIndex((item) => item?.id === index);

      if (indexToUpdate !== -1) {
        let width = 0;
        if (e.target.value !== "") {
          width = e.target.value;
        }

        const updatedItem = {
          ...prevSizes[indexToUpdate],
          width: width,
        };
        const updatedSizes = [
          ...prevSizes.slice(0, indexToUpdate),
          updatedItem,
          ...prevSizes.slice(indexToUpdate + 1),
        ];
        return updatedSizes;
      } else {
        let width = 0;
        if (e.target.value !== "") {
          width = e.target.value;
        }

        const newId = index;

        return [
          ...prevSizes,
          {
            id: newId,
            name: "",
            height: 0,
            price: 0,
            unit: "ft",
            width: width,
          },
        ];
      }
    });
  };
  const handleHeightChange = (e, index) => {
    console.log(e.target.value);
    setSizes((prevSizes) => {
      const indexToUpdate = prevSizes.findIndex((item) => item?.id === index);

      if (indexToUpdate !== -1) {
        let height = 0;
        if (e.target.value !== "") {
          height = e.target.value;
        }
        const updatedItem = {
          ...prevSizes[indexToUpdate],
          height: height,
        };
        const updatedSizes = [
          ...prevSizes.slice(0, indexToUpdate),
          updatedItem,
          ...prevSizes.slice(indexToUpdate + 1),
        ];
        return updatedSizes;
      } else {
        let height = 0;
        if (e.target.value !== "") {
          height = e.target.value;
        }
        // console.log("does not exist");
        const newId = index;

        return [
          ...prevSizes,
          {
            id: newId,
            name: "",
            width: 0,
            price: 0,
            unit: "ft",
            height: height,
          },
        ];
      }
    });
  };
  const handlePriceChange = (e, index) => {
    setSizes((prevSizes) => {
      const indexToUpdate = prevSizes.findIndex((item) => item?.id === index);

      if (indexToUpdate !== -1) {
        console.log("exists");
        const updatedItem = {
          ...prevSizes[indexToUpdate],
          price: parseInt(e.target.value),
        };
        const updatedSizes = [
          ...prevSizes.slice(0, indexToUpdate),
          updatedItem,
          ...prevSizes.slice(indexToUpdate + 1),
        ];
        return updatedSizes;
      } else {
        console.log("does not exist");
        const newId = index;

        return [
          ...prevSizes,
          {
            id: newId,
            name: "",
            width: 0,
            height: 0,
            unit: "ft",
            price: parseInt(e.target.value),
          },
        ];
      }
    });
  };
  const handleUnitChange = (e, index) => {
    setSizes((prevSizes) => {
      const indexToUpdate = prevSizes.findIndex((item) => item?.id === index);

      if (indexToUpdate !== -1) {
        console.log("exists");
        const updatedItem = {
          ...prevSizes[indexToUpdate],
          unit: e.target.value,
        };
        const updatedSizes = [
          ...prevSizes.slice(0, indexToUpdate),
          updatedItem,
          ...prevSizes.slice(indexToUpdate + 1),
        ];
        return updatedSizes;
      } else {
        console.log("does not exist");
        const newId = index;
        return [
          ...prevSizes,
          {
            id: newId,
            name: "",
            width: 0,
            height: 0,
            price: 0,
            unit: e.target.value,
          },
        ];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      setAddingProduct(true);
      if (images.length < 1) {
        alert("Product image required");
        throw new Error("");
      }
      const data = await axios.post(
        "http://localhost:3000/api/addproduct",

        {
          name: name,
          category: category,
          popular: popular,
          images: images.map((item) => {
            return item.image;
          }),
          intro: intro,
          description: description,
          sizes: sizes.map((item) => {
            return {
              name: item.name,
              width: item.width,
              height: item.height,
              price: item.price,
              unit: item.unit,
            };
          }),
        }
      );
      getAllProducts();
      alert("Product added successfully");
      setTabActive("products");
      console.log(data);
      setAddingProduct(false);
    } catch (error) {
      setAddingProduct(false);
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getproducts");
      console.log(response?.data?.data);
      setAllProducts(response?.data?.data);
      setFilteredProducts(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const addDollarRate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/adddollarrate",
        {
          newRate: newRate,
        }
      );

      alert("Done Successfully");
      setNewRate("");
      setLoading(false);
      getDollarRate();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleImageDelete = async (id, name) => {
    try {
      const productExists = allProducts.find((item) => {
        return item.id === id;
      });

      console.log(displayedImages);

      const filtered = displayedImages.filter((eachImage) => {
        return eachImage !== name;
      });

      // const images = JSON.parse(productExists.images).filter((item) => {
      //   return item !== name;
      // });

      const response = await axios.put(
        "http://localhost:3000/api/deleteimage",
        {
          id,
          images: filtered,
          secureUrl: name,
        }
      );

      setDisplayedImages(filtered);
      getAllProducts();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleProductDelete = async (id, name) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/deleteproduct/${id}`
      );

      getAllProducts();
    } catch (error) {
      console.log(error.message);
    }
  };
  const [addingproductimg, setaddingproductimg] = useState(false);
  const addProductImage = async (id, images) => {
    try {
      console.log("Loading");
      setaddingproductimg(true);
      const response = await axios.put(
        "http://localhost:3000/api/addproductimage",

        {
          id,
          images: images.map((eachImage) => {
            return eachImage.image;
          }),
        }
      );
      console.log("Done");
      // console.log(response.data);

      getAllProducts();

      const getproducts = await axios.get(
        "http://localhost:3000/api/getproducts"
      );

      setTimeout(() => {
        const updatedProduct = getproducts?.data?.data.find((item) => {
          return item.id === id;
        });
        setDisplayedImages(JSON.parse(updatedProduct.images));
      }, 4000);

      setNumImages(0);
      setaddingproductimg(false);
    } catch (error) {
      console.log(error);
      setaddingproductimg(false);
    }
  };
  const updateProduct = async () => {
    try {
      seteditingProduct(true);
      const response = await axios.put("http://localhost:3000/api/updatename", {
        id: editingId,
        name,
        category,
        popular,
        intro,
        description,
        sizes: sizes.map((item) => {
          return {
            name: item.name,
            width: item.width,
            height: item.height,
            price: item.price,
            unit: item.unit,
          };
        }),
      });
      seteditingProduct(false);
      console.log(response);
      getAllProducts();
      handleClose();
    } catch (error) {
      seteditingProduct(false);
      console.log(error);
      console.log(error.message);
    }
  };
  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      if (JSON.parse(userInLocal).email === "admin@axion.com") {
        console.log(JSON.parse(userInLocal).email);
        setUser(JSON.parse(userInLocal));
      } else {
        navigate("/errornfnf");
      }
    } else {
      navigate("/login");
    }
  };
  const handleSizeDelete = (eachSize, index) => {
    // console.log(eachSize, index);
    setSizes((prev) => {
      return prev.filter((eachSize) => {
        if (eachSize.id !== index) {
          return eachSize;
        }
      });
    });
    // const data =
  };
  const filterByCategory = () => {
    if (category.toUpperCase() === "ALL") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((eachproduct) => {
        return eachproduct.category.toUpperCase() === category.toUpperCase();
      });

      setFilteredProducts(filtered);
    }
  };
  const getAllOrders = async () => {
    try {
      const newData = await axios.get(`http://localhost:3000/api/getallorders`);
      console.log(newData);
      setOrders(newData?.data?.data || null);
      setoriginalOrders(newData?.data?.data || null);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const handleDelivered = async (id, newStatus) => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.post(
        `http://localhost:3000/api/changedelivered`,
        {
          orderId: id,
          newStatus,
        }
      );
      getAllOrders();
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const handleSpam = async (id, newStatus) => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.post(`http://localhost:3000/api/changespam`, {
        orderId: id,
        newStatus,
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getAllUsersLen = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(`http://localhost:3000/api/getallusers`);
      setAllusers(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getMessages = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(`http://localhost:3000/api/getmessages`);
      setMessages(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getAllProductsLen = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(
        `http://localhost:3000/api/getallproducts`
      );
      setAllProductsLen(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getAllOrdersLen = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(
        `http://localhost:3000/api/getallorderslen`
      );
      setAllOrders(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getPendingOrders = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(
        `http://localhost:3000/api/getpendingorders`
      );
      setPendingOrders(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getMessageslen = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(
        `http://localhost:3000/api/getallMessageslen`
      );
      setMessageLen(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };
  const getSettledOrders = async () => {
    // console.log(id, newStatus);
    try {
      const newData = await axios.get(
        `http://localhost:3000/api/getsettledorders`
      );
      setSettledOrders(newData.data);
    } catch (error) {
      console.log(error);
      // alert(error.message);
    }
  };

  useEffect(() => {
    filterByCategory();
  }, [category]);
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
    getAllUsersLen();
    getUser();
    getAllProductsLen();
    getAllOrdersLen();
    getPendingOrders();
    getSettledOrders();
    getAllOrders();
    filterByCategory();
    getMessages();
    getMessageslen();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getAllProducts();
    getDollarRate();
  }, []);
  useEffect(() => {
    filterStatus();
  }, [status]);

  return (
    user?.email === "admin@axion.com" && (
      <div className="admin custDialog">
        <button
          className=" bg-dark rounded px-3 py-1 text-white "
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
          }}
        >
          Back to top
        </button>
        {displaying === "main" && (
          <div>
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
                              <a href="/contact">Contact us</a>
                            </li>
                          </ul>
                        </div>
                      </nav>
                      {/* Main Menu End*/}
                    </div>
                    {/* Options Box */}
                    <div className="options-box d-flex align-items-center">
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

            <div
              className="admin-container"
              style={{
                marginTop: "120px",
              }}
            >
              <div className="admin-left px-3 pt-5 text-center">
                <div
                  onClick={() => {
                    setTabActive("dashboard");
                    setNumImages(0);
                  }}
                  className={`link ${tabActive === "dashboard" && "active"}`}
                >
                  Dashboard
                </div>
                <div
                  onClick={() => {
                    setTabActive("products");
                    getAllProducts();
                    setNumImages(0);
                  }}
                  className={`link ${tabActive === "products" && "active"}`}
                >
                  Products
                </div>
                <div
                  onClick={() => {
                    setTabActive("add");
                    setCategory("MATTRESS");
                    setNumImages(1);
                  }}
                  className={`link ${tabActive === "add" && "active"}`}
                >
                  Add product
                </div>
                <div
                  onClick={() => {
                    setTabActive("orders");
                    setNumImages(0);
                  }}
                  className={`link ${tabActive === "orders" && "active"}`}
                >
                  Orders
                </div>
                <div
                  onClick={() => {
                    setTabActive("messages");
                    setNumImages(0);
                  }}
                  className={`link ${tabActive === "messages" && "active"}`}
                >
                  Messages
                </div>
                <div
                  onClick={() => {
                    setTabActive("dollarrate");
                    setNumImages(0);
                  }}
                  className={`link ${tabActive === "dollarrate" && "active"}`}
                >
                  Set Dollar Rate
                </div>
              </div>
              <div className="admin-right">
                {tabActive === "dashboard" && (
                  <div>
                    <div
                      className="row "
                      style={{
                        rowGap: "20px",
                      }}
                    >
                      <div className="col-md-4 ">
                        <div className="dashboard-card py-3 px-2">
                          <i class="bi bi-person-check"></i>
                          <h4 className="fs-6">Registered Users</h4>
                          <h4>{allUsers} </h4>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="dashboard-card py-3 px-2">
                          <i class="bi bi-person-check"></i>
                          <h4 className="fs-6">Total Products</h4>
                          <h4>{allProductsLen} </h4>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="dashboard-card py-3 px-2">
                          <i class="bi bi-person-check"></i>
                          <h4 className="fs-6">Total Messages</h4>
                          <h4>{messageLen} </h4>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="dashboard-card py-3 px-2">
                          <i class="bi bi-person-check"></i>
                          <h4 className="fs-6">Total Orders</h4>
                          <h4> {allOrders}</h4>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="dashboard-card py-3 px-2">
                          <i class="bi bi-person-check"></i>
                          <h4 className="fs-6">Pending Orders</h4>
                          <h4>{pendingOrders} </h4>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="dashboard-card py-3 px-2">
                          <i class="bi bi-person-check"></i>
                          <h4 className="fs-6">Settled Orders</h4>
                          <h4>{settledOrders} </h4>
                        </div>
                      </div>
                    </div>

                    <h4 className="mt-5 fs-5">Quick Links</h4>

                    <div className="mb-4">
                      <button
                        className="mt-4 quick btn btn-danger"
                        onClick={() => {
                          setTabActive("products");
                        }}
                      >
                        View Products
                      </button>

                      <button
                        className="mt-4 quick btn btn-danger ms-2"
                        onClick={() => {
                          setTabActive("add");
                        }}
                      >
                        Add Product
                      </button>

                      <button
                        className="mt-4 quick btn btn-danger ms-2"
                        onClick={() => {
                          setTabActive("orders");
                        }}
                      >
                        View Orders
                      </button>
                      <button
                        className="mt-4 quick btn btn-danger ms-2"
                        onClick={() => {
                          setTabActive("messages");
                        }}
                      >
                        View Messages
                      </button>
                    </div>
                  </div>
                )}
                {tabActive === "products" && (
                  <div>
                    <div>
                      <div className="d-flex justify-content-between mb-8">
                        <h1 className="fs-5"> All Products</h1>
                        <div class="myselect">
                          <select
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                          >
                            <option value="" selected disabled>
                              Select a category
                            </option>
                            <option value="all">All</option>
                            <option value="mattress">Mattress</option>
                            <option value="topper">Topper</option>
                            <option value="pillow">Pillow</option>
                            <option value="bedbase">Bed Base</option>
                            <option value="protector">Protector</option>
                            <option value="cushion">Cushion</option>
                            <option value="Mats">Mats</option>
                            <option value="Compression">Compression</option>
                            <option value="Travel">Travel</option>
                          </select>
                          <div class="custom-arrow"></div>
                        </div>
                      </div>
                      {filteredProducts.length === 0 ? (
                        <div className="text-center mt-4 !text-2xl">
                          The table is empty
                        </div>
                      ) : (
                        <div
                          style={{
                            overflowX: "scroll",
                          }}
                        >
                          <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            style={{
                              borderColor: "black",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    padding: "0 15px",
                                  }}
                                >
                                  Id
                                </th>
                                <th
                                  style={{
                                    padding: "0 40px",
                                  }}
                                >
                                  Name
                                </th>
                                <th
                                  style={{
                                    padding: "0 100px",
                                  }}
                                >
                                  Category
                                </th>
                                <th
                                  style={{
                                    padding: "0 100px",
                                  }}
                                >
                                  Popular
                                </th>
                                <th
                                  style={{
                                    padding: "0 100px",
                                  }}
                                >
                                  Introduction
                                </th>
                                <th
                                  className=""
                                  style={{
                                    padding: "0 100px",
                                  }}
                                >
                                  Description
                                </th>
                                <th>Sizes</th>
                                <th className="">Images</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredProducts.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.popular}</td>
                                    <td
                                      style={{
                                        textAlign: "start",
                                        paddingBottom: "10px",
                                      }}
                                    >
                                      {item.intro
                                        .split(" ")
                                        .slice(0, 30)
                                        .join(" ")}
                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => {
                                            setcurrentProductIntro(item.intro);
                                            setCurrentProductName(item.name);
                                            setshowIntro(true);
                                          }}
                                          className=" mt-2 btn btn-danger btn-sm"
                                        >
                                          View All
                                        </button>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "start",
                                        paddingBottom: "10px",
                                      }}
                                    >
                                      {item.description
                                        .split(" ")
                                        .slice(0, 30)
                                        .join(" ")}{" "}
                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => {
                                            setcurrentProductDescription(
                                              item.description
                                            );
                                            setCurrentProductName(item.name);
                                            setshowDescription(true);
                                          }}
                                          className="btn mt-2 btn-danger btn-sm"
                                        >
                                          View All
                                        </button>
                                      </div>
                                    </td>
                                    <td>
                                      {JSON.parse(item?.sizes)
                                        ?.slice(0, 1)
                                        ?.map((eachsize) => {
                                          return (
                                            <div>
                                              <div className="eachsize">
                                                <p>
                                                  Name:{" "}
                                                  <span>{eachsize.name}</span>
                                                </p>
                                                <p>
                                                  Width{" "}
                                                  <span>{eachsize.width}</span>
                                                </p>
                                                <p>
                                                  height:{" "}
                                                  <span>{eachsize.height}</span>
                                                </p>
                                                <p>
                                                  Price:{" "}
                                                  <span>
                                                    $
                                                    {dollarRate &&
                                                      Math.round(
                                                        eachsize.price /
                                                          Number(dollarRate)
                                                      )}
                                                  </span>
                                                </p>
                                                <p>
                                                  Unit:{" "}
                                                  <span>{eachsize.unit}</span>
                                                </p>
                                              </div>
                                              <div className="d-flex ms-2">
                                                <button
                                                  className="btn btn-sm btn-danger mb-2"
                                                  onClick={() => {
                                                    setShowSize(true);
                                                    setCurrentProductName(
                                                      eachsize.name
                                                    );
                                                    setAllDisplayingSizes(
                                                      JSON.parse(item?.sizes)
                                                    );
                                                  }}
                                                >
                                                  View all
                                                </button>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </td>
                                    <td
                                      className=""
                                      style={{
                                        width: "200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "240px",
                                          alignItems: "center",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {JSON.parse(item?.images).map(
                                          (eachImage, index) => (
                                            <i
                                              key={index}
                                              src={eachImage}
                                              alt=""
                                              style={{
                                                width: "40px",
                                                height: "40px",
                                                marginRight: "20px",
                                              }}
                                            >
                                              <img
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className=""
                                                src={eachImage}
                                                alt=""
                                                onClick={() => {
                                                  setcurrentProductImage(
                                                    eachImage
                                                  );
                                                  setCurrentProductName(
                                                    item.name
                                                  );
                                                  setshowImage(true);
                                                }}
                                              />
                                            </i>
                                          )
                                        )}
                                      </div>
                                    </td>

                                    <td>
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => {
                                          setName(item.name);
                                          setCategory(item.category);

                                          setPopular(item.popular);
                                          setIntro(item.intro);
                                          setDescription(item.description);
                                          setSizes(
                                            JSON.parse(item.sizes).map(
                                              (item, index) => {
                                                return { id: index, ...item };
                                              }
                                            )
                                          );

                                          setNumberOfExistingSizes(
                                            Number(
                                              JSON.parse(item.sizes).length
                                            )
                                          );
                                          setDisplayedImages(
                                            JSON.parse(item.images)
                                          );
                                          setEditingId(item.id);
                                          setnumSizes(0);
                                          setNumImages(0);
                                          setShow(true);
                                          console.log(item);
                                        }}
                                      >
                                        Edit
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                          handleProductDelete(item.id);
                                        }}
                                      >
                                        {" "}
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {tabActive === "add" && (
                  <div>
                    <div>
                      <h3 className="fs-5 mb-2">Enter Product Information</h3>

                      <form
                        // enctype="multipart/form-data"
                        action=""
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div>
                          <button
                            className="fs-6 px-4 btn btn-sm btn-primary mb-2"
                            onClick={() => {
                              setNumImages((prev) => {
                                return prev + 1;
                              });
                            }}
                          >
                            + Add Image
                          </button>
                        </div>
                        {[...Array(numImages)].map((_, index) => (
                          <label key={index}>
                            Image {index + 1}:
                            <input
                              className="myinput mt-3 ms-2"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                handleFileChange(e, index);
                              }}
                            />
                          </label>
                        ))}
                        <div className="row">
                          <div className="flex flex-column mt-3 col-md-6">
                            <label htmlFor="" className="fs-6 font-bold mb-2">
                              Name
                            </label>
                            <input
                              type="text"
                              style={{
                                marginTop: "-50px",
                              }}
                              placeholder="Enter your name"
                              value={name}
                              className="border myinput px-3 py-2 mt-1 w-100 rounded"
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex flex-column mt-3 col-md-6">
                            <label htmlFor="" className="fs-6 font-bold mb-2">
                              Category
                            </label>
                            <select
                              name=""
                              id=""
                              className="w-100 mt-1 py-2 rounded"
                              value={category}
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.145)",
                              }}
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                            >
                              <option value="Mattress">Mattress</option>
                              <option value="Topper">Topper</option>
                              <option value="Bedbase">Bedbase</option>
                              <option value="Cushion">Cushion</option>
                              <option value="Pillow">Pillow</option>
                              <option value="Protector">Protector</option>
                              <option value="Mats">Mats</option>
                              <option value="Compression">Compression</option>
                              <option value="Travel">Travel</option>
                            </select>
                          </div>
                          <div className="flex flex-column mt-3 col-md-6">
                            <label htmlFor="" className="fs-6 font-bold mb-2">
                              Popular
                            </label>
                            <select
                              name=""
                              id=""
                              value={popular}
                              className="border w-100  py-2 rounded"
                              onChange={(e) => {
                                setPopular(e.target.value);
                              }}
                            >
                              <option value={false}>False</option>
                              <option value={true}>True</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-column mt-3 ">
                          <label htmlFor="" className="fs-6 font-bold mb-2">
                            Introduction
                          </label>
                          <textarea
                            name=""
                            id=""
                            cols="10"
                            rows="6"
                            placeholder="Enter Introduction"
                            className="w-100 py-2 px-3"
                            style={{
                              border: "1px solid  rgba(0, 0, 0, 0.145)",
                            }}
                            value={intro}
                            onChange={(e) => {
                              setIntro(e.target.value);
                            }}
                          ></textarea>
                        </div>
                        <div className="flex flex-column mt-3 ">
                          <label htmlFor="" className="fs-6 font-bold mb-2 ">
                            Description
                          </label>
                          <textarea
                            name=""
                            id=""
                            cols="10"
                            rows="7"
                            style={{
                              border: "1px solid rgba(0, 0, 0, 0.145)",
                            }}
                            className=" mt-3 w-100 px-3 py-2"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          ></textarea>
                        </div>

                        <br />

                        {numSizes > 1 && <h4 className="">Sizes</h4>}
                        {[...Array(numSizes)].map((_, index) => (
                          <label
                            key={index}
                            className="d-flex flex-wrap mb-4"
                            style={{
                              rowGap: "16px",
                            }}
                          >
                            <h6 className="fs-6 "> Size {index + 1}</h6>
                            <div className="d-flex flex-column ms-3">
                              <label
                                htmlFor=""
                                className="fs-5 font-bold mb-2 fs-6"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="border px-2 py-1 rounded"
                                placeholder="Name"
                                onChange={(e) => {
                                  handleNameChange(e, index);
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column ms-3">
                              <label
                                htmlFor=""
                                className="fs-5 font-bold mb-2 fs-6"
                              >
                                Width
                              </label>
                              <input
                                type="text"
                                // defaultValue={0}
                                className="border  px-2 py-1 rounded"
                                placeholder="Width"
                                onChange={(e) => {
                                  handleWidthChange(e, index);
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column ms-3">
                              <label
                                htmlFor=""
                                className="fs-5 font-bold mb-2 fs-6 "
                              >
                                Height
                              </label>

                              <input
                                type="text"
                                className="border  px-2 py-1 rounded"
                                placeholder="Height"
                                onChange={(e) => {
                                  handleHeightChange(e, index);
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column ms-3">
                              <label
                                htmlFor=""
                                className="fs-5 font-bold mb-2 fs-6"
                              >
                                Price
                              </label>

                              <input
                                type="text"
                                className="border  px-2 py-1 rounded"
                                placeholder="Price"
                                onChange={(e) => {
                                  handlePriceChange(e, index);
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column ms-3">
                              <label
                                htmlFor=""
                                className="fs-5 font-bold mb-2 fs-6"
                              >
                                Unit
                              </label>

                              <select
                                name=""
                                id=""
                                onChange={(e) => {
                                  handleUnitChange(e, index);
                                }}
                                className="border px-2 py-1 rounded"
                              >
                                <option value="ft">FT</option>
                                <option value="inch">INCH</option>
                                <option value="sm">CM</option>
                              </select>
                            </div>
                          </label>
                        ))}

                        <button
                          className="fs-6 px-2 text-sm btn btn-sm btn-primary mb-4 "
                          onClick={() => {
                            setnumSizes((prev) => {
                              return prev + 1;
                            });
                          }}
                        >
                          + Add Size
                        </button>
                        <br />

                        {addingproduct ? (
                          <button
                            onClick={() => {
                              handleSubmit();
                            }}
                            style={{
                              backgroundColor: "grey",
                            }}
                            className="mt-5 py-2 px-5  rounded text-white"
                          >
                            Loading..
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleSubmit();
                            }}
                            className="mt-5 py-2 px-5 bg-primary rounded text-white"
                          >
                            Add Product
                          </button>
                        )}
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </form>
                    </div>
                  </div>
                )}
                {tabActive === "orders" && (
                  <div>
                    <div className="d-flex justify-content-between">
                      <h1 className="fs-4">Orders</h1>
                      <div class="myselect">
                        <select
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <option value="" selected disabled>
                            Select status
                          </option>
                          <option value="all">All</option>
                          <option value="delivered">Delivered</option>
                          <option value="notdelivered">Not Delivered</option>
                        </select>
                        <div class="custom-arrow"></div>
                      </div>
                    </div>

                    {orders === 0 ? (
                      <h4 className="text-center">You have no orders yet</h4>
                    ) : (
                      <div
                        style={{
                          margin: "130px 0",
                          overflowX: "scroll",
                        }}
                      >
                        <Table
                          striped
                          bordered
                          hover
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Date</th>
                              <th className="">Products</th>
                              <th>Status</th>
                              <th>Method</th>
                              <th>Spam</th>
                              <th>Total</th>
                              <th
                                style={{
                                  width: "110px",
                                }}
                              ></th>
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
                                    {JSON.parse(eachOrder?.products)?.map(
                                      (eachproduct) => {
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
                                      }
                                    )}
                                  </td>
                                  <td>
                                    {eachOrder?.delivered
                                      ? "Delivered"
                                      : "Not Delivered"}

                                    {eachOrder?.delivered ? (
                                      <button
                                        className="btn btn-danger btn-sm mx-2 "
                                        style={{
                                          fontSize: "8px",
                                        }}
                                        onClick={() => {
                                          handleDelivered(eachOrder?.id, false);
                                        }}
                                      >
                                        Not Delivered
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-danger btn-sm mx-2"
                                        style={{
                                          fontSize: "8px",
                                        }}
                                        onClick={() => {
                                          handleDelivered(eachOrder?.id, true);
                                        }}
                                      >
                                        Delivered
                                      </button>
                                    )}
                                  </td>
                                  <td>
                                    {eachOrder?.method || "Not Specified"}
                                  </td>

                                  <td>
                                    {eachOrder?.spam ? "Spam" : "Not Spam"}

                                    {eachOrder?.spam ? (
                                      <button
                                        className="btn btn-danger btn-sm mx-2 "
                                        style={{
                                          fontSize: "8px",
                                        }}
                                        onClick={() => {
                                          handleSpam(eachOrder?.id, false);
                                        }}
                                      >
                                        Not Spam
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-danger btn-sm mx-2"
                                        style={{
                                          fontSize: "8px",
                                        }}
                                        onClick={() => {
                                          handleSpam(eachOrder?.id, true);
                                        }}
                                      >
                                        Spam
                                      </button>
                                    )}
                                  </td>
                                  <td>
                                    $
                                    {Math.round(
                                      eachOrder?.price / Number(dollarRate)
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      onClick={(e) => {
                                        handleShowOrder();
                                        setOrderShowing(eachOrder);
                                      }}
                                      className="btn btn-primary btn-sm"
                                    >
                                      View details
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}
                {tabActive === "messages" && (
                  <div>
                    <div className="mt-3 fs-4">Messages</div>

                    <div className="my-4 pb-5">
                      {messages.map((eachmessage, index) => {
                        return (
                          <div
                            className="shadow-lg px-3 mb-3 py-3"
                            style={{
                              borderRadius: "15px ",
                            }}
                          >
                            <h6 className="fs-6 mb-3 fw-bold text-danger">
                              ({index + 1})
                            </h6>
                            <h5 className="fs-6">
                              Email: {eachmessage?.email}
                            </h5>
                            <h5 className="fs-6">name: {eachmessage?.name}</h5>
                            <h5 className="fs-6">
                              Phone number: {eachmessage?.phonenumber}
                            </h5>
                            <h5 className="fs-6">
                              Message: {eachmessage?.message}
                            </h5>
                            {/* 
                    <div
                      className=" mt-3"
                      style={{
                        height: "1px",
                        width: "100%",
                        backgroundColor: "black",
                      }}
                    ></div> */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {tabActive === "dollarrate" && (
                  <div>
                    <div className="mt-3 fs-4">Set Dollar Rate</div>
                    <h5 className="fs-6 mt-2">
                      Your Current dollar rate is ₦{dollarRate} to ${1}
                    </h5>
                    <div
                      class="mb-3"
                      style={{
                        width: "300px",
                      }}
                    >
                      <input
                        type="number"
                        value={newRate}
                        class="form-control mt-4 shadow text-black"
                        id="exampleFormControlInput1"
                        placeholder="New naira value"
                        onChange={(e) => {
                          setNewRate(e.target.value);
                        }}
                      />

                      {loading ? (
                        <button type="button" class="btn btn-primary mt-3">
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-primary mt-3"
                          onClick={() => {
                            addDollarRate();
                          }}
                        >
                          Save new dollar rate
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <div className="text-dark">Edit Product</div>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3 px-5 mb-4 d-flex justify-content-center ">
              <button
                className={`py-2 px-3 rounded ${
                  updatingContent && "bg-black text-white"
                }`}
                onClick={() => {
                  setUpdatingContent(true);
                }}
              >
                Update Content
              </button>
              <button
                className={`ms-3 py-2 px-3 rounded ${
                  !updatingContent && "bg-black text-white"
                }`}
                onClick={() => {
                  setUpdatingContent(false);
                }}
              >
                Update Images
              </button>
            </div>

            <div
              className="mb-4"
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.282)",
              }}
            ></div>
            {updatingContent && (
              <div>
                <div
                  className="row "
                  style={{
                    rowGap: "15px",
                  }}
                >
                  <div className="d-flex flex-column col-md-6">
                    <label
                      htmlFor=""
                      className="mb-2"
                      style={{
                        color: "black",
                      }}
                    >
                      Product Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      className="border rounded py-2 px-2"
                      style={{
                        // width: "50%",
                        border: "2px solid black",
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column col-md-6">
                    <label
                      htmlFor=""
                      className="mb-2"
                      style={{
                        color: "black",
                      }}
                    >
                      Product Category
                    </label>

                    <select
                      name=""
                      id=""
                      value={category}
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.145)",
                        padding: "6px 3px",
                        // width: "50%",
                      }}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      className="rounded"
                    >
                      <option value="Mattress">Mattress</option>
                      <option value="Topper">Topper</option>
                      <option value="Bedbase">Bedbase</option>
                      <option value="Cushion">Cushion</option>
                      <option value="Pillow">Pillow</option>
                      <option value="Protector">Protector</option>
                      <option value="Mats">Mats</option>
                      <option value="Compression">Compression</option>
                      <option value="Travel">Travel</option>
                    </select>
                  </div>

                  <div className="d-flex flex-column col-md-6">
                    <label
                      htmlFor=""
                      className="mb-2"
                      style={{
                        color: "black",
                      }}
                    >
                      Popular{" "}
                    </label>

                    <select
                      name=""
                      id=""
                      value={popular}
                      className="border py-2 rounded"
                      onChange={(e) => {
                        setPopular(e.target.value);
                      }}
                    >
                      <option value={false}>False</option>
                      <option value={true}>True</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-column mt-4">
                  <label
                    htmlFor=""
                    className="mb-2"
                    style={{
                      color: "black",
                    }}
                  >
                    Introduction
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="10"
                    rows="10"
                    placeholder="intro"
                    className="px-3 py-2"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.145)",
                    }}
                    value={intro}
                    onChange={(e) => {
                      setIntro(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex flex-column mt-4">
                  <label
                    htmlFor=""
                    className="mb-2"
                    style={{
                      color: "black",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="10"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.145)",
                    }}
                    className="px-3 py-2"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>

                <br />
                <h4 className="mb-3">Sizes</h4>

                {sizes
                  .slice(0, numberOfExistingSizes)
                  ?.map((eachsize, index) => {
                    return (
                      <label
                        key={index}
                        className="d-flex flex-wrap mb-4"
                        style={{
                          rowGap: "16px",
                        }}
                      >
                        <h5 className="font-bold fs-6">Size {index + 1}</h5>

                        <div className="d-flex flex-column  ms-3">
                          <label htmlFor="">Name</label>
                          <input
                            type="text"
                            className="border py-1 px-1 rounded"
                            placeholder="name"
                            value={eachsize.name}
                            onChange={(e) => {
                              handleNameChange(e, index);
                            }}
                          />
                        </div>
                        <div className="d-flex flex-column  ms-3">
                          <label htmlFor="">Width</label>
                          <input
                            type="number"
                            className="border py-1 px-1 rounded"
                            placeholder="Width"
                            value={eachsize.width}
                            onChange={(e) => {
                              handleWidthChange(e, index);
                            }}
                          />
                        </div>
                        <div className="d-flex flex-column  ms-3">
                          <label htmlFor="">Height</label>

                          <input
                            type="number"
                            className="border py-1 px-1 rounded"
                            placeholder="Height"
                            value={eachsize.height}
                            onChange={(e) => {
                              handleHeightChange(e, index);
                            }}
                          />
                        </div>
                        <div className="d-flex flex-column  ms-3">
                          <label htmlFor="">Price</label>

                          <input
                            type="number"
                            className="border py-1 px-1 rounded"
                            placeholder="Price"
                            value={eachsize.price}
                            onChange={(e) => {
                              handlePriceChange(e, index);
                            }}
                          />
                        </div>
                        <div className="d-flex flex-column  ms-3">
                          <label htmlFor="">Unit</label>

                          <select
                            name=""
                            id=""
                            value={eachsize.unit}
                            onChange={(e) => {
                              handleUnitChange(e, index);
                            }}
                            className="border py-1 px-1 rounded"
                          >
                            <option value="ft">FT</option>
                            <option value="inch">INCH</option>
                            <option value="sm">CM</option>
                          </select>
                        </div>
                        <button
                          className="btn btn-danger ms-3 my-3"
                          onClick={() => {
                            handleSizeDelete(eachsize, index);
                          }}
                        >
                          Delete
                        </button>

                        <div
                          className="my-3"
                          style={{
                            backgroundColor: "grey",
                            height: "1px",
                            width: "100%",
                          }}
                        ></div>
                      </label>
                    );
                  })}

                {[...Array(numSizes)].map((_, index) => (
                  <div>
                    <label
                      key={index}
                      className="d-flex flex-wrap mb-2"
                      style={{
                        rowGap: "16px",
                      }}
                    >
                      <h5 className="font-bold fs-6">
                        Size {index + 1 + numberOfExistingSizes}
                      </h5>

                      <div className="d-flex flex-column ms-2">
                        <label htmlFor="" className="">
                          Name
                        </label>
                        <input
                          type="text"
                          className="border py-1 px-1 rounded"
                          placeholder="name"
                          onChange={(e) => {
                            handleNameChange(e, index + numberOfExistingSizes);
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column ms-2">
                        <label htmlFor="" className="">
                          Width
                        </label>
                        <input
                          type="text"
                          className="border py-1 px-1 rounded"
                          placeholder="Width"
                          onChange={(e) => {
                            handleWidthChange(e, index + numberOfExistingSizes);
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column ms-2">
                        <label htmlFor="" className="">
                          Height
                        </label>

                        <input
                          type="text"
                          className="border py-1 px-1 rounded"
                          placeholder="Height"
                          onChange={(e) => {
                            handleHeightChange(
                              e,
                              index + numberOfExistingSizes
                            );
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column ms-2">
                        <label htmlFor="" className="">
                          Price
                        </label>

                        <input
                          type="text"
                          className="border py-1 px-1 rounded"
                          placeholder="Price"
                          onChange={(e) => {
                            handlePriceChange(e, index + numberOfExistingSizes);
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column ms-2">
                        <label htmlFor="" className="">
                          Unit
                        </label>

                        <select
                          name=""
                          id=""
                          className="border py-1 px-1 rounded"
                          onChange={(e) => {
                            handleUnitChange(e, index + numberOfExistingSizes);
                          }}
                        >
                          <option value="ft">FT</option>
                          <option value="inch">INCH</option>
                          <option value="sm">CM</option>
                        </select>
                      </div>

                      <button className="btn btn-danger">Delete</button>
                    </label>

                    <div
                      className="mt-5 mb-5"
                      style={{
                        backgroundColor: "grey",
                        height: "1px",
                        width: "100%",
                      }}
                    ></div>
                  </div>
                ))}

                <button
                  className="px-3 py-2 btn btn-danger btn-sm rounded"
                  onClick={() => {
                    setnumSizes((prev) => {
                      return prev + 1;
                    });
                  }}
                >
                  Add Size
                </button>
              </div>
            )}

            {!updatingContent && (
              <div className="mb-3">
                <div
                  className="d-flex  flex-wrap"
                  style={{
                    rowGap: "20px",
                  }}
                >
                  {displayedImages.map((item) => {
                    return (
                      <div className="d-flex flex-column me-5">
                        <img
                          src={item}
                          alt=""
                          style={{
                            height: "90px",
                          }}
                        />
                        <button
                          className="mt-3 rounded"
                          style={{
                            backgroundColor: "red",
                            color: "white",
                          }}
                          onClick={() => {
                            handleImageDelete(editingId, item);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </div>
                {[...Array(numImages)].map((_, index) => (
                  <label key={index} className="d-flex">
                    <p
                      className=""
                      style={{
                        paddingTop: "13px",
                        marginRight: "12px",
                      }}
                    >
                      {" "}
                      Image {index + 1}:
                    </p>
                    <input
                      className="mt-3"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileChange(e, index);
                      }}
                    />
                  </label>
                ))}

                <div className="mt-4 d-flex ">
                  <button
                    className="py-1 px-3 rounded mt-2 mb-3"
                    onClick={() => {
                      setNumImages((prev) => {
                        return prev + 1;
                      });
                    }}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    Add Image
                  </button>

                  {numImages > 0 && (
                    <div>
                      {!addingproductimg ? (
                        <button
                          className="py-1 px-3 rounded mt-2 mb-3 ms-3 bg-warning text-white font-bold"
                          onClick={() => {
                            addProductImage(editingId, images);
                          }}
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          className="py-1 px-3 rounded mt-2 mb-3 ms-3 bg-secondary text-white font-bold"
                          onClick={() => {
                            // addProductImage(editingId, images);
                          }}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {editingproduct ? (
              <Button variant="secondary" onClick={() => {}}>
                Loading...
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  updateProduct();
                }}
              >
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal show={showSize} onHide={handleCloseSize}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="text-dark fs-5">{currentProductName} Sizes</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {allDisplayingSizes.map((eachsize) => {
              return (
                <div
                  className="d-flex flex-column w-full"
                  style={{ flexWrap: "wrap" }}
                >
                  <div className="eachsize">
                    <p className="uppercase">
                      Name
                      <span className="!uppercase !leading-3">
                        {eachsize.name}
                      </span>
                    </p>
                    <p>
                      Width <span>{eachsize.width}</span>
                    </p>
                    <p>
                      height <span>{eachsize.height}</span>
                    </p>
                    <p>
                      Price
                      <span>
                        {Math.random(eachsize.price * Number(dollarRate))}
                      </span>
                    </p>
                    <p className="!uppercase">
                      Unit <span>{eachsize.unit}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSize}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showOrder} onHide={handleCloseOrder}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="text-dark">Order details</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pb-5">
              <p className="text-dark">
                Date: {orderShowing?.createdAt?.slice(0, 10)}
              </p>
              <p className="text-dark">Email: {orderShowing?.email}</p>
              <p className="text-dark">
                Phone number: {orderShowing?.phoneNumber}
              </p>
              <p className="text-dark fw-bold">
                {orderShowing?.delivered ? "Delivered" : "Not delivered"}{" "}
              </p>
              <p className="text-dark">State: {orderShowing?.state}</p>
              <p className="text-dark">City: {orderShowing?.country}</p>
              <p className="text-dark">Address: {orderShowing?.address}</p>
              <p className="text-dark">
                Price: ${Math.round(orderShowing?.price * Number(dollarRate))}
              </p>

              <h4 className="mb-4">Products</h4>

              {orderShowing?.products &&
                JSON.parse(orderShowing?.products).map((eachproduct, index) => {
                  return (
                    <div className="mt-2">
                      <span className="text-danger">({index + 1})</span>
                      <p className="text-dark mt-1">
                        Name: {eachproduct?.name}
                      </p>
                      <p
                        className="text-dark "
                        style={{
                          marginTop: "-19px",
                        }}
                      >
                        Category: {eachproduct?.category}
                      </p>
                      <p
                        className="text-dark"
                        style={{
                          marginTop: "-19px",
                        }}
                      >
                        Price: $
                        {Math.round(eachproduct?.price * Number(dollarRate))}
                      </p>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseOrder}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showIntro} onHide={handleCloseIntro}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                color: "black",
              }}
            >
              {currentProductName} Intro
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{currentProductIntro}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseIntro}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDescription} onHide={handleCloseDescription}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                color: "black",
              }}
            >
              {currentProductName} Description
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{currentProductDescription}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDescription}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showImage} onHide={handleCloseImage}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <h6 className="text-black fs-4">
                {currentProductName} Image
              </h6>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <img src={currentProductImage} alt="" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseImage}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Loader></Loader>
      </div>
    )
  );
};

// Remove Image After choosing
// Deleting Size
// Add Loading State
