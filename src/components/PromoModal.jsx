// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";

// const PromoModal = () => {
//   const [show, setShow] = useState(true);

//   const handleClose = () => setShow(false);

//   // Optional: To automatically close the modal after a few seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(false);
//     }, 9000); // Change to your desired time in milliseconds (e.g., 5000 for 5 seconds)

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton></Modal.Header>
//       <Modal.Body>
//         <img src="bnn.jpeg" alt="Promo Banner" className="img-fluid" />
//       </Modal.Body>
//       <Modal.Footer>
//         <a href="/shop?category=mattress">
//           <Button variant="primary" onClick={handleClose}>
//             Shop Now
//           </Button>
//         </a>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PromoModal;

import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Import React Modal

const PromoModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown in the current session
    const modalShown = sessionStorage.getItem("promoModalShown");

    if (!modalShown) {
      // If not shown before in this session, display the modal
      setShowModal(true);
      // Set a flag in sessionStorage to prevent it from showing again in this session
      sessionStorage.setItem("promoModalShown", "true");
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleClose}
      className="promo-modal"
      overlayClassName="promo-modal-overlay"
      ariaHideApp={false} // Optional: Prevent warnings in development
    >
      <button onClick={handleClose} className="close-button">
        &times;
      </button>
      <div className="promo-content">
        <img src="bnn.jpeg" alt="Promo Banner" className="promo-img" />
        <a href="/shop?category=mattress">
          <button className="promo-button" onClick={handleClose}>
            Shop Now
          </button>
        </a>
      </div>
    </Modal>
  );
};

export default PromoModal;
