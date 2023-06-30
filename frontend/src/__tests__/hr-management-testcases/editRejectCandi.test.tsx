import React from "react";
import EditRejectedCandidate from "../../pages/hr-management-login/edit-reject-candidate";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, waitFor } from "@testing-library/react";
import { render } from "../../test_Util/custom-render-function";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const server = setupServer();

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

const allCandidate = {
  success: true,
  candiInfo: [
    {
      _id: "636a3e28bcb07e35f156da22",
      candidateId: "CAND001",
      candidateName: "Priya Kadam",
      eduQual: "M.E",
      primarySkill: "HTML, CSS, NodeJS",
      secondarySkill: "Core Java",
      noticePeriod: "3 Months",
      currentCTC: "5 CTC",
      expectedCTC: "10 CTC",
      candiStatus: "Rejected",
      createdAt: "2022-11-08T11:31:52.018Z",
      __v: 0,
      rejectedMessage: "Delay in joining",
    },
    {
      _id: "636a3e28bcb07e35f156da23",
      candidateId: "CAND002",
      candidateName: "Priya Hatipkar",
      eduQual: "M.E",
      primarySkill: "HTML, CSS, NodeJS",
      secondarySkill: "Core Java",
      noticePeriod: "3 Months",
      currentCTC: "5 CTC",
      expectedCTC: "11 CTC",
      candiStatus: "Rejected",
      createdAt: "2022-11-08T11:31:52.019Z",
      __v: 0,
      rejectedMessage: "Lack of grasping power",
    },
    {
      _id: "636a642f9e9f8c3c7abfeb57",
      candidateId: "CAND005",
      candidateName: "Sachin Yadav",
      eduQual: "M.E",
      primarySkill: "HTML, CSS, NodeJS",
      secondarySkill: "Core Java",
      noticePeriod: " 3 Months",
      currentCTC: "5 CTC",
      expectedCTC: "10 CTC",
      candiStatus: "Onboard",
      createdAt: "2022-11-08T14:14:07.017Z",
      __v: 0,
      rejectedMessage: "Lack of grasping power",
    },
  ],
};

const loadUser = ({ userData = user } = {}) => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(userData));
    })
  );
};

const getAllCandidate = ({ data = allCandidate } = {}) => {
  return server.use(
    rest.get("/api/v2/owner/data", (req, res, ctx) => {
      return res(ctx.json(data));
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

  it("WHEN rejected candidate component is mounted THEN render rejected candidate information", async () => {
    loadUser();
    getAllCandidate();
    const { queryByText, findByText } = await act(() =>
      render(<EditRejectedCandidate />, {
        route: "/HR%20Management/edit-reject-candidate/",
      })
    );
    expect(
      queryByText("View and Edit Rejected Candidates")
    ).toBeInTheDocument();
    await findByText("CAND001");
  });

  it("Scenario:after rendering component When user click on edit button that save button should appear", async () => {
    loadUser();
    getAllCandidate({ data: allCandidate });
    server.use(
      rest.get("/api/v2/single-candi/CAND001", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "636a3e28bcb07e35f156da22",
            candidateId: "CAND001",
            candidateName: "Priya Kadam",
            eduQual: "M.E",
            primarySkill: "HTML, CSS, NodeJS",
            secondarySkill: "Core Java",
            noticePeriod: "3 Months",
            currentCTC: "5 CTC",
            expectedCTC: "10 CTC",
            candiStatus: "Rejected",
            createdAt: "2022-11-08T11:31:52.018Z",
            __v: 0,
            rejectedMessage: "Delay in joining",
          })
        );
      })
    );

    server.use(
      rest.put("/api/v2/edit-rejectcandi/CAND001", (req, res, ctx) => {
        allCandidate.candiInfo[0].candidateName = "Priya k";
        allCandidate.candiInfo[0].currentCTC = "10 LPA";
        return res(ctx.json("candidate data updated successfully"));
      })
    );

    const {
      queryByText,
      findByText,
      getAllByRole,
      debug,
      getAllByTestId,
      queryAllByRole,
    } = await act(() =>
      render(<EditRejectedCandidate />, {
        route: "/HR%20Management/edit-reject-candidate/",
      })
    );
    expect(
      queryByText("View and Edit Rejected Candidates")
    ).toBeInTheDocument();
    await findByText("CAND001");

    const allEditBtn = getAllByRole("editBtn");
    expect(allEditBtn.length).toBeGreaterThanOrEqual(1);

    await waitFor(() => userEvent.click(allEditBtn[0]));

    const candidateNameInput = getAllByTestId("candidateName");
    const candidateCurrentCTCInput = getAllByTestId("currentCTC");
    userEvent.type(candidateNameInput[0], "Priya k");
    userEvent.type(candidateCurrentCTCInput[0], "10 LPA");

    const allSaveBtn = getAllByRole("saveBtn");
    expect(allSaveBtn.length).toBeGreaterThanOrEqual(1);

    await waitFor(() => userEvent.click(allSaveBtn[0]));
    expect(queryAllByRole("saveBtn").length).toBeLessThanOrEqual(0);
  });
});
