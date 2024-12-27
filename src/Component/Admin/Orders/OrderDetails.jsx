// OrderDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./OrderDetails.css"; 

function OrderDetails() {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Order Details for User {user?.username}
      </h1>
      {user ? (
        <div>
          <p>
            <strong className="text-gray-700">Email:</strong> {user.email}
          </p>
          <div className="mt-4">
            <strong className="text-gray-700">Orders:</strong>
            {user.order?.length > 0 ? (
              user.order.map((order, idx) => (
                <div key={idx} className="border-t mt-2 pt-2">
                  <p className="font-medium text-gray-700">Order #{idx + 1}</p>
                  <ul className="list-disc pl-5">
                    {order.cartitems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 mt-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full border"
                        />
                        <span>
                          {item.name} - ${item.price} x {item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">
                    <strong className="text-gray-700">Total:</strong> $
                    {order.totalAmount}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No orders</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => history.push("/")}
      >
        Back to Users List
      </button>
    </div>
  );
}

export default OrderDetails;
