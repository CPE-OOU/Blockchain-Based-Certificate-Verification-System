/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import axios from "axios"; // You can use any library to make HTTP requests

import { jwtDecode } from "jwt-decode"; // Corrected import
import { BACKEND_URL } from "../../config/contants";

// require("dotenv").config();

// const dotenv = require("dotenv");
// dotenv.config({ path: "../../../config/config.env" });

function Certificates() {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const decodedToken = jwtDecode(token);
  console.log(decodedToken.id);

  // use api to get certificate using userID

  const [certificates, setCertificates] = useState([]);

  const baseURL = `${BACKEND_URL}/certificates/userid/${decodedToken.id}`;

  useEffect(() => {
    axios
      .get(baseURL) // Replace with your actual API endpoint
      .then((response) => {
        setCertificates(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
      });
  }, []);

  // console.log(certificates)

  if (!certificates) return null;

  return (
    <section className="section bg-light-alt">
      <div className="container">
        <div className="nk-block">
          <div className="row justify-content-cente align-items-cente">
            <div className="col-lg-12">
              <h2 className="title">My Certificate(s)</h2>
              {/* <table className="">
            <thead className="bg-primary">
          <tr>
            <th></th>
            <th className="data-col data-col-one text-center index sorting sorting_asc ">Matric No</th>
            <th className="data-col data-col-one text-center index sorting sorting_asc" >Name</th>
            <th className="data-col data-col-one text-center index sorting sorting_asc">sss</th>
          </tr>
      
            </thead>
              <tbody>
                <tr>
                  <td class="tranx-status tranx-status-approved"><span class="d-none">Approved</span><em class="ti ti-check"></em></td>
                  <td className="table-head">Public Sale Starts</td>
                  <td className="table-des">15th Nov 2022 12:00 GMT</td>
                  <td className="table-des">
                    <a className="doc-download  btn-sm" href="#"><em className="ti ti-import"></em> Pdf</a>
                    <a href="#" class="btn btn-danger btn-auto btn-sm"><em className="ti ti-import"></em>Small</a>
                  </td>
                </tr>
                <tr className='even'>
                
                <td class="tranx-status tranx-status-pending"><span class="d-none">Pending</span><em class="ti ti-alert"></em></td>
                  <td className="table-head">Public Sale Starts</td>
                  <td className="table-des">15th Nov 2022 12:00 GMT</td>
                  <td className="table-des">
                    <a className="doc-download btn-sm" href="#"><em className="ti ti-import"></em> Pdf</a>
                    <a href="#" class="btn btn-danger btn-auto btn-sm"><em className="ti ti-import"></em>Small</a>
                    
                  </td>
                </tr>
                <tr>
                
                <td class="tranx-status tranx-status-canceled"><span class="d-none">Canceled</span><em class="ti ti-close"></em></td>
                  <td className="table-head">Public Sale Starts</td>
                  <td className="table-des">15th Nov 2022 12:00 GMT</td>
                  <td className="table-des">
                    <a className="doc-download  btn-sm" href="#"><em className="ti ti-import"></em> Pdf</a>
                    <a href="#" class="btn btn-danger btn-auto btn-sm"><em className="ti ti-import"></em>Small</a>
                  </td>
                </tr>
              
              </tbody>
            </table> */}

              <table className="table table-bordered">
                <thead className="bg-primary">
                  <tr>
                    <th></th>
                    <th className="data-col data-col-one text-center index sorting sorting_asc ">
                      Matric No
                    </th>
                    <th className="data-col data-col-one text-center index sorting sorting_asc">
                      Name
                    </th>
                    <th className="data-col data-col-one text-center index sorting sorting_asc">
                      Department
                    </th>
                    <th className="data-col data-col-one text-center index sorting sorting_asc">
                      Degree
                    </th>
                    <th className="data-col data-col-one text-center index sorting sorting_asc">
                      Class of Degree
                    </th>
                    <th className="data-col data-col-one text-center index sorting sorting_asc">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate) => (
                    <tr key={certificate._id}>
                      {" "}
                      {/* Replace '_id' with your actual id field */}
                      {certificate.certificateStatus === "Valid" ? (
                        <td class="tranx-status tranx-status-approved">
                          <span class="d-none">Approved</span>
                          <em class="ti ti-check"></em>
                        </td>
                      ) : (
                        <td class="tranx-status tranx-status-canceled">
                          <span class="d-none">Canceled</span>
                          <em class="ti ti-close"></em>
                        </td>
                      )}
                      <td className="table-head">{certificate.matricNo}</td>{" "}
                      {/* Replace 'matricNo' with your actual field */}
                      <td className="table-head">{certificate.name}</td>{" "}
                      {/* Replace 'name' with your actual field */}
                      <td className="table-des">
                        {certificate.department}
                      </td>{" "}
                      {/* Replace 'department' with your actual field */}
                      <td className="table-des">{certificate.degree}</td>{" "}
                      {/* Replace 'degree' with your actual field */}
                      <td className="table-des">
                        {certificate.classOfDegree}
                      </td>{" "}
                      {/* Replace 'classOfDegree' with your actual field */}
                      <td className="table-des">
                        <a className="doc-download btn-sm" href="#">
                          <em className="ti ti-import"></em> Pdf{" "}
                        </a>
                        <a href="#" className="btn btn-danger btn-auto btn-sm">
                          <em className="ti ti-import"></em>Small
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    // ... (Your existing code)
  );
}

export default Certificates;
