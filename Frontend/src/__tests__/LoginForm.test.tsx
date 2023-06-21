import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";
import userEvent from "@testing-library/user-event";
import * as ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
// import renderer from "react-test-renderer";
// import Link from 'link-react';
import Index from "../pages/index";
import LoginForm from "../components/Login";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

const validatePassword = (password: any) => {
  const regex = /^\d{8}$/;
  if (regex.test(password)) {
    return true;
  }
  return false;
};

const validateUsername = (username: any) => {
  const regexUsername = /^UISPL\d{4}$/;
  if (regexUsername.test(username)) {
    return true;
  }
  return false;
};

describe("Testing ID value equal to label", () => {
  function tree() {
    return render(<LoginForm />);
  }

  test("Rendering the Header User Login on Login Page", () => {
    render(<LoginForm />);
    const linkElement = screen.getByText(/User Login/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Test Log In Button is present", () => {
    const { getByTitle } = tree();
    const element = screen.getByTitle("Log In");
    expect(element).toBeInTheDocument();
    screen.debug();
  });

  test.only("Test Placeholder", () => {
    render(<LoginForm />);
    const element = screen.getByPlaceholderText("Enter Username");
    expect(element).toBeInTheDocument();
    screen.debug();
  });

  test("Test Log in Button getByTitle", () => {
    render(<LoginForm />);
    const element = screen.getByTitle("Log In");
    expect(element).toBeTruthy();
    screen.debug();
  });

  test("Test to check total number of Input on Login page", () => {
    render(<LoginForm />);
    const element = screen.getAllByTitle("Input");
    expect(element).toHaveLength(3);
    // expect(element).toBeTruthy();
    screen.debug();
  });
  test("Should render the Password label on Login Page", () => {
    render(<LoginForm />);
    const linkElement = screen.getByTestId("pwd");
    expect(linkElement).toBeInTheDocument();
  });
  test("Should render the Login Button on Login Page", () => {
    render(<LoginForm />);
    const linkElement = screen.getByTestId("myLoginBtn");
    expect(linkElement).toBeInTheDocument();
  });

  test("Rendering the Checked checkboxes on Login Page", () => {
    const component = render(<LoginForm />);
    // console.log(component);
    const linkElement = screen.getByRole("checkbox", { checked: true });
    expect(linkElement).toBeInTheDocument();
  });

  //   Test case to test the testenvironment jsdom present or not
  test("Used jsdom in this test file", () => {
    const element = document.createElement("div");
    expect(element).not.toBeNull();
  });
});

describe("Test asynchronous call", () => {
  test("this should not pass", (done) => {
    expect.assertions(1);
    setTimeout(() => {
      expect(1).toBe(1);
      done();
    });
  });

  test("Testing Error Msg", () => {
    const { getByTestId } = render(
      <div data-testid="err">Invalid email address</div>
    );
    // expect(queryByTestId(/name/i)).not.toBeNull();
    expect(getByTestId(/err/i).textContent).toBe("Invalid email address");
  });
});

describe("Login component test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<LoginForm />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  test("Renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");
    const button = container.querySelectorAll("button");
    expect(inputs).toHaveLength(3);
    expect(button).toHaveLength(1);
    expect(inputs[0].name).toBe("username");
    expect(inputs[1].name).toBe("password");
    expect(button[0].type).toBe("submit");
  });

  test("should pass on password validation", () => {
    const testPassword = "12345678";
    expect(validatePassword(testPassword)).toBe(true);
  });

  test("Username input field should accept only correct username and password", async () => {
    const username = screen.getByPlaceholderText(
      "Enter Username"
    ) as HTMLInputElement;
    const password = screen.getByPlaceholderText(
      "Enter Password"
    ) as HTMLInputElement;
    await userEvent.type(username, "UISPL0001");
    await userEvent.type(password, "12345678");
    expect(
      validateUsername(username.value) && validatePassword(password.value)
    ).toBe(true);
  });
});
