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
} from "../../services/apiFunction";
import SideBar from "../../components/OwnersSidebar";
import { Link } from "gatsby";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [records, setRecords] = useState<any>([]);
  const [allCtc, setAllCtc] = useState<any>();
  const ctc = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

  const [ctcToEdit, setCtcToEdit] = useState<any>({
    Name: "",
    Emp_Id: "",
    CTC: "",
  });
  const [empToEdit, setEmpToEdit] = useState<any>({
    name: "",
    empId: "",
    email: "",
    dob: "",
    contactNo: "",
    gender: "",
    joiningDate: "",
    probationPeriod: "",
    confirmationDate: "",
    designation: "",
    location: "",
    temppassword: "",
    department: "",
    role: "",
    workMode: "",
    numberOfMember: "",
    status: "",
    NameofSpouse: "",
    relationship: "",
    DOB: "",
    child1: "",
    child1Gender: "",
    DOB1: "",
    child2: "",
    child2Gender: "",
    DOB2: "",
    NameofFather: "",
    DOB3: "",
    NameofMother: "",
    DOB4: " ",
    pan: " ",
    pf: " ",
    paymentType: " ",
    bankName: "",
    bankBranch: "",
    ifscCode: "",
    accountNumber: "",
    password: "",
  });

  const getAllEmployees = async () => {
    // To get user data
    let data = await allUserData();

    // to get user CTC
    let ctcData = await getAllCTC();
    setRecords(data.employeeData);

    if (ctcData.success && data.success) {
      setAllCtc(ctcData.resultData);
    } else {
      window.alert(ctcData.error);
    }
  };
  useEffect(() => {
    getAllEmployees();
  }, []);

  const onValueChange = (e: any) => {
    setEmpToEdit({ ...empToEdit, [e.target.name]: e.target.value });
  };

  //To edit designation and CTC columns
  const onEditClick = async (e: any, empId: any) => {
    const tableRow = e.target.closest("tr");
    const rowData = tableRow.querySelectorAll(".data");
    tableRow.querySelectorAll(".data").forEach((input: any) => {
      input.style.border = "1px solid black";
    });
    tableRow.querySelector(".save-btn").style.display = "";
    allCtc.forEach(async (ctc: any) => {
      if (ctc.empId === empId) {
        const currentCtcEmp = await axios.get(
          `/api/v2/single-ctc/${ctc.empId}`
        );
        setCtcToEdit(currentCtcEmp.data);
      }
    });
    const currentEmp = await axios.get(`/api/v2/single-emp/${empId}`);
    setEmpToEdit(currentEmp.data);
    rowData.forEach((element: any) => {
      element.removeAttribute("readOnly");
    });
  };

  //To save updated designation and CTC
  const onSaveClick = async (
    e: any,
    empId: any,
    name: string,
    lastName: string
  ) => {
    const { CTC } = empToEdit;
    if (empToEdit.CTC === "") {
      alert("Field should not be empty.");
      const tableRow = e.target.closest("tr");
      tableRow.querySelectorAll(".CTC").forEach((input: any) => {
        input.style.border = "2px solid red";
      });
    } else if (empToEdit.designation === "") {
      alert("Field should not be empty.");
      const tableRow = e.target.closest("tr");
      tableRow.querySelectorAll(".designation").forEach((input: any) => {
        input.style.border = "2px solid red";
      });
    } else if (!ctc.test(empToEdit.CTC)) {
      alert("CTC cannot be negative.");
      const tableRow = e.target.closest("tr");
      tableRow.querySelectorAll(".CTC").forEach((input: any) => {
        input.style.border = "2px solid red";
      });
    } else {
      await editEmpStatusErp(empId, empToEdit);
      await editSingleCtc(empId, { CTC });
      e.target.style.display = "none";
      const tableRow = e.target.closest("tr");
      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style.border = "none";
      });
      toast.success(`Information of ${empId} is updated successfully`);
    }
  };

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-end">
              <div className="margin col-lg-11 col-md-9 col-sm-10 wrapper">
                <h2 className="text-center bulkText">Employee Record Update</h2>
                <div className="empTable">
                  <table className="table table-bordered css-serial">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Designation</th>
                        <th className="heading">CTC</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record: any, Index: number) => {
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
                                    data-testid="designation"
                                    name="designation"
                                    className="data inputFont designation"
                                    onChange={onValueChange}
                                    type="text"
                                    defaultValue={record.basic.designation}
                                    readOnly
                                  />
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
                                        (ctc: any) =>
                                          ctc.Emp_Id ===
                                          record.payrollData.empId
                                      ).length > 0
                                        ? allCtc.filter(
                                            (ctc: any) =>
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
