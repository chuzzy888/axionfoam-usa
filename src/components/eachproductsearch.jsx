import React, { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { Loader } from "./loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EachproductSearch = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [newSize, setNewSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPrice(JSON.parse(item.sizes)[0].price);
    setSize(
      `${JSON.parse(item.sizes)[0].name} ${JSON.parse(item.sizes)[0].width} X ${
        JSON.parse(item.sizes)[0].height
      } ${JSON.parse(item.sizes)[0].unit}`
    );
  }, []);

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
    setSize(newSize);
  }, [newSize]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  useEffect(() => {
    console.log(price);
  }, [price]);

  return (
    <div className="shop-item col-lg-4 col-md-4 col-sm-12">
      <div className="inner-box">
        <div className="image">
          <a>
            <Slider {...settings}>
              {JSON.parse(item.images).map((eachimage) => {
                return (
                  <img
                    src={eachimage}
                    alt=""
                    className="productimage"
                    onClick={() => {
                      navigate(`/products?id=${item.id}`);
                    }}
                  />
                );
              })}
            </Slider>
          </a>
        </div>
        <div
          className="lower-content slate px-2 pb-2 "
          style={{ cursor: "pointer" }}
        >
          <h6
            style={{
              marginTop: "-10px",
              marginBottom: "-20px",
              border: "none",
            }}
          >
            <a
              onClick={() => {
                navigate(`/products?id=${item.id}`);
              }}
            >
              {item.name}
            </a>
          </h6>
          <div
            className="d-flex align-items-center"
            style={{ marginTop: "-10px" }}
          >
            {" "}
            <h4 className="pt-3" style={{ fontSize: "12px", width: "80px" }}>
              Select Size:
            </h4>
            <select
              name=""
              id=""
              className="ms-2 mt-3 productSelect"
              // defaultValue={2 + 2}
              onChange={(e) => {
                setNewSize(e.target.value.split("-")[0]);
                setTimeout(() => {
                  console.log(newSize);
                }, 2000);
                setPrice(e.target.value.split("-")[1]);
              }}
            >
              {JSON.parse(item.sizes).map((eachsize) => {
                return (
                  <option
                    key={eachsize.name}
                    value={`${eachsize.name} ${eachsize.width} X ${eachsize.height} ${eachsize.unit} -${eachsize.price}`}
                    className="myoption text-light"
                  >
                    {eachsize.name} {eachsize.width} X {eachsize.height}{" "}
                    {eachsize.unit}
                    {/* {console.log(item.category)} */}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="lower-box " style={{ marginTop: "-30px" }}>
            {/* Select Size */}
            <div className="select-amount clearfix mb-2 ">
              <div className="select-bo">
                <label
                  htmlFor="price"
                  style={{
                    color: "black",
                    border: "1px solid grey",
                    padding: "7px 7px",
                    fontSize: "14px",
                    marginTop: "40px",
                    borderRadius: "13px",
                  }}
                >
                  ${dollarRate && Math.round(Number(price) / dollarRate)}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader></Loader>
    </div>
  );
};
