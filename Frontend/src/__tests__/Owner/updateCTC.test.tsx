import React from "react";
import { render } from "../../test_Util/custom_render_function";
import { rest } from "msw";
import { setupServer } from "msw/node";
import UpdateCTC from "../../pages/Owner/updateCTC";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";

const data = {
  success: true,
  employeeData: [
    {
      basic: {
        name: {
          firstName: "Prapti",
          middleName: "Anil",
          lastName: "Gomekar",
        },
        mobile: {
          countryCode: "+91",
          number: 9860234523,
        },
        selectCount: 0,
        employeeId: "UISPL0004",
        gender: "Female",
        dateOfJoining:
          "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
        maritalStatus: "SINGLE",
        probationPeriod: 3,
        confirmationDate: "2022-05-12T18:30:00.000Z",
        dateOfBirth: "2000-11-18T00:00:00.000Z",
        employmentStatus: "active",
        employmentType: "FTE",
        designation: "JUNIOR SOFTWARE ENGINEER",
        department: "SOFTWARE DEVELOPMENT",
        workMode: "WFH",
        workLocation: "Pune",
        selfDeclaration: {
          idProofs: {
            bloodGroup: "B-Positive",
            aadhaarCard: {
              aadhaarNumber: 673465324246,
              verifyStatus: "Pending",
              uploadedAt: "2023-04-13T13:30:19.872Z",
            },
            panCard: {
              panCardNumber: "AYRPP0909Q",
              verifyStatus: "Pending",
              uploadedAt: "2023-04-13T13:30:19.872Z",
            },
            passport: {
              verifyStatus: "Pending",
              uploadedAt: "2023-04-13T13:30:19.872Z",
            },
          },
          academics: [],
          previousCompany: [],
        },
        email: "praptig@uvxcel.com",
      },
      payrollData: {
        updatedby: {
          empId: "UISPL0005",
          date: "2023-04-13T14:23:06.648Z",
        },
        createdby: {
          empId: "UISPL0001",
          date: "2023-04-13T13:49:48.759Z",
        },
        _id: "6438042c1ed10be60f9d952a",
        empId: "UISPL0004",
        __v: 0,
        DOB3: "1966-06-06",
        DOB4: "1970-07-08",
        NameofFather: "Anil Gomekar",
        NameofMother: "Savita Gomekar",
        numberOfMember: 2,
        role: "technicalEmployee",
        empStatus: "Confirmed",
      },
    },
    {
      basic: {
        name: {
          firstName: "Pratik ",
          middleName: "Dilip",
          lastName: "Raut",
        },
        mobile: {
          countryCode: "+91",
          number: 9867456786,
        },
        selectCount: 0,
        employeeId: "UISPL0006",
        gender: "Male",
        dateOfJoining:
          "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
        maritalStatus: "SINGLE",
        probationPeriod: 3,
        confirmationDate: "2023-05-12T18:30:00.000Z",
        dateOfBirth: "1998-12-28T00:00:00.000Z",
        employmentStatus: "active",
        employmentType: "FTE",
        designation: "JUNIOR ACCOUNTANT ",
        department: "ACCOUNT",
        workMode: "WFH",
        workLocation: "Pune",
        selfDeclaration: {
          idProofs: {
            bloodGroup: "B-Positive",
            aadhaarCard: {
              aadhaarNumber: 234356787898,
              verifyStatus: "Pending",
              uploadedAt: "2023-04-14T09:15:59.565Z",
            },
            panCard: {
              panCardNumber: "AYRPT5567Y",
              verifyStatus: "Pending",
              uploadedAt: "2023-04-14T09:15:59.565Z",
            },
            passport: {
              verifyStatus: "Pending",
              uploadedAt: "2023-04-14T09:15:59.565Z",
            },
          },
          academics: [],
          previousCompany: [],
        },
        email: "pratikr@uvxcel.com",
      },
      payrollData: {
        empStatus: "Pending",
        _id: "643919e12a78b7517d0510db",
        empId: "UISPL0006",
        DOB3: "1968-12-09",
        DOB4: "1970-03-08",
        NameofFather: "Dilip Raut",
        NameofMother: "ABC",
        numberOfMember: 3,
        role: "technicalEmployee",
      },
    },
  ],
};
const ctcData = {
  success: true,
  resultData: [
    {
      updatedby: {},
      createdby: {},
      _id: "6438106147885c4332e8f732",
      Emp_Id: "UISPL0004",
      CTC: 90000,
      __v: 0,
      Name: {
        firstName: "Prapti",
        middleName: "Anil",
        lastName: "Gomekar",
      },
    },
  ],
};

const server = setupServer();
const customeServerCall = () => {
  return server.use(
    rest.get("/api/v2/payroll/user/all", (req, res, ctx) => {
      return res(ctx.json(data));
    })
  );
};

const getCustomUserCtc = ({ ctcDetails = ctcData } = {}) => {
  return server.use(
    rest.get("/api/v2/payroll/user/all/ctc", (req, res, ctx) => {
      return res(ctx.json(ctcDetails));
    })
  );
};

describe("updateCTC.test.tsx", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("should render component", async () => {
    customeServerCall();
    const { getByText, debug, findByText } = render(<UpdateCTC />, {
      route: "/Owner/updateCTC/",
    });
    await findByText("UISPL0006");
  });

  it("should Edit on clicking of edit button", async () => {
    customeServerCall();
    getCustomUserCtc({ ctcDetails: ctcData });
    server.use(
      rest.get(
        "/api/v2/single-ctc/6438106147885c4332e8f732",
        (req, res, ctx) => {
          return res(
            ctx.json({
              updatedby: {},
              createdby: {},
              _id: "6438106147885c4332e8f732",
              Emp_Id: "UISPL0004",
              CTC: 900000,
              __v: 0,
              Name: {
                firstName: "Prapti",
                middleName: "Anil",
                lastName: "Gomekar",
              },
            })
          );
        }
      )
    );

    const { debug, findByText, getAllByTestId, container } = render(
      <UpdateCTC />,
      { route: "/Owner/updateCTC/" }
    );
    await findByText("UISPL0004");
    // debug()
    const editBtns = getAllByTestId("myEditBtn");
    expect(editBtns.length).toBeGreaterThanOrEqual(1);
    // debug()
    // waiting because it calling async function
    await waitFor(() => userEvent.click(editBtns[0]));

    expect(getAllByTestId("myEditBtn")[0]).not.toHaveStyle("display:none");
    const selectRef = getAllByTestId("myCTC")[0] as HTMLInputElement;

    expect(selectRef).toHaveValue("90000");
    console.log(selectRef.value);
    // await waitFor(()=> fireEvent.change(selectRef,{ target:{value: "500000"}}))
    await waitFor(() => userEvent.type(selectRef, "500000"));
    // userEvent.type(selectRef, "500000");
    console.log(selectRef.value);
  });

  // it.only("When user click on edit button save button should display and after edit save button should not display", async () => {
  //   customeServerCall();
  //   server.use(
  //     rest.get("/api/v2/me", (req, res, ctx) => {
  //       return res(
  //         ctx.json({
  //           success: true,
  //           employee: {
  //             basic: {
  //               name: {
  //                 firstName: "Priya",
  //                 middleName: "Prajyot",
  //                 lastName: "Hatipkar",
  //               },
  //               mobile: {
  //                 countryCode: "+91",
  //                 number: 9860288765,
  //               },
  //               employeeId: "UISPL0005",
  //               gender: "Female",
  //               dateOfJoining:
  //                 "Tue Jan 03 2023 05:30:00 GMT+0530 (India Standard Time)",
  //               maritalStatus: "MARRIED",
  //               probationPeriod: 3,
  //               confirmationDate: "2023-04-03T00:00:00.000Z",
  //               dateOfBirth: "1989-10-17T00:00:00.000Z",
  //               employmentStatus: "active",
  //               employmentType: "FTE",
  //               designation: "MARKETING MANAGER",
  //               department: "MARKETING",
  //               workMode: "WFH",
  //               workLocation: "Pune",
  //               selfDeclaration: {
  //                 idProofs: {
  //                   bloodGroup: "B-Negative",
  //                   aadhaarCard: {
  //                     aadhaarNumber: 673465324222,
  //                     verifyStatus: "Pending",
  //                     uploadedAt: "2023-04-13T13:30:58.377Z",
  //                   },
  //                   panCard: {
  //                     panCardNumber: "AYRPP0904W",
  //                     verifyStatus: "Pending",
  //                     uploadedAt: "2023-04-13T13:30:58.377Z",
  //                   },
  //                   passport: {
  //                     verifyStatus: "Pending",
  //                     uploadedAt: "2023-04-13T13:30:58.377Z",
  //                   },
  //                 },
  //                 academics: [],
  //                 previousCompany: [],
  //               },
  //               email: "priyah@uvxcel.com",
  //               selectCount: 0,
  //             },
  //             payrollData: {
  //               updatedby: {
  //                 empId: "UISPL0005",
  //                 date: "2023-05-03T06:13:56.518Z",
  //               },
  //               createdby: {
  //                 empId: "UISPL0001",
  //                 date: "2023-04-13T13:39:52.924Z",
  //               },
  //               _id: "6438043c1ed10be60f9d953c",
  //               empId: "UISPL0005",
  //               __v: 0,
  //               DOB: "1984-12-22",
  //               DOB1: "2019-08-19",
  //               NameofSpouse: "Prajyot Hatipkar",
  //               child1: "Pravee Hatipkar",
  //               child1Gender: "Female",
  //               numberOfMember: 2,
  //               relationship: "Husband",
  //               role: "owner",
  //               password:
  //                 "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
  //               empStatus: "Confirmed",
  //             },
  //           },
  //         })
  //       );
  //     })
  //   );
  //   server.use(
  //     rest.get("/api/v2/payroll/user/all/ctc", (req, res, ctx) => {
  //       return res(ctx.json(ctcData));
  //     })
  //   );

  //   const { debug, findByText, queryAllByTestId, getAllByTestId, container } =
  //     render(<UpdateCTC />, {
  //       route: "/Owner/updateCTC",
  //     });
  //   await findByText("UISPL0004");
  //   const editBtns = container.querySelectorAll("#editBtn");
  //   expect(editBtns.length).toBeGreaterThanOrEqual(1);
  //   await waitFor(() => userEvent.click(editBtns[0]));

  //   expect(getAllByTestId("saveBtn")[0]).not.toHaveStyle("display: none");

  //   //expect(saveBtns.length).toBeGreaterThanOrEqual(1)
  //   //await waitFor(()=> userEvent.click(saveBtns[0]))
  //   // debug()
  // });
});
