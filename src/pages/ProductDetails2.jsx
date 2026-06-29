import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar, FaHeart } from "react-icons/fa";

import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

import "./ProductDetails.css";

const ProductDetails2 = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products/${id}`
    )
      .then((res) => res.json())
      .then((data) =>
        setProduct(data)
      );
  }, [id]);

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row bg-white shadow rounded p-4">

        {/* Left */}

        <div className="col-lg-5 text-center">

          <img
            src={
              product.thumbnail
            }
            alt={
              product.title
            }
            className="img-fluid product-image"
          />

          <div className="row mt-4 g-2">

            <div className="col-6">
              <button
                className="btn btn-warning w-100 fw-bold"
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
                ADD TO CART
              </button>
            </div>

            <div className="col-6">
              <button
                className="btn btn-danger w-100 fw-bold"
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
                ❤️ WISHLIST
              </button>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="col-lg-7">

          <h2>
            {product.title}
          </h2>

          <div className="d-inline-flex align-items-center bg-success text-white px-2 py-1 rounded mt-2">

            <span className="me-1">
              {product.rating}
            </span>

            <FaStar size={12} />

          </div>

          <div className="mt-4">

            <h2 className="fw-bold">
              ₹{product.price}
            </h2>

            <span className="text-success fw-bold">
              {Math.round(
                product.discountPercentage
              )}
              % OFF
            </span>

          </div>

          <p className="mt-3">
            <strong>Brand:</strong>{" "}
            {product.brand}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.stock}
          </p>

          <div className="mt-4">

            <h4>
              Product Description
            </h4>

            <p>
              {
                product.description
              }
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails2;