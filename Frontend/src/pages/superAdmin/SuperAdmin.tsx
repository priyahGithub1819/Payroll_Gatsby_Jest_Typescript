import React from "react"
import { Link } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"

const SuperaAdmin = () => {
  return (

    <div className="container superadmin-profile-wrapper margin">
      <div className="row justify-content-center mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center">Welcome to Super Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row superadmin-links py-4">
        <div className="col-12 col-lg-4 col-md-6  mt-md-0 superAdminCard">
          <div className="card card1">
            <div className="card-body">
              <h4 className="text-center">Add Employee To Payroll</h4>
              <div className="text-center">
                <Link to="/superAdmin/addEmployee/" data-testid = "addEmp">
                  <img src="/addemp.png" alt="AddEmpImg" className="icon" />
                </Link>
              </div>
              <p className="card-text text-center">
                Super Admin can add new employee to payroll.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mt-4 mt-md-0 superAdminCard">
          <div className="card card2">
            <div className="card-body">
              <h4 className=" text-center">View All Employee</h4>
              <div className="text-center">
                <Link to="/superAdmin/viewAllEmployee/" data-testid = "viewEmp">
                  <img src="/viewIcon.png" alt="ViewImg" className="icon" />
                </Link>
              </div>
              <p className="card-text text-center">
                Super Admin can view list of all employee.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mt-4 mt-lg-0 superAdminCard">
          <div className="card card3">
            <div className="card-body">
              <h4 className=" text-center">Upload Bulk Employee</h4>
              <div className="text-center">
                <Link to="/superAdmin/addBulkEmployee/" data-testid = "uploadBulkEmp">
                  <img src="/upload.png" alt="UploadImg" className="icon" />
                </Link>
              </div>
              <p className="card-text text-center">
                Super Admin can upload CSV file here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SuperaAdmin
