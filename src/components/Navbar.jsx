import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaBoxOpen,
  FaChevronDown,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaStore,
  FaUser,
} from "react-icons/fa";

import AuthModal from "../components/AuthModal.jsx";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const dropdownRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  });

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isLoggedIn = Boolean(currentUser);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsUserMenuOpen(false);
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand logo" to="/home">
          ShopEasy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="search-box mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button className="search-btn" type="button">
              <FaSearch />
            </button>
          </div>

          <div className="navbar-actions navbar-nav ms-auto align-items-center">
            <Link className="nav-action" to="/shop">
              <FaStore className="nav-action-icon" />
              Shop
            </Link>

            <Link className="nav-action icon-action" to="/wishlist" aria-label="Wishlist">
              <span className="nav-icon-wrap">
                <FaHeart className="nav-action-icon" />

                {wishlistItems.length > 0 && (
                  <span className="cart-badge">{wishlistItems.length}</span>
                )}
              </span>
              <span className="nav-action-label">Wishlist</span>
            </Link>

            <Link className="nav-action icon-action" to="/cart" aria-label="Cart">
              <span className="nav-icon-wrap">
                <FaShoppingCart className="nav-action-icon" />

                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </span>
              <span className="nav-action-label">Cart</span>
            </Link>

            <Link className="nav-action" to="/orders">
              <FaBoxOpen className="nav-action-icon" />
              Orders
            </Link>

            {isLoggedIn ? (
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="user-menu-button"
                  type="button"
                  aria-expanded={isUserMenuOpen}
                  onClick={() =>
                    setIsUserMenuOpen((isOpen) => !isOpen)
                  }
                >
                  <FaUser className="nav-action-icon" />
                  <span>{currentUser?.name}</span>
                  <FaChevronDown className="user-menu-chevron" />
                </button>

                <ul
                  className={`dropdown-menu${isUserMenuOpen ? " show" : ""}`}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <AuthModal onAuthSuccess={setCurrentUser} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
