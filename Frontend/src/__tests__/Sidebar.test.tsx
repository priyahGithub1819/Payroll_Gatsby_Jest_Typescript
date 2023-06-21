import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import LoginForm from "../components/Login";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/SideBar"

describe("The Sidebar page test cases", () => {
  function mySidebar() {
    return render (<Sidebar />)
  }

  test('should render Super Admin Profile menu on sidebar', () => {
    const { getByTestId } = mySidebar();
    expect(getByTestId("saprofile")).toHaveTextContent("Super Admin's Profile");
  });

  it('should render Super Admin Dashbord menu on sidebar', () => {
    const { getByTestId } = mySidebar();
    expect(getByTestId("sadashboard")).toHaveTextContent("Super Admin's Dashbord");
  });

  it('should render Super Admin Dashbord menu on sidebar', () => {
    const { getByTestId } = mySidebar();
    expect(getByTestId("addEmp")).toHaveTextContent("Add Employee to Payroll");
  });

  it('should render Super Admin Dashbord menu on sidebar', () => {
    const { getByTestId } = mySidebar();
    expect(getByTestId("listofEmp")).toHaveTextContent("List of Employees");
  });

  it('should render Super Admin Dashbord menu on sidebar', () => {
    const { getByTestId } = mySidebar();
    expect(getByTestId("uploadBulk")).toHaveTextContent("Upload Bulk Employee");
  });
});
