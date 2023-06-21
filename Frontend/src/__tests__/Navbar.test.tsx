import React from "react";
// import { render, fireEvent } from "@testing-library/react";
import { render, screen, fireEvent } from "@testing-library/react";
// import { screen } from "@testing-library/dom";
import LoginForm from "../components/Login";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import renderer from "react-test-renderer";

describe("The Index page test cases", () => {
  function tree() {
    return render(<Navbar />);
  }
  test("should navigate to Home when link is clicked", () => {
    const { getByTestId } = tree();
    const homebtn = screen.getByTestId("homeBtn");
    fireEvent.click(homebtn);
    // expect(screen.getByRole('homeLink').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByRole("homeLink", homebtn)).toHaveAttribute("href", "/");
  });

  test("Should have Logo image on Navbar page", () => {
    render(<Navbar />);
    const testImage = screen.getByAltText(`logo`);
    expect(testImage.getAttribute("src")).toBe("/logo1.png");
  });
});
