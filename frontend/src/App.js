import { useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import { loadUser } from "./actions/userAction";
import store from "./store";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/route/Protectroute";
import UpdateProfile from "./components/User/Updateprofile";
import NewPassword from "./components/User/NewPassword";
import ForgotPassword from "./components/User/ForgetPassword";
import UpdatePassword from "./components/User/updatePassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/confirmOrders";
import Dashboard from "./components/admin/Dashboard";
import NewProduct from "./components/admin/NewProduct";
import ProductsList from "./components/admin/ProductList";
import UpdateProduct from "./components/admin/UpdataProducts";
import OrdersList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdataUser";
import ProductReviews from "./components/admin/ProductReview";
import { useSelector } from "react-redux";
import ListOrders from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetail";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());

    // async function getStripApiKey() {
    //   const { data } = await axios.get("/api/v1/stripeapi");

    //   setStripeApiKey(data.stripeApiKey);
    // }

    // getStripApiKey();
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login/shipping" element={<ProtectedRoute />}>
              <Route index element={<Shipping />} />
            </Route>
            <Route path="/confirm" element={<ProtectedRoute />}>
              <Route index element={<ConfirmOrder />} />
            </Route>
            <Route path="/payment" element={<ProtectedRoute />}>
              <Route index element={<Payment />} />
            </Route>
            <Route path="/success" element={<ProtectedRoute />}>
              <Route index element={<OrderSuccess />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/profile" element={<ProtectedRoute />} exact>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route>
              <Route path="/profile/update" element={<UpdateProfile />} />
            </Route>
            <Route>
              <Route path="/password/update" element={<UpdatePassword />} />
            </Route>
            {/* Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<Dashboard />} />
            </Route>
            <Route path="/admin/products" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<ProductsList />} />
            </Route>
            <Route path="/admin/product" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<NewProduct />} />
            </Route>
            <Route path="/admin/product/:id" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<UpdateProduct />} />
            </Route>
            <Route path="/admin/orders" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<OrdersList />} />
            </Route>
            <Route path="/admin/users" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<UsersList />} />
            </Route>
            {/* //orders */}
            <Route path="/admin/orders" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<OrdersList />} />
            </Route>
            <Route path="/admin/order/:id" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<ProcessOrder />} />
            </Route>
            <Route path="/admin/user/:id" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<UpdateUser />} />
            </Route>
            <Route path="/admin/reviews" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<ProductReviews />} />
            </Route>
            <Route path="/orders/profile" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<ListOrders />} />
            </Route>
            <Route path="/order/:id" element={<ProtectedRoute />}>
              <Route isAdmin={true} index element={<OrderDetails />} />
            </Route>
          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
      </div>
    </Router>
  );
}

export default App;
