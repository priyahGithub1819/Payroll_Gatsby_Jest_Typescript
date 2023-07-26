import React, { useState, useContext, useEffect } from "react";
import { navigate } from "gatsby";
import Layout, { UserData } from "./Layout";
import { logoutUser } from "../services/api-function";
import { Button } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, RouteComponentProps } from "@reach/router";

interface INavbarLinks {
  href: string;
  text: string;
}

interface IAllRoleLinks {
  owner: INavbarLinks[];
  superAdmin: INavbarLinks[];
  hrAdmin: INavbarLinks[];
  accountEmployee: INavbarLinks[];
  technicalEmployee: INavbarLinks[];
  marketingEmployee: INavbarLinks[];
}

interface LoadUser {
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
          course: "BE";
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
  success: boolean;
}


const allRoleLinks: Record<string, { href: string; text: string }[]> = {
  owner: [
    { href: "/", text: "Home |" },
    { href: "/account", text: "Accounting |" },
    { href: "/payroll", text: "Payroll |" },
    { href: "/ecommerce", text: "Ecommerce |" },
    { href: "/projects", text: "Projects |" },
    { href: "/marketing", text: "Marketing & New Leads |" },
    { href: "/owner-login/owner-profile", text: "My Profile |" },
  ],
  superAdmin: [
    { href: "/", text: "Home |" },
    { href: "/account", text: "Accounting |" },
    { href: "/super-admin-payroll", text: "Payroll |" },
    { href: "/ecommerce", text: "Ecommerce |" },
    { href: "/projects", text: "Projects |" },
    { href: "/marketing", text: "Marketing & New Leads |" },
    { href: "/super-admin-login/super-admin-profile/", text: "My Profile |" },
  ],
  hrAdmin: [
    { href: "/", text: "Home |" },
    { href: "/hrPayroll", text: "Payroll |" },
    { href: "/projects", text: "Projects |" },
    { href: "/attendance", text: "Attendance system |" },
    { href: "/hr-management-login/hr-profile/", text: "My Profile |" },
  ],
  accountEmployee: [
    { href: "/", text: "Home |" },
    { href: "/account", text: "Accounting |" },
    { href: "/app/employee-profile", text: "My Profile |" },
  ],
  technicalEmployee: [
    { href: "/", text: "Home |" },
    { href: "/projects", text: "Projects |" },
    { href: "/app/employee-profile", text: "My Profile |" },
  ],
  marketingEmployee: [
    { href: "/", text: "Home |" },
    { href: "/marketing", text: "Marketing & New Leads |" },
    { href: "/app/employee-profile", text: "My Profile |" },
  ],
};

const allRole: string[] = [
  "owner",
  "superAdmin",
  "hrAdmin",
  "technicalEmployee",
  "accountEmployee",
  "marketingEmployee",
];

const Navbar = (props: RouteComponentProps) => {
  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.keyCode === 13) {
      logout();
    }
  }
  const { user: data } = useContext(UserData);
  const [user, setUser] = useState<LoadUser>();
  const [userRole, setUserRole] = useState<string>("");

  const logout = async () => {
    const { success, message, error } = await logoutUser();
    if (success === false) {
      window.alert(error);
    } else {
      window.alert(message);
      toast.success(message);
      setUser({ success: false });
      navigate("/");
    }
  };
  useEffect(() => {
    if (data?.employee) {
      setUser(data);
      setUserRole(data.employee?.payrollData.role);
    }
  }, [data, userRole]);
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top gatsbyNav">
        <div className="container-fluid">
          <ToastContainer autoClose={false} className="toastContainer" />
          <img
            src="/logo1.png"
            alt="logo"
            className="img-fluid ps-3 logo"
            style={{ width: "12%" }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {userRole && allRole.indexOf(userRole) !== -1 ? (
                allRoleLinks[userRole as keyof IAllRoleLinks].map(
                  (link: INavbarLinks) => {
                    return (
                      <li key={link.href} className="nav-item">
                        <a className="nav-link" href={link.href}>
                          {link.text}
                        </a>
                      </li>
                    );
                  }
                )
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/"
                      role="homeLink"
                      data-testid="homeBtn"
                    >
                      Home |
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/app/login/"
                      className="nav-link"
                      data-testid="loginBtn"
                      role="loginRole"
                    >
                      <Button
                        as="input"
                        type="submit"
                        className="loginBtn "
                        onClick={() => navigate("/app/login/")}
                        value="LOG IN"
                      />
                    </Link>
                  </li>
                </>
              )}
              {user && user.success === true ? (
                <div className="nav-item">
                  <li>
                    <span
                      onClick={logout}
                      onKeyDown={handleKeyDown}
                      className="nav-link"
                    >
                      Logout
                    </span>
                  </li>
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
