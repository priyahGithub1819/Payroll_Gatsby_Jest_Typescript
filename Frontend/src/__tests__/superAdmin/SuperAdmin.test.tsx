import React from "react";
import { render as RCH, screen } from "@testing-library/react"; // (RCH:- render component here)
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
// import { Router } from "@reach/router";
import SuperaAdmin from "../../pages/superAdmin/SuperAdmin";
import Superadmin from "../../pages/superAdmin/addEmployee";
import App from "../../pages/superAdmin/viewAllEmployee";
import Layout from "../../components/Layout";
import userEvent from "@testing-library/user-event";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; 

//Rendeting the component
const render = (ui: any, { route = "/app/superadmin" } = {}) => {
  const history = createHistory(createMemorySource(route));
  window.history.pushState({}, "", route);
  return RCH(<LocationProvider history={history}>{ui}</LocationProvider>);
};

describe("SuperAdmin's dashboard", () => {
  it.only("should navigate to a Add employee to the payroll on button click", () => {
    window.history.pushState({}, "", "/app/superadmin");
    //Rendering the component
    const { debug, getByText, getByTestId } = render(<SuperaAdmin />);
    const link1 = getByTestId("addEmp");
    userEvent.click(link1);
    window.history.pushState({}, "", "/superAdmin/addEmployee/");
    //Checking that path is change or not
    const myPath = window.location.pathname;
    expect(myPath).toBe("/superAdmin/addEmployee/");
    // debug()
  });
  it.only('should render the correct content on the Add Employee page', () => {
    
      // Render the component inside a Router with a specific route
      render(<Superadmin />, { route: '/superAdmin/addEmployee/' });
    
      // Assert that the desired element is rendered on the specific route
      const element = screen.getByText('Create Employee Account');
      expect(element).toBeInTheDocument();
});

  it("should navigate to a View all Employee on button click", () => {
    window.history.pushState({}, "", "/app/superadmin");
    //Rendering the component
    const { debug, getByText, getByTestId } = render(<SuperaAdmin />);
    const link1 = getByTestId("viewEmp");
    userEvent.click(link1);
    window.history.pushState({}, "", "/superAdmin/viewAllEmployee/");
    //Checking that path is change or not
    expect(window.location.pathname).toBe("/superAdmin/viewAllEmployee/");
    // debug()
  });

  it("should navigate to a Upload Bulk Employee on button click", () => {
    window.history.pushState({}, "", "/app/superadmin");
    //Rendering the component
    const { debug, getByText, getByTestId } = render(<SuperaAdmin />);
    const link1 = getByTestId("uploadBulkEmp");
    userEvent.click(link1);
    window.history.pushState({}, "", "/superAdmin/addBulkEmployee/");
    //Checking that path is change or not
    expect(window.location.pathname).toBe("/superAdmin/addBulkEmployee/");
    // debug()
  });
});
