import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "../components/footer";
import { Loader } from "../components/loader";
import { MdOutlineRestartAlt } from "react-icons/md";

const questions = [
  {
    questionText: "Who are you shopping for?",
    answerOptions: [
      { answerText: "Myself", value: "Myself " },
      { answerText: "My guest bedroom", value: "My guest bedroom" },
      { answerText: "Myself and a partner", value: "Myself and a partner" },
      { answerText: "My child", value: "My child" },
    ],
  },
  {
    questionText: "What is your preferred sleeping position?",
    answerOptions: [
      { answerText: "Back", value: "back" },
      { answerText: "Side", value: "side" },
      { answerText: "Stomach", value: "stomach" },
    ],
  },

  {
    questionText: "What is your firmness preference?",
    answerOptions: [
      { answerText: "Soft", value: "soft" },
      { answerText: "Medium", value: "medium" },
      { answerText: "Firm", value: "firm" },
    ],
  },
  {
    questionText: "What size mattress are you looking for?",
    answerOptions: [
      { answerText: "Twin", value: "Twin" },
      { answerText: "Twin XL", value: "Twin XL" },
      { answerText: "Full", value: "Full" },
      { answerText: "Queen", value: "Queen" },
      { answerText: "King", value: "King" },
      { answerText: "Cal King", value: "Cal King" },
    ],
  },
  {
    questionText: "What do you dislike about your current mattress?",
    answerOptions: [
      { answerText: "It is too soft", value: "It is too soft" },
      { answerText: "It is too firm", value: "It is too firm" },
      {
        answerText: "It is sinking or sagging",
        value: "It is sinking or sagging",
      },
      {
        answerText: "It causes me pain or soreness",
        value: "It causes me pain or soreness",
      },
      {
        answerText: "Nothing, I am shopping for something new",
        value: "Nothing, I am shopping for something new",
      },
      {
        answerText: "I can feel my partner movements",
        value: "I can feel my partner movements",
      },
    ],
  },
];

const mattressSuggestions = [
  {
    name: "Classic Hybrid",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709348459/vlpgo0yftncpftvuq4kb.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709344081/spvicqduco2nb4s2z7f3.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709344081/spvicqduco2nb4s2z7f3.jpg",
    ],
  },
  {
    name: "Premium Hybrid",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709346584/m9rh0f3tyjzgrlgd9jgx.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709346583/muqzz5ssfp7minjuw4ai.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709346583/dkoynzaou3i4f1aacm2a.jpg",
    ],
  },
  {
    name: "latex Hybrid",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709458583/mf94rgzwfk0robisk6x0.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1711618740/kcokhjnwyyhwkkjffvo3.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709458583/c8xtj9gkxrosi0je8qpi.jpg",
    ],
  },
  {
    name: "Copper Hybrid",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1711618804/in5otr3abkxxoqmnaxot.jpg",
    ],
  },
  {
    name: "Platinum Hybrid",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1711618644/ihonid08qtp8tsyuzitr.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1711618644/zsn2raqxsdx00l9enzm7.jpg",
    ],
  },
  {
    name: "Cooling Gel",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709348459/glhq6qtadavxadnqpea5.jpg",
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1709348459/scdbzebktfvhgclfiius.jpg",
    ],
  },
  // {
  //     name: 'Memory Foam',
  //     images: [
  //         'image-url-4',
  //         'image-url-5',
  //         'image-url-6'
  //     ]
  // },
  // {
  //     name: 'Graphite',
  //     images: [
  //         'image-url-4',
  //         'image-url-5',
  //         'image-url-6'
  //     ]
  // },
  // {
  //     name: 'Copper',
  //     images: [
  //         'image-url-4',
  //         'image-url-5',
  //         'image-url-6'
  //     ]
  // },
  {
    name: "Comfort",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1711618974/djzm9iw9gmsxrpcs8kzd.jpg",
    ],
  },
  {
    name: "Elite",
    images: [
      "https://res.cloudinary.com/dbxdntqsu/image/upload/v1711619006/kes6jaovgqvwv3x9naur.jpg",
    ],
  },
  // {
  //     name: 'Green Tea',
  //     images: [
  //         'image-url-4',
  //         'image-url-5',
  //         'image-url-6'
  //     ]
  // },
];

const MattressQuiz = () => {
  const [isScrolling, setScrolling] = useState();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState("emailPrompt");
  const [email, setEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [randomMattress, setRandomMattress] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAnswerOptionClick = (value) => {
    const nextQuestion = currentQuestion + 1;
    const newUserAnswers = [...userAnswers, value];

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setUserAnswers(newUserAnswers);
    } else {
      setUserAnswers(newUserAnswers);
      setQuizFinished(true);

      const randomIndex = Math.floor(
        Math.random() * mattressSuggestions.length
      );
      setRandomMattress(mattressSuggestions[randomIndex]);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
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

  if (currentStep === "emailPrompt") {
    return (
      <div className="page-wrapper">
        <Loader></Loader>
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
        <section className="page-title">
          <div className="auto-container">
            <h2>Mattress Quiz</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Mattress Quiz</li>
            </ul>
          </div>
        </section>
        <Container className="my-5">
          <p style={{ color: "blue" }}>WELCOME TO THE QUIZ</p>
          <h2>Where should we send your results? </h2>
          <br />
          <p>
            Get personalized quiz results and exclusive deals in your inbox to
            turn your sleep dreams into a reality. 💤
          </p>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="w-75"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-start gap-2">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setCurrentStep("quiz")}
              >
                Skip
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  email
                    ? setCurrentStep("quiz")
                    : alert("Please enter a valid email or skip")
                }
              >
                Continue
              </Button>
            </div>
          </Form>
          <br />

          <p>
            *By entering your email you agree to Axion's{" "}
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>. You also agree to receive marketing
            emails. You can unsubscribe at any time.
          </p>
        </Container>
        <Footer></Footer>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div>
        <Loader></Loader>
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
        <section className="page-title">
          <div className="auto-container">
            <h2>Mattress Quiz</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Pages</li>
              <li>Mattress Quiz</li>
            </ul>
          </div>
        </section>
        <Container className="my-5">
          <h2>Your Quiz Results:</h2>
          <ul>
            {userAnswers.map((answer, index) => (
              <li key={index} style={{ color: "green" }}>{`Question ${
                index + 1
              }: ${answer}`}</li>
            ))}
          </ul>
          {email && (
            <p>Check your inbox at {email} for more detailed results!</p>
          )}
          <Button variant="primary" onClick={() => window.location.reload()}>
            <MdOutlineRestartAlt
              style={{ color: "black", marginBottom: "4px" }}
            />
            Restart Quiz
          </Button>
          {/* Display selected mattress suggestion */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="text-black">Recommended Mattress</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "black" }}>
              <p className="text-muted fs-6">
                Search for recommended mattress to get more details!
              </p>
              {randomMattress && (
                <>
                  <h3 className="text-white">{randomMattress.name}</h3>
                  <br />
                  {/* Display images in a horizontal slider */}

                  {randomMattress.images.map((image, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "30px",
                      }}
                    >
                      <img
                        key={index}
                        src={image}
                        alt={`${randomMattress.name} ${index}`}
                        style={{ maxWidth: "80%", height: "200px" }}
                      />
                    </div>
                  ))}
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div>
      <Loader></Loader>
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
      <section className="page-title">
        <div className="auto-container">
          <h2>Mattress Quiz</h2>
          <ul className="bread-crumb clearfix">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Pages</li>
            <li>Mattress Quiz</li>
          </ul>
        </div>
      </section>
      <Container className="my-5">
        <Row>
          <Col>
            <h2>{questions[currentQuestion].questionText}</h2>
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <Button
                  key={index}
                  variant="primary"
                  className="m-2"
                  onClick={() => handleAnswerOptionClick(answerOption.value)}
                  style={{ display: "block" }}
                >
                  {answerOption.answerText}
                </Button>
              )
            )}
          </Col>
        </Row>
        <ProgressBar
          now={((currentQuestion + 1) / questions.length) * 100}
          label={`${currentQuestion + 1} of ${questions.length}`}
        />
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default MattressQuiz;
