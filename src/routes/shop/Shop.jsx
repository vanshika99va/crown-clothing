import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../../components/category/Category";
import "./Shop.scss";

function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
      {/* ":name_of_variable "*/}
    </Routes>
  );
}

export default Shop;
