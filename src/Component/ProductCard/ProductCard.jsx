import React, { useContext } from "react";
import "./ProductCard.css";
import { Link, useNavigate } from "react-router-dom";
import { newcontext } from "../../Context/Context";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { AddtoCart, isLogged, cart } = useContext(newcontext); 

  const addcart = () => {
    if (!isLogged) {
      alert("Please login");
      return;
    }

    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      alert("Product is already in the cart");
      return;
    }

    AddtoCart(product);
    alert("Product added to cart");
  };

  return (
    <div className="baby-card">
      <img
        onClick={() => navigate(`/product/${product.id}`)}
        src={product.image}
        alt={product.title}
        className="baby-card-img"
      />
      <div className="baby-card-body">
        <h6 className="baby-card-title">{product.title}</h6>
        <p className="baby-card-description">{product.description}</p>
        <p className="baby-card-category">{product.category}</p>
        <p className="baby-card-price">₹{product.price}</p>
        <Link to={`/product/${product.id}`} className="baby baby-card-btn">
          View Details
        </Link>{" "}
        <span> </span>
        <button className="baby-card-btn" onClick={addcart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
