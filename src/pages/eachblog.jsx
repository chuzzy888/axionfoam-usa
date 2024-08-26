import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export const EachBlog = ({ item }) => {
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

  useEffect(() => {
    setSize(newSize);
  }, [newSize]);

  return (
    <div className="shop-item-two col-lg-3 col-md-6 col-sm-12">
      <div className="inner-box">
        <div className="image">
          <a>
            <img
              src={item.image}
              alt=""
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />
          </a>
        </div>
        <div className="content" style={{ height: "130px", cursor: "pointer" }}>
          <h6
            onClick={() => {
              localStorage.setItem("blogid", item.id);
              navigate(`/eachblogpost`);
            }}
          >
            <a
              onClick={() => {
                localStorage.setItem("blogid", item.id);
                navigate(`/eachblogpost`);
              }}
            >
              {item.name}
            </a>
          </h6>
          <div className="lower-box">{/* Select Size */}</div>
          <div
            className="d-flex align-items-center mt-4 fs-6"
            onClick={() => {
              localStorage.setItem("blogid", item.id);
              navigate(`/eachblogpost`);
            }}
          >
            {" "}
            {item.title}
          </div>
          <div className="d-flex align-items-center fw-bold mt-2">
            {" "}
            {item.date}
          </div>

          <p
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "8px",
            }}
            onClick={() => {
              localStorage.setItem("blogid", item.id);
              navigate(`/eachblogpost`);
            }}
            className="text-primary"
          >
            Read More
          </p>
        </div>
      </div>
    </div>
  );
};
