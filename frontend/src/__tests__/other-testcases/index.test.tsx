import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { getByRole, getByTestId, screen } from "@testing-library/dom";
import LoginForm from "../../components/Login";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import { ToastContainer } from "react-toastify";
import renderer from "react-test-renderer";
import Index from "../../pages/index";
import Login from "../../components/Login";
import HRProfile from "../../pages/hr-management-login/hr-profile";

describe("The Index page test cases", () => {
  function myIndex() {
    return render(<Index />);
  }
  function myLogin() {
    return render(<Login />);
  }
  function myNavbar() {
    return render(<Navbar />);
  }
  function myHr() {
    return render(<HRProfile />);
  }

  test("Should have 4 buttons on Index page", async () => {
    render(<Index />);
    const buttonList = await screen.getAllByRole("button");
    expect(buttonList).toHaveLength(4);
  });

  test("Should have Image on Index page", () => {
    render(<Index />);
    const testImage = screen.getByAltText(`site banner`);
    expect(testImage.getAttribute("src")).toBe("/hero-img.png");
  });

  test("Should have Logo Image on Index page", () => {
    render(<Index />);
    const testImage = screen.getByAltText(`logo`);
    expect(testImage.getAttribute("src")).toBe("/logo1.png");
  });

  it("should render text for h3 with Welcome text", () => {
    const { getByTestId } = myIndex();
    expect(getByTestId("mainHeader")).toHaveTextContent(
      "Welcome to the Payroll Management System"
    );
  });

  test("HR Profile page loads", () => {
    render(<HRProfile />);
  });
});
