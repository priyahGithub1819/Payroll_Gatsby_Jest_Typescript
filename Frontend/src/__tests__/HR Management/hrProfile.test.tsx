import React from "react";
import HRProfile from "../../pages/HR Management/hrProfile";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, screen, cleanup } from "@testing-library/react";
import { render, multiRender } from "../../test_Util/custom_render_function";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

// setting the server
const server = setupServer();

//routes
const routes = [
  {
    path: "/HR%20Management/hrProfile/",
    component: HRProfile,
  },
  {
    path: "/app/hrdashboard",
    component: () => <h1>Hr dashboard render now</h1>,
  },
];

// creating fake data
const user = {
  success: true,
  employee: {
    basic: {
      name: { firstName: "Priya", middleName: "Prajyot", lastName: "Hatipkar" },
      mobile: { countryCode: "+91", number: 9860288765 },
      employeeId: "UISPL0005",
      gender: "Female",
      dateOfJoining: "Tue Jan 03 2023 05:30:00 GMT+0530 (India Standard Time)",
      maritalStatus: "MARRIED",
      probationPeriod: 3,
      confirmationDate: "2023-04-03T00:00:00.000Z",
      dateOfBirth: "1989-10-17T00:00:00.000Z",
      employmentStatus: "active",
      employmentType: "FTE",
      designation: "MARKETING MANAGER",
      department: "MARKETING",
      workMode: "WFH",
      workLocation: "Pune",
      selfDeclaration: {
        idProofs: {
          bloodGroup: "B-Negative",
          aadhaarCard: {
            aadhaarNumber: 673465324222,
            verifyStatus: "Pending",
            uploadedAt: "2023-04-13T13:30:58.377Z",
          },
          panCard: {
            panCardNumber: "AYRPP0904W",
            verifyStatus: "Pending",
            uploadedAt: "2023-04-13T13:30:58.377Z",
          },
          passport: {
            verifyStatus: "Pending",
            uploadedAt: "2023-04-13T13:30:58.377Z",
          },
        },
        academics: [],
        previousCompany: [],
      },
      email: "priyah@uvxcel.com",
      selectCount: 0,
    },
    payrollData: {
      updatedby: { empId: "UISPL0005", date: "2023-05-03T06:13:56.518Z" },
      createdby: { empId: "UISPL0001", date: "2023-04-13T13:39:52.924Z" },
      _id: "6438043c1ed10be60f9d953c",
      empId: "UISPL0005",
      __v: 0,
      DOB: "1984-12-22",
      DOB1: "2019-08-19",
      NameofSpouse: "Prajyot Hatipkar",
      child1: "Pravee Hatipkar",
      child1Gender: "Female",
      numberOfMember: 2,
      relationship: "Husband",
      role: "hrAdmin",
      password: "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
      empStatus: "Confirmed",
    },
  },
};

// function defination
const loadUser = ({ userData = user } = {}) => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(userData));
    })
  );
};

// test cases
describe("Testing candidate selection page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("WHEN super admin profile component is mounted THEN render user information", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      render(<HRProfile />, {
        route: "/HR Management/hrProfile/",
      })
    );
    expect(queryByText("Hr Admin Profile")).toBeInTheDocument();
    await findByText("Employee ID : UISPL0005");
  });

  it("WHEN Click on my dashboard button THEN render my component page", async () => {
    loadUser();
    await act(() =>
      multiRender(routes, {
        path: "/HR%20Management/hrProfile/",
      })
    );
    expect(screen.queryByText("Hr Admin Profile")).toBeInTheDocument();
    await screen.findByText("Employee ID : UISPL0005");

    const myDashboardBtn = screen.getByTestId("hrdashboardBtn");
    userEvent.click(myDashboardBtn);

    cleanup();

    multiRender(routes, {
      path: `${myDashboardBtn.getAttribute("href")}`,
    });

    expect(screen.getByText("Hr dashboard render now")).toBeInTheDocument();
  });
});
