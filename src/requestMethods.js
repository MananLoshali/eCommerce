import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const user = localStorage.getItem("persist:root");

if (!user) {
  console.log("No user");
} else if (user && !JSON.parse(JSON.parse(user).user).currentUser) {
  console.log("No access token");
} else {
  var accessToken = JSON.parse(JSON.parse(user).user).currentUser.accessToken;
  console.log(accessToken);
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: accessToken ? `Bearer ${accessToken}` : console.log("SJhgj"),
  },
});
