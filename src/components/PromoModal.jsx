import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const PromoModal = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  // Optional: To automatically close the modal after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 9000); // Change to your desired time in milliseconds (e.g., 5000 for 5 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src="bn.jpeg" alt="Promo Banner" className="img-fluid" />
      </Modal.Body>
      <Modal.Footer>
        <a href="/shop?category=mattress">
          <Button variant="primary" onClick={handleClose}>
            Shop Now
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default PromoModal;
