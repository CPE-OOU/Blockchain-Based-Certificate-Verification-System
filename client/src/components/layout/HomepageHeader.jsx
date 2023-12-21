/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import LoginModal from "../pages/LoginModal";
import HomepageBanner from "./HompageBanner";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const HomepageHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  // ...

  let userRole;

  if (user && typeof user.token === "string") {
    const decodedToken = jwtDecode(user.token);
    if (decodedToken) {
      userRole = decodedToken.role;
    }
  }

  const textStyleDark = {
    color: "white",
    fontWeight: "bold",
  };

  const textStyleLight = {
    color: "#082ba1",
    fontWeight: "bold",
  };

  const menuToggleClassName = `header-navbar fadeInDown menu-mobile ${
    toggleSidebar ? "menu-shown" : ""
  }`;
  return (
    <>
      <div className="header-main">
        <div className="header-container container">
          <div className="header-wrap">
            <div
              className="header-logo logo fadeInDown"
              data-animate="fadeInDown"
              data-delay=".6"
            >
              <a href="/" className="logo-link">
                <h1 className="logo-dark" style={textStyleLight}>
                  BCVS
                </h1>
                <h1 className="logo-light" style={textStyleDark}>
                  BCVS
                </h1>
                {/* <img className="logo-dark" src="images/logo.png" srcSet="images/logo2x.png 2x" alt="logo" />
              <img className="logo-light" src="images/logo-full-white.png" srcSet="images/logo-full-white2x.png 2x" alt="logo" /> */}
              </a>
            </div>
            <div className="header-nav-toggle">
              <a
                className="navbar-toggle"
                data-menu-toggle="header-menu"
                onClick={(event) => {
                  event.stopPropagation();
                  setToggleSidebar(true);
                }}
              >
                <div className="toggle-line">
                  <span></span>
                </div>
              </a>
            </div>
            <div
              className={menuToggleClassName}
              data-animate="fadeInDown"
              data-delay=".75"
            >
              <nav className="header-menu" id="header-menu">
                <ul className="menu">
                  <li className="menu-item">
                    <a className="menu-link nav-link active" href="/home">
                      Home
                    </a>
                  </li>
                  <li className="menu-item">
                    <Link className="menu-link nav-link" to="/verify">
                      Verify Certificate
                    </Link>
                  </li>
                  {user && (
                    <>
                      <li className="menu-item">
                        <Link
                          className="menu-link nav-link"
                          to={
                            userRole === "admin"
                              ? "/certificates"
                              : "/my-certificates"
                          }
                        >
                          Certificates
                        </Link>
                      </li>

                      <li className="menu-item">
                        <a href="#" onClick={onLogout}>
                          Log Out
                        </a>
                      </li>
                    </>
                  )}

                  {user ? (
                    <li className="menu-item has-sub">
                      <a className="menu-link nav-link menu-toggle" href="#">
                        More
                      </a>
                      <ul className="menu-sub menu-drop">
                        <li className="menu-item">
                          <a href="#" onClick={onLogout}>
                            Log Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  ) : null}
                </ul>

                {user ? (
                  <ul className="menu-btns">
                    <li className="toggle-wrap">
                      <a className="toggle-tigger">
                        <div className="text-thumb text-thumb-xs bg-secondary">
                          [^-^]
                        </div>
                      </a>
                      <div className="toggle-class toggle-drop toggle-drop-right">
                        <ul className="drop-list">
                          <li>
                            <Link to="/certificates">Certificates</Link>
                          </li>
                          <li>
                            <Link onClick={onLogout}>Log Out</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <ul className="menu-btns">
                    <li>
                      <Link
                        to="/login"
                        className="btn btn-md btn-auto btn-grad no-change"
                      >
                        <span>Login</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-login"
                        className="btn btn-md btn-auto btn-grad no-change"
                      >
                        <span>Admin Login</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </nav>

              <div className="header-navbar-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      <HomepageBanner />
      {/* <LoginModal /> */}
    </>
  );
};

export default HomepageHeader;
