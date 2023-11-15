/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import LoginModal from "../pages/LoginModal";
import HomepageBanner from "./HompageBanner";

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

  const textStyleDark = {
    color: "white",
    fontWeight: "bold",
  };

  const textStyleLight = {
    color: "#082ba1",
    fontWeight: "bold",
  };

  console.log({
    toggleSidebar,
    class: `header-navbar animated fadeInDown menu-mobile ${
      toggleSidebar ? "menu-shown" : "menu-shown"
    }`,
  });

  const menuToggleClassName = `header-navbar animated fadeInDown menu-mobile ${
    toggleSidebar ? "menu-shown" : ""
  }`;
  return (
    <>
      <div className="header-main">
        <div className="header-container container">
          <div className="header-wrap">
            <div
              className="header-logo logo animated fadeInDown"
              data-animate="fadeInDown"
              data-delay=".6"
            >
              <Link to="/" className="logo-link">
                <h1 className="logo-dark" style={textStyleLight}>
                  BCVS
                </h1>
                <h1 className="logo-light" style={textStyleDark}>
                  BCVS
                </h1>
                {/* <img className="logo-dark" src="images/logo.png" srcSet="images/logo2x.png 2x" alt="logo" />
              <img className="logo-light" src="images/logo-full-white.png" srcSet="images/logo-full-white2x.png 2x" alt="logo" /> */}
              </Link>
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
                    <Link className="menu-link nav-link active" to="/home">
                      Home
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link className="menu-link nav-link" href="/verify">
                      Verify Certificate
                    </Link>
                  </li>
                  {user && (
                    <li className="menu-item">
                      <Link className="menu-link nav-link" href="/certificates">
                        Certificates
                      </Link>
                    </li>
                  )}
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
                            <span onClick={onLogout}>Log Out</span>
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
                  </ul>
                )}
              </nav>

              <div className="header-navbar-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      <HomepageBanner />
      <LoginModal />
    </>
  );
};

export default HomepageHeader;
