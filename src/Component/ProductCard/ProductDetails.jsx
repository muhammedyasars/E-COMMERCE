import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css"; 
import { newcontext } from "../../Context/Context";

const ProductDetails = () => {
    const {AddtoCart,isLogged}=useContext(newcontext)
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
   const navigate=useNavigate()
   const gotocart=()=>{
    if(isLogged){
      navigate('/cart')  
   }else{
    alert('Please Login')
   }
  }
   const addtocart=()=>{
    if(isLogged){
    alert('product added')
    }else{
    alert('Please Login')
    }
    AddtoCart(product)
   }
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>; 
  }

  return (
    <div className="baby-product-details" >
      <div className="baby-container" style={{background:'#cb5'}}>
             <button className="back baby-add-to-cart-btn" onClick={()=>navigate('/')} >Back</button>
        <div className="baby-row">
          <div className="baby-image-col">
            <img
              src={product.image}
              alt={product.title}
              className="baby-product-img"
            />
          </div>
          <div className="baby-info-col">
            <h1 className="baby-product-title" style={{color:'black'}}>{product.title}</h1>
            <p className="baby-product-description" style={{color:'black'}}>{product.description}</p>
            <p className="baby-product-category" style={{color:'black'}}>
              <strong>Category:</strong> {product.category} <br />
              <strong>Color:</strong> {product.color}
            </p>
            <p className="baby-product-price" style={{color:'black'}}>
              <strong style={{color:'red'}}>Old Price:</strong>₹{product.price}  <br />
              <strong style={{color:'green'}}>Discount:</strong> ₹{product.discount} <br />
              <strong>Price:</strong> ₹{product.price-product.discount}
            </p>
            <button className=" baby-add-to-cart-btn bg-warning" onClick={addtocart}>Add to Cart</button> <span>&nbsp;</span>
            <button className=" baby-add-to-cart-btn bg-danger" onClick={gotocart}>Go to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
