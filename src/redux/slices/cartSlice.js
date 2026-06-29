import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Load Cart
const savedCart =
  JSON.parse(
    localStorage.getItem(
      "cartItems"
    )
  ) || [];

const initialState = {
  cartItems:
    savedCart,
};

const cartSlice =
  createSlice({
    name: "cart",
    initialState,

    reducers: {
      // Add To Cart
     addToCart: (
  state,
  action
) => {
  const product = {
    ...action.payload,

    image:
      action.payload.image ||
      action.payload.thumbnail ||
      action.payload.images?.[0] ||
      "",
  };

  const existingItem =
    state.cartItems.find(
      (item) =>
        item.id === product.id
    );

  if (existingItem) {
    existingItem.quantity += 1;

    toast.success(
      "Quantity Updated 🛒"
    );
  } else {
    state.cartItems.push({
      ...product,
      quantity: 1,
    });

    toast.success(
      "Added To Cart 🛒"
    );
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(
      state.cartItems
    )
  );
},

      // Remove Product
      removeFromCart:
        (
          state,
          action
        ) => {
          state.cartItems =
            state.cartItems.filter(
              (
                item
              ) =>
                item.id !==
                action.payload
            );

          toast.error(
            "Removed From Cart ❌"
          );

          localStorage.setItem(
            "cartItems",
            JSON.stringify(
              state.cartItems
            )
          );
        },

      // Increase
      increaseQuantity:
        (
          state,
          action
        ) => {
          const item =
            state.cartItems.find(
              (
                item
              ) =>
                item.id ===
                action.payload
            );

          if (
            item
          ) {
            item.quantity += 1;
          }

          localStorage.setItem(
            "cartItems",
            JSON.stringify(
              state.cartItems
            )
          );
        },

      // Decrease
      decreaseQuantity:
        (
          state,
          action
        ) => {
          const item =
            state.cartItems.find(
              (
                item
              ) =>
                item.id ===
                action.payload
            );

          if (
            item &&
            item.quantity >
              1
          ) {
            item.quantity -= 1;
          }

          localStorage.setItem(
            "cartItems",
            JSON.stringify(
              state.cartItems
            )
          );
        },

      // Clear Cart
      clearCart: (
        state
      ) => {
        state.cartItems =
          [];

        localStorage.removeItem(
          "cartItems"
        );

        toast.success(
          "Order Placed Successfully ✅"
        );
      },
    },
  });

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} =
  cartSlice.actions;

export default cartSlice.reducer;