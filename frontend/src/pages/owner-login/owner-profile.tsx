import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { loadUser } from "../../services/api-function";
import Ownerprofilebar from "./owner-profilebar";

interface Employee {
employee:{
  basic: {
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    mobile: {
      countryCode: string;
      number: number;
    };
    selectCount: number;
    employeeId: string;
    gender: string;
    dateOfJoining: string;
    maritalStatus: string;
    probationPeriod: number;
    confirmationDate: string;
    dateOfBirth: string;
    employmentStatus: string;
    employmentType: string;
    designation: string;
    department: string;
    workMode: string;
    workLocation: string;
    selfDeclaration: {
      idProofs: {
        bloodGroup: string;
        aadhaarCard: {
          aadhaarNumber: number;
          verifyStatus: string;
          uploadedAt: string;
        };
        panCard: {
          panCardNumber: string;
          verifyStatus: string;
          uploadedAt: string;
        };
        passport: {
          verifyStatus: string;
          uploadedAt: string;
        };
      };
      academics: any[];
      previousCompany: any[];
    };
    email: string;
  };
  payrollData: {
    updatedby: {
      empId: string;
      date: string;
    };
    createdby: {
      empId: string;
      date: string;
    };
    _id: string;
    empId: string;
    __v: number;
    DOB3: string;
    DOB4: string;
    NameofFather: string;
    NameofMother: string;
    numberOfMember: number;
    role: string;
    empStatus: string;
  };
}
}

const Myprofile: React.FC = () => {
  const [user, setUser] = useState<Employee>();

  const getUser = async () => {
    const data = await loadUser();
    setUser(data);
    console.log(data);
    
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user && (
        <Layout>
          <Ownerprofilebar />
          <div className="content">
            <div className="container myProfilediv text-center ">
              <div className="profileCard margin ">
                <h2 className="text-center">My Profile</h2>
                <div className="ownerLogo">
                  <img src="/ownerLogo.png" alt="profile" />
                </div>
                <div className="ownerDetail">
                  <div className="p-3">
                  <p>Name : {user.employee.basic.name.firstName}</p>
                      <p>Employee ID : {user.employee.payrollData.empId}</p>
                      <p>Contact No :  {user.employee.basic.mobile.number}</p>
                      <p>Designation :  {user.employee.basic.designation}</p>
                  </div>
                </div>
              </div>
              <h2 className="text-center">My Access</h2>
              <div className="superadmin-links py-4 row">
                <div className="viewColumn col-lg-3 ">
                  <h4>View Access</h4>
                  <p>List of All Employee</p>
                  <p>List of Confirmed Employees</p>
                  <p>List of Onboard Candidates</p>
                  <p>List of Rejected Candidates</p>
                  <p>View Payroll Documents</p>
                </div>
                <div className="editColumn col-lg-3">
                  <div>
                    <h4>Edit Access</h4>
                  </div>
                  <p>Employee confirmation</p>
                  <p>Employee Record Update</p>
                  <p>Candidate Selection</p>
                </div>
                <div className="uploadColumn col-lg-3">
                  <div>
                    <h4>Upload Access</h4>
                  </div>
                  <p>Upload CTC information</p>
                  <p>Upload Payroll Documents</p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Myprofile;
