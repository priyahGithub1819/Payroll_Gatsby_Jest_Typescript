import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import {
  allUserData,
  editEmpStatusErp,
  getAllCTC,
  editSingleCtc,
} from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";
import { Link } from "gatsby";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CtcData {
  CTC: string;
  Emp_Id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
  createdby?: {
    empId: string;
    date: Date;
  };
  updatedby?: {
    empId: string;
    date: Date;
  };
}

interface Employee {
  Name: string;
  Emp_Id: string;
  CTC: string;
}
interface EmployeeData {
  basic: {
    confirmationDate: string;
    dateOfBirth: string;
    dateOfJoining: string;
    department: string;
    designation: string;
    email: string;
    employeeId: string;
    employmentStatus: string;
    employmentType: string;
    gender: string;
    maritalStatus: string;
    countryCode: string;
    number: number;
    probationPeriod: number;
    selectCount: number;
    workLocation: string;
    workMode: string;
    mobile: {
      countryCode: string;
      number: number;
    };
    name: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
    selfDeclaration: {
      academics: {};
      idProofs: {
        panCard: {
          panCardNumber: string;
        };
      };
      previousCompany: {};
    };
  };
  payrollData: {
    NameofSpouse: string;
    relationship: string;
    DOB: string;
    child1: string;
    child1Gender: string;
    DOB1: string;
    child2: string;
    child2Gender: string;
    DOB2: string;
    DOB3: string;
    DOB4: string;
    NameofFather: string;
    NameofMother: string;
    empId: string;
    empStatus: string;
    numberOfMember: number;
    password: string;
    role: string;
    parents: string;
  };
  empPaymentData: {
    aadharNumber: number;
    accountNumber: number;
    address: string;
    bankName: string;
    dateofRegistration: string;
    empDob: string;
    empId: string;
    ifscCode: string;
    name: string;
    panNumber: string;
    pfStatus: string;
    pfUanNumber: string;
    paymentType: string;
  };
  CTC?: number,
  designation: string, 
}

function App() {
  const [records, setRecords] = useState<EmployeeData[]>([]);
  const [allCtc, setAllCtc] = useState<CtcData[]>();
  const ctc = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

  const [ctcToEdit, setCtcToEdit] = useState<Employee>({
    Name: "",
    Emp_Id: "",
    CTC: "",
  });
  const [empToEdit, setEmpToEdit] = useState<EmployeeData | undefined>();

  const getAllEmployees = async () => {
    // To get user data
    let data = await allUserData();

    // to get user CTC
    let ctcData = await getAllCTC();
    setRecords(data.employeeData);

    if (ctcData.success && data.success) {
      console.log(ctcData);

      setAllCtc(ctcData.resultData);
    } else {
      window.alert(ctcData.error);
    }
  };
  console.log(empToEdit);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(empToEdit)
    setEmpToEdit({ ...empToEdit, [e.target.name]: e.target.value });
  };

  //To edit designation and CTC columns
  const onEditClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    empId: string
  ) => {
    const target = e.target as HTMLElement;
    console.log(target);
    const tableRow = target.closest("tr");
    const rowData = tableRow?.querySelectorAll(".data");
    if (rowData) {
      rowData.forEach((input: Element) => {
        if (input instanceof HTMLElement) {
          input.style.border = "1px solid black";
        }
      });
    }
    const saveBtn = tableRow?.querySelector(".save-btn") as HTMLElement;
    if (saveBtn) {
      saveBtn.style.display = "";
    }
   
    const currentEmp = await axios.get(`/api/v2/single-emp/${empId}`);
    setEmpToEdit(currentEmp.data);
  
    rowData?.forEach((element: Element) => {
      if (element instanceof HTMLElement) {
        element.removeAttribute("readOnly");
      }
    });
  };

  //To save updated designation and CTC
  const onSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    empId: string,
    name: string,
    lastName: string
  ) => {
    if(empToEdit){
    const { CTC } = empToEdit;

    if (String(empToEdit.CTC) === "") {
      alert("Field should not be empty.");
      const target = e.currentTarget as HTMLElement;
      const tableRow = target.closest("tr");
      const inputElements = tableRow?.querySelectorAll(".CTC");
      if (inputElements) {
        inputElements.forEach((input: Element) => {
          if (input instanceof HTMLElement) {
            input.style.border = "2px solid red";
          }
        });
      }
    } 
    else if (empToEdit.CTC && !ctc.test(String(empToEdit.CTC))) {
      alert("CTC cannot be negative.");
      const target = e.currentTarget as HTMLElement;
      const tableRow = target.closest("tr");
      const inputElements = tableRow?.querySelectorAll(".CTC");
      if (inputElements) {
        inputElements.forEach((input: Element) => {
          if (input instanceof HTMLElement) {
            input.style.border = "2px solid red";
          }
        });
      }
    } else {
      await editEmpStatusErp(empId, empToEdit);
      await editSingleCtc(empId, { CTC });
      const target = e.target as HTMLButtonElement;
      if (target) {
        target.style.display = "none";
        const tableRow = target.closest("tr");
        const inputElements = tableRow?.querySelectorAll(".data");
        if (inputElements) {
          inputElements.forEach((input: Element) => {
            if (input instanceof HTMLElement) {
              input.style.border = "none";
            }
          });
        }
      }
      toast.success(`Information of ${empId} is updated successfully`);
    }
  }
  };

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-end">
              <div className="margin col-lg-11 col-md-9 col-sm-10 wrapper">
                <h2 className="text-center bulkText">Update CTC</h2>
                <div className="empTable">
                  <table className="table table-bordered css-serial">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">CTC</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record: EmployeeData, Index: number) => {
                          if (record.payrollData.empStatus === "Confirmed")
                            return (
                              <tr key={Index}>
                                <td></td>
                                <td>{record.payrollData.empId}</td>
                                <td>
                                  {record.basic.name.firstName}{" "}
                                  {record.basic.name.middleName}{" "}
                                  {record.basic.name.lastName}
                                </td>
                                <td>
                                  <input
                                    data-testid="ctc"
                                    name="CTC"
                                    type="number"
                                    //pattern="[0-9]+"
                                    className="data inputFont CTC"
                                    onChange={onValueChange}
                                    defaultValue={
                                      allCtc &&
                                      allCtc.filter(
                                        (ctc: CtcData) =>
                                          ctc.Emp_Id ===
                                          record.payrollData.empId
                                      ).length > 0
                                        ? allCtc.filter(
                                            (ctc: CtcData) =>
                                              ctc.Emp_Id ===
                                              record.payrollData.empId
                                          )[0].CTC
                                        : "CTC not found"
                                    }
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <button
                                    id="editBtn"
                                    className="editBtn"
                                    onClick={(e) =>
                                      onEditClick(e, record.payrollData.empId)
                                    }
                                  >
                                    Edit{" "}
                                  </button>
                                  <button
                                    id="saveBtn"
                                    data-testid="saveBtn"
                                    className=" save-btn editBtn"
                                    style={{ display: "none" }}
                                    onClick={(e) =>
                                      onSaveClick(
                                        e,
                                        record.payrollData.empId,
                                        record.basic.name.firstName,
                                        record.basic.name.lastName
                                      )
                                    }
                                  >
                                    Save{" "}
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
