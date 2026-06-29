import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { FaStar } from "react-icons/fa";

import { addToCart } from "../redux/slices/cartSlice";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate =
    useNavigate();
  const dispatch =
    useDispatch();

  const { products } =
    useSelector(
      (state) =>
        state.products
    );

  const product =
    products.find(
      (item) =>
        item.id ===
        Number(id)
    );

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h2>
          Product Not Found
        </h2>
      </div>
    );
  }

  // Add To Cart
  const handleAddToCart =
    () => {
      dispatch(
        addToCart(
          product
        )
      );

    };

  // Buy Now
  const handleBuyNow =
    () => {
      dispatch(
        addToCart(
          product
        )
      );

      navigate(
        "/cart"
      );
    };

  return (
    <div className="container py-5">
      <div className="row bg-white shadow-sm rounded p-4">

        {/* Left Side */}
        <div className="col-lg-5 text-center">

          <img
            src={
              product.image
            }
            alt={
              product.title
            }
            className="img-fluid product-image"
          />

          {/* Buttons */}
          <div className="row mt-4 g-2">

            <div className="col-6">
              <button
                className="btn btn-warning w-100 fw-bold py-3"
                onClick={
                  handleAddToCart
                }
              >
                ADD TO CART
              </button>
            </div>

            <div className="col-6">
              <button
                className="btn btn-danger w-100 fw-bold py-3"
                onClick={
                  handleBuyNow
                }
              >
                BUY NOW
              </button>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-7 mt-4 mt-lg-0">

          <h2 className="fw-normal">
            {
              product.title
            }
          </h2>

          {/* Rating */}
          <div className="d-inline-flex align-items-center bg-success text-white px-2 py-1 rounded mt-2">

            <span className="me-1">
              {
                product
                  .rating
                  ?.rate
              }
            </span>

            <FaStar size={12} />

          </div>

          {/* Price */}
          <div className="d-flex align-items-center gap-3 mt-4">

            <h2 className="fw-bold mb-0">
              ₹
              {
                product.price
              }
            </h2>

            <span className="text-muted text-decoration-line-through fs-5">
              ₹
              {(
                product.price *
                1.3
              ).toFixed(0)}
            </span>

            <span className="text-success fw-bold">
              30% off
            </span>

          </div>

          {/* Category */}
          <p className="mt-3">
            <strong>
              Category:
            </strong>{" "}
            {
              product.category
            }
          </p>

          {/* Description */}
          <div className="mt-4">

            <h4>
              Product Details
            </h4>

            <p className="text-secondary lh-lg">
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

export default ProductDetails;