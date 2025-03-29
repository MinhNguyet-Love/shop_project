import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Exclusive Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold">Exclusive</h5>
            <p className="fw-bold">Subscribe</p>
            <p>Get 10% off your first order</p>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Enter your email" />
              <button className="btn btn-primary">&rarr;</button>
            </div>
          </div>

          {/* Support Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold">Support</h5>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Account Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold">Account</h5>
            <p><a href="#" className="text-white text-decoration-none">My Account</a></p>
            <p><a href="#" className="text-white text-decoration-none">Login / Register</a></p>
            <p><a href="#" className="text-white text-decoration-none">Cart</a></p>
            <p><a href="#" className="text-white text-decoration-none">Wishlist</a></p>
            <p><a href="#" className="text-white text-decoration-none">Shop</a></p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold">Quick Link</h5>
            <p><a href="#" className="text-white text-decoration-none">Privacy Policy</a></p>
            <p><a href="#" className="text-white text-decoration-none">Terms Of Use</a></p>
            <p><a href="#" className="text-white text-decoration-none">FAQ</a></p>
            <p><a href="#" className="text-white text-decoration-none">Contact</a></p>
          </div>

          {/* Download App Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold">Download App</h5>
            <p>Save $3 with App New User Only</p>
            <div className="d-flex">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="img-fluid me-2" style={{ height: "40px" }} />
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="img-fluid" style={{ height: "40px" }} />
            </div>
            <div className="mt-3 d-flex">
              <FaFacebookF className="me-3" size={20} />
              <FaTwitter className="me-3" size={20} />
              <FaInstagram className="me-3" size={20} />
              <FaLinkedin size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-3 bg-secondary mt-4">
        © Copyright
      </div>
    </footer>
  );
};

export default Footer;
