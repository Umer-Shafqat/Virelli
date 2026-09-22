import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Category from "../../components/Category/Category"

const Home = () => {
  return (
    <>
      <Navbar />
      <Category/>
      <Header />
    </>
  );
};

export default Home;