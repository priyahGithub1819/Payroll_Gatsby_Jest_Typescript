import React from "react";
import ViewOnboardCandi from "../../pages/Owner/viewOnboardCandi";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {act} from "@testing-library/react"
import { render } from "../../test_Util/custom_render_function";
import "@testing-library/jest-dom/extend-expect"

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
      role: "owner",
      password: "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
      empStatus: "Confirmed",
    },
  },
};

let candidates =  {
  success: true,
  candiInfo: [
   
    {
      _id: "6374a7bc7478e0b9dffbb8c6",
      candidateId: "CAND0013",
      candidateName: "Test3",
      eduQual: "M.E",
      primarySkill: "HTML, CSS, NodeJS",
      secondarySkill: "Core Java",
      noticePeriod: " 3 Months",
      currentCTC: "5 CTC",
      expectedCTC: "10 CTC",
      candiStatus: "Onboard",
      createdAt: "2022-11-09T13:58:56.545Z",
      __v: 0,
      rejectedMessage: "",
    },
    {
      _id: "6438e65b3fe4ddaf46bad84b",
      candidateId: "CAND0004",
      candidateName: "Gayatri Tajne",
      eduQual: "BE",
      primarySkill: "HTML CSS",
      secondarySkill: "Js",
      noticePeriod: "6",
      currentCTC: "2LPA",
      expectedCTC: "3LPA",
      candiStatus: "Rejected",
      rejectedMessage: "Lack of grasping power",
      createdAt: "2023-04-14T05:36:27.718Z",
      __v: 0,
    },
  ],
};
const getCandidateList = ({ candidateData = candidates } = {}) => {
  return server.use(
    rest.get("/api/v2/owner/data", (req, res, ctx) => {
      return res(ctx.json(candidateData));
    })
  );
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
    candidates.candiInfo[1].candiStatus = "Onboard"
    server.resetHandlers();
 
});
  afterAll(() => server.close());

  it("WHEN component is mounted THEN render the list of onboard candidate", async () => {
    loadUser()
    getCandidateList();
    const {debug,queryByText} = await act(()=> render(<ViewOnboardCandi />, {
      route: "/Owner/viewOnboardCandi/",
    })
    );
    expect(queryByText("List of Candidates to be Onboarded")).toBeInTheDocument()
    expect(queryByText("CAND0013")).toBeInTheDocument()
  });

});
