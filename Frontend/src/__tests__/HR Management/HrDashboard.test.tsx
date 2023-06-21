import React from "react";
import HRDashboard from "../../pages/HR Management/HrDashboard";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {act, screen,cleanup} from "@testing-library/react"
import { render ,multiRender} from "../../test_Util/custom_render_function";
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

const server = setupServer();

const routes = [
    {
        path:"/app/hrdashboard/",
        component:HRDashboard,
      }, {
    path:"/HR%20Management/employee/",
    component:()=><h1>view employee list page render now</h1>,
  }, {
    path:"/HR%20Management/editRejectCandi/",
    component:()=><h1>view & edit rejected candidate render now</h1>,
  }, {
    path:"/HR%20Management/shortlistedCandidate/",
    component:()=><h1>Upload candidate List render now</h1>,
  }, {
    path:"/HR%20Management/pfManagement/",
    component:()=><h1>PF Management page render now</h1>,
  },
]

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

const loadUser = ({ userData=user } = {}) => {
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


  it("WHEN super admin dashboard component is mounted THEN render page", async () => {
    loadUser()
    const {queryByText,debug,findByText} = await act(()=> multiRender(routes, {
      path: "/app/hrdashboard/",
    })
    );
    expect(queryByText("Hr Admin Dashboard")).toBeInTheDocument()
  });

  it("WHEN Click on view employee list button THEN render view employee page",async ()=>{
    loadUser()
    await act(()=> multiRender(routes, {
      path: "/app/hrdashboard/",
    })
    );
    expect(screen.queryByText("Hr Admin Dashboard")).toBeInTheDocument()
    
    const targetBtn = screen.getByTestId("employeeList")
    userEvent.click(targetBtn)

    cleanup()

     multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    })

    expect(screen.getByText("view employee list page render now")).toBeInTheDocument()
  })

  it("WHEN Click on view and edit reject candidate button THEN render that page",async ()=>{
    loadUser()
    await act(()=> multiRender(routes, {
      path: "/app/hrdashboard/",
    })
    );
    expect(screen.queryByText("Hr Admin Dashboard")).toBeInTheDocument()
    
    const targetBtn = screen.getByTestId("rejectedCandiList")
    userEvent.click(targetBtn)

    cleanup()

     multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    })

    expect(screen.queryByText("view & edit rejected candidate render now")).toBeInTheDocument()
  })

  it("WHEN Click on view and edit reject candidate button THEN render that page",async ()=>{
    loadUser()
    await act(()=> multiRender(routes, {
      path: "/app/hrdashboard/",
    })
    );
    expect(screen.queryByText("Hr Admin Dashboard")).toBeInTheDocument()
    
    const targetBtn = screen.getByTestId("uploadCandiList")
    userEvent.click(targetBtn)

    cleanup()

     multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    })

    expect(screen.getByText("Upload candidate List render now")).toBeInTheDocument()
  })

  it("WHEN Click on view and edit reject candidate button THEN render that page",async ()=>{
    loadUser()
    await act(()=> multiRender(routes, {
      path: "/app/hrdashboard/",
    })
    );
    expect(screen.queryByText("Hr Admin Dashboard")).toBeInTheDocument()
    
    const targetBtn = screen.getByTestId("PfManagement")
    userEvent.click(targetBtn)

    cleanup()

     multiRender(routes, {
      path: `${targetBtn.getAttribute("href")}`,
    })

    expect(screen.getByText("PF Management page render now")).toBeInTheDocument()
  })
});
