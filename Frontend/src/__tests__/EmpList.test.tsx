import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeList from "../pages/HR Management/employee";
import { navigate } from "gatsby";

describe("Employee page test case", () => {
  // to check employee page render
  test("Rendering employee page", () => {
    render(<EmployeeList />);
  });

  //   to check employee table rendered
  test("To check rendered table ", () => {
    const { getByTestId } = render(<EmployeeList />);
    expect(getByTestId("employeeTable")).toBeInTheDocument();
  });

  //   to check back arrow button
  test("rendering arrow button", () => {
    const { getByTestId } = render(<EmployeeList />);
    expect(getByTestId("leftArrow")).toBeInTheDocument();
  });

});
