import React, { useState, useEffect } from "react";
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';


function BlockList() {
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const blockedUsers = response.data.filter((user) => user.block === true);
        setBlocked(blockedUsers);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, { block: false });
      setBlocked((prevBlocked) => prevBlocked.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-center mb-4 blocklist-title">Blocked Users</h2>
      {blocked.length > 0 ? (
        <div className="">
          <table className="table table-hover table-striped">
            <thead className="table-danger text-dark">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Email</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {blocked.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="text-center">{user.id}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="btn btn-success btn-sm unblock-btn"
                    >
                      Unblock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-secondary text-center" role="alert">
          No blocked users found.
        </div>
      )}
    </div>
  );
}

export default BlockList;
