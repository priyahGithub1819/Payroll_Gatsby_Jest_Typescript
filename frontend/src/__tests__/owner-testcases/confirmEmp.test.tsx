import React from "react"
import { render } from "../../test_Util/custom-render-function";
import {rest} from "msw"
import {setupServer} from "msw/node";
import ConfirmEmp from "../../pages/owner-login/confirm-employee"

const data = {
            "success": true,
            "employeeData": [
                {
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
                        "empStatus": "Confirmed"
                    }
                },
                {
                    "basic": {
                        "name": {
                            "firstName": "Pratik ",
                            "middleName": "Dilip",
                            "lastName": "Raut"
                        },
                        "mobile": {
                            "countryCode": "+91",
                            "number": 9867456786
                        },
                        "selectCount": 0,
                        "employeeId": "UISPL0006",
                        "gender": "Male",
                        "dateOfJoining": "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
                        "maritalStatus": "SINGLE",
                        "probationPeriod": 3,
                        "confirmationDate": "2023-07-12T18:30:00.000Z",
                        "dateOfBirth": "1998-12-28T00:00:00.000Z",
                        "employmentStatus": "active",
                        "employmentType": "FTE",
                        "designation": "JUNIOR ACCOUNTANT ",
                        "department": "ACCOUNT",
                        "workMode": "WFH",
                        "workLocation": "Pune",
                        "selfDeclaration": {
                            "idProofs": {
                                "bloodGroup": "B-Positive",
                                "aadhaarCard": {
                                    "aadhaarNumber": 234356787898,
                                    "verifyStatus": "Pending",
                                    "uploadedAt": "2023-04-14T09:15:59.565Z"
                                },
                                "panCard": {
                                    "panCardNumber": "AYRPT5567Y",
                                    "verifyStatus": "Pending",
                                    "uploadedAt": "2023-04-14T09:15:59.565Z"
                                },
                                "passport": {
                                    "verifyStatus": "Pending",
                                    "uploadedAt": "2023-04-14T09:15:59.565Z"
                                }
                            },
                            "academics": [],
                            "previousCompany": []
                        },
                        "email": "pratikr@uvxcel.com"
                    },
                    "payrollData": {
                        "empStatus": "Pending",
                        "_id": "643919e12a78b7517d0510db",
                        "empId": "UISPL0006",
                        "DOB3": "1968-12-09",
                        "DOB4": "1970-03-08",
                        "NameofFather": "Dilip Raut",
                        "NameofMother": "ABC",
                        "numberOfMember": 3,
                        "role": "technicalEmployee"
                    }
                }
            ]
        }



const server = setupServer()

const customeServerCall = () => {
    return server.use(rest.get("/api/v2/payroll/user/all",(req,res,ctx)=>{
        return res(ctx.json(data))
    }))
}


describe("testing list of confirm employee in owner login",()=>{

    beforeAll(()=>{server.listen()})
    afterEach(()=>server.resetHandlers())
    afterAll(()=>server.close())
    it("all user list is rendering here", async ()=>{
        customeServerCall() 
        const {debug,findByText} = render(<ConfirmEmp />,{route:"/owner-login/confirm-employee/"})
    
        await findByText("UISPL0004")

    })
})