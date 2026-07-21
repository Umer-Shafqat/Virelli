import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Shoes from "./components/Shoes/Shoes";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Kids from "./pages/Kids/Kids";

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

      </Routes>
       <Footer />
    </>
  );
}

export default App;