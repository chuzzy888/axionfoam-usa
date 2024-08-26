// import React, { useState } from "react";

// export const Eachcart = ({ item, _index, getCartItems, getSubTotal }) => {
//   const [quantity, setQuantity] = useState(item?.quantity);
//   const [price, setPrice] = useState(item?.price);

//   const reduceQuantity = (productToAdd) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existingProductIndex = existingCart.findIndex(
//       (item) =>
//         item.productId === productToAdd.productId &&
//         item.size === productToAdd.size
//     );

//     if (existingProductIndex !== -1) {
//       if (existingCart[existingProductIndex].quantity > 1) {
//         existingCart[existingProductIndex].price =
//           existingCart[existingProductIndex].originalPrice * (quantity - 1);
//         setPrice(
//           existingCart[existingProductIndex].originalPrice * (quantity - 1)
//         );
//         existingCart[existingProductIndex].quantity =
//           existingCart[existingProductIndex].quantity - 1;
//       }
//       setQuantity(quantity - 1);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     getSubTotal();
//   };
//   const IncreaseQuantity = (productToAdd) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existingProductIndex = existingCart.findIndex(
//       (item) =>
//         item.productId === productToAdd.productId &&
//         item.size === productToAdd.size
//     );

//     if (existingProductIndex !== -1) {
//       if (existingCart[existingProductIndex].quantity >= 1) {
//         existingCart[existingProductIndex].price =
//           existingCart[existingProductIndex].originalPrice * (quantity + 1);
//         setPrice(
//           existingCart[existingProductIndex].originalPrice * (quantity + 1)
//         );
//         existingCart[existingProductIndex].quantity = quantity + 1;
//       }
//       setQuantity(quantity + 1);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     getSubTotal();
//   };
//   const removeFromCart = (productIdToRemove, sizeToRemove) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const updatedCart = existingCart.filter(
//       (item) =>
//         !(item.productId === productIdToRemove && item.size === sizeToRemove)
//     );
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     getCartItems();
//   };

//   return (
//     <tr>
//       <td colSpan={2} className="prod-column">
//         <div className="column-box">
//           <figure className="prod-thumb">
//             <span
//               className="cross-icon flaticon-cancel-1"
//               onClick={() => {
//                 removeFromCart(item?.id, item?.size);
//               }}
//             />
//             <a href="#">
//               <img src={JSON.parse(item?.images)[0]} alt="" />
//             </a>
//           </figure>
//           <h6
//             className="prod-title"
//             style={{
//               cursor: "pointer",
//             }}
//           >
//             {item?.name}
//           </h6>
//           <div className="prod-text">
//             Size : {item?.size} <br /> Quantity : {item?.quantity}
//           </div>
//         </div>
//       </td>
//       <td className="price">₦{item?.originalPrice?.toLocaleString()}</td>
//       {/* Quantity Box */}
//       <td
//         className="d-flex "
//         style={{
//           alignItems: "center",
//           marginTop: "28px",
//         }}
//       >
//         <div
//           className="py-1"
//           style={{
//             width: "30px",
//             display: "flex",
//             justifyContent: "center",
//             backgroundColor: "black",
//             color: "white",
//             fontSize: "20px",
//             cursor: "pointer",
//           }}
//           onClick={() => {
//             if (quantity > 1) {
//               reduceQuantity(item);
//             }
//           }}
//         >
//           -
//         </div>
//         <div
//           className="py-1"
//           style={{
//             width: "30px",
//             display: "flex",
//             justifyContent: "center",
//             backgroundColor: "grey",
//             color: "black",
//             fontSize: "20px",
//             cursor: "pointer",
//           }}
//         >
//           {quantity}
//         </div>
//         <div
//           className="py-1"
//           style={{
//             width: "30px",
//             display: "flex",
//             justifyContent: "center",
//             backgroundColor: "black",
//             color: "white",
//             fontSize: "20px",
//             cursor: "pointer",
//           }}
//           onClick={() => {
//             IncreaseQuantity(item);
//           }}
//         >
//           +
//         </div>
//       </td>

//       <td className="price"> ₦{price.toLocaleString()}</td>
//     </tr>
//   );
// };

import axios from "axios";
import React, { useEffect, useState } from "react";

export const Eachcart = ({ item, _index, getCartItems, getSubTotal }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [price, setPrice] = useState(item?.price);

  const parseImages = (images) => {
    try {
      return JSON.parse(images);
    } catch (e) {
      console.error("Invalid JSON for images field:", images);
      return [];
    }
  };

  const reduceQuantity = (productToAdd) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) =>
        item.productId === productToAdd.productId &&
        item.size === productToAdd.size
    );

    if (existingProductIndex !== -1) {
      if (existingCart[existingProductIndex].quantity > 1) {
        existingCart[existingProductIndex].price =
          existingCart[existingProductIndex].originalPrice * (quantity - 1);
        setPrice(
          existingCart[existingProductIndex].originalPrice * (quantity - 1)
        );
        existingCart[existingProductIndex].quantity =
          existingCart[existingProductIndex].quantity - 1;
      }
      setQuantity(quantity - 1);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    getSubTotal();
  };

  const IncreaseQuantity = (productToAdd) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) =>
        item.productId === productToAdd.productId &&
        item.size === productToAdd.size
    );

    if (existingProductIndex !== -1) {
      if (existingCart[existingProductIndex].quantity >= 1) {
        existingCart[existingProductIndex].price =
          existingCart[existingProductIndex].originalPrice * (quantity + 1);
        setPrice(
          existingCart[existingProductIndex].originalPrice * (quantity + 1)
        );
        existingCart[existingProductIndex].quantity = quantity + 1;
      }
      setQuantity(quantity + 1);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    getSubTotal();
  };

  const removeFromCart = (productIdToRemove, sizeToRemove) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.filter(
      (item) =>
        !(item.productId === productIdToRemove && item.size === sizeToRemove)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    getCartItems();
  };
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

  const images = parseImages(item?.images);

  return (
    <tr>
      <td colSpan={2} className="prod-column">
        <div className="column-box">
          <figure className="prod-thumb">
            <span
              className="cross-icon flaticon-cancel-1"
              onClick={() => {
                removeFromCart(item?.id, item?.size);
              }}
            />
            <a href="#">
              {images.length > 0 && <img src={images[0]} alt="" />}
            </a>
          </figure>
          <h6
            className="prod-title"
            style={{
              cursor: "pointer",
            }}
          >
            {item?.name}
          </h6>
          <div className="prod-text">
            Size : {item?.size} <br /> Quantity : {quantity}
          </div>
        </div>
      </td>
      <td className="price">
        ${dollarRate && Math.round(Number(item?.originalPrice) / dollarRate)}
      </td>
      {/* Quantity Box */}
      <td
        className="d-flex "
        style={{
          alignItems: "center",
          marginTop: "28px",
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
              reduceQuantity(item);
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
            IncreaseQuantity(item);
          }}
        >
          +
        </div>
      </td>

      {dollarRate && (
        <td className="price"> ${Math.round(Number(price) / dollarRate)}</td>
      )}
    </tr>
  );
};
