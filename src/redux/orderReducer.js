import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalOrders: 0,
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders = action.payload.orders;
      state.totalOrders = action.payload.orders.length;
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
