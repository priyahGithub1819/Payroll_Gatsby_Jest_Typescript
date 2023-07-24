import React, { useState, createContext, useEffect } from "react";
import { loadUser } from "../services/api-function";
import NavBar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

interface PageProps {
  children: React.ReactNode;
}

interface EmployeeData {
  employee?: {
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
      selfDeclaration: {
        academics: {
          course: string;
          fileName: string;
          instituteUniversity: string;
          passingYear: string;
          percentageCGPA: number;
          stream: string;
          uploadedAt: string;
          verifyStatus: string;
        };
        idProofs: {
          bloodGroup: string;
          aadhaarCard: {
            aadhaarNumber: number;
          };
          panCard: {
            panCardNumber: string;
          };
          passport: {
            uploadedAt: string;
            verifyStatus: string;
          };
        };
        previousCompany: {};
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
      parents: string;
    };
    empPaymentData: {
      aadharNumber: number;
      accountNumber: number;
      address: string;
      bankName: string;
      dateofRegistration: string;
      empDob: string;
      empId: string;
      ifscCode: string;
      name: string;
      panNumber: string;
      pfStatus: string;
      pfUanNumber: string;
      paymentType: string;
    };
  };
}

export const UserData = createContext<any>({});
const Layout: React.FC<PageProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [protectedUser, setProtectedUser] = useState();

  const callUser = async () => {
    const data = await loadUser();
    setUser(data);
  };
  const protectedApi = async () => {
    const data = await loadUser();
    setProtectedUser(data);
  };
  function presentYear() {
    const d = new Date();
    let year = d.getFullYear();
    return year;
  }

  useEffect(() => {
    callUser();
  }, []);
  console.log(user);

  return (
    <>
      <UserData.Provider
        value={{ user, callUser, protectedApi, protectedUser }}
      >
        <div className="layout">
          <NavBar />
          {children}
          <footer id="footer" className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-md-5 text-center text-md-start">
                  <p className="ps-3">
                    Copyright © {presentYear()} uvXcel - All Rights Reserved
                  </p>
                </div>
                <div className="offset-lg-5 offset-md-2 col-lg-3 col-md-5 text-center text-md-start">
                  <div className="footer-contact">
                    <p>
                      Email : <a href="mailto:hr@uvxcel.com">hr@uvxcel.com</a>
                    </p>
                    <p className="">Phone: +91-20-6706259</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </UserData.Provider>
    </>
  );
};
export default Layout;
