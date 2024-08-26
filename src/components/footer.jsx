import React from "react";

export const Footer = () => {
  return (
    <footer className="main-footer style-three darkfooter">
      <div className="auto-container">
        {/* Widgets Section */}
        <div className="widgets-section">
          <div className="row clearfix">
            {/* Column */}
            <div className="big-column col-lg-7 col-md-12 col-sm-12">
              <div className="row clearfix">
                {/* Footer Column */}
                <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget">
                    {/* Logo */}
                    <div className="logo">
                      <a href="#">
                        <img
                          src="axionlogo.png"
                          alt=""
                          title
                          style={{ width: "200px" }}
                        />
                      </a>
                    </div>
                    <div className="text">Built for your comfort.</div>
                    <ul className="contact-list">
                      <li>
                        <span className="icon flaticon-map" />
                        <strong>Axion Showrooms -</strong>
                        <br />
                        <br />
                        <a
                          href="https://maps.google.com/?q=30 Addo Road"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Adunni Mall,{" "}
                        </a>
                        30 Addo Road Lekki-Ajah
                        <br />
                        <br />
                        <a
                          href="https://maps.google.com/?q=30 Addo Road"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          41 Okuru link road,{" "}
                        </a>
                        Odili road, Port Harcourt
                        <br />
                      </li>
                      <li>
                        <span className="icon flaticon-call" />
                        08113705555
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Footer Column */}
                <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget">
                    <h5>Find It Fast</h5>
                    <ul className="page-list">
                      <li>
                        <a href="/shop?category=mattress">Mattress</a>
                      </li>
                      <li>
                        <a href="/shop?category=toppers">Toppers</a>
                      </li>
                      <li>
                        <a href="/shop?category=pillows">Pillows</a>
                      </li>
                      <li>
                        <a href="/shop?category=bedbase">Bed Base</a>
                      </li>
                      <li>
                        <a href="/shop?category=protectors">Protectors</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Column */}
            <div className="big-column col-lg-5 col-md-12 col-sm-12">
              <div className="row clearfix">
                {/* Footer Column */}
                <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget">
                    <h5>Quick Links</h5>
                    <ul className="page-list">
                      <li>
                        <a href="/register">Register</a>
                      </li>
                      <li>
                        <a href="/login">Login</a>
                      </li>
                      <li>
                        <a href="/shop?category=all">Shop</a>
                      </li>
                      <li>
                        <a href="/cart">Cart</a>
                      </li>
                      <li>
                        <a href="/quiz">Mattress Quiz</a>
                      </li>
                      <li>
                        <a href="/blogpage">Blog</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Footer Column */}
                <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                  <div className="footer-widget instagram-widget">
                    <h5>Support</h5>
                    <ul className="page-list-two">
                      <li>
                        <a href="/contact">Contact Us</a>
                      </li>
                      <li>
                        <a href="/contact">Send a message</a>
                      </li>
                      <li>
                        <a href="/contact">Ask a question</a>
                      </li>
                      <li>
                        <a href="#faq">FAQ</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="copyright">
              <span>© 2023</span> Axion Foam. Powered by Axion Foam.
            </div>
            <div className="email-box">
              <a href="mailto:Axionfoam.ng@gmail.com">
                <span className="icon flaticon-mail" />
                axionfoam@gmail.com
              </a>
            </div>
            <div className="cards">
              <img src="images/icons/cards.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <img
        src="footer.jpg"
        alt=""
        className="vw-100"
        style={{
          height: "40px",
        }}
      />
    </footer>
  );
};
