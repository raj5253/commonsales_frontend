import "./App.css";

// build in imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components imports
import SharedLayout from "./components/shared/SharedLayout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Error from "./pages/Error";
import Cart from "./components/cart/Cart";
import Profile from "./pages/profile/Profile";
import Orders from "./components/orders/Orders";
import Product from "./components/products/Product";
import Failure from "./components/orders/Failure";
import Success from "./components/orders/Success";
import PlaceOrder from "./components/stripe/PlaceOrder";
import AdmProtectRoute from "./pages/admin/AdmProtectRoute";
import ManageOrders from "./pages/admin/orders/ManageOrders";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import ForgotPass from "./pages/Auth/ForgotPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="success" element={<Success />} />
          <Route path="failure" element={<Failure />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products/:pid" element={<Product />} />
          <Route path="placeorder" element={<PlaceOrder />} />
          <Route path="admin" element={<AdmProtectRoute />}>
            <Route path="manageProducts" element={<ManageProducts />} />
            <Route path="manageOrders" element={<ManageOrders />} />
            <Route path="editProduct/:pid" element={<EditProduct />} />
            <Route path="addProduct" element={<AddProduct />} />
          </Route>
          <Route path="forgotPassword" element={<ForgotPass />} />
          <Route path="error" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// profile/update bad me denge
