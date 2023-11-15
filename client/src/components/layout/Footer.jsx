/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Footer = () => {
  const textStyle = {
    color: 'aqua',
    fontWeight: 'bold',
  };
  return (
    <footer className="nk-footer bg-theme-grad">
      <section className="section section-footer tc-light bg-transparent">
        <div className="container">
          <div className="nk-block block-footer mgb-m30">
            <div className="row">
              <div className="col-lg-3 col-sm-4">
                <div className="wgs wgs-menu animated" data-animate="fadeInUp" data-delay=".2">
                  <h6 className="wgs-title">QuickLinks</h6>
                  <div className="wgs-body">
                    <ul className="wgs-links">
                      <li><a href="#">About</a></li>
                      <li><a href="#">Meet Our Team</a></li>
                      <li><a href="/login">Login</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              
              <div className=" text-center col-lg-7 order-lg-first">
                <div className="wgs wgs-text animated" data-animate="fadeInUp" data-delay=".1">
                  <div className="wgs-body">
                    <a href="index.html" className="wgs-logo">
                    <h1 style={textStyle}>BCVS</h1>
                    </a>
                    <p>Designed and Developed for <br /> Olabisi Onabanjo University. (2023)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="nk-ovm shape-b"></div>
    </footer>
  );
}

export default Footer;
