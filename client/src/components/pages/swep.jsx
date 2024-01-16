// eslint-disable-next-line
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import confirmAlert from react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { BACKEND_URL } from "../../config/contants";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap
import DOMPurify from "dompurify"; // Import DOMPurify

function Swep() {
  const user = useSelector((state) => state.auth.user);

  let token;
  if (user) {
    token = user.token;
  }

  // Create a state variable as an empty object
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to handle input change
  const handleInputChange = (event) => {
    // Sanitize the input
    const sanitizedInput = DOMPurify.sanitize(event.target.value);

    setForm({
      ...form,
      [event.target.name]: sanitizedInput,
    });
  };

  const handleFormSubmit = () => {
    // Check if all fields are filled
    if (
      !form.matricNo ||
      !form.lastname ||
      !form.firstname ||
      !form.middlename ||
      !form.track
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    // Open the confirmation dialog instead of sending the API request
    confirmAlert({
      title: "Confirm details to be used on your Certificate",
      message: "Are you sure you want to continue !.",
      childrenElement: () => (
        <div>
          <h3>Certificate Data:</h3>
          <p>Matric No: {form.matricNo}</p>
          <p>First Name: {form.firstname}</p>
          <p>Last Name: {form.lastname}</p>
          <p>Middle Name: {form.middlename}</p>
          <p> Participated in: {form.track}</p>
          <p> Recieve at: {form.email}</p>
        </div>
      ),
      buttons: [
        {
          label: "Yes",
          onClick: () => handleModalConfirm(),
          className: "btn btn-info", // Add a class to the button
        },
        {
          label: "No",
          onClick: () => setLoading(false),
          className: "btn btn-danger", // Add a class to the button
        },
      ],
    });
  };

  const handleModalConfirm = async () => {
    try {
      const response = await Promise.race([
        axios.post(`${BACKEND_URL}/certificates/swep`, form),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 50000)
        ),
      ]);

      if (!response || !response.data) {
        console.error("API response or response.data is undefined");
        return;
      }

      // console.log("API response:", response.data);

      if (response.data.success) {
        toast.success("Success !! Digital certificate is being processed");
      } else {
        // If the request was successful but success is false, show the server's message
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Show the server's error message or a default message
      toast.error(
        error.response?.data?.message || "An error occurred, Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section className="section section-contact bg-white ov-h">
      <div className="container">
        <div className="nk-block block-contact">
          <div className="row justify-content-center align-items-center">
            <div className="section-head section-head-s3 wide-auto-sm text-center">
              <h6 className="title-xs">SWEP Workshop Training</h6>

              <h2 className="title">Digital Certification </h2>

              <div className="row justify-content-center">
                <div className="text-center alert alert-warning">
                  {" "}
                  <strong>Note: </strong>All participansts are required to fill
                  in thier details. Upon successful submission, your certificate
                  will be sent to your email after being reviewed and validated
                  !!{" "}
                </div>
              </div>
            </div>
            <div className="row justify-content-center gutter-vr-30px">
              <div className="col-lg-7 offset-lg-1">
                <div className="gap-4x d-none d-lg-block"></div>
                <form
                  onSubmit={handleFormSubmit}
                  className="contact-form nk-form-submit"
                >
                  <div className="field-item field-item-s2">
                    <input
                      name="matricNo"
                      type="text"
                      className="input-bordered required"
                      placeholder="Matric No"
                      value={form.matricNo || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="field-item field-item-s2">
                        <input
                          type="text"
                          name="firstname"
                          className="input-bordered required"
                          placeholder="First Name"
                          value={form.firstname || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="field-item field-item-s2">
                        <input
                          type="text"
                          name="lastname"
                          className="input-bordered required"
                          placeholder="Last Name"
                          value={form.lastname || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="field-item field-item-s2">
                        <input
                          type="text"
                          name="middlename"
                          className="input-bordered"
                          placeholder="Middle Name"
                          value={form.middlename || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="field-item field-item-s2">
                        <input
                          type="text"
                          name="track"
                          className="input-bordered required"
                          placeholder="Track Participated In e.g Software Engineering / Cybersecurity / Data Science / Embedded System"
                          value={form.track || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="field-item field-item-s2">
                      <input
                        type="email"
                        name="email"
                        className="input-bordered required"
                        placeholder="Email"
                        value={form.email || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <button
                        type="button"
                        className="btn btn-s2 btn-md btn-grad"
                        onClick={handleFormSubmit}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Swep;
