import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, screen, cleanup } from "@testing-library/react";
import { render, multiRender } from "../../test_Util/custom-render-function";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Owner from "../../pages/owner-login/owner-dashboard";
import { getByTestId, waitFor } from "@testing-library/dom";

const server = setupServer();

const routes = [
  {
    path: "/app/owner/",
    component: Owner,
  },
  {
    path: "/owner-login/list-of-employee",
    component: () => <h1>list of employee page is rendered.</h1>,
  },
  {
    path: "/owner-login/confirm-employee",
    component: () => <h1>list of confirm employee page</h1>,
  },
  {
    path: "/owner-login/employee-confirm",
    component: () => <h1>confirm employee page</h1>,
  },
  {
    path: "/owner-login/employee-record-update",
    component: () => <h1>employee record update page</h1>,
  },
  {
    path: "/owner-login/candidate-selection",
    component: () => <h1>candidate selection page</h1>,
  },
  {
    path: "/owner-login/view-selected-candidate",
    component: () => <h1>view candidate selection page</h1>,
  },
  {
    path: "/owner-login/view-hold-candidate",
    component: () => <h1>view hold candidate page</h1>,
  },
  {
    path: "/owner-login/view-rejected-candidate",
    component: () => <h1>view rejected candidate page</h1>,
  },
  {
    path: "/owner-login/view-onboard-candidate",
    component: () => <h1>view onboarding candidate page</h1>,
  },
  { path: "/owner-login/add-ctc", component: () => <h1>add CTC page</h1> },
  { path: "/owner-login/update-ctc", component: () => <h1>update CTC page</h1> },
  {
    path: "/owner-login/upload-payroll-doc",
    component: () => <h1>upload payroll doc page</h1>,
  },
];

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
const loadUser = ({ userData = user } = {}) => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(userData));
    })
  );
};

describe("testing Owner.tsx", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("WHEN Owner admin dashboard component is mounted THEN render page", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
  });

  it("checking is All Employee  is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("empList");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("list of employee page is rendered.")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Confirmed Employee  is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("confirmedEmpList");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("list of confirm employee page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Employee Confirmation is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("employeeConfirmation");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("confirm employee page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Employee Record Update is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("employee-record-update");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("employee record update page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Candidate Selection is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("candidate-selection");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("candidate selection page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is View Candidate Selection is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();

    const targetBtn = screen.getByTestId("view-selected-candidate");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("view candidate selection page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is View Hold Candidate page is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("OnHoldCandi");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("view hold candidate page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is View Reject Candidate page is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("view-rejected-candidate");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("view rejected candidate page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is View Onboarding Candidate page is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("view-onboard-candidate");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("view onboarding candidate page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Add CTC page is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("add-ctc");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("add CTC page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Update CTC page is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("update-ctc");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("update CTC page")
    ).toBeInTheDocument();
    debug();
  });

  it("checking is Upload Payroll Document page is working", async () => {
    loadUser();
    const { debug } = await act(() =>
      multiRender(routes, {
        path: "/app/owner",
      })
    );
    expect(
      screen.queryByText("Welcome to Owner's Dashboard")
    ).toBeInTheDocument();
    const targetBtn = screen.getByTestId("upload-payroll-doc");
    userEvent.click(targetBtn);
    cleanup();
    multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    });
    expect(
      screen.getByText("upload payroll doc page")
    ).toBeInTheDocument();
    debug();
  });
});
