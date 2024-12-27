import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data.slice(1)); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleBlockUser = async (userId, isBlocked) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        block: !isBlocked,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, block: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        User Management
      </h1>
      {users.length === 0 ? (
        <div className="text-center bg-gray-100 border border-gray-300 p-4 rounded-md shadow-md">
          <p className="text-gray-600">No users available</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs">
                <th className="px-6 py-3 border">ID</th>
                <th className="px-6 py-3 border">Email</th>
                <th className="px-6 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 border text-center">{user.id}</td>
                  <td className="px-6 py-4 border text-center">{user.email}</td>
                  <td className="px-6 py-4 border text-center">
                    <button
                      className={`button ${user.block ? "button-unblock" : "button-block"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBlockUser(user.id, user.block);
                      }}
                    >
                      {user.block ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="modal-header">User Details</h2>
            <p>
              <strong className="text-gray-700">ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong className="text-gray-700">Username:</strong>{" "}
              {selectedUser.username}
            </p>
            <p>
              <strong className="text-gray-700">Email:</strong>{" "}
              {selectedUser.email}
            </p>
            <div className="mt-4">
              <strong className="text-gray-700">Orders:</strong>
              {selectedUser.order?.length > 0 ? (
                selectedUser.order.map((order, idx) => (
                  <div key={idx} className="border-t mt-2 pt-2">
                    <p className="font-medium text-gray-700">Order #{idx + 1}</p>
                    <ol className="list-disc pl-5">
                      {order.cartitems.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 mt-1">
                          <span>
                            {item.name} - ₹{item.price} x {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-2">
                      <strong className="text-gray-700">Total:</strong> ₹
                      {order.totalAmount}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No orders</p>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
