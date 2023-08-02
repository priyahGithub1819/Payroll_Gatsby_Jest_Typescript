import React, { useEffect, MouseEvent } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef } from "react";
import axios from "axios";
import {
  allUserData,
  editEmpStatusPayroll,
  editEmpStatusErp,
  getSingleEmp,
} from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";
import { Link } from "gatsby";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { indianDate } from "../../services/utils";

interface Employee {
  basic: {
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    mobile: {
      countryCode: string;
      number: number;
    };
    selectCount: number;
    employeeId: string;
    gender: string;
    dateOfJoining: string;
    maritalStatus: string;
    probationPeriod: number;
    confirmationDate: string;
    dateOfBirth: string;
    employmentStatus: string;
    employmentType: string;
    designation: string;
    department: string;
    workMode: string;
    workLocation: string;
    selfDeclaration: {
      idProofs: {
        bloodGroup: string;
        aadhaarCard: {
          aadhaarNumber: number;
          verifyStatus: string;
          uploadedAt: string;
        };
        panCard: {
          panCardNumber: string;
          verifyStatus: string;
          uploadedAt: string;
        };
        passport: {
          verifyStatus: string;
          uploadedAt: string;
        };
      };
      academics: any[];
      previousCompany: any[];
    };
    email: string;
  };
  payrollData: {
    updatedby: {
      empId: string;
      date: string;
    };
    createdby: {
      empId: string;
      date: string;
    };
    _id: string;
    empId: string;
    __v: number;
    DOB3: string;
    DOB4: string;
    NameofFather: string;
    NameofMother: string;
    numberOfMember: number;
    role: string;
    empStatus: string;
  };
}

function App() {
  const [records, setRecords] = useState<Employee[]>([]);
  const [empToEdit, setEmpToEdit] = useState<Employee | null>(null);
  const [oldProbation, setOldProbation] = useState<number | null>(null);
  const saveButtonRef = useRef(null);
  // To get All Employees
  const getAllEmployees = async () => {
    let data = await allUserData();
    setRecords(data.employeeData);
    //setOldProbation(data.employeeData);
  };

  useEffect(() => {
    getAllEmployees();
    document.querySelectorAll("td,th").forEach((data) => {
      data.classList.add("text-center");
    });
  }, []);

  // To edit probation period
  const onEditClick = async (
    e: MouseEvent<HTMLImageElement>,
    empId: string,
    selectCount: number
  ) => {
    if (selectCount < 2) {
      
      const tableRow = e.currentTarget.closest(
        "tr"
      ) as HTMLTableRowElement | null;
      if (tableRow === null) return; // Handle the case where tableRow is null
      const rowData = tableRow.querySelectorAll(".data");
      const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
      const saveBtn = tableRow?.querySelector(".save-btn") as HTMLElement;
      const editBtn = tableRow?.querySelector("#editBtn") as HTMLElement;
      cancelBtn.style.display = "";
      saveBtn.style.display = "";
      editBtn.style.display = "none";
      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style.border = "1px solid black";
        input.disabled = false;
        input.style.appearance = "revert";
      });
      const saveConfirmDate = tableRow.querySelector(
        ".saveConfirmDate"
      ) as HTMLElement | null;
      if (saveConfirmDate !== null) {
        saveConfirmDate.style.display = "";
      }

      const currentEmp = await getSingleEmp(empId);
      setOldProbation(currentEmp.basic.probationPeriod)
      
      
      setEmpToEdit(currentEmp);
      rowData.forEach((element: any) => {
        element.removeAttribute("readOnly");
      });
    } else {
      toast.error("Sorry!! Can not edit");
    }
  };

  const onCancleClick = async (
    e: any,
    empId: string,
    count: number,
    joiningDate: Date,
    probationPeriod: number,
    firstName: string,
    lastName: string
  ) => {
    const target = e.target as HTMLElement;
    const tableRow = target.closest("tr") as HTMLTableRowElement;
    const rowData = tableRow?.querySelectorAll(".data");
    const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
    const saveBtn = tableRow?.querySelector(".save-btn") as HTMLElement;
    const editBtn = tableRow?.querySelector("#editBtn") as HTMLElement;
    cancelBtn.style.display = "none";
    saveBtn.style.display = "none";
    editBtn.style.display = "";
    console.log(empId,oldProbation);
    
if(empId && oldProbation)
 {
  records.filter((r)=> r.payrollData.empId === empId)[0].basic.probationPeriod = oldProbation
  console.log(records);
  
  setRecords([...records])
 }
    
  
    
    tableRow.querySelectorAll(".data").forEach((input: any) => {
      input.style.border = "none";
      input.disabled = true;
      input.style.appearance = "none";
    });
  };

  const onSaveClick = async (
    e: any,
    empId: string,
    count: number,
    joiningDate: Date,
    probationPeriod: number,
    name: string,
    lastName: string
  ) => {
    await editEmpStatusPayroll(empId, empToEdit?.payrollData);
    await editEmpStatusErp(empId, { probationPeriod });
    e.target.style.display = "none";
    const tableRow = e.target.closest("tr");
    if (tableRow === null) return; // Handle the case where tableRow is null
    const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
    const editBtn = tableRow?.querySelector("#editBtn") as HTMLElement;
    cancelBtn.style.display = "none";
    editBtn.style.display = "";
    tableRow.querySelectorAll(".data").forEach((input: any) => {
      input.style.border = "none";
      input.disabled = true;
      input.style.appearance = "none";
    });

    toast.success(`Probation period of ${empId} is updated successfully`);
    if (count === 0) {
      editEmpStatusErp(empId, { selectCount: 1 });
    } else {
      editEmpStatusErp(empId, { selectCount: 2 });
    }

    let updatedEmployee: Employee | null = null;
    if (
      probationPeriod === 3 ||
      probationPeriod === 6 ||
      probationPeriod === 9
    ) {
      const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
      const editBtn = tableRow?.querySelector("#editBtn") as HTMLElement;
      cancelBtn.style.display = "none";
      editBtn.style.display = "";
      const confirmDate = new Date(joiningDate);
      confirmDate.setMonth(confirmDate.getMonth() + Number(probationPeriod));

      updatedEmployee = {
        ...empToEdit!,
        basic: {
          ...empToEdit!.basic,
          probationPeriod: Number(probationPeriod),
          confirmationDate: confirmDate.toISOString(), // Format as string
        },
      };
    } else {
      const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
      const editBtn = tableRow?.querySelector("#editBtn") as HTMLElement;
      cancelBtn.style.display = "none";
      editBtn.style.display = "";
      // If probation period is not 3, 6, or 9, just update the basic selectCount property
      updatedEmployee = {
        ...empToEdit!,
        basic: {
          ...empToEdit!.basic,
          selectCount: count + 1,
        },
      };
      
    }

    setEmpToEdit(updatedEmployee);
    getAllEmployees();
  };

  const confirmBtnClick = async (id: string, name: string) => {
    editEmpStatusPayroll(id, { empStatus: "Confirmed" });
    toast.success(id + " confirmed successfully");
    getAllEmployees();
  };

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-lg-11 col-md-9 col-sm-12 wrapper">
                <h2 className="text-center bulkText">
                  List of Employees to be Confirmed
                </h2>
                <h6 className="text-center mb-4">
                  <b>Note :</b> You can edit the probation period twice only.
                  Here Count column shows the number of attempts used to edit
                  the probation period.
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
                      {records.map((record: Employee, index: number) => {
                        if (record.payrollData.empStatus === "Pending")
                          return (
                            <tr key={index}>
                              <td></td>
                              <td>
                                {record.basic.name.firstName}{" "}
                                {record.basic.name.middleName}{" "}
                                {record.basic.name.lastName}
                              </td>
                              <td>{record.payrollData.empId}</td>
                              <td>{record.basic.selectCount}</td>
                              <td>
                                <select
                                  disabled
                                  style={{ appearance: "none" }}
                                  name="probationPeriod"
                                  className="data select"
                                  id="select"
                                  data-testid="probitionPeriod"
                                  onChange={(e) => {
                                    if (empToEdit) {
                                      empToEdit.basic.probationPeriod = Number(
                                        e.target.value
                                      );
                                      setEmpToEdit({ ...empToEdit });
                                    }

                                    records[index].basic.probationPeriod =
                                      Number(e.target.value);
                                    setRecords(records);
                                  }
                                }
                                  value={record.basic.probationPeriod}
                                >
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
                                  onClick={(e) =>
                                    onEditClick(
                                      e,
                                      record.payrollData.empId,
                                      record.basic.selectCount
                                    )
                                  }
                                />
                                <img
                                  src="/crossSign1.png"
                                  alt="cancel button"
                                  className="editConfirmDate cancel-btn"
                                  id="cancelBtn"
                                  style={{
                                    display: "none",
                                    marginLeft: "40px",
                                  }}
                                  data-testid="cancelBtn"
                                  onClick={(e) =>
                                    onCancleClick(
                                      e,
                                      record.payrollData.empId,
                                      record.basic.selectCount,
                                      new Date(record.basic.dateOfJoining),
                                      record.basic.probationPeriod,
                                      record.basic.name.firstName,
                                      record.basic.name.lastName
                                    )
                                  }
                                />
                                <img
                                  src="/save.png"
                                  id="saveBtn"
                                  alt="ViewImg"
                                  ref={saveButtonRef}
                                  data-testid="saveBtn"
                                  className="saveConfirmDate editConfirmDate save-btn"
                                  style={{ display: "none" }}
                                  onClick={(e) =>
                                    onSaveClick(
                                      e,
                                      record.payrollData.empId,
                                      record.basic.selectCount,
                                      new Date(record.basic.dateOfJoining),
                                      record.basic.probationPeriod,
                                      record.basic.name.firstName,
                                      record.basic.name.lastName
                                    )
                                  }
                                />
                              </td>
                              <td>{record.basic.designation}</td>
                              <td>{indianDate(record.basic.dateOfJoining)}</td>
                              <td>
                                {indianDate(record.basic.confirmationDate)}
                              </td>
                              <td>
                                <button
                                  className="btn btn-success"
                                  id="btn"
                                  data-testid="confirmBtn"
                                  onClick={(e) =>
                                    confirmBtnClick(
                                      record.payrollData.empId,
                                      record.basic.name.firstName
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
                        return null;
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
