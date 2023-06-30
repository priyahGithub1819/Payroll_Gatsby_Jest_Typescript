import React, { useContext, useEffect, useState } from "react";
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
    <>
      <div
        id="sidebar"
        className="d-lg-block d-xl-block d-xxl-block ownerSidebar shadow-lg p-3 "
        style={{ width: isOpen ? "70px" : "350px" }}
      >
        <div id="sidebar-wrapper" className="min-vh-100 ownerSidebar-wrapper">
          <ul className="list-unstyled components" id="myTab">
            <div className="toggleOwnerDiv">
              <p
                className="ownerText"
                data-testid ="ownerSidebar"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {user
                  ? `${user.employee.basic.name.firstName} ${user.employee.basic.name.lastName}`
                  : " "}
              </p>
              <img
                src="/humanSymbol.png"
                alt="humanLogo"
                role="myImg"
                className="rounded-circle"
                height="50"
                onClick={toggle}
              />
            </div>
            <hr />
            <div
              className="sideScrollbar"
              style={{ width: isOpen ? "50px" : "300px" }}
            >
              <div className="split1">
                <div className="sidebarContent">
                  <li className="navbar-item ">
                    <div className="ownerSidebarIcons">
                      <div className="image">
                        <Link to="/app/owner">
                          <i className="bi bi-speedometer2 oSidebarIcon"></i>
                        </Link>
                      </div>
                      <div className="logoText">
                        <Link
                          to="/app/owner/"
                          role="myDashboardRole"
                          data-testid="dashboard"
                          className="nav-link fw-bold"
                          style={{ display: isOpen ? "none" : "block" }}
                          data-toggle="tab"
                        >
                          {" "}
                          My Dashboard
                        </Link>
                      </div>
                    </div>
                  </li>
                </div>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/add-ctc">
                        <i>
                          <img
                            src="/uploadCTC.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/add-ctc" 
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="add-ctc"
                      >
                        {" "}
                        Upload CTC
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/update-ctc">
                        <i>
                          <img
                            src="/updatedCTC.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/update-ctc"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="update-ctc"
                      >
                        {" "}
                        Update CTC
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/upload-payroll-doc">
                        <i>
                          <img
                            src="/viewDocument.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/upload-payroll-doc"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="upload-payroll-doc"
                      >
                        {" "}
                        Upload & View Payroll Documents
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
              <hr />
              <div className="split2">
                <li className="navbar-item ">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/list-of-employee">
                        <i>
                          <img
                            src="/empList.png"
                            alt="AddEmpImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/list-of-employee"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="list-of-employee"
                      >
                        {" "}
                        List of all Employees
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/confirm-employee/">
                        <i>
                          <img
                            src="/search.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/confirm-employee/"
                        data-testid="confirm-employee"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        List of confirmed Employees
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item ">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/employee-confirm" >
                        <i>
                          <img
                            src="/empConfirm.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/employee-confirm"
                        data-testid="employee-confirm"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Employee Confirmation
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item ">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/employee-record-update">
                        <i>
                          <img
                            src="/growth.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/employee-record-update"
                        data-testid="employee-record-update"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Employee Record Update
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
              <hr />
              <div className="split3">
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/candidate-selection">
                        <i>
                          <img
                            src="/empRecruit.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/candidate-selection"
                        data-testid="candidate-selection"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        Candidate Selection
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/view-selected-candidate">
                        <i>
                          <img
                            src="/select.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/view-selected-candidate"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="view-selected-candidate"
                      >
                        Selected Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/view-hold-candidate">
                        <i>
                          <img
                            src="/hold.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/view-hold-candidate"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="view-hold-candidate"
                      >
                        On Hold Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/view-rejected-candidate">
                        <i>
                          <img
                            src="/rejected.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/view-rejected-candidate"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="view-rejected-candidate"
                      >
                        Rejected Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/owner-login/view-onboard-candidate">
                        <i>
                          <img
                            src="/onboarding.png"
                            alt="UploadImg"
                            className="icon oSidebarIcon"
                          />
                        </i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/owner-login/view-onboard-candidate/"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="view-onboard-candidate"
                      >
                        Onboard Candidates
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
