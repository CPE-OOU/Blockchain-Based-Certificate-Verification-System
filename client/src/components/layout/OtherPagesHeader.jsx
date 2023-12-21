/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Banner1 from "./Banner1";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function OtherPagesHeader({ heading, description, showBanner }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    // navigate("/");
    navigate("/home");
  };

  let userRole;

  if (user && typeof user.token === "string") {
    const decodedToken = jwtDecode(user.token);
    if (decodedToken) {
      userRole = decodedToken.role;
    }
  }

  // Conditionally render the banner based on the showBanner prop
  const banner = showBanner ? (
    <Banner1 heading={heading} description={description} />
  ) : null;

  const textStyleLight = {
    color: "#082ba1",
    fontWeight: "bold",
  };
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <>
      <div className="header-main">
        <div className="header-container">
          <div className="header-wrap">
            <div className="header-logo logo">
              <a href="/" className="logo-link">
                <h1 className="logo-dark" style={textStyleLight}>
                  BCVS
                </h1>
              </a>
            </div>
            <div className="header-nav-toggle">
              <Link
                to="#"
                aria-label="Close menu"
                className="navbar-toggle"
                data-menu-toggle="example-menu-07"
                onClick={(event) => {
                  event.stopPropagation();
                  setToggleSidebar((state) => !state);
                }}
              >
                <div className="toggle-line">
                  <span></span>
                </div>
              </Link>
            </div>
            <div
              className={`header-navbar menu-mobile ${
                toggleSidebar ? "menu-shown" : ""
              }`}
            >
              <nav className="header-menu" id="example-menu-07">
                <ul className="menu">
                  <li className="menu-item">
                    <a className="menu-link nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="menu-item">
                    <Link className="menu-link nav-link" to="/verify">
                      Verify Certificate
                    </Link>
                  </li>
                  {/* <li className="menu-item">
                    <Link onClick={onLogout}>Log Out</Link>
                  </li> */}
                  {/* <li className="menu-item has-sub">
                    <a className="menu-link nav-link menu-toggle" to="#">
                      More
                    </a>
                    <ul className="menu-sub menu-drop">
                      <li className="menu-item">
                        <a className="menu-link nav-link" href="#about">
                          About
                        </a>
                      </li>
                    </ul>
                  </li> */}
                </ul>

                {user ? (
                  <ul className="menu-btns">
                    <li className="toggle-wrap">
                      <Link to="#" className="toggle-tigger">
                        <div className="text-thumb text-thumb-xs bg-secondary">
                          [^-^]
                        </div>
                      </Link>
                      <div className="toggle-class toggle-drop toggle-drop-right">
                        <ul className="drop-list">
                          <li>
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
                  </ul>
                )}
                {/* <ul className="menu-btns">
              <li className="toggle-wrap">
                <Link to="#" className="toggle-tigger">
                  <div className="text-thumb text-thumb-xs bg-secondary">AI</div>
                </Link>
                <div className="toggle-class toggle-drop toggle-drop-right">
                  <ul className="drop-list">
                    <li><Link to="#">My Profile</Link></li>
                    <li><Link to="#">Activity</Link></li>
                    <li><Link to="#">Settings</Link></li>
                    <li><Link to="#" onClick={onLogout}>Log Out</Link></li>
                  </ul>
                </div>
              </li>
            </ul> */}
              </nav>
              <div className="header-navbar-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      {banner}
    </>
  );
}

export default OtherPagesHeader;
