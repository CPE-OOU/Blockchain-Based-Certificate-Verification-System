/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Countdown from "./Countdown";

const QuickLink = () => {
  return (
    <>
      <section className="section bg-white" id="about">
        <div className="container">
          <div className="nk-block nk-block-lg nk-block-features-s2">
            <div className="row align-items-center flex-row-reverse gutter-vr-30px">
              <div className="col-md-6">
                <div
                  className="gfx animated"
                  data-animate="fadeInUp"
                  data-delay=".1"
                >
                  <img src="images/distributed.png" alt="distributed" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="nk-block-text">
                  <h6
                    className="title title-xs title-s1 tc-primary animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    About BCVS
                  </h6>
                  <h2
                    className="title animated"
                    data-animate="fadeInUp"
                    data-delay=".3"
                  >
                    Verification System
                  </h2>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".4"
                  >
                    By leveraging technology to store certificates on a platform
                    the information becomes both immutable and transparent.
                  </p>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".5"
                  >
                    This integration of capabilities with the verification
                    process paves the way for an efficient and reliable system
                    to manage and validate certificates across domains, like
                    education, employment, professional certifications and more.
                  </p>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".6"
                  >
                    {/* Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciun quis nostrut. */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="benifits">
        <div className="container">
          <div className="section-head section-head-s9 wide-sm">
            <h6
              className="title title-xs title-s1 tc-primary animated"
              data-animate="fadeInUp"
              data-delay=".1"
            >
              BCVS Features
            </h6>
            <h2
              className="title animated"
              data-animate="fadeInUp"
              data-delay=".2"
            >
              Solution key features
            </h2>
            <p className="animated" data-animate="fadeInUp" data-delay=".3">
              This Solution would allow for seamless issuing of certificates,
              real-time verification of certificates which would improve
              efficiency and many other benefits
            </p>
          </div>
          <div className="nk-block nk-block-features">
            <div className="row gutter-vr-60px gutter-100px">
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".4"
                >
                  <div className="feature-icon feature-icon-lg-s1 m-lg-0">
                    <img src="images/icons/icon-d-light.png" alt="feature" />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <p>
                      Mitigating fraud - Embracing technology effectively
                      creates barriers against the creation of certificates thus
                      mitigating fraudulent activities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".5"
                >
                  <div className="feature-icon feature-icon-lg-s1 m-lg-0">
                    <img src="images/icons/icon-f-light.png" alt="feature" />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <p>
                      Efficiency - Enabling real time certificate verification
                      would greatly enhance efficiency while simultaneously
                      reducing costs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".6"
                >
                  <div className="feature-icon feature-icon-lg-s1 m-lg-0">
                    <img src="images/icons/icon-e-light.png" alt="feature" />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <p>
                      Enhanced security - Incorporating technology would
                      significantly bolster security measures, against the
                      forgery or counterfeiting of certificates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".7"
                >
                  <div className="feature-icon feature-icon-lg-s1 m-lg-0">
                    <img src="images/icons/icon-g-light.png" alt="feature" />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <p>
                      Increased transparency - By leveraging technology we can
                      establish a record that encompasses all certificates
                      ensuring transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-problem bg-light" id="problem">
        <div className="container">
          <div className="section-head text-center wide-auto-sm">
            <h2
              className="title animated fadeInUp"
              data-animate="fadeInUp"
              data-delay=".1"
              style={{ visibility: "visible", animationDelay: "0.1s" }}
            >
              Problem and Challenge
            </h2>
            <p
              className="animated fadeInUp"
              data-animate="fadeInUp"
              data-delay=".2"
              style={{ visibility: "visible", animationDelay: "0.2s" }}
            >
              In the education system, there is a need for a secure method to
              verify academic credentials in order to combat certificate forgery
            </p>
          </div>
          <div className="nk-block nk-block-problems tc-light">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6">
                <div
                  className="feature boxed boxed-lg bg-theme no-mg split-lg-left split-left animated fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".3"
                  style={{ visibility: "visible", animationDelay: "0.3s" }}
                >
                  <h4 className="title title-md">Enhance Security</h4>
                  <p>
                    blockchain technology provides a highly secure, tamper-proof
                    system where trust is established through mass collaboration
                    and clever code rather than through a powerful institution
                    that does the authentication and the settlement
                  </p>
                  <ul className="list list-dot">
                    <li>Accessibility.</li>
                    <li>Cost effectiveness.</li>
                    <li>Streamlined verification process.</li>
                    <li>Credibility.</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="feature-group bg-theme-alt split-right split-lg animated fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".4"
                  style={{ visibility: "visible", animationDelay: "0.4s" }}
                >
                  <div className="feature boxed bg-white-10">
                    <div className="feature-text">
                      <h4 className="title title-md">Efficiency and Speed</h4>
                      <p>
                        Enabling real time certificate verification would
                        greatly enhance efficiency while simultaneously reducing
                        costs
                      </p>
                    </div>
                  </div>
                  <div className="feature boxed bg-white-2">
                    <div className="feature-text">
                      <h4 className="title title-md">High Cost </h4>
                      <p>
                        Compared to verification methods the utilization of
                        blockchain can be a cost-effective solution for
                        certificate verification needs.
                      </p>
                    </div>
                  </div>
                  <div className="feature boxed bg-black-10">
                    <div className="feature-text">
                      <h4 className="title title-md">Credibility</h4>
                      <p>
                        Utilizing technology enhances the credibility of digital
                        certificates by providing a transparent and tamper proof
                        method for their verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-solution bg-light pt-0" id="solution">
        <div className="container">
          <div className="section-head text-center wide-auto-sm">
            <h2
              className="title animated fadeInUp"
              data-animate="fadeInUp"
              data-delay=".1"
              style={{ visibility: "visible", animationDelay: "0.1s" }}
            >
              Solutions
            </h2>
            <p
              className="animated fadeInUp"
              data-animate="fadeInUp"
              data-delay=".2"
              style={{ visibility: "visible", animationDelay: "0.2s" }}
            >
              This integration of capabilities with the verification process
              paves the way for an efficient and reliable system to manage and
              validate certificates across domains, like education, employment,
              professional certifications and more.
            </p>
          </div>
          <div className="nk-block nk-block-features-s3">
            <div className="row gutter-vr-40px justify-content-center">
              <div className="col-lg-6 col-md-10">
                <div
                  className="feature feature-s3 feature-center animated fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".3"
                  style={{ visibility: "visible", animationDelay: "0.3s" }}
                >
                  <div className="feature-icon feature-icon-lg">
                    <em className="icon icon-lg ikon ikon-cloud"></em>
                  </div>
                  <div className="feature-text">
                    <h4 className="title title-md title-dark">
                      Improve Accessibility
                    </h4>
                    <p>
                      Create a user-friendly interface that allows individuals
                      and organizations to easily verify certificates, reducing
                      reliance on centralized authorities
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-10">
                <div
                  className="feature feature-s3 feature-center animated fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".4"
                  style={{ visibility: "visible", animationDelay: "0.4s" }}
                >
                  <div className="feature-icon feature-icon-lg">
                    <em className="icon icon-lg ikon ikon-safety"></em>
                  </div>
                  <div className="feature-text">
                    <h4 className="title title-md title-dark">
                      Address Certificate forgery
                    </h4>
                    <p>Address Legal cases of certificate forgery challenges</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-10">
                <div
                  className="feature feature-s3 feature-center animated fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".5"
                  style={{ visibility: "visible", animationDelay: "0.5s" }}
                >
                  <div className="feature-icon feature-icon-lg">
                    <em className="icon icon-lg ikon ikon-cash"></em>
                  </div>
                  <div className="feature-text">
                    <h4 className="title title-md title-dark">
                      Enhance Security
                    </h4>
                    <p>
                      Develop a system that ensures the integrity and security
                      of digital certificates, safeguarding them against
                      counterfeiting and tampering
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-10">
                <div
                  className="feature feature-s3 feature-center animated fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".6"
                  style={{ visibility: "visible", animationDelay: "0.6s" }}
                >
                  <div className="feature-icon feature-icon-lg">
                    <em className="icon icon-lg ikon ikon-globe"></em>
                  </div>
                  <div className="feature-text">
                    <h4 className="title title-md title-dark">
                      Simplification in verification process
                    </h4>
                    <p>
                      The solution offers simplification and efficiency in the
                      verification process
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-team bg-light" id="team">
        <div className="container">
          <div className="nk-block nk-block-team-featured team-featured">
            <div className="row align-items-center">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <div
                  className="team-featured-photo tc-light animated"
                  data-animate="fadeInUp"
                  data-delay=".1"
                >
                  <img src="images/engr-oyedeji.jpg" alt="team" />
                  <h5 className="team-featured-info">
                    Ajibola Oluwafemi OYEDEJI<span> BSc, MS, R. Eng.</span>
                  </h5>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="team-featured-cont">
                  <h6
                    className="title title-xs title-light animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    Project Supervisor
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-team bg-light pt-0" id="team-members">
        <div className="container">
          <div className="section-head text-center wide-auto">
            <h2
              className="title title-lg title-dark animated"
              data-animate="fadeInUp"
              data-delay=".1"
            >
              Core Team
            </h2>
          </div>
          <div className="nk-block nk-block-team-list">
            <div className="row justify-content-center">
              <div className="col-md-3 col-6">
                <div
                  className="team animated"
                  data-animate="fadeInUp"
                  data-delay=".2"
                >
                  <div className="team-photo">
                    <img src="images/tolulope.jpg" alt="team" />
                  </div>
                  <h5 className="team-name title title-sm">
                    {" "}
                    Ifeyemi Tolulope
                  </h5>
                  <span className="team-position">
                    Computer Engineering (Graduate in a bit)
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div
                  className="team animated"
                  data-animate="fadeInUp"
                  data-delay=".2"
                >
                  <div className="team-photo">
                    <img src="images/.jpg" alt="team" />
                  </div>
                  <h5 className="team-name title title-sm">
                    ADEBIYI FIYINFOLUWA{" "}
                  </h5>
                  <span className="team-position">Copmuter Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuickLink;
