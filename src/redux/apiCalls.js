import { publicRequest } from "../requestMethods";
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
