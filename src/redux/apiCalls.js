import { publicRequest, userRequest } from "../requestMethods";
import { addProduct, addProductFailure, addProductStart } from "./cartRedux";
import {
  changePswdFailure,
  changePswdStart,
  changePswdSuccess,
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.msg));
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("users/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const changepassword = async (dispatch, user) => {
  dispatch(changePswdStart());
  try {
    const res = await publicRequest.post("/users/changepassword", user);
    dispatch(changePswdSuccess(res.data));
  } catch (error) {
    dispatch(changePswdFailure(error.response.data.msg));
  }
};

export const searchProduct = async (dispatch, data) => {
  dispatch(fetchProductStart());
  try {
    const res = await publicRequest.post("/products/getsearchproduct", data);
    dispatch(fetchProductSuccess(res.data));
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch(fetchProductFailure(error.response.data.msg));
  }
};

export const addToCart = async (dispatch, data) => {
  try {
    const products = data.products;
    console.log("cart data", products);
    const res = await userRequest.post(`/carts/${data.userId}`, { products });
    await getCart(dispatch, data.userId);
    return res;
  } catch (error) {
    return error;
  }
};

export const getCart = async (dispatch, userId) => {
  try {
    const userID = userId;
    console.log("cart data", userID);
    const res = await publicRequest.get(`/carts/${userId}`);
    console.log(res.data, "res get:_");
    dispatch(addProduct(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (dispatch, data) => {
  try {
    const userId = data.userId;
    const orderedProduct = data.orderedProduct;
    console.log("order data", userId, orderedProduct);
    const res = await userRequest.post(`/orders/create/${userId}`, {
      orderedProduct,
    });
    console.log(res.data, "res order:_");
  } catch (error) {
    console.log(error);
  }
};
