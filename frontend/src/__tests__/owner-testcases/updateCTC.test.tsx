import React from "react";
import { render } from "../../test_Util/custom-render-function";
import { rest } from "msw";
import { setupServer } from "msw/node";
import UpdateCTC from "../../pages/owner-login/update-ctc";
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

describe("update-ctc.test.tsx", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("should render component", async () => {

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

    const { getByText, debug, findByText } = render(<UpdateCTC />, {
      route: "/owner-login/update-ctc/",
    });
    await findByText("UISPL0004");
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
      { route: "/owner-login/update-ctc/" }
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
});
