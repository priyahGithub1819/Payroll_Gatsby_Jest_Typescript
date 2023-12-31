import React from "react";
import SuperAdminProfile from "../../pages/super-admin-login/super-admin-profile";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, screen, cleanup } from "@testing-library/react";
import { render, multiRender } from "../../test_Util/custom-render-function";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const server = setupServer();
// defining all route which I have to check
const routes = [
  {
    path: "/app/superadmin",
    component: () => <h1>My Dashbord is rendering now</h1>,
  },
  { path: "/super-admin-login/super-admin-profile/", component: SuperAdminProfile },
];

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
      role: "super-admin-login",
      password: "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
      empStatus: "Confirmed",
    },
  },
};

const loadUser = ({ userData = user } = {}) => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(userData));
    })
  );
};

describe("Testing candidate selection page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("WHEN super admin profile component is mounted THEN render user information", async () => {
    loadUser();
    const { queryByText, debug } = await act(() =>
      render(<SuperAdminProfile />, {
        route: "/super-admin-login/super-admin-profile/",
      })
    );
    expect(queryByText("Super Admin Profile")).toBeInTheDocument();
  });

  it("WHEN click on my Dashboard button Then render dashboard page", async () => {
    // useEffect is calling data in initial state
    loadUser();
    // using mulirender because we have to check routing
    // we are using act because its using useState and some time this throwing error
    await act(() =>
      multiRender(routes, {
        path: "/super-admin-login/super-admin-profile/",
      })
    );

    // checking is component is rendering our not
    expect(screen.queryByText("Super Admin Profile")).toBeInTheDocument();

    // taking reference of dashboard button
    const myDashboardBtn = screen.getByTestId("myDashboard");
    // performing click event
    userEvent.click(myDashboardBtn);

    // in below I am again rendering because of that I have to clean the privious render code
    // thats why I am using cleanup() function. It will clear the privious code before second render

    cleanup();

    // in below line we are again using mutiRendring because we have to render another component
    // we have to again render the new component we couse click evet is working but render function not rendering second component
    // I am not sure but its happening because of typescript.
    // but above I have taken referance of my DashBoard button with That I can access the button attribute and I am using href attribute to check ourting is working or not
    // I am using screen we cocause I am using multiple reder function which I am using more then 1 time
    multiRender(routes, {
      path: `${myDashboardBtn.getAttribute("href")}`,
    });
    screen.debug();
    // checking is second component is rendering our not
    expect(
      screen.getByText("My Dashbord is rendering now")
    ).toBeInTheDocument();
  });
});
