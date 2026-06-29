import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Load Wishlist
const savedWishlist =
  JSON.parse(
    localStorage.getItem(
      "wishlistItems"
    )
  ) || [];

const initialState = {
  wishlistItems:
    savedWishlist,
};

const wishlistSlice =
  createSlice({
    name: "wishlist",
    initialState,

    reducers: {
      toggleWishlist: (
        state,
        action
      ) => {
        const existingItem =
          state.wishlistItems.find(
            (item) =>
              item.id ===
              action.payload.id
          );

        // Remove
        if (
          existingItem
        ) {
          state.wishlistItems =
            state.wishlistItems.filter(
              (item) =>
                item.id !==
                action.payload.id
            );

          toast.error(
            "Removed From Wishlist ❌"
          );
        }

        // Add
        else {
  state.wishlistItems.push({
    ...action.payload,

    image:
      action.payload.image ||
      action.payload.thumbnail ||
      action.payload.images?.[0] ||
      "",
  });

  toast.success(
    "Added To Wishlist ❤️"
  );
}

        // Save
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(
            state.wishlistItems
          )
        );
      },
    },
  });

export const {
  toggleWishlist,
} =
  wishlistSlice.actions;

export default wishlistSlice.reducer;