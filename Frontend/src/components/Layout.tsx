import React, { useState, createContext, useEffect } from "react";
import { loadUser } from "../services/apiFunction";
import NavBar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

interface PageProps {
  children: React.ReactNode;
}

const testingUser = {
  "success": true,
  "employee": {
      "basic": {
          "name": {
              "firstName": "Priya",
              "middleName": "Prajyot",
              "lastName": "Hatipkar"
          },
          "mobile": {
              "countryCode": "+91",
              "number": 9860288765
          },
          "employeeId": "UISPL0005",
          "gender": "Female",
          "dateOfJoining": "Tue Jan 03 2023 05:30:00 GMT+0530 (India Standard Time)",
          "maritalStatus": "MARRIED",
          "probationPeriod": 3,
          "confirmationDate": "2023-04-03T00:00:00.000Z",
          "dateOfBirth": "1989-10-17T00:00:00.000Z",
          "employmentStatus": "active",
          "employmentType": "FTE",
          "designation": "MARKETING MANAGER",
          "department": "MARKETING",
          "workMode": "WFH",
          "workLocation": "Pune",
          "selfDeclaration": {
              "idProofs": {
                  "bloodGroup": "B-Negative",
                  "aadhaarCard": {
                      "aadhaarNumber": 673465324222,
                      "verifyStatus": "Pending",
                      "uploadedAt": "2023-04-13T13:30:58.377Z"
                  },
                  "panCard": {
                      "panCardNumber": "AYRPP0904W",
                      "verifyStatus": "Pending",
                      "uploadedAt": "2023-04-13T13:30:58.377Z"
                  },
                  "passport": {
                      "verifyStatus": "Pending",
                      "uploadedAt": "2023-04-13T13:30:58.377Z"
                  }
              },
              "academics": [],
              "previousCompany": []
          },
          "email": "priyah@uvxcel.com",
          "selectCount": 0
      },
      "payrollData": {
          "updatedby": {
              "empId": "UISPL0005",
              "date": "2023-05-03T06:13:56.518Z"
          },
          "createdby": {
              "empId": "UISPL0001",
              "date": "2023-04-13T13:39:52.924Z"
          },
          "_id": "6438043c1ed10be60f9d953c",
          "empId": "UISPL0005",
          "__v": 0,
          "DOB": "1984-12-22",
          "DOB1": "2019-08-19",
          "NameofSpouse": "Prajyot Hatipkar",
          "child1": "Pravee Hatipkar",
          "child1Gender": "Female",
          "numberOfMember": 2,
          "relationship": "Husband",
          "role": "owner",
          "password": "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
          "empStatus": "Confirmed"
      }
  }
}

export const UserData = createContext<any>({});

const Layout: React.FC<PageProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [protectedUser, setProtectedUser] = useState();

  const callUser = async () => {

    const data = await loadUser();
    setUser(data);
  };
  const protectedApi = async () => {
    const data = await loadUser();
    setProtectedUser(data);
  };
  function presentYear() {
    const d = new Date();
    let year = d.getFullYear();
    return year;
  }

  useEffect(() => {
    callUser()
  }, []);

  return (
    <>
      <UserData.Provider
        value={{ user, callUser, protectedApi, protectedUser }}
      >
        <div className="layout">
          <NavBar />
          {children}
          <footer id="footer" className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-md-5 text-center text-md-start">
                  <p className="ps-3">
                    Copyright © {presentYear()} uvXcel - All Rights Reserved
                  </p>
                </div>
                <div className="offset-lg-5 offset-md-2 col-lg-3 col-md-5 text-center text-md-start">
                  <div className="footer-contact">
                    <p>
                      Email : <a href="mailto:hr@uvxcel.com">hr@uvxcel.com</a>
                    </p>
                    <p className="">Phone: +91-20-6706259</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </UserData.Provider>
    </>
  );
};
export default Layout;
