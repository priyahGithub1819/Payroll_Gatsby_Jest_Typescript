import React from "react";
import Sidebar from "../../components/Sidebar";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, screen, cleanup } from "@testing-library/react";
import { render, multiRender } from "../../test_Util/custom-render-function";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const server = setupServer();

const routes = [
  { path: "/app/Sidebar/", component: Sidebar },
  {
    path: "/super-admin-login/super-admin-profile/",
    component: () => <h1>Super admin profile page render now</h1>,
  },
  {
    path: "/app/superadmin/",
    component: () => <h1>Super admin dashboard page render now</h1>,
  },
  {
    path: "/super-admin-login/add-employee/",
    component: () => <h1>Add employee page render now</h1>,
  },
  {
    path: "/super-admin-login/view-all-employee/",
    component: () => <h1>List of employee page render now</h1>,
  },
  {
    path: "/super-admin-login/add-bulk-employee/",
    component: () => <h1>Add bulk employee page render now</h1>,
  },
];

const user = {
    "success": true,
    "employee": {
        "basic": {
            "name": {
                "firstName": "Sachin",
                "middleName": "Phoolchand",
                "lastName": "Yadav"
            },
            "mobile": {
                "countryCode": "+91",
                "number": 8268749835
            },
            "selectCount": 0,
            "employeeId": "UISPL0001",
            "gender": "Male",
            "dateOfJoining": "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
            "maritalStatus": "SINGLE",
            "probationPeriod": 3,
            "confirmationDate": "2023-07-12T18:30:00.000Z",
            "dateOfBirth": "2001-04-16T00:00:00.000Z",
            "employmentStatus": "active",
            "employmentType": "FTE",
            "designation": "ALL",
            "department": "ALL",
            "workMode": "WFH",
            "workLocation": "Pune",
            "selfDeclaration": {
                "idProofs": {
                    "bloodGroup": "O-Positive",
                    "aadhaarCard": {
                        "aadhaarNumber": 212745473948
                    },
                    "panCard": {
                        "panCardNumber": "AAAAA1234A"
                    },
                    "passport": {
                        "verifyStatus": "pending",
                        "uploadedAt": "2023-04-13T11:16:55.196Z"
                    }
                },
                "academics": [
                    {
                        "course": "BE",
                        "stream": "Computer ",
                        "instituteUniversity": "SPPU ",
                        "percentageCGPA": 68.89,
                        "passingYear": "2020-01-01T00:00:00.000Z",
                        "fileName": "1eabed96e2908e689516c4c9686bc6ff.pdf",
                        "verifyStatus": "Pending",
                        "_id": "643e91b87a699a3c01c27dec",
                        "uploadedAt": "2023-04-18T12:48:56.846Z"
                    }
                ]
            },
            "email": "sachiny@uvxcel.com"
        },
        "payrollData": {
            "_id": "6437ed29f3a14186574e984c",
            "empId": "UISPL0001",
            "DOB3": "1973-12-10",
            "NameofFather": "Phoolchand Yadav",
            "numberOfMember": 1,
            "parents": "father",
            "role": "super-admin-login",
            "password": "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
            "createdAt": "2023-03-16T09:57:22.884Z",
            "empStatus": "Confirmed",
            "updatedAt": "2023-03-16T09:57:22.884Z"
        }
    }
}

const loadUser = ({ userData = user } = {}) => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(userData));
    })
  );
};

describe("Testing superadmin sidebar", () => {
    beforeAll(() => server.listen());
    afterEach(() => {
      server.resetHandlers();
    });
    afterAll(() => server.close());
  
    it("WHEN super admin dashboard component is mounted THEN render page", async () => {
      loadUser();
      const { queryByText, debug, findByText } = await act(() =>
        multiRender(routes, {
          path: "/app/Sidebar/",
        })
      );
      expect(queryByText("Super Admin's Profile")).toBeInTheDocument();
    });
  
    it("WHEN Click on Super Admin's Profile THEN render that page", async () => {
        loadUser();
        await act(() =>
          multiRender(routes, {
            path: "/app/Sidebar/",
          })
        );
        expect(screen.queryByText("Super Admin's Profile")).toBeInTheDocument();
        const targetBtn = screen.getByTestId("saprofile");
        userEvent.click(targetBtn);
        cleanup();
        multiRender(routes, {
          path: `${targetBtn.getAttribute("href")}`,
        });
        expect(
          screen.queryByText("Super admin profile page render now")
        ).toBeInTheDocument();
      });

      it("WHEN Click on Super Admin's Dashbord THEN render that page", async () => {
        loadUser();
        await act(() =>
          multiRender(routes, {
            path: "/app/Sidebar/",
          })
        );
        expect(screen.queryByText("Super Admin's Dashbord")).toBeInTheDocument();
        const targetBtn = screen.getByTestId("sadashboard");
        userEvent.click(targetBtn);
        cleanup();
        multiRender(routes, {
          path: `${targetBtn.getAttribute("href")}`,
        });
        expect(
          screen.queryByText("Super admin dashboard page render now")
        ).toBeInTheDocument();
      });

      it("WHEN Click on Add Employee to Payroll THEN render that page", async () => {
        loadUser();
        await act(() =>
          multiRender(routes, {
            path: "/app/Sidebar/",
          })
        );
        expect(screen.queryByText("Add Employee to Payroll")).toBeInTheDocument();
        const targetBtn = screen.getByTestId("addEmp");
        userEvent.click(targetBtn);
        cleanup();
        multiRender(routes, {
          path: `${targetBtn.getAttribute("href")}`,
        });
        expect(
          screen.queryByText("Add employee page render now")
        ).toBeInTheDocument();
      });

      it("WHEN Click on List of Employees THEN render that page", async () => {
        loadUser();
        await act(() =>
          multiRender(routes, {
            path: "/app/Sidebar/",
          })
        );
        expect(screen.queryByText("List of Employees")).toBeInTheDocument();
        const targetBtn = screen.getByTestId("listofEmp");
        userEvent.click(targetBtn);
        cleanup();
        multiRender(routes, {
          path: `${targetBtn.getAttribute("href")}`,
        });
        expect(
          screen.queryByText("List of employee page render now")
        ).toBeInTheDocument();
      });

      it("WHEN Click on Upload Bulk Employee THEN render that page", async () => {
        loadUser();
        await act(() =>
          multiRender(routes, {
            path: "/app/Sidebar/",
          })
        );
        expect(screen.queryByText("Upload Bulk Employee")).toBeInTheDocument();
        const targetBtn = screen.getByTestId("uploadBulk");
        userEvent.click(targetBtn);
        cleanup();
        multiRender(routes, {
          path: `${targetBtn.getAttribute("href")}`,
        });
        expect(
          screen.queryByText("Add bulk employee page render now")
        ).toBeInTheDocument();
      });
  });
  