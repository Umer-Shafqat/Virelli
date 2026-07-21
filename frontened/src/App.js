import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shoes from "./components/Shoes/Shoes";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

const App = () => {

  return (
    <Routes>
      <Navbar/>

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

    </Routes>
  );
};

export default App;