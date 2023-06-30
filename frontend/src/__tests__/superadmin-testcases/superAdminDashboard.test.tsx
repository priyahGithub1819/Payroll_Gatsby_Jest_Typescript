import React from "react";
import { render as RCH, screen } from "@testing-library/react"; // (RCH:- render component here)
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import SuperaAdmin from "../../pages/super-admin-login/super-admin-dashboard";
import Superadmin from "../../pages/super-admin-login/add-employee";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect'; 

//Rendeting the component
const render = (ui: any, { route = "/app/superadmin" } = {}) => {
  const history = createHistory(createMemorySource(route));
  window.history.pushState({}, "", route);
  return RCH(<LocationProvider history={history}>{ui}</LocationProvider>);
};

describe("super-admin-dashboard's dashboard", () => {
  it("should navigate to a Add employee to the payroll on button click", () => {
    window.history.pushState({}, "", "/app/superadmin");
    //Rendering the component
    const { debug, getByText, getByTestId } = render(<SuperaAdmin />);
    const link1 = getByTestId("addEmp");
    userEvent.click(link1);
    window.history.pushState({}, "", "/super-admin-login/add-employee/");
    //Checking that path is change or not
    const myPath = window.location.pathname;
    expect(myPath).toBe("/super-admin-login/add-employee/");
  });

  it('should render the correct content on the Add Employee page', () => {
      // Render the component inside a Router with a specific route
      render(<Superadmin />, { route: '/super-admin-login/add-employee/' });
    
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
    window.history.pushState({}, "", "/super-admin-login/view-all-employee/");
    //Checking that path is change or not
    expect(window.location.pathname).toBe("/super-admin-login/view-all-employee/");
  });

  it("should navigate to a Upload Bulk Employee on button click", () => {
    window.history.pushState({}, "", "/app/superadmin");
    //Rendering the component
    const { debug, getByText, getByTestId } = render(<SuperaAdmin />);
    const link1 = getByTestId("uploadBulkEmp");
    userEvent.click(link1);
    window.history.pushState({}, "", "/super-admin-login/add-bulk-employee/");
    //Checking that path is change or not
    expect(window.location.pathname).toBe("/super-admin-login/add-bulk-employee/");
  });
});
