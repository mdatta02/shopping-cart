import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productsList = createAsyncThunk(
  "shopping/list",
  async (_, thunkAPI) => {
    try {
      let url = "http://fakestoreapi.com/products";
      let products = fetch(url, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else throw Error("Invalid api call");
        })
        .then((data) => data)
        .catch((error) => thunkAPI.rejectWithValue(error));
      return products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    products: [],
    cartProducts: [],
  },
  reducers: {
    addToCartList: (state, action) => {
      state.cartProducts = action.payload;
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { addToCartList, removeFromCart, countProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
