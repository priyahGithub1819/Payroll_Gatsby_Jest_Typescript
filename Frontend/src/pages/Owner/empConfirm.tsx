import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import {
  allUserData,
  editEmpStatusPayroll,
  editEmpStatusErp,
  getSingleEmp,
} from "../../services/apiFunction";
import SideBar from "../../components/OwnersSidebar";
import { Link } from "gatsby";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { indianDate } from "../../services/utils";

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

function App() {
  const [records, setRecords] = useState<any>([]);
  const [empToEdit, setEmpToEdit] = useState<any>();

  //To get All Employee
  const getAllEmployees = async () => {
    let data = await allUserData();
    setRecords(data.employeeData);
  };
  useEffect(() => {
    getAllEmployees();
    document.querySelectorAll("td,th").forEach((data) => {
      data.classList.add("text-center");
    });
  }, []);

  //To edit probation period
  const onEditClick = async (e: any, empId: any, selectCount: number) => {
    if (selectCount < 2) {
      const tableRow = e.target.closest("tr");
      const rowData = tableRow.querySelectorAll(".data");
      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style.border = "1px solid black";
        input.style = "appearance: block";
      });

      tableRow.querySelector(".saveConfirmDate").style.display = "";
      const currentEmp = await getSingleEmp(empId);
      setEmpToEdit(currentEmp.data);
      rowData.forEach((element: any) => {
        element.removeAttribute("readOnly");
      });
    } else {
      toast.error("Sorry!! Can not edit");
    }
  };

  const onSaveClick = async (
    e: any,
    empId: any,
    count: number,
    joiningDate: Date,
    probationPeriod: string,
    name: string,
    lastName: string
  ) => {
    await editEmpStatusPayroll(empId, empToEdit.payrollData);
    e.target.style.display = "none";
    const tableRow = e.target.closest("tr");
    tableRow.querySelectorAll(".data").forEach((input: any) => {
      input.style.border = "none";
      input.style = "appearance: none";
    });

    toast.success(`Probation period of ${empId} is updated successfully`);
    if (count === 0) {
      editEmpStatusErp(empId, { selectCount: 1 });
    } else {
      editEmpStatusErp(empId, { selectCount: 2 });
    }

    if (probationPeriod == "3") {
      let confirmDate = new Date(joiningDate);
      confirmDate.setMonth(confirmDate.getMonth() + 3);
      editEmpStatusErp(empId, {
        confirmationDate: confirmDate,
        probationPeriod: probationPeriod,
      });
    } else if (probationPeriod == "6") {
      let confirmDate = new Date(joiningDate);
      confirmDate.setMonth(confirmDate.getMonth() + 6);
      editEmpStatusErp(empId, {
        confirmationDate: confirmDate,
        probationPeriod: probationPeriod,
      });
    } else if (probationPeriod == "9") {
      let confirmDate = new Date(joiningDate);
      confirmDate.setMonth(confirmDate.getMonth() + 9);
      editEmpStatusErp(empId, {
        confirmationDate: confirmDate,
        probationPeriod: probationPeriod,
      });
    }
    getAllEmployees();
  };

  const confirmBtnClick = async (id: any, name: string) => {
    editEmpStatusPayroll(id, { empStatus: "Confirmed" });
    toast.success(id + " confirmed successfully");
    getAllEmployees();
  };

  const notification = async (id: any) => {
    var notification = document.getElementById("notification") as HTMLElement;
    notification.style.display = "block";
  };

  Array.from({ length: 1000 }, (_, i) => i + 1);

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-lg-11 col-md-9 col-sm-12 wrapper">
                <h2 className="text-center bulkText">
                  List of Employees to be Confirmed
                </h2>
                <h6 className="text-center mb-4">
                  <b>Note :</b> You can edit the probation period twice only.
                  Here Count column shows number of attempts used to edit the
                  probation period.
                </h6>
                <div className="empTable">
                  <table className="table-bordered mx-auto css-serial">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Count</th>
                        <th className="heading">Probation Period</th>
                        <th className="heading">Designation</th>
                        <th className="heading">Joining date</th>
                        <th className="heading">Confirmation date</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record: any, Index: number) => {
                          if (record.payrollData.empStatus === "Pending")
                            return (
                              <tr key={Index}>
                                <td></td>
                                <td>
                                  {record.basic.name.firstName}{" "}
                                  {record.basic.name.MiddleName}{" "}
                                  {record.basic.name.lastName}
                                </td>
                                <td>{record.payrollData.empId}</td>
                                <td>{record.basic.selectCount}</td>
                                <td>
                                  <select
                                    style={{ appearance: "none" }}
                                    name="probationPeriod"
                                    className="data select"
                                    id="select"
                                    data-testid="probitionPeriod"
                                    onChange={(e) => {
                                      setEmpToEdit({
                                        ...empToEdit,
                                        probationPeriod: Number(e.target.value),
                                      });
                                      record.basic.probationPeriod =
                                        e.target.value;
                                    }}
                                    value={record.basic.probationPeriod}
                                  >
                                    {" "}
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="9">9 Months</option>
                                  </select>
                                  <img
                                    src="/edit.png"
                                    alt="edit button"
                                    className={`editConfirmDate ${
                                      record.basic.selectCount === 2
                                        ? "d-none"
                                        : ""
                                    }`}
                                    id="editBtn"
                                    data-testid="editBtn"
                                    onClick={(e) => {
                                      onEditClick(
                                        e,
                                        record.payrollData.empId,
                                        record.basic.selectCount
                                      );
                                    }}
                                  />
                                  <img
                                    src="/save.png"
                                    id="saveBtn"
                                    alt="ViewImg"
                                    data-testid="saveBtn"
                                    className="saveConfirmDate editConfirmDate"
                                    style={{ display: "none" }}
                                    onClick={(e) =>
                                      onSaveClick(
                                        e,
                                        record.payrollData.empId,
                                        record.basic.selectCount,
                                        record.basic.dateOfJoining,
                                        record.basic.probationPeriod,
                                        record.basic.name.firstName,
                                        record.basic.name.lastName
                                      )
                                    }
                                  />
                                </td>
                                <td>{record.basic.designation}</td>
                                <td>
                                  {indianDate(record.basic.dateOfJoining)}
                                </td>
                                <td>
                                  {indianDate(record.basic.confirmationDate)}
                                </td>
                                <td>
                                  {" "}
                                  <button
                                    className="btn btn-success"
                                    id="btn"
                                    data-testid="confirmBtn"
                                    onClick={(e) =>
                                      confirmBtnClick(
                                        record.payrollData.empId,
                                        (record.basic.name.firstName,
                                        record.basic.name.lastName,
                                        record.payrollData.empStatus)
                                      )
                                    }
                                    disabled={
                                      new Date(
                                        record.basic.confirmationDate
                                      ).setHours(0, 0, 0, 0) >
                                      new Date().setHours(0, 0, 0, 0)
                                    }
                                  >
                                    Confirm
                                  </button>
                                </td>
                              </tr>
                            );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default App;
