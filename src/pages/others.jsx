import React from "react";

export const Others = () => {
  return (
    <div className="header-lower">
      <div className="auto-container">
        <div className="nav-outer d-flex justify-content-between align-items-center flex-wrap">
          {/* Select Categories */}
          <div className="select-categories">
            <div className="category">
              <span className="icon flaticon-menu-3" /> Select catagories
              <span className="arrow flaticon-down-arrow" />
            </div>
            <ul className="categories-list">
              <li className="active">
                <a href="#">
                  <span className="icon">
                    <img src="images/icons/menu-icon-1.png" alt="" />
                  </span>
                  Shop
                </a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span className="icon">
                    <img src="mattress.png" alt="" style={{ width: "28px" }} />
                  </span>
                  Mattresses
                </a>
                <ul>
                  <li>
                    <a href="/shop?category=mattress">Hybrid Orthopedic</a>
                  </li>
                  <li>
                    <a href="/shop?category=mattress">Memory Foam</a>
                  </li>
                  <li>
                    <a href="/shop?category=mattress">Latex Foam</a>
                  </li>
                  <li>
                    <a href="/shop?category=mattress">Cooling Technology</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span className="icon">
                    <img src="toppers.png" alt="" style={{ width: "28px" }} />
                  </span>
                  Toppers
                </a>
                <ul>
                  <li>
                    <a href="/shop?category=toppers">Luxery Cotton Topper</a>
                  </li>
                  <li>
                    <a href="/shop?category=toppers">Memory Foam Topper</a>
                  </li>
                  <li>
                    <a href="/shop?category=toppers">Gel-infused Memory Foam Topper</a>
                  </li>
                  <li>
                    <a href="/shop?category=toppers">
                      Charcoal Activated Memory Foam Topper
                    </a>
                  </li>
                  <li>
                    <a href="/shop?category=toppers">
                      Green tea infused Memory Foam Topper
                    </a>
                  </li>
                  <li>
                    <a href="/shop?category=toppers">Hybrid Cotton/Memory Foam Topper</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span className="icon">
                    <img src="pillows.png" alt="" style={{ width: "28px" }} />
                  </span>
                  Pillows
                </a>
                <ul>
                  <li>
                    <a href="/shop?category=pillows">Luxery Fiber Pillow</a>
                  </li>
                  <li>
                    <a href="/shop?category=pillows">Luxery Cotton Pillow</a>
                  </li>
                  <li>
                    <a href="/shop?category=pillows">Memory Foam Pillow</a>
                  </li>
                  <li>
                    <a href="/shop?category=pillows">Latex Foam Pillow</a>
                  </li>
                  <li>
                    <a href="/shop?category=pillows">Geese Feather Pillow</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span className="icon">
                    <img src="base.png" alt="" style={{ width: "28px" }} />
                  </span>
                  Bed Base
                </a>
                <ul>
                  <li>
                    <a href="/shop?category=bedbase">Flat Standard</a>
                  </li>
                  <li>
                    <a href="/shop?category=bedbase">Motorized Adjustable</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span className="icon">
                    <img
                      src="protectors.png"
                      alt=""
                      style={{ width: "28px" }}
                    />
                  </span>
                  Protectors
                </a>
                <ul>
                  <li>
                    <a href="/shop?category=protectors">Mattress Protectors</a>
                  </li>
                  <li>
                    <a href="/shop?category=protectors">Pillow Protectors</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* End Select Categories */}
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
              <ul className="navigation clearfix ms-5">
                <li className="dropdown">
                  <a href="">Home</a>
                  <ul>
                    <li>
                      <a href="#popular">Popular products</a>
                    </li>

                 
                  </ul>
                </li>
                <li>
                  <a href="about.html">About</a>
                </li>
                <li className="dropdown">
                  <a href="/shop?category=all">Shop</a>
                  <ul>
                    <li>
                      <a href="/shop?category=all">Our Products</a>
                    </li>

                    <li>
                      <a href="cart.html">Shoping Cart</a>
                    </li>

                    <li>
                      <a href="register.html">Register</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="contact.html">Contact us</a>
                </li>
                <li className="dropdown">
                  <a href="#">Account</a>
                  <ul>
                    <li>
                      <a href="blog.html">Login</a>
                    </li>
                    <li>
                      <a href="blog-detail.html">Register</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          {/* Main Menu End*/}
          {/* Outer Box */}
          <div className="outer-box d-flex justify-content-between align-items-center">
            {/* Social Box */}
            <ul className="social-box">
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="fa fa-facebook-f"
                />
              </li>
              <li>
                <a href="https://www.twitter.com/" className="fa fa-twitter" />
              </li>
              <li>
                <a href="https://dribbble.com/" className="fa fa-dribbble" />
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  className="fa fa-linkedin"
                />
              </li>
            </ul>

            {/* Mobile Navigation Toggler */}
            <div className="mobile-nav-toggler">
              <span className="icon flaticon-menu" />
            </div>
          </div>
          {/* End Outer Box */}
        </div>
      </div>
    </div>
  );
};
