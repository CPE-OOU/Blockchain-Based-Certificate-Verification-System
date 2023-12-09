/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios"; // You can use any library to make HTTP requests
import DataTable from "react-data-table-component";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { BACKEND_URL } from "../../config/contants";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap

// require("dotenv").config();

// const dotenv = require("dotenv");
// dotenv.config({ path: "../../../config/config.env" });

function Certificates() {
  const user = useSelector((state) => state.auth.user);
  // const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add this line
  // const baseURL = `${BACKEND_URL}/certificates/`;
  // const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // let token;
  // let decodedToken;
  // if (user) {
  //   token = user.token;

  //   decodedToken = jwtDecode(token);
  //   // console.log(decodedToken);
  //   // console.log(token);
  //   // console.log(decodedToken.role);
  // }

  // if (decodedToken.id == undefined) {
  //   navigate("/");
  // }

  // const [certificates, setCertificates] = useState([]);

  // const baseURL = `${BACKEND_URL}/certificates/userid/${decodedToken.id}`;

  let token;
  let decodedToken;
  let userId;

  if (user && typeof user.token === "string") {
    token = user.token;
    decodedToken = jwtDecode(token);
    if (decodedToken) {
      userId = decodedToken.id;
    }
  }

  if (userId === undefined) {
    navigate("/");
  }

  const [certificates, setCertificates] = useState([]);

  const baseURL = userId
    ? `${BACKEND_URL}/certificates/userid/${userId}`
    : null;

  // const baseURL = `${BACKEND_URL}/certificates/userid/${decodedToken.id}`;

  useEffect(() => {
    axios
      .get(baseURL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setCertificates(response.data.data);
        setLoading(false); // Add this line
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        setLoading(false); // Add this line
      });
  }, []);

  const columns = [
    {
      name: "Status",
      cell: (row) =>
        row.certificateStatus === "Valid" ? (
          <td class="tranx-status tranx-status-approved">
            <span class="d-none">Approved</span>
            <em class="ti ti-check"></em>
          </td>
        ) : (
          <td class="tranx-status tranx-status-canceled">
            <span class="d-none">Canceled</span>
            <em class="ti ti-close"></em>
          </td>
        ),
    },
    {
      name: "Certificate ID",
      selector: (row) => row.certificateId,
      sortable: true,
    },
    { name: "Matric No", selector: (row) => row.matricNo, sortable: true },
    {
      name: "Name",
      selector: (row) => `${row.lastname} ${row.firstname}`,
      sortable: true,
    },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "Degree", selector: (row) => row.degreeAwarded, sortable: true },
    {
      name: "Class of Degree",
      selector: (row) => row.classOfDegree,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <td className="table-des">
          {/* <a className="doc-download btn-auto btn-sm" href="#">
            <em className="ti ti-download"></em> Download{" "}
          </a> */}
          <a href="#" className="btn btn-success btn-sm">
            <em className="ti ti-download"></em>
            download
          </a>
        </td>
      ),
    },
  ];

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.matricNo
      ? certificate.matricNo.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

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
    <section className="section bg-light-alt">
      <div className="container">
        <div className="nk-block">
          <div className="row justify-content-cente align-items-cente">
            <div className="col-lg-12">
              <h2 className="title">
                My Certificates:
                {/* {user ? <span> {decodedToken.name} </span> : null} */}
              </h2>
              <div class="text-right"></div>
              <input
                type="text"
                placeholder="Search by Matric No"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DataTable
                title="Certificates"
                columns={columns}
                data={filteredCertificates}
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
