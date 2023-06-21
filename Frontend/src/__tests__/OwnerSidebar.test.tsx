import React from "react";
// import { render, fireEvent } from "@testing-library/react";
import { render, screen, fireEvent } from "@testing-library/react";
// import { screen } from "@testing-library/dom";
import LoginForm from "../components/Login";
import "@testing-library/jest-dom";
// import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import renderer from "react-test-renderer";
import OwnerSidebar from "../components/OwnersSidebar";

describe("The Index page test cases", () => {
  function myOwnerSidebar() {
    return render(<OwnerSidebar />);
  }

  it("should render My dashboard menu on ownersidebar", () => {
    const { getByRole } = myOwnerSidebar();
    expect(getByRole("myDashboardRole")).toHaveTextContent("My Dashboard");
  });

  it("renders an Human image", () => {
    render(<OwnerSidebar />);
    const logo = screen.getByRole("myImg");
    expect(logo).toHaveAttribute("src", "/humanSymbol.png");
    expect(logo).toHaveAttribute("alt", "humanLogo");
  });
});
