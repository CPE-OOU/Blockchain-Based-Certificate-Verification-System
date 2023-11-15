import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

function Certificates() {
  // ... (Your existing code)

  const columns = [
    { name: "Matric No", selector: "matricNo", sortable: true },
    {
      name: "Name",
      selector: (row) => `${row.lastname} ${row.firstname}`,
      sortable: true,
    },
    { name: "Department", selector: "department", sortable: true },
    { name: "Degree", selector: "degree", sortable: true },
    { name: "Class of Degree", selector: "classOfDegree", sortable: true },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.certificateStatus === "Valid",
      style: {
        backgroundColor: "green",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.certificateStatus === "Invalid",
      style: {
        backgroundColor: "red",
        color: "white",
      },
    },
  ];

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
                  <a className="active" href="#">
                    All Issued Certificate
                  </a>
                </li>
                <li>
                  <a data-bs-toggle="tab" href="#">
                    Issue New Certificate
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-12">
              <h2 className="title">Certificates</h2>
              <DataTable
                title="Certificates"
                columns={columns}
                data={certificates}
                pagination
                highlightOnHover
                pointerOnHover
                theme="solarized"
                conditionalRowStyles={conditionalRowStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
