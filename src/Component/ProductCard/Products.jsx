import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import CategoriesBar from "../Layout/Categories/CategoriesBar ";
import "./Products.css";
import Footer from "../Layout/Footer";

const Products = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [activeCategory, setActiveCategory] = useState("All"); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); 
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleCategorySelect = (category) => {
    setActiveCategory(category); 
    if (category === "All") {
      setFilteredProducts(products); 
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      ); 
    }
  };

  return (
    <div className="products-page">

      
       <img className='img' src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1717439400-mcxmila_destopbanner_1920x650copy-100.jpg"  />


      <CategoriesBar onCategorySelect={handleCategorySelect} />
      <div className="container" style={{background:'white'}}>
        <h2 className="active-category-title">{activeCategory} Products</h2>
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default Products;
