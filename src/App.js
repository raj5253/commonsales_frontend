import "./App.css";

// build in imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components imports
import SharedLayout from "./components/shared/SharedLayout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./components/orders/Orders";
import Deals from "./pages/Deals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="deals" element={<Deals />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// profile/update bad me denge
