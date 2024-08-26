import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Shop } from "./pages/shop";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Error } from "./pages/error";

import { Search2 } from "./pages/search2";
import { Eachproductpage } from "./pages/eachproductpage";
import { Cart } from "./pages/cart";
import { CartProvider } from "react-use-cart";
import { Checkout } from "./pages/checkout";
import { Contact2 } from "./pages/contact2";
import { Profile } from "./pages/profile";
import { Loader } from "./components/loader";
import { Admin } from "./pages/admin";
import { Orders2 } from "./pages/orders2";
import { Blogpage } from "./pages/blogpage";
import { Eachblogpost } from "./pages/eachblogpost";
import { Compare } from "./pages/compare";
import MattressQuiz from "./pages/MattressQuiz";
// import $ from "jquery";

function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/shop" element={<Shop></Shop>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            {/* <Route path="/search" element={<Search></Search>}></Route> */}
            <Route path="/search" element={<Search2></Search2>}></Route>
            <Route path="*" element={<Error></Error>}></Route>
            <Route
              path="/products"
              element={<Eachproductpage></Eachproductpage>}
            ></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/checkout" element={<Checkout></Checkout>}></Route>

            <Route path="/contact" element={<Contact2></Contact2>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/admin" element={<Admin></Admin>}></Route>
            {/* <Route path="/profile/orders" element={<Orders></Orders>}></Route> */}
            <Route path="/orders" element={<Orders2></Orders2>}></Route>
            <Route path="/compare" element={<Compare></Compare>}></Route>
            <Route path="/blogpage" element={<Blogpage></Blogpage>}></Route>
            <Route
              path="/eachblogpost"
              element={<Eachblogpost></Eachblogpost>}
            ></Route>
            <Route path="/quiz" element={<MattressQuiz/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      {/* <Loader></Loader> */}
    </div>
  );
}

export default App;
