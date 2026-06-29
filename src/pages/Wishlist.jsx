import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { toggleWishlist } from "../redux/slices/wishlistSlice";

import { addToCart } from "../redux/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">My Wishlist ❤️</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center mt-5">
          <h3>Your Wishlist is Empty</h3>

          <Link to="/shop" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
              <div className="flipkart-card position-relative">
                {/* Remove Wishlist */}
                <button
                  className="wishlist-btn"
                  onClick={() => dispatch(toggleWishlist(item))}
                >
                  <FaHeart color="red" />
                </button>

                {/* Image */}
                <div className="product-image-box">
                  <img
                    src={item.image || item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="img-fluid"
                  />
                </div>

                {/* Details */}
                <div className="p-3">
                  <h6 className="product-title">
                    {item.title.slice(0, 45)}
                    ...
                  </h6>

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <h5 className="current-price">₹{item.price}</h5>

                    <span className="original-price">
                      ₹{(item.price * 1.3).toFixed(0)}
                    </span>
                  </div>

                  <button
                    className="add-cart-btn"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
