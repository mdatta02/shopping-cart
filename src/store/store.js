import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../reducers/ProductsSlice";

export default configureStore({
  reducer: {
    products: productsSlice,
  },
});
