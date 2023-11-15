import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DataTable from "react-data-table-component";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const baseURL = "http://localhost:5001/api/v1/certificates/";
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setCertificates(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
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
          <a className="doc-download btn-sm" href="#">
            <em className="ti ti-import"></em> Pdf{" "}
          </a>
          <a href="#" className="btn btn-danger btn-auto btn-sm">
            <em className="ti ti-import"></em>Small
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
