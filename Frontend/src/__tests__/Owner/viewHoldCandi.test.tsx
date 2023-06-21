import React from "react";
import ViewHoldCandi from "../../pages/Owner/viewHoldCandi";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {act, waitFor} from "@testing-library/react"
import { render } from "../../test_Util/custom_render_function";
import userEvent from "@testing-library/user-event"
import {fireEvent} from "@testing-library/react"
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
      candiStatus: "Hold",
      createdAt: "2022-11-09T13:58:56.545Z",
      __v: 0,
      rejectedMessage: "",
    },
    {
      _id: "6438e65b3fe4ddaf46bad84b",
      candidateId: "CANDI0004",
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
    candidates.candiInfo[0].candiStatus = "Hold"
    server.resetHandlers();
 
});
  afterAll(() => server.close());

  it("WHEN component is mounted THEN render the list of selected candidate", async () => {
    loadUser()
    getCandidateList();
    const {debug,queryByText} = await act(()=> render(<ViewHoldCandi />, {
      route: "/Owner/viewHoldCandi/",
    })
    );
    expect(queryByText("List of On Hold Candidates")).toBeInTheDocument()
    expect(queryByText("CAND0013")).toBeInTheDocument()
  });//

//   select button
  it("WHEN click on select button  THEN render candidate should remove from page", async () => {
    loadUser()
    getCandidateList({candidateData:candidates});
    const {debug,queryByText,getAllByTestId,findByText} = await act(()=> render(<ViewHoldCandi />, {
      route: "/Owner/viewHoldCandi/",
    })
    );
    await findByText("CAND0013")

    const allOnboardButton = getAllByTestId("selectBtn")

    expect(allOnboardButton.length).toBeGreaterThanOrEqual(1);

    server.use(rest.put("/api/v2/edit-candi/CAND0013",(req,res,ctx)=>{
        candidates.candiInfo[0].candiStatus = "Selected"
        return res(ctx.json({success:true}))
    }))
    await waitFor(()=>userEvent.click(allOnboardButton[0]))
    expect(queryByText("CAND0013")).not.toBeInTheDocument()
  });


  // reject
  it("WHEN click on reject button THEN reject Modal should render and after filling the render candidate should remove from page", async () => {
    loadUser()
    getCandidateList({candidateData:candidates});
    const {debug,queryByText,getAllByTestId,getByTestId,findByText} = await act(()=> render(<ViewHoldCandi />, {
      route: "/Owner/viewHoldCandi/",
    })
    );
    await findByText("CAND0013")

    const allrejectButton = getAllByTestId("rejectBtn")

    expect(allrejectButton.length).toBeGreaterThanOrEqual(1);

    await waitFor(()=>userEvent.click(allrejectButton[0]))
    expect(getByTestId("reject-msg-modal")).toBeInTheDocument()

    const rejectResonInput = getByTestId("rejectReason") as HTMLTextAreaElement;
    fireEvent.change(rejectResonInput,{target:{value:"Lack of Communication Skills"}})
    expect(rejectResonInput.value).toBe("Lack of Communication Skills")
    const finalRejectButton = getByTestId("finalRejectButton")

    server.use(rest.put("/api/v2/edit-candi/CAND0013",(req,res,ctx)=>{
      candidates.candiInfo[0].candiStatus = "Rejected";
      candidates.candiInfo[0].rejectedMessage = rejectResonInput.value;
      return res(ctx.json({success:true}))
    }))
        
    await waitFor(()=>userEvent.click(finalRejectButton))

    expect(queryByText("reject-msg-modal")).not.toBeInTheDocument()
    expect(queryByText("CAND0013")).not.toBeInTheDocument()
  });


  it("WHEN click on reject button THEN reject Modal should render and when click on close button then model should close", async ()=>{
    loadUser()
    getCandidateList({candidateData:candidates});
    const {debug,queryByText,getAllByTestId,getByTestId,findByText} = await act(()=> render(<ViewHoldCandi />, {
      route: "/Owner/viewHoldCandi/",
    })
    );
    await findByText("CAND0013")

    const allrejectButton = getAllByTestId("rejectBtn")

    expect(allrejectButton.length).toBeGreaterThanOrEqual(1);

    await waitFor(()=>userEvent.click(allrejectButton[0]))
    expect(getByTestId("reject-msg-modal")).toBeInTheDocument()

    const closeRejectModal = getByTestId("closeRejectModal")
    await waitFor(()=>userEvent.click(closeRejectModal)) 
    expect(queryByText("reject-msg-modal")).not.toBeInTheDocument()
  })
});
