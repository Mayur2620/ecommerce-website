import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  FaStar,
  FaHeart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

import { toggleWishlist } from "../redux/slices/wishlistSlice";

import "./Shop.css";

const Shop = ({
  searchTerm,
}) => {
  const dispatch =
    useDispatch();

  const {
    products,
    loading,
  } = useSelector(
    (state) =>
      state.products
  );

  const {
    wishlistItems,
  } = useSelector(
    (state) =>
      state.wishlist
  );

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(
    "all"
  );

  // Fetch Products
  useEffect(() => {
    dispatch(
      fetchProducts()
    );
  }, [dispatch]);

  // Filter Products
  const filteredProducts =
    products.filter(
      (item) => {
        const categoryMatch =
          selectedCategory ===
            "all" ||
          item.category ===
            selectedCategory;

        const searchMatch =
          item.title
            .toLowerCase()
            .includes(
              searchTerm?.toLowerCase() ||
                ""
            );

        return (
          categoryMatch &&
          searchMatch
        );
      }
    );

  return (
    <div className="shop-container">

      {/* Categories */}
      <div className="category-section">

        <button
          className={`category-btn ${
            selectedCategory ===
            "all"
              ? "active-category"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory(
              "all"
            )
          }
        >
          All
        </button>

        <button
          className={`category-btn ${
            selectedCategory ===
            "electronics"
              ? "active-category"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory(
              "electronics"
            )
          }
        >
          Electronics
        </button>

        <button
          className={`category-btn ${
            selectedCategory ===
            "jewelery"
              ? "active-category"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory(
              "jewelery"
            )
          }
        >
          Jewelery
        </button>

        <button
          className={`category-btn ${
            selectedCategory ===
            "men's clothing"
              ? "active-category"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory(
              "men's clothing"
            )
          }
        >
          Men's Clothing
        </button>

        <button
          className={`category-btn ${
            selectedCategory ===
            "women's clothing"
              ? "active-category"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory(
              "women's clothing"
            )
          }
        >
          Women's Clothing
        </button>

      </div>

      {/* Products */}
      <div className="container mt-4">

        {loading ? (
          <h2 className="text-center">
            Loading...
          </h2>
        ) : (
          <div className="row">
            {filteredProducts.map(
              (item) => {
                const isWishlisted =
                  wishlistItems.some(
                    (
                      wishlistItem
                    ) =>
                      wishlistItem.id ===
                      item.id
                  );

                return (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    key={
                      item.id
                    }
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="flipkart-card position-relative">

                        {/* Wishlist Heart */}
                        <button
                          className="wishlist-btn"
                          onClick={(
                            e
                          ) => {
                            e.preventDefault();

                            dispatch(
                              toggleWishlist(
                                item
                              )
                            );
                          }}
                        >
                          <FaHeart
                            color={
                              isWishlisted
                                ? "red"
                                : "#ccc"
                            }
                          />
                        </button>

                        {/* Image */}
                        <div className="product-image-box">
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.title
                            }
                            className="product-image"
                          />
                        </div>

                        {/* Details */}
                        <div className="p-3">

                          <h6 className="product-title">
                            {item.title.slice(
                              0,
                              45
                            )}
                            ...
                          </h6>

                          <div className="rating-box">
                            {item
                              .rating
                              ?.rate ||
                              4.5}

                            <FaStar size={12} />
                          </div>

                          <div className="d-flex align-items-center gap-2 mt-2">

                            <h5 className="current-price">
                              ₹
                              {
                                item.price
                              }
                            </h5>

                            <span className="original-price">
                              ₹
                              {(
                                item.price *
                                1.3
                              ).toFixed(
                                0
                              )}
                            </span>

                            <span className="discount-text">
                              30%
                              off
                            </span>

                          </div>

                          <button
                            className="add-cart-btn"
                            onClick={(
                              e
                            ) => {
                              e.preventDefault();

                              dispatch(
                                addToCart(
                                  item
                                )
                              );
                            }}
                          >
                            Add To Cart
                          </button>

                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;