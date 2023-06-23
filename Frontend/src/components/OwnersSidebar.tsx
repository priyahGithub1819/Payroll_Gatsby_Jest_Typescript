import React, { useContext, useEffect, useState } from "react";
import { Link } from "gatsby";
import { UserData } from "./Layout";

const SideBar = () => {
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
                      <Link to="/Owner/addCTC">
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
                        to="/Owner/addCTC" 
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="addCTC"
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
                      <Link to="/Owner/updateCTC">
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
                        to="/Owner/updateCTC"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="updateCTC"
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
                      <Link to="/Owner/uploadPayrollDoc">
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
                        to="/Owner/uploadPayrollDoc"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="uploadPayrollDoc"
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
                      <Link to="/Owner/listOfEmp">
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
                        to="/Owner/listOfEmp"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="listOfEmp"
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
                      <Link to="/Owner/confirmEmp/">
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
                        to="/Owner/confirmEmp/"
                        data-testid="confirmEmp"
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
                      <Link to="/Owner/empConfirm" >
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
                        to="/Owner/empConfirm"
                        data-testid="empConfirm"
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
                      <Link to="/Owner/empRecordUpdate">
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
                        to="/Owner/empRecordUpdate"
                        data-testid="empRecordUpdate"
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
                      <Link to="/Owner/candiSelection">
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
                        to="/Owner/candiSelection"
                        data-testid="candiSelection"
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
                      <Link to="/Owner/viewSelectedCandi">
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
                        to="/Owner/viewSelectedCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="viewSelectedCandi"
                      >
                        Selected Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/Owner/viewHoldCandi">
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
                        to="/Owner/viewHoldCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="viewHoldCandi"
                      >
                        On Hold Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/Owner/viewRejectedCandi">
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
                        to="/Owner/viewRejectedCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="viewRejectedCandi"
                      >
                        Rejected Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/Owner/viewOnboardCandi">
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
                        to="/Owner/viewOnboardCandi/"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                        data-testid="viewOnboardCandi"
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
export default SideBar;
