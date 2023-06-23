import React from "react";
import Sidebar from "../components/OwnersSidebar";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, screen, cleanup } from "@testing-library/react";
import { multiRender } from "../test_Util/custom_render_function";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

// setting the server
const server = setupServer();

// created the routes
const routes = [
  { path: "/app/OwnersSidebar/", component: Sidebar },
  {
    path: "/app/owner/",
    component: () => <h1>Owner's dashboard</h1>,
  },
  {
    path: "/Owner/addCTC/",
    component: () => <h1>Add CTC page</h1>,
  },

  {
    path: "/Owner/updateCTC/",
    component: () => <h1>Upload CTC page</h1>,
  },
  {
    path: "/Owner/uploadPayrollDoc/",
    component: () => <h1>Upload payroll Doc</h1>,
  },
  {
    path: "/Owner/listOfEmp/",
    component: () => <h1>List of Employee page</h1>,
  },
  {
    path: "/Owner/confirmEmp/",
    component: () => <h1>List of confirm Employee page</h1>,
  },
  {
    path: "/Owner/empConfirm/",
    component: () => <h1>List of confirmed Employee page</h1>,
  },
  {
    path: "/Owner/empRecordUpdate/",
    component: () => <h1>List of Employee Record update page</h1>,
  },
  {
    path: "/Owner/candiSelection/",
    component: () => <h1>Candidate Selection page</h1>,
  },
  {
    path: "/Owner/viewSelectedCandi/",
    component: () => <h1>List of Selected Candidate page</h1>,
  },
  {
    path: "/Owner/viewSelectedCandi/",
    component: () => <h1>List of Selected Candidate page</h1>,
  },
  {
    path: "/Owner/viewHoldCandi/",
    component: () => <h1>List of Hold Candidate page</h1>,
  },
  {
    path: "/Owner/viewRejectedCandi/",
    component: () => <h1>List of view Rejected Candidate page</h1>,
  },
  {
    path: "/Owner/viewOnboardCandi/",
    component: () => <h1>List of view Onboard Candidate page</h1>,
  },
];

// created fake data
const user = {
  success: true,
  employee: {
    basic: {
      name: {
        firstName: "Priya",
        middleName: "Prajyot",
        lastName: "Hatipkar",
      },
      mobile: {
        countryCode: "+91",
        number: 9860288765,
      },
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
      updatedby: {
        empId: "UISPL0005",
        date: "2023-05-03T06:13:56.518Z",
      },
      createdby: {
        empId: "UISPL0001",
        date: "2023-04-13T13:39:52.924Z",
      },
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
      role: "owner",
      password: "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
      empStatus: "Confirmed",
    },
  },
};

//function defination 
const loadUser = ({ userData = user } = {}) => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(userData));
    })
  );
};

// test cases for navigation
describe("Testing superadmin sidebar", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("should render owner sidebar", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();
  });

  test("On click of dashboard should navigate to owners dashboard", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("dashboard");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });
    expect(screen.queryByText("Owner's dashboard")).toBeInTheDocument();
  });

  test("On click of Add CTC page should navigate to owners Add CTC page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("addCTC");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });
    expect(screen.queryByText("Add CTC page")).toBeInTheDocument();
  });

  test("On click of Upload CTC page should navigate to owners Upload CTC page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("updateCTC");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });
    expect(screen.queryByText("Upload CTC page")).toBeInTheDocument();
  });

  test("On click of Upload payroll Doc page should navigate to owners Upload payroll Doc page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("uploadPayrollDoc");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });
    expect(screen.queryByText("Upload payroll Doc")).toBeInTheDocument();
  });

  test("On click of List of Employee page should navigate to owners List of Employee page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("listOfEmp");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });
    expect(screen.queryByText("List of Employee page")).toBeInTheDocument();
  });

  test("On click of confirm Employee page should navigate to owners confirm Employeee page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("confirmEmp");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(
      screen.queryByText("List of confirm Employee page")
    ).toBeInTheDocument();
  });

  test("On click of confirmed Employee page should navigate to owners List of confirmed Employee page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("empConfirm");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(
      screen.queryByText("List of confirmed Employee page")
    ).toBeInTheDocument();
  });

  test("On click of Employee Record update page should navigate to owners List of Employee Record update page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("empRecordUpdate");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(
      screen.queryByText("List of Employee Record update page")
    ).toBeInTheDocument();
  });

  test("On click of Candidate Selection page should navigate to owners Candidate Selection page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("candiSelection");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(screen.queryByText("Candidate Selection page")).toBeInTheDocument();
  });

  test("On click of Candidate Selection page should navigate to owners Candidate Selection page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("candiSelection");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(screen.queryByText("Candidate Selection page")).toBeInTheDocument();
  });

  test("On click of List of Selected Candidate page should navigate to owners List of Selected Candidate page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("viewSelectedCandi");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(
      screen.queryByText("List of Selected Candidate page")
    ).toBeInTheDocument();
  });

  test("On click of List of Hold Candidate page should navigate to owners List of Hold Candidate page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("viewHoldCandi");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(
      screen.queryByText("List of Hold Candidate page")
    ).toBeInTheDocument();
  });

  test("On click of List of onboard Candidate page should navigate to owners List of onboard Candidate page", async () => {
    loadUser();
    const { queryByText, debug, findByText } = await act(() =>
      multiRender(routes, {
        path: "/app/OwnersSidebar/",
      })
    );
    expect(queryByText("My Dashboard")).toBeInTheDocument();

    const Btn = screen.getByTestId("viewOnboardCandi");
    userEvent.click(Btn);
    cleanup();

    multiRender(routes, {
      path: `${Btn.getAttribute("href")}`,
    });

    expect(
      screen.queryByText("List of view Onboard Candidate page")
    ).toBeInTheDocument();
  });
});
