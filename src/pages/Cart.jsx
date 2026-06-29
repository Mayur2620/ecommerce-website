import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Cart = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const cartItems =
    useSelector(
      (state) =>
        state.cart
          .cartItems
    );

  // Total Price
  const totalPrice =
  cartItems.reduce(
    (
      total,
      item
    ) =>
      total +
      item.price *
        item.quantity,
    0
  );

const totalDiscount =
  totalPrice * 0.20;

const finalAmount =
  totalPrice -
  totalDiscount;

  // Checkout
  const handleCheckout =
    () => {
      const isLoggedIn =
        localStorage.getItem(
          "isLoggedIn"
        );

      if (
        !isLoggedIn
      ) {
        return toast.error(
          "Please Login First 🔐"
        );
      }

      navigate(
        "/checkout"
      );
    };

  return (
    <div className="container py-5">

      <h2 className="mb-4 fw-bold">
        My Cart 🛒
      </h2>

      {cartItems.length ===
      0 ? (
        <div className="text-center mt-5">

          <h3>
            Your Cart
            is Empty
          </h3>

          <button
            className="btn btn-primary mt-3"
            onClick={() =>
              navigate(
                "/shop"
              )
            }
          >
            Continue Shopping
          </button>

        </div>
      ) : (
        <div className="row">

          {/* Left Side */}
          <div className="col-lg-8">

            {cartItems.map(
              (item) => (
                <div
                  className="card shadow-sm border-0 mb-3 p-3"
                  key={
                    item.id
                  }
                >
                  <div className="row align-items-center">

                    {/* Image */}
                    <div className="col-md-3 text-center">

                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.title
                        }
                        className="img-fluid"
                        style={{
                          height:
                            "120px",
                          objectFit:
                            "contain",
                        }}
                      />

                    </div>

                    {/* Details */}
                    <div className="col-md-5">

                      <h5>
                        {
                          item.title
                        }
                      </h5>

                      <h6 className="text-success fw-bold mt-2">
                        ₹
                        {
                          item.price
                        }
                      </h6>

                    </div>

                    {/* Quantity */}
                    <div className="col-md-2 text-center">

                      <div className="d-flex justify-content-center align-items-center gap-2">

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(
                                item.id
                              )
                            )
                          }
                        >
                          -
                        </button>

                        <span className="fw-bold">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            dispatch(
                              increaseQuantity(
                                item.id
                              )
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Remove */}
                    <div className="col-md-2 text-center">

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch(
                            removeFromCart(
                              item.id
                            )
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              )
            )}

          </div>

          {/* Right Side Bill */}
          <div className="col-lg-4">

            <div className="card shadow border-0 p-4 sticky-top">

              <h4 className="fw-bold mb-4">
                Price Details
              </h4>

              <div className="d-flex justify-content-between mb-3">
                <span>
                  Price (
                  {
                    cartItems.length
                  } items)
                </span>

                <strong>
                  ₹
                  {totalPrice.toFixed(
                    0
                  )}
                </strong>
              </div>

             <div className="d-flex justify-content-between mb-3">

  <span>
    Price (
    {
      cartItems.length
    } items)
  </span>

  <strong>
    ₹
    {totalPrice.toFixed(
      0
    )}
  </strong>

</div>

<div className="d-flex justify-content-between mb-3 text-success">

  <span>
    Discount (20%)
  </span>

  <strong>
    − ₹
    {totalDiscount.toFixed(
      0
    )}
  </strong>

</div>

<div className="d-flex justify-content-between mb-3">

  <span>
    Delivery Charges
  </span>

  <strong className="text-success">
    FREE
  </strong>

</div>

<hr />

<div className="d-flex justify-content-between fs-5 fw-bold">

  <span>
    Total Amount
  </span>

  <span>
    ₹
    {finalAmount.toFixed(
      0
    )}
  </span>

</div>

<div className="alert alert-success mt-3 mb-0">

  🎉 You saved ₹
  {totalDiscount.toFixed(
    0
  )}
  {" "}on this order!

</div>

              {/* Checkout Button */}
              <button
                className="btn btn-warning w-100 py-3 fw-bold fs-5 mt-4"
                onClick={
                  handleCheckout
                }
              >
                PROCEED TO CHECKOUT
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;