import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { newcontext } from "../../Context/Context";
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  const name = localStorage.getItem('name')
  const { products, setname, isLogged, setislogged,cart } = useContext(newcontext);

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim() !== "") {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };
  useEffect(() => {
    const id = localStorage.getItem('id')
    if (id) {
      setislogged(true)
    }
  }, [])

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
  };

  const handleProductClick = () => {
    clearSearch();
  };
         
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      setname(null);
      setislogged(false);
      navigate("/");
    }
  };
  const handlelogin = () => {
    const id = localStorage.getItem('id');
    if (id) {
      setislogged(true)
    }
    navigate("/Loginpage");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span>B</span>aby<span>C</span>ubies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                🏠 Home
              </a>
            </li>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <li className="nav-item">
  {isLogged ? (
    <span className="nav-link nav-link-hi">Hi {name}</span>
  ) : (
    <span className="nav-link nav-link-hi" style={{ color: 'red' }}>
      Please Login
    </span>
  )}
</li>;
          </ul>
          <form className="d-flex position-relative search-bar">
            <input
              className="form-control me-2"
              type="search"
              placeholder="🔍 Search for baby products..."
              value={query}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <div className="dropdown-menu show position-absolute w-100 mt-2">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="dropdown-item"
                    onClick={handleProductClick}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <button className="btn search-button" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link cart-link" href="/cart">
                🛒 Cart
              </a>
            </li>
           {
            isLogged? ( <span style={{borderRadius:'100%',display:"flex",backgroundColor:'red',height:"20px",width:"20px",alignItems:'center',justifyContent:'center'}}>{cart?.length}</span>): 
            (<span> </span>)
           }
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <li className="nav-item">
              {isLogged ? (
                <button
                  className="btn logout-button"
                  role="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn login-button"
                  role="button"
                  onClick={handlelogin}
                >
                  👶 Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
