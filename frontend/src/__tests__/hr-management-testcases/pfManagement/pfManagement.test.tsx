import React from "react";
import { render as RCH } from "@testing-library/react"; // (RCH:- render component here)
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { Router } from "@reach/router";
import "@testing-library/jest-dom";
import PfManagement from "../../../pages/hr-management-login/pf-dashboard";
import userEvent from "@testing-library/user-event";

const render = (ui: any, { route = "/HR%20Management/pf-management" } = {}) => {
  const history = createHistory(createMemorySource(route));
  window.history.pushState({}, "", route);
  return RCH(<LocationProvider history={history}>{ui}</LocationProvider>);
};

// test cases
describe("PF management dashboard page test case", () => {
  // rendering page render
  test("should PF management dashboard page renders", () => {
    const dashboard = render(<PfManagement />);
    expect(dashboard);
  });

  // checking main heading
  test("should test the heading pf the page", () => {
    const { getByTestId } = render(<PfManagement />);
    expect(getByTestId("heading")).toHaveTextContent("PF Management");
  });

  // checking number of cards present in dashboard
  test("should test number of cards", () => {
    const { getAllByRole } = render(<PfManagement />);
    const cards = getAllByRole("card");
    expect(cards).toHaveLength(3);
  });

  // checking the link is navigating to correct page or not
  test("Should check the navigation of pf-enrolled-list to correct page", () => {
    const history = createHistory(createMemorySource("/"));
    window.history.pushState({}, "", "/HR%20Management/pf-management");

    RCH(
      <LocationProvider history={history}>
        <Router></Router>
      </LocationProvider>
    );

    const { getByTestId } = render(<PfManagement />);
    const link1 = getByTestId("pf-enrolled-list");
    userEvent.click(link1);
    window.history.pushState(
      {},
      "",
      "/HR%20Management/pf-management/pf-enrolled-list"
    );
    expect(window.location.pathname).toBe(
      "/HR%20Management/pf-management/pf-enrolled-list"
    );

    const link2 = getByTestId("new-pf-enrollment");
    userEvent.click(link2);
    window.history.pushState(
      {},
      "",
      "/HR%20Management/pf-management/new-pf-enrollment"
    );
    expect(window.location.pathname).toBe(
      "/HR%20Management/pf-management/new-pf-enrollment"
    );

    const link3 = getByTestId("pf-exited-emplist");
    userEvent.click(link3);
    window.history.pushState(
      {},
      "",
      "/HR%20Management/pf-management/pf-exited-emplist"
    );
    expect(window.location.pathname).toBe(
      "/HR%20Management/pf-management/pf-exited-emplist"
    );
  });

  // checking navigation on click of arrow button
  test("should check arrow btn navigates to dashboard or not", () => {
    const { getByTestId } = render(<PfManagement />);
    expect(getByTestId("leftArrow")).toBeInTheDocument();

    const link = getByTestId("arrowLink");
    userEvent.click(link);
    window.history.pushState({}, "", "/app/hr-dashboard");
    expect(window.location.pathname).toBe("/app/hr-dashboard");
  });
  
});
