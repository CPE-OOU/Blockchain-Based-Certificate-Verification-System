// eslint-disable-next-line
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import confirmAlert from react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function NewCertificate() {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  // Create a state variable as an empty object
  const [form, setForm] = useState({});

  // Function to handle input change
  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = () => {
    // Open the confirmation dialog instead of sending the API request
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      childrenElement: () => (
        <div>
          <h3>Form Data:</h3>
          <p>Matric No: {form.matricNo}</p>
          <p>Last Name: {form.lastname}</p>
          <p>First Name: {form.firstname}</p>
          <p>Middle Name: {form.middlename}</p>
          <p>Degree Awarded: {form.degreeAwarded}</p>
          <p>Degree Type: {form.degreeType}</p>
          <p>Class of Degree: {form.classOfDegree}</p>
          <p>Course Name: {form.courseName}</p>
          <p>Department: {form.department}</p>
          <p>Year of Completion: {form.yearOfCompletion}</p>
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
          className: "btn btn-primary", // Add a class to the button
        },
      ],
    });
  };

  const handleModalConfirm = async () => {
    // Send a POST request to your API
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/certificates/",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if response or response.data is undefined
      if (!response || !response.data) {
        console.error("API response or response.data is undefined");
        return;
      }

      console.log("API response:", response.data);

      // If the API request is successful, alert success
      if (response.data.success) {
        toast.success("Successfully issued New Certificate!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `${
          error.response && error.response.data
            ? error.response.data.message
            : "An error occurred"
        }`
      );
    }
  };

  return (
    <section className="section section-contact bg-white ov-h">
      <div className="container">
        <div className="nk-block block-contact">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12">
              <ul
                className="nav tab-nav tab-nav-btn pdb-r justify-content-start"
                role="tablist"
              >
                <li>
                  <a href="/certificates">All Issued Certificate</a>
                </li>
                <li>
                  <a className="active" href="/new-certificate">
                    Issue New Certificate
                  </a>
                </li>
              </ul>
            </div>
            <div className="section-head section-head-s3 wide-auto-sm text-center">
              <h6 className="title-xs">Certificate</h6>
              <h2 className="title">Issue New Certificate </h2>
              <p>
                {" "}
                fill and submit form to Issue new certificate to candidates
              </p>
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
                          name="firstname"
                          className="input-bordered required"
                          placeholder="First Name"
                          value={form.firstname || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
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

                  <div className="field-item field-item-s2">
                    <input
                      type="text"
                      name="degreeAwarded"
                      className="input-bordered required"
                      placeholder="E.g BEng in Computer Engineering"
                      value={form.degreeAwarded || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field-item field-item-s2">
                    <input
                      type="text"
                      name="degreeType"
                      className="input-bordered required"
                      placeholder="E.g Bachelor's Degree"
                      value={form.degreeType || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="field-item field-item-s2">
                    <input
                      type="text"
                      name="classOfDegree"
                      className="input-bordered required"
                      placeholder="Class of Deg e.g First Class"
                      value={form.classOfDegree || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field-item field-item-s2">
                    <input
                      type="text"
                      name="courseName"
                      className="input-bordered required"
                      placeholder="Course Name"
                      value={form.courseName || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field-item field-item-s2">
                    <input
                      type="text"
                      name="department"
                      className="input-bordered required"
                      placeholder="Department"
                      value={form.department || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field-item field-item-s2">
                    <input
                      type="year"
                      name="yearOfCompletion"
                      className="input-bordered required"
                      placeholder="Year"
                      value={form.yearOfCompletion || ""}
                      onChange={handleInputChange}
                      required
                    />
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

export default NewCertificate;
