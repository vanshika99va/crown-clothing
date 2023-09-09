import React from "react";
import Directory from "../../components/directory/Directory.jsx";
import { categories } from "../../app/categoriesData.js";

const Home = () => {
  return <Directory categories={categories} />;
};

export default Home;
