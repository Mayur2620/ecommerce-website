import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../services/api";

// Fetch Products
export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",
    async () => {
      const response =
        await API.get("/products");

      return response.data;
    }
  );

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products =
            action.payload;
        }
      );
  },
});

export default productSlice.reducer;