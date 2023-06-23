import React from "react"
import { Link } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"

const Owner = () => {
  return (
    <div className="container margin superAdmindashboard">
      <div className="row justify-content-center mb-3">
        <div className="col-10 superAdminProfile">
          <h1>Welcome to Owner's Dashboard</h1>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp">
          <h3>All Employees</h3>
          <Link to="/Owner/listOfEmp"
          data-testid="empList">
            <img
              src="/empList.png"
              alt="AddEmpImg"
              className="icon img-fluid"
            />{" "}
          </Link>
          <h6>View existing employee's list</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp">
          <h3>Confirmed Employee</h3>{" "}
          <Link to="/Owner/confirmEmp"
           data-testid="confirmedEmpList">
            {" "}
            <img src="/search.png" alt="UploadImg" className="icon img-fluid" />
          </Link>
          <h6>View list of Confirmed Employee</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp">
          <h3>Employee Confirmation</h3>
          <Link to="/Owner/empConfirm"
          data-testid="employeeConfirmation">
            {" "}
            <img
              src="/empConfirm.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>Edit probation period & confirm the Employee</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp">
          <h3>Employee record update</h3>{" "}
          <Link to="/Owner/empRecordUpdate"
           data-testid="empRecordUpdate">
            {" "}
            <img
              src="/growth.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>Annual record updation of an Employee</h6>
        </div>
      </div>
      {/* second row */}
      <div className="row justify-content-center mb-3">
        <div className="col-xl-2 col-lg-4 col-md-5  listOfEmp1">
          <h3>Candidate Selection</h3>{" "}
          <Link to="/Owner/candiSelection"
          data-testid="candiSelection">
            <img
              src="/empRecruit.png"
              alt="ViewImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>Select,reject or hold the finalised candidates</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3>Selected Candidates</h3>{" "}
          <Link to="/Owner/viewSelectedCandi"
          data-testid="viewSelectedCandi">
            {" "}
            <img
              src="/select.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>View the list of all selected candidates</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3>On hold Candidates</h3>
          <Link to="/Owner/viewHoldCandi"
          data-testid="OnHoldCandi">
            <img src="/hold.png" alt="ViewImg" className="icon img-fluid " />
          </Link>
          <h6>View the list of on hold candidates</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3>Rejected Candidates</h3>{" "}
          <Link to="/Owner/viewRejectedCandi"
          data-testid="viewRejectedCandi">
            {" "}
            <img
              src="/rejected.png"
              alt="UploadImg"
              className="icon img-fluid"
            />
          </Link>
          <h6>View the list of all Rejected candidates and their details</h6>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3>Onboard Candidates</h3>{" "}
          <Link to="/Owner/viewOnboardCandi"
          data-testid="viewOnboardCandi">
            <img
              src="/onboarding.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>View the list of all candidates to be onboard</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3> Upload CTC</h3>{" "}
          <Link to="/Owner/addCTC"
          data-testid="addCTC">
            {" "}
            <img
              src="/uploadCTC.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>Upload CTC information</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3> Update CTC</h3>{" "}
          <Link to="/Owner/updateCTC"
          data-testid="updateCTC">
            {" "}
            <img
              src="/updatedCTC.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>Update CTC information</h6>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-5 listOfEmp1">
          <h3> Upload & View Payroll Documents </h3>{" "}
          <Link to="/Owner/uploadPayrollDoc"
          data-testid="uploadPayrollDoc">
            {" "}
            <img
              src="/viewDocument.png"
              alt="UploadImg"
              className="icon img-fluid "
            />
          </Link>
          <h6>Upload and View payroll documents</h6>
        </div>
      </div>
    </div>
  )
}
export default Owner
