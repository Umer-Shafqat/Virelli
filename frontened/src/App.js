import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shoes from "./components/Shoes/Shoes";

const App = () => {

  return (
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

    </Routes>
  );
};

export default App;