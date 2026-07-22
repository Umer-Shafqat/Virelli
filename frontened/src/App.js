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

function App() {
  return (
    <>
      {/* Navbar is outside Routes */}
      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* All Shoes Page */}
        <Route
          path="/shoes"
          element={<Shoes />}
        />

        {/* Men's Shoes Page */}
        <Route
          path="/men"
          element={<Men />}
        />

        {/* Women's Shoes Page */}
        <Route
          path="/women"
          element={<Women />}
        />

        {/* Kids' Shoes Page */}
        <Route
          path="/kids"
          element={<Kids />}
        />
        <Route path="/about" element={<About />} />

<Route path="/contact" element={<Contact />} />

<Route path="/faq" element={<FAQ />} />

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

      </Routes>
       <Footer />
    </>
  );
}

export default App;