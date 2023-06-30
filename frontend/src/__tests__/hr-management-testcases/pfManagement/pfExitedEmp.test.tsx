import React from "react";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom";
import PfExitedEmpList from "../../../pages/hr-management-login/pf-management/pf-exited-emplist";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "../../../test_Util/custom-render-function";

// creating the fake data
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
      pfStatus: "Exited",
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

const allData = {
  success: true,
  employeeData: [
    {
      basic: {
        name: {
          firstName: "Sachin",
          middleName: "Phoolchand",
          lastName: "Yadav",
        },
        mobile: {
          countryCode: "+91",
          number: 8268749835,
        },
        selectCount: 0,
        employeeId: "UISPL0001",
        gender: "Male",
        dateOfJoining:
          "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
        maritalStatus: "SINGLE",
        probationPeriod: 3,
        confirmationDate: "2023-07-12T18:30:00.000Z",
        dateOfBirth: "2001-04-16T00:00:00.000Z",
        employmentStatus: "active",
        employmentType: "FTE",
        designation: "ALL",
        department: "ALL",
        workMode: "WFH",
        workLocation: "Pune",
        selfDeclaration: {
          idProofs: {
            bloodGroup: "O-Positive",
            aadhaarCard: {
              aadhaarNumber: 212745473948,
            },
            panCard: {
              panCardNumber: "AAAAA1234A",
            },
            passport: {
              verifyStatus: "pending",
              uploadedAt: "2023-04-13T11:16:55.196Z",
            },
          },
          academics: [
            {
              course: "BE",
              stream: "Computer ",
              instituteUniversity: "SPPU ",
              percentageCGPA: 68.89,
              passingYear: "2020-01-01T00:00:00.000Z",
              fileName: "1eabed96e2908e689516c4c9686bc6ff.pdf",
              verifyStatus: "Pending",
              _id: "643e91b87a699a3c01c27dec",
              uploadedAt: "2023-04-18T12:48:56.846Z",
            },
          ],
        },
        email: "sachiny@uvxcel.com",
      },
      payrollData: {
        _id: "6437ed29f3a14186574e984c",
        empId: "UISPL0001",
        DOB3: "1973-12-10",
        NameofFather: "Phoolchand Yadav",
        numberOfMember: 1,
        parents: "father",
        role: "super-admin-login",
        createdAt: "2023-03-16T09:57:22.884Z",
        empStatus: "Confirmed",
        updatedAt: "2023-03-16T09:57:22.884Z",
      },
    },
  ],
};

// setting the server and Initialize a mock server instance using the setupServer() function
const server = setupServer();

// defining the function
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

const allDataServerCall = () => {
  return server.use(
    rest.get("/api/v2/payroll/user/all", (req, res, ctx) => {
      return res(ctx.json(allData));
    })
  );
};

// test cases
describe("pf exited page test case", () => {
  test("should test the heading pf the page", () => {
    const { getByTestId } = render(<PfExitedEmpList />);
    expect(getByTestId("heading")).toHaveTextContent(
      "List of Exited PF Employees"
    );
  });

  // checking the number of columns
  test("should check number of columns in the table", () => {
    const { getAllByRole } = render(<PfExitedEmpList />);
    const AllColumns = getAllByRole("column");
    expect(AllColumns).toHaveLength(15);
  });

  // checking navigation on click of arrow button
  test('should navigate to "/hr-management-login/pf-management" when the arrow is clicked', () => {
    const { getByTestId } = render(<PfExitedEmpList />);
    const leftArrow = getByTestId("arrowLink");
    userEvent.click(leftArrow);
    window.history.pushState({}, "", "/HR%20Management/pf-management");
    expect(window.location.pathname).toBe("/HR%20Management/pf-management");
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // checking the table data
  test("Should check the data render or not", async () => {
    // calling the functions
    customeServerCall();
    loadUserServerCall();
    allDataServerCall();

    const { debug, findByText, getByTestId } = await act(() =>
      render(<PfExitedEmpList />, {
        route: "/hr-management-login/pf-management/PfExitedEmpList",
      })
    );

    expect(getByTestId("table")).toBeInTheDocument();
    await findByText("UISPL0001");
  });
});
