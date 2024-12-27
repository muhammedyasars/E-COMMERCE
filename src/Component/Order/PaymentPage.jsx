import React, { useContext, useState } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { newcontext } from "../../Context/Context";
import axios from "axios";

function PaymentPage() {
    const navigate=useNavigate()
    const {orders,cart,totalAmount}=useContext(newcontext)
  const [selectedMethod, setSelectedMethod] = useState(null);
  let id=localStorage.getItem('id')

  const handlePaymentChange = (e) => {
    setSelectedMethod(e.target.value);
  };
  console.log(orders);
  
  const confirm=()=>{
    let id=localStorage.getItem('id')
        const newOrders = {
          cartitems: cart,
          totalAmount,
        };
        axios
          .patch(`http://localhost:3000/users/${id}`, {
            order: [...orders, newOrders],
            cart: [],
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        alert("Success");
      }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod) {
      alert(`Payment Method Selected: ${selectedMethod}`);
      navigate('/orderpage')
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="container mt-5 baby-theme">
      <div className="card baby-card">
        <div className="card-body">
          <h2 className="text-center baby-title">Payment Options</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label baby-label">Choose Payment Method:</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="UPI"
                  className="form-check-input"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="upi" className="form-check-label baby-option">
                  UPI
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="googlePay"
                  name="paymentMethod"
                  value="Google Pay"
                  className="form-check-input"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="googlePay" className="form-check-label baby-option">
                  Google Pay
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  className="form-check-input"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="cod" className="form-check-label baby-option">
                  Cash on Delivery
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="debitCard"
                  name="paymentMethod"
                  value="Debit Card"
                  className="form-check-input"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="debitCard" className="form-check-label baby-option">
                  Debit Card
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="Credit Card"
                  className="form-check-input"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="creditCard" className="form-check-label baby-option">
                  Credit Card
                </label>
              </div>
            </div>

            <button type="submit" className="btn baby-submit-btn" onClick={confirm}>
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
