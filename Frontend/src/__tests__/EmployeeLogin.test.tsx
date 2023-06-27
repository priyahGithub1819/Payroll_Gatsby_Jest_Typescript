import React from "react";
import * as ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";
import {
  fireEvent,
  getByLabelText,
  queryByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../test_Util/custom_render_function";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Profile from "../pages/employeeProfile";
import { getByTestId, waitFor,screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import Modal from "react"


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
        confirmationDate: "2023-07-12T18:30:00.000Z",
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
  "success": true,
  "employeeCTC": {
      "_id": "6438106147885c4332e8f732",
      "Emp_Id": "UISPL0004",
      "CTC": "900000",
      "__v": 0
  }
}

const monthData = {
  "success": true,
  "finalData": {
      "April2022": {
          "present": 0,
          "sick leave": 0,
          "casual leave": 0,
          "privilege leave": 0,
          "holiday": 0,
          "totalBusinessDay": 23
      }
  }
}

const singlePfData = {
  "updatedby": {
      "empId": "UISPL0002",
      "date": "2023-04-19T09:56:58.878Z"
  },
  "createdby": {
      "empId": "UISPL0002",
      "date": "2023-04-13T12:48:11.559Z"
  },
  "_id": "64380b8d6a184d03adc85af0",
  "empId": "UISPL0004",
  "__v": 0,
  "aadharNumber": 673465324246,
  "accountNumber": 23459178357,
  "address": "Amravati",
  "bankName": "Kotak Mahindra",
  "dateofRegistration": "2023-04-03",
  "empDob": "2001-04-16",
  "ifscCode": "bkhg1234567",
  "name": "Prapti Gomekar",
  "panNumber": "AYRPP0909Q",
  "pfStatus": "Active",
  "pfUanNumber": 98767891656
}

const loadUser =  {
  "success": true,
  "employee": {
      "basic": {
          "name": {
              "firstName": "Prapti",
              "middleName": "Anil",
              "lastName": "Gomekar"
          },
          "mobile": {
              "countryCode": "+91",
              "number": 9860234523
          },
          "selectCount": 0,
          "employeeId": "UISPL0004",
          "gender": "Female",
          "dateOfJoining": "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
          "maritalStatus": "SINGLE",
          "probationPeriod": 3,
          "confirmationDate": "2022-05-12T18:30:00.000Z",
          "dateOfBirth": "2000-11-18T00:00:00.000Z",
          "employmentStatus": "active",
          "employmentType": "FTE",
          "designation": "JUNIOR SOFTWARE ENGINEER",
          "department": "SOFTWARE DEVELOPMENT",
          "workMode": "WFH",
          "workLocation": "Pune",
          "selfDeclaration": {
              "idProofs": {
                  "bloodGroup": "B-Positive",
                  "aadhaarCard": {
                      "aadhaarNumber": 673465324246,
                      "verifyStatus": "Pending",
                      "uploadedAt": "2023-04-13T13:30:19.872Z"
                  },
                  "panCard": {
                      "panCardNumber": "AYRPP0909Q",
                      "verifyStatus": "Pending",
                      "uploadedAt": "2023-04-13T13:30:19.872Z"
                  },
                  "passport": {
                      "verifyStatus": "Pending",
                      "uploadedAt": "2023-04-13T13:30:19.872Z"
                  }
              },
              "academics": [],
              "previousCompany": []
          },
          "email": "praptig@uvxcel.com"
      },
      "payrollData": {
          "updatedby": {
              "empId": "UISPL0005",
              "date": "2023-04-13T14:23:06.648Z"
          },
          "createdby": {
              "empId": "UISPL0001",
              "date": "2023-04-13T13:49:48.759Z"
          },
          "_id": "6438042c1ed10be60f9d952a",
          "empId": "UISPL0004",
          "__v": 0,
          "DOB3": "1966-06-06",
          "DOB4": "1970-07-08",
          "NameofFather": "Anil Gomekar",
          "NameofMother": "Savita Gomekar",
          "numberOfMember": 2,
          "role": "technicalEmployee",
          "empStatus": "Confirmed",
          "password": "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG"
      }
  }
}

// For testing creating fake api to return fake data for testing purpose
//Here creating server
const server = setupServer();

const customeServerCall = () => {
  return server.use(
    rest.get("/api/v2/payroll/user/all", (req, res, ctx) => {
      return res(ctx.json(data));
    })
  );
};

//Creating Server for CTC
const ctcServerCall = () => {
  return server.use(
    rest.get("/api/v2/payroll/user/ctc", (req, res, ctx) => {
      return res(ctx.json(ctcData));
    })
  );
};

//Creating Server for Month and Year data
const monthYearServerCall = () => {
  return server.use(
    rest.get("/api/v2/user/data", (req, res, ctx) => {
      return res(ctx.json(monthData));
    })
  );
};

//Creating Server for Month and Year data
const singlePfServerCall = () => {
  return server.use(
    rest.get("/api/v2/single-pfemp/UISPL0004", (req, res, ctx) => {
      return res(ctx.json(singlePfData));
    })
  );
};

//Creating server for load user
const loadUserServerCall = () => {
  return server.use(
    rest.get("/api/v2/me", (req, res, ctx) => {
      return res(ctx.json(loadUser));
    })
  );
};

describe("empConfirm.test.tsx", () => {
  //Run sever
  beforeAll(() => {
    server.listen();
  });
  //Reset server
  afterEach(() => server.resetHandlers());
  //Stop server
  afterAll(() => server.close());
  //First test case
  it("component should render", async () => {
    //Calling custome server
    singlePfServerCall();
    ctcServerCall();
    loadUserServerCall();
    monthYearServerCall();

    // redering component here
    const { debug, findByText, queryAllByTestId } = render(<Profile />, {
      route: "/app/employeeProfile",
    });
    //checking that text is present or not
    await findByText("UISPL0004");
    // debug()
  });

  it("checking chekbox is working or not and the family information of an employee is displayed on modal or not.", async () => {
    //Calling custome server
    singlePfServerCall();
    loadUserServerCall();
    ctcServerCall();
    monthYearServerCall();

    // redering component here
    const { debug, findByText, queryAllByTestId,getByLabelText,getAllByTestId,container,queryByText } = render(<Profile />, {
      route: "/app/employeeProfile",
    });
    //checking that text is present or not
    await findByText("Prapti Anil Gomekar");
    const checkbox = getAllByTestId("familyCheckbox")[0] as HTMLInputElement;
    
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  // const modal = container.querySelectorAll(".Modal");
  // expect(modal).toBeInTheDocument();

    //await waitFor(() => userEvent.click(familyCheckbox[0]));

    const familyInfoButton = getAllByTestId('famBtn')[0] as HTMLElement;
    expect(familyInfoButton).not.toHaveStyle("display: none");
    fireEvent.click(familyInfoButton);
    await findByText("Savita Gomekar");
    await findByText("Anil Gomekar");
    //await waitFor(() => expect(getAllByTestId('familyModal')).toBeInTheDocument());
    // debug()
  });
  
  it("Checking the salary information of employee is displayed on modal or not.", async () => {
    //Calling custome server
    singlePfServerCall();
    loadUserServerCall();
    ctcServerCall();
    monthYearServerCall();

    // redering component here
    const { debug, findByText, queryAllByTestId,getByLabelText,getAllByTestId,container,queryByText } = render(<Profile />, {
      route: "/app/employeeProfile",
    });
    //checking that text is present or not
    await findByText("Prapti Anil Gomekar");
    const checkbox = getAllByTestId("salaryCheckbox")[0] as HTMLInputElement;
    
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

    const salaryInfoButton = getAllByTestId('salaryBtn')[0] as HTMLElement;
    expect(salaryInfoButton).not.toHaveStyle("display: none");
     fireEvent.click(salaryInfoButton);
    await findByText("Last Month Salary Information");
    await findByText("Select month and year to download salary slip.");

    const selectYear = getAllByTestId("selectYear")[0] as HTMLSelectElement
    const selectMonth = getAllByTestId("selectMonth")[0] as HTMLSelectElement
    // await waitFor(()=> userEvent.selectOptions(selectYear,"2022")) 
    // await waitFor(()=> userEvent.selectOptions(selectMonth,"April")) 
    await waitFor(()=> fireEvent.change(selectYear,{target :{value:"2022"}})) 
    await waitFor(()=> fireEvent.change(selectMonth,{target :{value:"3"}})) 
 
    expect(selectYear.value).toBe('2022');
    expect(selectMonth.value).toBe('3');
    await findByText("Salary slip of April - 2022")
   await findByText("Software Development")
    //await waitFor(() => expect(getAllByTestId('familyModal')).toBeInTheDocument());
    // debug()
  });
})
