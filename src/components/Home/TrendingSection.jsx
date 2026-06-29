import { useEffect, useState } from "react";
import {
  FaHeart,
  FaStar,
} from "react-icons/fa";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { Link } from "react-router-dom";

import { addToCart } from "../../redux/slices/cartSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import { productMatchesSearch } from "../../utils/productSearch";

import "./TrendingSection.css";

const TrendingSection = ({ searchTerm }) => {
  const [products, setProducts] =
    useState([]);
  const filteredProducts = products.filter((product) =>
    productMatchesSearch(product, searchTerm)
  );

  const dispatch =
    useDispatch();

  const wishlistItems =
    useSelector(
      (state) =>
        state.wishlist
          .wishlistItems
    );

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=8"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {
        setProducts(
          data.products
        );
      })
      .catch((err) =>
        console.log(err)
      );
  }, []);

  return (
    <div className="container mt-4">

      <div className="trending-card">

        <div className="trending-header">
          <h3>
            ⭐ Trending Products
          </h3>
        </div>

        <div className="trending-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map(
            (product) => {
              const isWishlisted =
                wishlistItems.some(
                  (item) =>
                    item.id ===
                    product.id
                );

              return (
                <div
                  key={
                    product.id
                  }
                  className="trending-item"
                >

                  <span className="best-seller">
                    BEST SELLER
                  </span>

                  <button
                    className={`wishlist-btn ${
                      isWishlisted
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      dispatch(
                        toggleWishlist({
                          ...product,
                          image:
                            product.thumbnail,
                        })
                      )
                    }
                  >
                    <FaHeart />
                  </button>

                  <Link
                    to={`/home-product/${product.id}`}
                    className="text-decoration-none text-dark"
                  >

                    <img
                      src={
                        product.thumbnail
                      }
                      alt={
                        product.title
                      }
                    />

                    <h6>
                      {
                        product.title
                      }
                    </h6>

                  </Link>

                  <div className="rating">
                    <FaStar />
                    {" "}
                    {
                      product.rating
                    }
                  </div>

                  <div className="price">
                    ₹
                    {
                      product.price
                    }
                  </div>

                  <button
                    className="cart-btn"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...product,
                          image:
                            product.thumbnail,
                        })
                      )
                    }
                  >
                    Add To Cart
                  </button>

                </div>
              );
            }
            )
          ) : (
            <p className="home-empty-message">No products found here.</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default TrendingSection;
