import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orderpage.css"; 
import { useNavigate } from "react-router-dom";

function Orderpage() {
  const id = localStorage.getItem("id");
  const [items, setItems] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(items);
  

  return (
    <div className="container my-5">
           <button className=" baby-add-to-cart-btn bg-danger" onClick={()=>navigate('/')}>Go to Home</button>
      <div className="text-center mb-4">
        <h2 className="orders-title">Your Orders</h2>
      </div>

      <div className="row g-4">
        {items.order?.map((order, index) => (
          <div className="col-sm-6 col-md-4" key={index}>
            <div className="card order-card shadow-lg">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title order-title">Order #{index + 1}</h5>
                  <span className="badge bg-success order-amount">
                    ₹{order.totalAmount}
                  </span>
                </div>

                <div>
                  {order.cartitems.map((product, idx) => (
                    <div className="d-flex align-items-start mb-4" key={idx}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="order-img rounded"
                      />
                      <div className="ms-3">
                        <h6 className="order-product-name">{product.title}</h6>
                        <p className="text-muted small">{product.description}</p>
                        <p className="order-price">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orderpage;
