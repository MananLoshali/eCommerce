import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// var accessToken;

// setTimeout(() => {
//   const user = localStorage.getItem("persist:root");
//   if (user) {
//     accessToken = JSON.parse(JSON.parse(user).user).currentUser;
//     console.log(accessToken);
//   }
// }, 5000);

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

// if (!user) {
//   console.log("No user");
// } else if (user && !JSON.parse(JSON.parse(user).user).currentUser) {
//   console.log("No access token");
// } else {
//   var accessToken = JSON.parse(JSON.parse(user).user).currentUser.accessToken;
//   console.log(accessToken);
// }

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
