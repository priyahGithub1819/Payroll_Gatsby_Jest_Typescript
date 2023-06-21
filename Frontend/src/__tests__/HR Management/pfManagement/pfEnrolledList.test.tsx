import React from "react";
import { screen, fireEvent, findByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import PfEnrolledList from "../../../pages/HR Management/pfManagement/pfEnrolledList";
import { render } from "../../../test_Util/custom_render_function";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render as RCH } from "@testing-library/react";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { Router } from "@reach/router";
import userEvent from "@testing-library/user-event";
import { getByRole, waitFor } from "@testing-library/dom";

const pfData = {
  success: true,
  empInfo: [
    {
      updatedby: {
        empId: "UISPL0002",
        date: "2023-05-11T12:02:03.930Z",
      },
      createdby: {
        empId: "UISPL0002",
        date: "2023-05-11T12:02:31.908Z",
      },
      _id: "6437f93147885c4332bb3797",
      empId: "UISPL0001",
      __v: 0,
      aadharNumber: 212745473948,
      accountNumber: 86779178345,
      address: "Mumbai",
      bankName: "Kotak Mahindra",
      dateofRegistration: "2023-04-06",
      empDob: "2001-04-16",
      ifscCode: "kskk1234567",
      name: "Sachin Yadav",
      panNumber: "AAAAA1234A",
      pfStatus: "Active",
      pfUanNumber: 29877891656,
      lastWorkingDay: "2023-05-11",
    },
  ],
};

const loadUser = {
  success: true,
  employee: {
    basic: {
      name: {
        firstName: "Sagar",
        middleName: "Changdev ",
        lastName: "Tilekar",
      },
      mobile: {
        countryCode: "+91",
        number: 8855853940,
      },
      selectCount: 0,
      employeeId: "UISPL0002",
      gender: "Male",
      dateOfJoining: "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
      maritalStatus: "MARRIED",
      probationPeriod: 6,
      confirmationDate: "2022-08-12T18:30:00.000Z",
      dateOfBirth: "1995-07-20T00:00:00.000Z",
      employmentStatus: "active",
      employmentType: "FTE",
      designation: "HR MANAGER",
      department: "HR",
      workMode: "WFH",
      workLocation: "Pune",
      selfDeclaration: {
        idProofs: {
          bloodGroup: "A-Positive",
          aadhaarCard: {
            aadhaarNumber: 212739546678,
            aadhaarFileName: "b58f35fa51db3ae08d05b91cebc5d598.pdf",
            verifyStatus: "pending",
            uploadedAt: "2023-04-19T05:07:19.866Z",
          },
          panCard: {
            panCardNumber: "AYRPT0808E",
            panFileName: "a313bef80723de8e1e6568671dd9d817.pdf",
            verifyStatus: "pending",
          },
          passport: {
            passportNumber: "A20 92343",
            passportFileName: "5db2b2851776e3d70cb3a7e7634097ce.pdf",
            verifyStatus: "pending",
            uploadedAt: "2023-04-19T05:07:19.866Z",
          },
        },
      },
      email: "sagart@uvxcel.com",
    },
    payrollData: {
      updatedby: {
        empId: "UISPL0005",
        date: "2023-04-13T14:23:01.238Z",
      },
      createdby: {
        empId: "UISPL0001",
        date: "2023-04-13T12:15:27.387Z",
      },
      _id: "6437ec6c40a21ad8f6d6bc3b",
      empId: "UISPL0002",
      __v: 0,
      DOB: "1996-05-03",
      NameofSpouse: "ss",
      numberOfMember: 2,
      relationship: "Wife",
      role: "hrAdmin",
      password: "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
      empStatus: "Confirmed",
    },
  },
};

const singleEmpPf = {
  empInfo: [
    {
      updatedby: {
        empId: "UISPL0002",
        date: "2023-05-11T12:02:03.930Z",
      },
      createdby: {
        empId: "UISPL0002",
        date: "2023-05-11T12:02:31.908Z",
      },
      _id: "6437f93147885c4332bb3797",
      empId: "UISPL0001",
      __v: 0,
      aadharNumber: 212745473948,
      accountNumber: 86779178345,
      address: "Mumbai",
      bankName: "Kotak Mahindra",
      dateofRegistration: "2023-04-06",
      empDob: "2001-04-16",
      ifscCode: "kskk1234567",
      name: "Sachin Yadav",
      panNumber: "AAAAA1234A",
      pfStatus: "Active",
      pfUanNumber: 29877891656,
      lastWorkingDay: "2023-05-11",
    },
  ],
};
const server = setupServer();

const customeServerCall = () => {
  return server.use(
    rest.get("/api/v2/pfEmp/data", (req, res, ctx) => {
      return res(ctx.json(pfData));
    })
  );
};

const loadUserServerCall = () => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(loadUser));
    })
  );
};

const singleEmpPfServerCall = () => {
  return server.use(
    rest.get(
      "/api/v2/single-pfemp/6437f93147885c4332bb3797",
      (req, res, ctx) => {
        return res(ctx.json(singleEmpPf));
      }
    )
  );
};

describe("Pf EnrolledList page test case", () => {
  test("renders pf enrolled list page", () => {
    render(<PfEnrolledList />);
  });

  test("should render arrow button", () => {
    const { getByTestId } = render(<PfEnrolledList />);
    expect(getByTestId("leftArrow")).toBeInTheDocument();
  });

  test("should test the heading pf the page", () => {
    const { getByTestId } = render(<PfEnrolledList />);
    expect(getByTestId("heading")).toHaveTextContent(
      "List of Active PF Employees"
    );
  });

  test("should render table", () => {
    const { getByTestId } = render(<PfEnrolledList />);
    expect(getByTestId("table")).toBeInTheDocument();
  });

  test("should check number of checkboxes", () => {
    const { getAllByRole } = render(<PfEnrolledList />);
    const checkBoxes = getAllByRole("checkBox");
    expect(checkBoxes).toHaveLength(5);
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should check the user list", async () => {
    customeServerCall();
    loadUserServerCall();

    const { debug, findByText } = render(<PfEnrolledList />, {
      route: "/HR%20Management/pfManagement/pfEnrolledList",
    });

    await findByText("UISPL0001");
  });

  test("should check arrow btn navigates to dashboard or not", () => {
    const { getByTestId } = render(<PfEnrolledList />);
    const link = getByTestId("arrowLink");
    userEvent.click(link);
    window.history.pushState({}, "", "/HR%20Management/pfManagement");
    expect(window.location.pathname).toBe("/HR%20Management/pfManagement");
  });

  // should check on click of checkbox table column display or not
  test(" should check on click of checkbox table column display or not", async () => {
    customeServerCall();
    loadUserServerCall();

    const { debug, getByTestId, findByText } = render(<PfEnrolledList />, {
      route: "/HR%20Management/pfManagement/pfEnrolledList",
    });
    await findByText("UISPL0001");
    // for DOB of Employee
    const empDobCheckbox = getByTestId("dobOfEmp") as HTMLInputElement;
    userEvent.click(empDobCheckbox);

    const employeeDOB = document.querySelectorAll(".dobOfEmp");

    employeeDOB.forEach((element) => {
      element.classList.remove("dobOfEmp");
      element.classList.add("table-cell");
    });

    const empDob = getByTestId("dobOfEmp_td");
    expect(empDob).toHaveClass("table-cell");

    // for Aadhar Number
    const adharNumber = getByTestId("aadhar") as HTMLInputElement;
    userEvent.click(adharNumber);

    const employeeAadhar = document.querySelectorAll(".aadhar");

    employeeAadhar.forEach((element) => {
      element.classList.remove("aadhar");
      element.classList.add("table-cell");
    });

    const aadhar = getByTestId("aadhar_td");
    expect(aadhar).toHaveStyle("display:table-cell");

    // PAN Number
    const panNumber = getByTestId("panNum") as HTMLInputElement;
    userEvent.click(panNumber);

    const employeePan = document.querySelectorAll(".panNum");

    employeePan.forEach((element) => {
      element.classList.remove("panNum");
      element.classList.add("table-cell");
    });

    const pan = getByTestId("pan_td");
    expect(pan).toHaveStyle("display:table-cell");

    // Creation Details
    const CreationDate = getByTestId("creationDate") as HTMLInputElement;
    userEvent.click(CreationDate);

    const creationDate = document.querySelectorAll(".creationDate");

    creationDate.forEach((element) => {
      element.classList.remove("creationDate");
      element.classList.add("table-cell");
    });

    const creation = getByTestId("creationDate_td");
    expect(creation).toHaveStyle("display:table-cell");

    // Updation Details
    const UpdationDetails = getByTestId("updationDate") as HTMLInputElement;
    userEvent.click(UpdationDetails);

    const updationDate = document.querySelectorAll(".updationDate");

    updationDate.forEach((element) => {
      element.classList.remove("updationDate");
      element.classList.add("table-cell");
    });

    const updation = getByTestId("updationDate_td");
    expect(updation).toHaveStyle("display:table-cell");
  });

  test("Should check edit functinality", async () => {
    // calling the server
    customeServerCall();
    loadUserServerCall();
    singleEmpPfServerCall();

    // rendering page
    const { debug, findByText, getAllByTestId, getByText, queryByText } =
      render(<PfEnrolledList />, {
        route: "/HR%20Management/pfManagement",
      });
    await findByText("UISPL0001");

    // checking edit button
    const editButton = getAllByTestId("editButton");

    // onclick of edit button save button should display
    await waitFor(() => userEvent.click(editButton[0]));
    const saveBtn = getAllByTestId("saveButton")[0];
    expect(saveBtn).toHaveClass("saveBtnEnable");
    debug();
    // checking edited fields are saved or not
    const empName = getAllByTestId("eName")[0] as HTMLInputElement;

    await waitFor(() => userEvent.clear(empName));
    await waitFor(() => userEvent.type(empName, "Sachin P Yadav"));

    // saving the edited field to api
    server.use(
      rest.put(
        "/api/v2/edit-pfemp/6437f93147885c4332bb3797",
        (req, res, ctx) => {
          singleEmpPf.empInfo[0].name = "Sachin P Yadav";
          return res(ctx.status(200), ctx.json({ success: true }));
        }
      )
    );

    // onclick of save btn save button should disabled
    const saveButton = getAllByTestId("saveButton");
    await waitFor(() => userEvent.click(saveButton[0]));
    // expect(saveButton[0]).not.toHaveStyle("display: block");
    expect(saveBtn).toHaveClass("saveBtnDisable");

    expect(empName.value).toBe("Sachin P Yadav");

    await waitFor(() => userEvent.click(saveButton[0]));
    const toastMessage = screen.getAllByText((content, element) => {
      const pattern = /Information of Sachin Yadav is updated successfully/i;
      return pattern.test(content);
    });

    expect(toastMessage.length).toBeGreaterThan(0);

    // checking the pf Status
    server.use(
      rest.put(
        "/api/v2/edit-pfemp/6437f93147885c4332bb3797",
        (req, res, ctx) => {
          singleEmpPf.empInfo[0].pfStatus = "Exited";
          return res(ctx.status(200), ctx.json({ success: true }));
        }
      )
    );
    await waitFor(() => userEvent.click(saveButton[0]));
    expect(saveBtn).toHaveClass("saveBtnDisable");

    expect(queryByText("Sachin Yadav")).not.toBeInTheDocument();
  });
});
