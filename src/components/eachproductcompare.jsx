import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export const Eachproductcompare = ({ item }) => {
  // console.log(item);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [newSize, setNewSize] = useState("");
  const navigate = useNavigate();

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
    setPrice(Math.round(JSON.parse(item.sizes)[0].price));
    setSize(
      `${JSON.parse(item.sizes)[0].name} ${JSON.parse(item.sizes)[0].width} X ${
        JSON.parse(item.sizes)[0].height
      } ft`
    );
    getDollarRate();
  }, []);

  useEffect(() => {
    setSize(newSize);
  }, [newSize]);

  console.log(item);

  return (
    <div
      className="shop-item-two "
      style={{
        maxWidth: "400px",
      }}
    >
      <div className="inner-box">
        <div className="image">
          <a>
            <Slider {...settings}>
              {JSON.parse(item?.images)?.map((eachimage) => {
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
        <div className="content" style={{ height: "130px", cursor: "pointer" }}>
          <h6
            onClick={() => {
              navigate(`/products?id=${item.id}`);
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
          <div className="lower-box">
            <div
              className="price myprice"
              onClick={() => {
                navigate(`/products?id=${item.id}`);
              }}
            >
              ${dollarRate && Math.round(Number(price) / dollarRate)}
            </div>
            {/* Select Size */}
            <div
              className="select-amount clearfix"
              onClick={() => {
                navigate(`/products?id=${item.id}`);
              }}
            >
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
          <div className="d-flex align-items-center">
            {" "}
            <h4 className="pt-3" style={{ fontSize: "12px", width: "100px" }}>
              Select Size:
            </h4>
            <select
              name=""
              id=""
              className="ms-2 mt-3 productSelect"
              style={{
                width: "100%",
              }}
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
                    value={`${eachsize.name} ${eachsize.width} X ${eachsize.height} ft -${eachsize?.price}`}
                    className="myoption text-light"
                  >
                    {eachsize.name} {eachsize.width} X {eachsize.height} ft
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
