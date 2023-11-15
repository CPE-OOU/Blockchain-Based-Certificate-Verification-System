/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function NotFound() {
  const textStyle = {
    color: '#082ba1',
    fontWeight: 'bold',
  };

  return (
    <>
    <div className="nk-wrap ov-h has-ovm">
      <div className="container">
        <main className="nk-pages nk-pages-centered px-0 text-center">
        <header className="pt-5">
      <a href="index.html" className="d-inline-block logo-lg">
        <h1 style={textStyle}>BCVS</h1>
      </a>
    </header>

          <div className="my-auto py-5">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-md-7 col-sm-9">
                <div className="position-relative">
                  {/* <div className="piller-one"><img src="images/piler-a.png" alt="graphic" /></div>
                  <div className="piller-two"><img src="images/piler-b.png" alt="graphic" /></div> */}
                  <h2 className="title-xxl-grad">404</h2>
                  <h5 className="pb-2">Oops! Why are you here?</h5>
                  <p>We are very sorry for the inconvenience. It looks like you're trying to access a page that either has been deleted or never existed.</p>
                  <a href="/" className="btn btn-grad btn-md btn-round">Back to home</a>
                </div>
              </div>
            </div>
          </div>
          <footer className="pb-5">
            <p className="copyright-text copyright-text-s3">Designed and Developed for
Olabisi Onabanjo University</p>
          </footer>
        </main>
      </div>
      <div className="nk-ovm shape-z4"></div>
    </div>
    <div className="preloader" style={{ display: 'none' }}>
      <span className="spinner spinner-round load-done" style={{ display: 'none' }}></span>
    </div>

    </>
  );
}

export default NotFound;
