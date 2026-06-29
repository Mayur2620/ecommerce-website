import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import "./ProductCard.css";

const ProductCard = ({ product, detailsPath }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  return (
    <div className="deal-product-card">

      <span className="discount-badge">
        {Math.round(
          product.discountPercentage || 10
        )}
        % OFF
      </span>

      <button
        className={`wishlist-btn ${
          isWishlisted ? "active" : ""
        }`}
        onClick={() =>
          dispatch(
            toggleWishlist({
              ...product,
              image:
                product.image ||
                product.thumbnail,
            })
          )
        }
      >
        <FaHeart />
      </button>

      <Link
        to={`${detailsPath}/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={
            product.image ||
            product.thumbnail
          }
          alt={product.title}
        />

        <h6>{product.title}</h6>
      </Link>

      <div className="rating">
        <FaStar />
        {" "}
        {product.rating}
      </div>

      <div className="price-section">
        <span className="new-price">
          ₹{product.price}
        </span>
      </div>

      <Link
        to={`${detailsPath}/${product.id}`}
        className="btn btn-outline-primary w-100 mt-2"
      >
        View Details
      </Link>

      <button
        className="btn btn-primary w-100 mt-2"
        onClick={() =>
          dispatch(
            addToCart({
              ...product,
              image:
                product.image ||
                product.thumbnail,
            })
          )
        }
      >
        Add To Cart
      </button>

    </div>
  );
};

export default ProductCard;