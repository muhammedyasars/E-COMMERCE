import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      navigate("/"); 
    }
  };

  return (
    <div className="admin-page-container">


      <nav className="navbar navbar-expand-lg admin-navbar sticky-top" style={{borderRadius:'0px'}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin" >
            <span>B</span>aby<span>C</span>ubies 
          </a>
          <h2 className="navbar-brand" style={{color:'black'}}>Admin</h2>
          <div className="ms-auto">
            <button
              className="btn btn-danger logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-content">


        <aside className="sidebar">
          <ul className="sidebar-menu">
            <br />
            <li>
              <Link to="/admin" className="sidebar-link">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to='/admin/users' className="sidebar-link">
                👥 Users
              </Link>
            </li>
            <li>
              <Link to='/admin/products' className="sidebar-link">
                🛍️ Products
              </Link>
            </li>
            <li>
              <Link to='/admin/Blocklist'  className="sidebar-link">
                🚫 BlockList
              </Link>
            </li>
          </ul>
        </aside>
    
        <main className="main-content">
            <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
