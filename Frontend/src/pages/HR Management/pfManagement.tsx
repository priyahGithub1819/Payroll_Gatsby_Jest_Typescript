import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"

export default function pf() {
  return (
    <Layout>
      <div className="container pfManagementContainer">
        <div className="row justify-content-center">
          <Link to="/app/hrdashboard" data-testid='arrowLink'>
            {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
            <i className="bi bi-arrow-left-circle-fill" data-testid="leftArrow"></i>
          </Link>
          <h1 data-testid="heading">PF Management</h1>
          <div className="col-lg-3 col-sm-4 card  p-3 m-3 pfcards" role="card">
            <h3 className="text-center">List of Active PF Employee</h3>
            <Link to="/HR Management/pfManagement/pfEnrolledList/" data-testid="pfEnrolledList" className=" mx-auto text-center">
              <img
                style={{ width: "30%" }}
                className="mx-auto"
                src="/pfEmployee.png"
                alt="Card image"
              />
            </Link>
          </div>
          <div className=" col-lg-3 col-sm-4 card p-3 m-3 pfcards"  role="card">
            <h3 className="text-center">New PF Enrollment</h3>
            <Link to="/HR Management/pfManagement/newPfEnrollment" data-testid="newPfEnrollment" className=" mx-auto text-center">
              <img
                className="mx-auto"
                src="/addPf.png"
                alt="Card image"
                style={{ width: "35%" }}
              />
            </Link>
          </div>
          <div className="col-lg-3 col-sm-4 card  p-3 m-3 pfcards"  role="card">
            <h3 className="text-center">List of Exited PF Employee</h3>
            <Link to="/HR Management/pfManagement/pfExitedEmpList" data-testid="pfExitedEmpList" className=" mx-auto text-center">
              <img
                style={{ width: "30%" }}
                className="mx-auto"
                src="/exit.png"
                alt="Card image"
              />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
