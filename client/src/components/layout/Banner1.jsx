/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Banner1({ heading, description }) {
  return (
    <>
      <div className="header-banner bg-theme-grad has-ovm has-mask">
        <div className="nk-banner">
          <div className="banner banner-page">
            <div className="banner-wrap">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-6 col-lg-9">
                    <div className="banner-caption cpn tc-light text-center">
                      <div className="cpn-head">
                        <h2 className="title ttu">{heading}</h2>
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nk-ovm mask-a"></div>
      </div>
    </>
  );
}

export default Banner1;
