import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>BabyCubies</h5>
            <p>Your one-stop shop for all baby products. From toys to essentials, we’ve got everything your baby needs!</p>
            <p>
              <strong>Address:</strong> 123 Baby St., Playville, BB 45678
            </p>
            <p>
              <strong>Email:</strong> support@babycubies.com
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#cat">Categories</a></li>
              <li><a href="#">Shop Now</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#"><i className="bi bi-facebook"></i> </a>
              <a href="#"><i className="bi bi-instagram"></i> </a>
              <a href="#"><i className="bi bi-twitter"></i> </a>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <p>&copy; 2024 BabyCubies. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
