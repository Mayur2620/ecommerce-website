import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "/home" },
    { label: "Shop", to: "/shop" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Orders", to: "/orders" },
  ];

  const serviceLinks = [
    { label: "Help Center", to: "/customer-service/help-center" },
    { label: "Returns", to: "/customer-service/returns" },
    { label: "Privacy Policy", to: "/customer-service/privacy-policy" },
    { label: "Terms & Conditions", to: "/customer-service/terms" },
  ];

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-top">

          <div className="footer-brand">
            <h2>ShopEasy</h2>

            <p>
              Your one-stop destination for
              electronics, fashion, accessories,
              and daily essentials.
            </p>
          </div>

          <div className="footer-links">
            <h5>Quick Links</h5>

            <ul>
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h5>Customer Service</h5>

            <ul>
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h5>Contact</h5>

            <ul>
              <li>Pune, Maharashtra</li>
              <li>support@shopeasy.com</li>
              <li>+91 9876543210</li>
            </ul>
          </div>

        </div>

        <div className="footer-social">

          <a href="#">
            <FaFacebookF />
          </a>

          <a href="#">
            <FaInstagram />
          </a>

          <a href="#">
            <FaLinkedinIn />
          </a>

          <a href="#">
            <FaTwitter />
          </a>

          <a href="#">
            <FaYoutube />
          </a>

        </div>

        <div className="footer-bottom">
          © 2026 ShopEasy. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;
