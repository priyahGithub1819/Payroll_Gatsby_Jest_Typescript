import React from "react";
import { Link } from "gatsby";

const hrDashboard = () => {
  return (
    <>
      <section className="mt-5" style={{ minHeight: "65vh" }}>
        <div className="container hr-dashboard">
          <h2 className="text-center hrDashBoardH2" data-testid="hrHeading">
            Hr Admin Dashboard
          </h2>
          <div className="row justify-content-center mt-5" id="access">
            <div
              className="col-lg-2 card  p-3 m-3 hrDashBoardDiv"
              role="HrCard"
            >
              <h3 className="text-center">View Employees List</h3>
              <Link
                to="/hr-management-login/employee/"
                data-testid="employeeList"
                className=" mx-auto text-center"
              >
                <img
                  className="w-50 mx-auto"
                  src="/view&edit.png"
                  alt="view&edit"
                />
              </Link>
            </div>
            <div
              className=" col-lg-2 card p-3 m-3 hrDashBoardDiv"
              role="HrCard"
            >
              <h3 className="text-center">
                View & Edit Rejected candidate List
              </h3>
              <Link
                to="/hr-management-login/edit-reject-candidate/"
                className=" mx-auto text-center pt-0"
                data-testid="rejectedCandiList"
              >
                <img
                  className="w-50 mx-auto"
                  src="/edit&reject.png"
                  alt="edit&reject"
                />
              </Link>
            </div>
            <div
              className=" col-lg-2 card p-3 m-3 hrDashBoardDiv"
              role="HrCard"
            >
              <h3 className="text-center">Upload Candidates List</h3>
              <Link
                to="/hr-management-login/shortlisted-candidate/"
                className="mx-auto text-center"
                data-testid="uploadCandiList"
              >
                <img
                  className="w-50 mx-auto"
                  src="/uploadCsv.png"
                  alt="uploadCsv"
                />{" "}
              </Link>
            </div>
            <div
              className=" col-lg-2 card p-3 m-3 hrDashBoardDiv"
              role="HrCard"
            >
              <h3 className="text-center">PF management</h3>
              <Link
                to="/hr-management-login/pf-dashboard"
                className="mx-auto text-center"
                data-testid="PfManagement"
              >
                <img className="w-50 mx-auto" src="/pf.jpg" alt="pf" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default hrDashboard;
