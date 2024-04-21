import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalQuantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.totalQuantity = action.payload.products.length;
      console.log(state.totalQuantity);
      state.products = action.payload.products.reverse();
      state.total = action.payload.totalAmount;
      state.unauthorizedError = false;
    },
    clearCart: (state) => {
      state.totalQuantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, clearCart, addProductStart, addProductFailure } =
  cartSlice.actions;
export default cartSlice.reducer;
