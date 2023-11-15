/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function HomepageBanner({ heading, description }) {
  return (
    <div className="header-banner bg-theme-grad">
      <div className="nk-banner">
        <div className="banner banner-fs banner-single banner-gap-b2">
          <div className="banner-wrap">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-5 order-lg-last">
                  <div
                    className="banner-gfx banner-gfx-re-s1 animated"
                    data-animate="fadeInUp"
                    data-delay=".9"
                  >
                    <img src="images/landing-image.png" alt="header" />
                  </div>
                </div>
                <div className="col-lg-7 col-sm-10 text-center text-lg-start">
                  <div className="banner-caption cpn tc-light">
                    <div className="cpn-head">
                      <h1
                        className="title animated"
                        data-animate="fadeInUp"
                        data-delay="1"
                      >
                        Blockchain Based
                        <br className="d-none d-md-block" /> Certificate
                        Verification System
                      </h1>
                    </div>
                    <div className="cpn-text">
                      <p
                        className="animated"
                        data-animate="fadeInUp"
                        data-delay="1.1"
                      >
                        By leveraging technology to store certificates on a
                        platform the information becomes both immutable and
                        transparent
                      </p>
                    </div>
                    <div className="cpn-action">
                      <div
                        className="cpn-btns animated"
                        data-animate="fadeInUp"
                        data-delay="1.2"
                      >
                        <a className="btn btn-grad" href="/verify">
                          Verify Certificate Issued
                        </a>
                      </div>
                      <ul
                        className="cpn-links animated"
                        data-animate="fadeInUp"
                        data-delay="1.3"
                      >
                        <li>
                          <a className="link" href="#">
                            <em className="link-icon far fa-file-alt"></em>
                            <span>Tamper Proof</span>
                          </a>
                        </li>
                        <li>
                          <a className="link" href="#">
                            <em className="link-icon fas fa-lightbulb"></em>
                            <span>Transpency</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nk-ovm mask-a shape-a"></div>
      <div id="particles-bg" className="particles-container particles-bg"></div>
    </div>
  );
}

export default HomepageBanner;
