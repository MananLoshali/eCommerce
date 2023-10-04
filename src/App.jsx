import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import ProductList from "./Pages/ProductList";
import Nomatch from "./Pages/Nomatch";
import { useSelector } from "react-redux";
import Products from "./Components/Products";
import Checkouts from "./Pages/Checkouts/Checkouts";
import Account from "./Components/Account";
import Orders from "./Pages/Orders";
import TEst from "./Pages/TEst";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const newUser = useSelector((state) => state.user.newUser);
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {newUser ? (
        <Route path="/signup" element={<Navigate to="/" />} />
      ) : (
        <Route path="/signup" element={<SignUp />} />
      )}
      {user ? (
        <Route path="/signin" element={<Navigate to="/" />} />
      ) : (
        <Route path="/signin" element={<SignIn />} />
      )}
      {user ? (
        <Route path="/signup" element={<Navigate to="/" />} />
      ) : (
        <Route path="/signup" element={<SignUp />} />
      )}
      <Route path="/cart" element={<Cart />} />
      <Route path="/productlist/:category" element={<ProductList />} />
      <Route path="/singleproduct/:id" element={<SingleProduct />} />
      <Route path="/products" element={<Products />} />
      <Route path="/checkout" element={<Checkouts />} />

      {user ? (
        <Route path="/myaccount" element={<Account />} />
      ) : (
        <Route path="/myaccount" element={<Navigate to="/" />} />
      )}

      {/* <Route path="/myaccount" element={<Account />} /> */}
      <Route path="/myorders/:id" element={<Orders />} />
      <Route path="*" element={<Nomatch />} />
      {/* <Route path="/vid" element={<TEst />} /> */}
    </Routes>
  );
}

export default App;
