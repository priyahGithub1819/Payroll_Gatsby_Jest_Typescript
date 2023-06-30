import React, { useEffect, useContext, useState } from "react";
import { Link } from "gatsby";
import { UserData } from "./Layout";

const Sidebar = () => {
  const { user } = useContext(UserData);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let attr = document.querySelectorAll(".navbar-item a");
    attr.forEach((item: any) => {
      if (item.getAttribute("aria-current") === "page") {
        item.closest(".navbar-item").classList.add("tab");
      }
    });
    window.addEventListener("resize", checkWidth);
  }, []);

  const checkWidth = () => {
    let width = document.body.clientWidth;
    if (width < 992) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      id="sidebar"
      className=" d-lg-block d-xl-block d-xxl-block super-admin-login-sidebar min-vh-100"
      style={{ width: isOpen ? "60px" : "300px" }}
    >
      <div id="sidebar-wrapper" className="min-vh-100 margin">
        <ul className="list-unstyled components margin">
          <div className="toggleDiv">
            <p
              className="text-center fs-6"
              style={{ display: isOpen ? "none" : "block" }}
            >
              {user
                ? `${user.employee?.basic.name.firstName} ${user.employee?.basic.name.lastName}`
                : " "}
            </p>
            <img
              src="/humanSymbol.png"
              alt=""
              className="rounded-circle mt-2"
              height="50"
              onClick={toggle}
            />
          </div>
          <hr />
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/super-admin-profile">
                <i className="bi bi-person-lines-fill"></i>
              </Link>

              <Link
                to="/super-admin-login/super-admin-profile/"
                className="nav-link fw-bold"
                data-testid="saprofile"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {" "}
                Super Admin's Profile
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/app/super-admin-dashboard">
                <i className="bi bi-speedometer2"></i>
              </Link>
              <Link
                to="/app/super-admin-dashboard"
                className="nav-link fw-bold"
                data-testid="sadashboard"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {" "}
                Super Admin's Dashbord
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/super-admin-login/add-employee/">
                <i className="bi bi-person-plus-fill"></i>
              </Link>
              <Link
                to="/super-admin-login/add-employee/"
                className="nav-link fw-bold"
                data-testid="addEmp"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {" "}
                Add Employee to Payroll
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/super-admin-login/view-all-employee/">
                <i className="bi bi-card-list"></i>
              </Link>
              <Link
                to="/super-admin-login/view-all-employee/"
                className="nav-link fw-bold"
                data-testid="listofEmp"
                style={{ display: isOpen ? "none" : "block" }}
              >
                List of Employees
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/super-admin-login/add-bulk-employee/">
                <i className="bi bi-cloud-arrow-up-fill"></i>
              </Link>
              <Link
                to="/super-admin-login/add-bulk-employee/"
                className="nav-link fw-bold"
                data-testid="uploadBulk"
                style={{ display: isOpen ? "none" : "block" }}
              >
                Upload Bulk Employee
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
