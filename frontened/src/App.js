import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Shoes from "./components/Shoes/Shoes";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Kids from "./pages/Kids/Kids";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";

import ShippingDelivery from "./pages/ShippingDelivery/ShippingDelivery";
import ReturnsExchange from "./pages/ReturnsExchange/ReturnsExchange";
import SizeGuide from "./pages/SizeGuide/SizeGuide";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrder from "./pages/MyOrder/MyOrder";

import NewArrival from "./pages/NewArrival/NewArrival";
import Offers from "./pages/Offers/Offers";

function App() {
  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar />


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="main-content">

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* SHOES */}

          <Route
            path="/shoes"
            element={<Shoes />}
          />


          {/* MEN */}

          <Route
            path="/men"
            element={<Men />}
          />


          {/* WOMEN */}

          <Route
            path="/women"
            element={<Women />}
          />


          {/* KIDS */}

          <Route
            path="/kids"
            element={<Kids />}
          />


          {/* ABOUT */}

          <Route
            path="/about"
            element={<About />}
          />


          {/* CONTACT */}

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* FAQ */}

          <Route
            path="/faq"
            element={<FAQ />}
          />


          {/* SHIPPING */}

          <Route
            path="/shipping-delivery"
            element={<ShippingDelivery />}
          />


          {/* RETURNS */}

          <Route
            path="/returns-exchange"
            element={<ReturnsExchange />}
          />


          {/* SIZE GUIDE */}

          <Route
            path="/size-guide"
            element={<SizeGuide />}
          />


          {/* PRIVACY */}

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />


          {/* TERMS */}

          <Route
            path="/terms-conditions"
            element={<TermsConditions />}
          />


          {/* CART */}

          <Route
            path="/cart"
            element={<Cart />}
          />


          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* PLACE ORDER */}

          <Route
            path="/place-order"
            element={<PlaceOrder />}
          />


          {/* MY ORDERS */}

          <Route
            path="/my-orders"
            element={<MyOrder />}
          />


          {/* NEW ARRIVALS */}

          <Route
            path="/newarrival"
            element={<NewArrival />}
          />


          {/* OFFERS */}

          <Route
            path="/offers"
            element={<Offers />}
          />

        </Routes>

      </main>


      {/* =========================
          FOOTER
      ========================== */}

      <Footer />

    </div>
  );
}

export default App;