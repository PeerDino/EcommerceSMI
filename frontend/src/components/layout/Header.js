import React, { Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../App.css";
import smi_logo from "../../assets/smi_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Search from "./Search";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3 allign">
          <div className="navbar-brand logo">
            <Link to="/">
              <img src={smi_logo} alt="smi_logo" className="smi_logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0 input">
          <Search navigate={navigate} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center cart_login">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fas fa-shopping-cart shopping_cart"></i>
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-3"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/profile">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
