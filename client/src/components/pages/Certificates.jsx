import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import axios from "axios";
import DataTable from "react-data-table-component";
import { BACKEND_URL } from "../../config/contants";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add this line
  const baseURL = `${BACKEND_URL}/certificates/`;
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  let token;
  let decoded_token;
  let role;
  if (user) {
    console.log(user);
    // let userObject = JSON.parse(user);

    // token = user.token;

    // console.log(userObject.token);
    // decoded_token = jwtDecode(user.token);
    // console.log(decoded_token.role);

    // if (decoded_token.role != "admin") {
    //   navigate("/my-certificates");
    // }
    // console.log(typeof user);

    // alert(jwtDecode(console.log(jwtDecode(JSON.stringify(token)).role)).role);
  } else {
    navigate("/");
  }

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
    { name: "Degree", selector: (row) => row.degree, sortable: true },
    {
      name: "Class of Degree",
      selector: (row) => row.classOfDegree,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <td className="table-des">
          <a href="#" className="btn btn-success btn-auto btn-sm">
            <em className="ti ti-download"></em> Download
          </a>
          <a href="#" className="btn btn-danger btn-auto btn-sm">
            <em className="ti ti-close"></em> Revoked
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
            <div className="col-md-12">
              <ul
                className="nav tab-nav tab-nav-btn pdb-r justify-content-start"
                role="tablist"
              >
                <li>
                  <a className="active" href="/certificates">
                    All Issued Certificate
                  </a>
                </li>
                <li>
                  <a href="/new-certificate">Issue New Certificate</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-12">
              <h2 className="title">All Certificates</h2>
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
