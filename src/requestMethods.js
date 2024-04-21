import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://dholakpur-api.onrender.com";

const user = localStorage.getItem("persist:root");

if (user) {
  var accessToken = JSON.parse(JSON.parse(user)?.user)?.currentUser
    ?.accessToken;
}
if (user) {
  var nUser = JSON.parse(JSON.parse(user)?.user)?.newUser;
}
console.log(accessToken);
console.log(nUser);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: accessToken
      ? `Bearer ${accessToken}`
      : console.log("No access token"),
  },
});
