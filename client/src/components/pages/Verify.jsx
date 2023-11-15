// eslint-disable-next-line
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Spinner } from "react-bootstrap";
import { BACKEND_URL } from "../../config/contants";

const spinnerOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 9999,
  backgroundColor: "#f6fafd",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const spinnerStyle = {
  color: "#fff",
  width: "3rem",
  height: "3rem",
};

function Verify() {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const [fileState, setFileState] = useState();
  const [codeState, setCodeState] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFileState(event.target.files[0]);
  };

  const handleCodeChange = (e) => {
    setCodeState(e.target.value);
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    if (!fileState) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (fileLoadedEvent) => {
      const fileContents = fileLoadedEvent.target.result;

      const hashBuffer = await window.crypto.subtle.digest(
        "SHA-256",
        new Uint8Array(fileContents)
      );
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const fileHash = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      try {
        const response = await axios.get(
          `${BACKEND_URL}/certificates/verify/certificatehash/${fileHash}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 30000, // Wait for 5 seconds
          }
        );

        if (response.data.success) {
          toast.success("Certificate File verified successfully !!!");
          setCertificateDetails(response.data.data);
          setShowModal(true);
        } else {
          toast.error("Certificate File verification failed.");
        }
      } catch (error) {
        if (error.code === "ECONNABORTED") {
          toast.error("API request timed out. Please try again.");
        } else {
          toast.error("API request failed. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(fileState);
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();

    if (!codeState) {
      toast.error("Please enter a code.");
      return;
    }

    setLoading(true);

    const certificateId = codeState;

    try {
      const response = await axios.get(
        `${BACKEND_URL}certificates/verify/certificateid/${certificateId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 30000, // Wait for 30 seconds
        }
      );

      if (response.data.success) {
        toast.success("CertificateId verified successfully !!!");
        setCertificateDetails(response.data.data);
        setShowModal(true);
      } else {
        toast.error("CertificateId verification failed.");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("API request timed out. Please try again.");
      } else {
        toast.error("Verification Failed Certificate Invalid");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section bg-light">
        <div className="container">
          <div className="nk-">
            <div className="row justify-content-center">
              <div className="text-center alert alert-warning">
                {" "}
                Use This Form to verify Certificates!! using{" "}
                <strong>File</strong> or <strong>Code</strong>
              </div>

              <div className="col-xl-8 col-lg-10">
                <ul
                  className="nav tab-nav tab-nav-line tab-nav-center"
                  role="tablist"
                >
                  <li>
                    <a
                      className="active"
                      data-bs-toggle="tab"
                      href="#code"
                      aria-selected="true"
                      role="tab"
                    >
                      File Verification
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tab"
                      href="#file"
                      aria-selected="false"
                      role="tab"
                      className=""
                      tabIndex="-1"
                    >
                      Code Verification
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="code"
                role="tabpanel"
              >
                <div className="row justify-content-center gutter-vr-30px">
                  <div className="col-lg-3">
                    <div className="section-head section-head-sm section-head-s9 text-center text-lg-start">
                      <h6 className="title title-xs title-s1 tc-primary">
                        Verification
                      </h6>
                      <h2 className="title">Use File</h2>
                      <div>
                        <p>Use File</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 offset-lg-1">
                    <div className="gap-6x d-none d-lg-block"></div>
                    <div className="gap-4x d-none d-lg-block"></div>
                    <form onSubmit={handleFileSubmit} noValidate="novalidate">
                      <div className="field-item field-item-s2">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn btn-s2 btn-md btn-grad"
                          >
                            Submit
                          </button>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-results"></div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-4 align-self-center">
                    <div className="nk-block-img">
                      <img src="images/verification.png" alt="verify" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="file" role="tabpanel">
                <div className="nk-block block-contact">
                  <div className="row justify-content-center gutter-vr-30px">
                    <div className="col-lg-3">
                      <div className="section-head section-head-sm section-head-s9 text-center text-lg-start">
                        <h6 className="title title-xs title-s1 tc-primary">
                          Verification
                        </h6>
                        <h2 className="title">Use Code</h2>
                        <div>
                          <p>Use Code</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1">
                      <div className="gap-6x d-none d-lg-block"></div>
                      <div className="gap-4x d-none d-lg-block"></div>

                      <form onSubmit={handleCodeSubmit} noValidate="novalidate">
                        <div className="field-item field-item-s2">
                          <input
                            type="text"
                            name="certificateId"
                            className="input-bordered required"
                            placeholder="Enter Code"
                            onChange={handleCodeChange}
                            required
                          />
                        </div>

                        <div className="row">
                          <div className="col-sm-12">
                            <button
                              type="submit"
                              className="btn btn-s2 btn-md btn-grad"
                            >
                              Submit
                            </button>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-results"></div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-4 align-self-center">
                      <div className="nk-block-img">
                        <img src="images/verification.png" alt="verify" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Certificate Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {certificateDetails && (
            <div>
              <p>
                <strong>Matric No:</strong> {certificateDetails.matricNo}
              </p>
              <p>
                <strong>Full Name:</strong> {certificateDetails.lastname}{" "}
                {certificateDetails.firstname} {certificateDetails.middlename}
              </p>
              <p>
                <strong>Degree Type:</strong> {certificateDetails.degreeType}
              </p>
              <p>
                <strong>Degree Awarded:</strong>{" "}
                {certificateDetails.degreeAwarded}
              </p>
              <p>
                <strong>Class of Degree:</strong>{" "}
                {certificateDetails.classOfDegree}
              </p>
              <p>
                <strong>Year of Completion:</strong>{" "}
                {certificateDetails.yearOfCompletion}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {loading && (
        <div style={spinnerOverlayStyle}>
          <Spinner animation="border" style={spinnerStyle} />
        </div>
      )}
    </>
  );
}

export default Verify;
