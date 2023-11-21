import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    newUser: null,
    currentUser: null,
    isFetching: false,
    error: false,
    searchError: false,
    redirect: false,
    msg: "",
    searchedProduct: [],
    wishlistProduct: [],
    wishlistProductQuantity: 0,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.msg = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.msg = action.payload;
    },

    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.newUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    changePswdStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.msg = "";
    },
    changePswdSuccess: (state, action) => {
      state.isFetching = false;
      state.redirect = true;
      state.newUser = action.payload;
      state.error = false;
    },
    changePswdFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.msg = action.payload;
    },

    fetchProductStart: (state) => {
      state.isFetching = true;
      state.searchedProduct = [];
    },

    fetchProductSuccess: (state, action) => {
      state.isFetching = false;
      state.searchedProduct = action.payload;
      state.searchError = false;
    },

    fetchProductFailure: (state, action) => {
      state.isFetching = false;
      state.searchError = true;
      state.msg = action.payload;
    },

    addWishlistProduct: (state, action) => {
      state.wishlistProductQuantity += 1;
      state.wishlistProduct.push(action.payload);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  changePswdStart,
  changePswdSuccess,
  changePswdFailure,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  addWishlistProduct,
} = userSlice.actions;

export default userSlice.reducer;
