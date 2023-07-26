import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadUser } from "../../services/api-function";
import Layout from "../../components/Layout";
import { Link } from "@reach/router";

interface EmployeeData {
employee:{
  basic: {
    confirmationDate: string;
    dateOfBirth: string;
    dateOfJoining: string;
    department: string;
    designation: string;
    email: string;
    employeeId: string;
    employmentStatus: string;
    employmentType: string;
    gender: string;
    maritalStatus: string;
    countryCode: string;
    number: number;
    probationPeriod: number;
    selectCount: number;
    workLocation: string;
    workMode: string;
    mobile: {
      countryCode: string;
      number: number;
    };
    name: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
  };
  payrollData: {
    NameofSpouse: string;
    relationship: string;
    DOB: string;
    child1: string;
    child1Gender: string;
    DOB1: string;
    child2: string;
    child2Gender: string;
    DOB2: string;
    DOB3: string;
    DOB4: string;
    NameofFather: string;
    NameofMother: string;
    empId: string;
    empStatus: string;
    numberOfMember: number;
    password: string;
    role: string;
  };
}
success: boolean;
}

const Profile = () => {
  const [user, setUser] = useState<EmployeeData | undefined>();
   
  useEffect(() => {
    loadUser()
      .then((data: EmployeeData) => setUser(data))
      .catch(() => alert("refresh the page"));
  }, []);
  return (
    <>
      {user && user.success ? (
        <Layout>
          <div className="container superAdminProfileContainer">
            <div className="row justify-content-center mt-5 ">
              <div className="col-lg-10 superAdminBtnDiv">
                <Link
                  data-testid="myDashboard"
                  to="/app/super-admin-dashboard/"
                  className="btn btn-outline-secondary superAdminBtn mr-3"
                >
                  My Dashboard
                </Link>
              </div>
              <div className="card col-lg-5 text-center superAdminP">
                <h2 className="superAdminH2"> Super Admin Profile</h2>
                <hr />
                <img
                  className="card-img-bottom mx-auto"
                  src="/Profile.png"
                  alt="Card image"
                />
                <p>
                  Name :{" "}
                  {`${user.employee.basic.name.firstName} ${user.employee.basic.name.middleName} ${user.employee.basic.name.lastName}`}
                </p>
                <p>Employee ID : {user.employee.payrollData.empId}</p>
                <p>Contact No : {user.employee.basic.mobile.number}</p>
                <p>Designation : {user.employee.basic.designation}</p>
              </div>
              <div className="card col-lg-5 text-center superAdminAccess">
                <h2 className="superAdminH2"> Super Admin's Access</h2>
                <hr />
                <div className=" row card accessRow">
                  <h4>Add Access</h4>
                  <hr />
                  <p>Super Admin can add new employee to Payroll.</p>
                </div>
                <div className="row card accessRow">
                  <h4>View Access</h4>
                  <hr />
                  <p>Super Admin can see list of all employees on Payroll.</p>
                </div>
                <div className="row card accessRow">
                  <h4>Upload Access</h4>
                  <hr />
                  <p>
                    Super Admin can add more than one employee by just uploading
                    CSV file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        ""
      )}
    </>
  );
};
export default Profile;
