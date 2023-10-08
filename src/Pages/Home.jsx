import React from "react";
import Announcement from "../Components/Announcement";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Silder";
import Categories from "../Components/Categories";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";

const Home = () => {
  setTimeout(() => {
    const user = localStorage.getItem("persist:root");
    if (user) {
      console.log(JSON.parse(JSON.parse(user).user).currentUser);
    }
  }, 5000);

  // if (user) {
  //   var accessToken = JSON.parse(JSON.parse(user)?.user)?.currentUser
  //     ?.accessToken;
  // }
  // console.log(accessToken);
  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
