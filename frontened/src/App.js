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
    <>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

      <Route
          path="/shoes"
          element={<Shoes />}
        />

      <Route
          path="/men"
          element={<Men />}
        />

      <Route
          path="/women"
          element={<Women />}
        />

      <Route
          path="/kids"
          element={<Kids />}
        />

        <Route 
        path="/about" 
        element={<About />} />

        <Route 
        path="/contact" 
         element={<Contact />} />

        <Route 
        path="/faq" 
        element={<FAQ />} />

        <Route
        path="/shipping-delivery"
        element={<ShippingDelivery />}
        />

        <Route
        path="/returns-exchange"
        element={<ReturnsExchange />}
        />

        <Route
        path="/size-guide"
        element={<SizeGuide />}
         />

        <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
        />

        <Route
        path="/terms-conditions"
        element={<TermsConditions />}
        />

        <Route
        path="/cart"
        element={<Cart />}
        />

        <Route
        path="/login"
        element={<Login />}
        />

        <Route
        path="/place-order"
        element={<PlaceOrder />}
         />

        <Route
        path="/my-orders"
        element={<MyOrder />}
         />

         <Route 
         path="/new" 
         element={<NewArrival />}
        />

         <Route 
         path="/offers" 
         element={<Offers />}
        /> 

      </Routes>
       <Footer />
    </>
  );
}

export default App;