import React from "react";
import {
  screen,
  fireEvent,
  getByText,
  getAllByRole,
} from "@testing-library/react";
import { render as RCH } from "@testing-library/react"; // (RCH:- render component here)
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { Router } from "@reach/router";
import "@testing-library/jest-dom";
import PfManagement from "../../../pages/HR Management/pfManagement";
import userEvent from "@testing-library/user-event";

const render = (ui: any, { route = "/HR%20Management/pfManagement" } = {}) => {
  const history = createHistory(createMemorySource(route));
  window.history.pushState({}, "", route);
  return RCH(<LocationProvider history={history}>{ui}</LocationProvider>);
};

describe("PF management dashboard page test case", () => {
  test("should PF management dashboard page renders", () => {
    const dashboard = render(<PfManagement />);
    expect(dashboard);
  });
  test("should render arrow button", () => {
    const { getByTestId } = render(<PfManagement />);
    expect(getByTestId("leftArrow")).toBeInTheDocument();
  });

  test("should test the heading pf the page", () => {
    const { getByTestId } = render(<PfManagement />);
    expect(getByTestId("heading")).toHaveTextContent("PF Management");
  });
  test("should test number of cards", () => {
    const { getAllByRole } = render(<PfManagement />);
    const cards = getAllByRole("card");
    expect(cards).toHaveLength(3);
  });

  test("Should check the navigation of pfEnrolledList to correct page", () => {
    const history = createHistory(createMemorySource("/"));
    window.history.pushState({}, "", "/HR%20Management/pfManagement");

    RCH(
      <LocationProvider history={history}>
        <Router></Router>
      </LocationProvider>
    );

    const { getByTestId } = render(<PfManagement />);
    const link1 = getByTestId("pfEnrolledList");
    userEvent.click(link1);
    window.history.pushState(
      {},
      "",
      "/HR%20Management/pfManagement/pfEnrolledList"
    );
    expect(window.location.pathname).toBe(
      "/HR%20Management/pfManagement/pfEnrolledList"
    );

    const link2 = getByTestId("newPfEnrollment");
    userEvent.click(link2);
    window.history.pushState(
      {},
      "",
      "/HR%20Management/pfManagement/newPfEnrollment"
    );
    expect(window.location.pathname).toBe(
      "/HR%20Management/pfManagement/newPfEnrollment"
    );

    const link3 = getByTestId("pfExitedEmpList");
    userEvent.click(link3);
    window.history.pushState(
      {},
      "",
      "/HR%20Management/pfManagement/pfExitedEmpList"
    );
    expect(window.location.pathname).toBe(
      "/HR%20Management/pfManagement/pfExitedEmpList"
    );
  });

  test("should check arrow btn navigates to dashboard or not", () => {
    const { getByTestId } = render(<PfManagement />);
    const link = getByTestId("arrowLink");
    userEvent.click(link);
    window.history.pushState({}, "", "/app/hrdashboard");
    expect(window.location.pathname).toBe("/app/hrdashboard");
  });
  
});
