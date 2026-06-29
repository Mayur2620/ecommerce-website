import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { clearCart } from "../redux/slices/cartSlice";

const Checkout = () => {
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

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

  // Empty Cart Protection
  if (
    cartItems.length ===
    0
  ) {
    navigate("/shop");
  }

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      return toast.error(
        "Please fill all details"
      );
    }

    // Calculate Total
    const total =
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

    // Create Order
    const orderData = {
      orderId:
        "ORD" +
        Math.floor(
          100000 +
            Math.random() *
              900000
        ),

      date:
        new Date().toLocaleDateString(),

      customer:
        {
          ...formData,
          paymentMethod: "COD",
        },

      total,

      items:
        cartItems,
    };

    // Save Orders
    const orders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || [];

    orders.push(
      orderData
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(
        orders
      )
    );

    // Save Last Order
    localStorage.setItem(
      "lastOrder",
      JSON.stringify(
        orderData
      )
    );

    // Clear Cart
    dispatch(
      clearCart()
    );

    toast.success(
      "Order Placed Successfully 🎉"
    );

    navigate(
      "/order-success"
    );
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0 p-4">

            <h2 className="text-center mb-4">
              Checkout
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">
                  Mobile Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">
                  Address
                </label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* City */}
              <div className="mb-3">
                <label className="form-label">
                  City
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* Pincode */}
              <div className="mb-3">
                <label className="form-label">
                  Pincode
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={
                    formData.pincode
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* Payment */}
              <div className="mb-4">
                <label className="form-label">
                  Payment Method
                </label>

                <div className="alert alert-success fw-bold mb-0">
                  Cash On Delivery
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 py-3 fw-bold"
              >
                PLACE ORDER
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;
