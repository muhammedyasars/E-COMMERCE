import React, { useContext } from 'react';
import { newcontext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import "./Cart.css"; 

function Cart() {
  const { cart = [], RemoveCart, updatequantity } = useContext(newcontext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="baby-theme">
      <div className="container" style={{background:'#ab34',borderRadius:'30px'}}>
        <h2 className="baby-title" style={{color:'black'}}>My Baby Cart</h2>
        
        <div className="d-flex justify-content-end mb-4">
          <strong className="me-3 baby-total" style={{color:'black'}}>Total: ₹{totalAmount.toFixed(2)}</strong>
          <button
            className="btn baby-buy-btn"
            onClick={() => navigate('/address')}
            disabled={cart.length === 0}
          >
            Buy Now
          </button>
        </div>

        {cart.length > 0 ? (
          <div className="baby-items">
            <div className="row">
              {cart.map((item) => (
                <div key={item.id} className="col-md-3">
                  <div className="card baby-card" >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title baby-card-title">{item.name}</h5>
                      <p className="card-text baby-price">
                        Price: <strong>₹{item.price.toFixed(2)}</strong>
                      </p>
                      <p className="card-text">
                        Quantity: 
                        <button
                          className="btn btn-sm baby-btn"
                          onClick={() => updatequantity(item, 1)}
                        >
                          +
                        </button>
                        <strong className="mx-2">{item.quantity}</strong>
                        <button
                          className="btn btn-sm baby-btn"
                          onClick={() => updatequantity(item, -1)}
                        >
                          -
                        </button>
                        <button
                          className="btn baby-remove-btn btn-sm ms-3"
                          onClick={() => RemoveCart(item.id)}
                        >
                          Remove
                        </button>
                      </p>
                      <p className="card-text baby-total-item">
                        Total: <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="baby-empty-cart" style={{color:'black'}}>Your cart is empty!</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
