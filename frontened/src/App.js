import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shoes from "./components/Shoes/Shoes";

function App() {
  return (
    <>
      {/* Navbar is outside Routes */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoes" element={<Shoes />} />
      </Routes>
    </>
  );
}

export default App;