import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import { getAllPfEmpData } from "../../../services/apiFunction";
import axios from "axios";
import { toast } from "react-toastify";
import { indianDate, dateFormat } from "../../../services/utils";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";

function PfEnrolledList() {
  const [records, setRecords] = useState([]);

  const [pfEmpToEdit, setPfEmpToEdit] = useState({
    name: "",
    empId: "",
    empDob: "",
    aadharNumber: "",
    panNumber: "",
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    address: "",
    dateofRegistration: "",
    pfUanNumber: "",
    pfStatus: "",
    lastWorkingDay: "",
  });

  const [lastWorkingDay, setLastWorkingDay] = useState<any>(false);

  const getAllPfEmpList = async () => {
    let data = await getAllPfEmpData();
    setRecords(data.empInfo);
  };

  useEffect(() => {
    getAllPfEmpList();
  }, []);

  // to target particular record
  const onValueChange = (e: any) => {
    setPfEmpToEdit({ ...pfEmpToEdit, [e.target.name]: e.target.value });

    if (e.target.name === "pfStatus") {
      if (e.target.value === "Exited") {
        setLastWorkingDay(true);
      }
    }
  };

  // on Edit button click
  const onEditBtnClick = async (e: any, empId: number) => {
    const tableRow = e.target.closest("tr");
    const rowData = tableRow.querySelectorAll(".data");
    tableRow.querySelectorAll(".data").forEach((input: any) => {
      input.style = "appearance: block";
      input.style.border = "1px solid black";
    });
    // tableRow.querySelector(".save-btn").style.display = ""
    const saveBtn = tableRow.querySelector(".save-btn");
    saveBtn.classList.add("saveBtnEnable");

    rowData.forEach((element: any) => {
      element.removeAttribute("readOnly");
    });
    const currentEmp = await axios.get(`/api/v2/single-pfemp/${empId}`);
    setPfEmpToEdit(currentEmp.data);
    // document.getElementById("select").disabled = false
  };

  // on save button click
  const onSaveBtnClick = async (e: any, empId: number, name: string) => {
    if (
      pfEmpToEdit.name === "" ||
      pfEmpToEdit.bankName === "" ||
      pfEmpToEdit.ifscCode === "" ||
      pfEmpToEdit.accountNumber === "" ||
      pfEmpToEdit.address === ""
    ) {
      toast.error("Field should not be empty.");
      if (pfEmpToEdit.name === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".eName").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }

      if (pfEmpToEdit.bankName === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".eBankName").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (pfEmpToEdit.ifscCode === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".eIfsc").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (pfEmpToEdit.accountNumber === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".eAccount").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
    } else {
      await axios.put(`/api/v2/edit-pfemp/${empId}`, pfEmpToEdit);
      // e.target.style.display = "none"
      const tableRow = e.target.closest("tr");

      const saveBtn = tableRow.querySelector(".save-btn");
      saveBtn.classList.remove("saveBtnEnable");
      saveBtn.classList.add("saveBtnDisable");

      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style = "appearance: none";
        input.style.border = "none";
      });
      // window.alert("Information of " + name + " is updated successfully.")
      toast.success("Information of " + name + " is updated successfully.");
      //document.getElementById("select").disabled = true
      await getAllPfEmpList();
    }
  };
  // modal save button-
  const onSaveLastWorkingDay = () => {
    if (!pfEmpToEdit.lastWorkingDay) {
      toast.error("Please select last working day of an employee.");
    } else {
      setLastWorkingDay(false);
    }
  };

  // code for checkboxes

  function tableColumnHideShow(id: any) {
    var checkboxValue = document.getElementById(id) as HTMLInputElement;

    if (checkboxValue.checked) {
      var allCol = document.getElementsByClassName(id) as any;
      for (var i = 0; i < allCol.length; i++) {
        allCol[i].style.display = "table-cell";
      }
      var IdHead = document.getElementById(id + "_head") as HTMLElement;
      IdHead.style.display = "table-cell";
      var IdData = document.getElementById(id) as HTMLInputElement;
      IdData.value = "hide";
    } else {
      var allCol = document.getElementsByClassName(id) as any;
      for (var i = 0; i < allCol.length; i++) {
        allCol[i].style.display = "none";
      }
      var IdHead = document.getElementById(id + "_head") as HTMLElement;
      IdHead.style.display = "none";
      var IdData = document.getElementById(id) as HTMLInputElement;
      IdData.value = "show";
    }
  }
  return (
    <Layout>
      <div className="container-fluid pfEnrolledListContainer">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <Link to="/HR Management/pfManagement/" data-testid="arrowLink">
              <i
                className="bi bi-arrow-left-circle-fill"
                data-testid="leftArrow"
              ></i>
            </Link>

            <h2 className="text-center" data-testid="heading">
              List of Active PF Employees
            </h2>
            <div className="row justify-content-center">
              <div className="col-lg-2">
                <input
                  type="checkbox"
                  id="dobOfEmp"
                  value="show"
                  role="checkBox"
                  data-testid="dobOfEmp"
                  onChange={(event) => tableColumnHideShow("dobOfEmp")}
                />{" "}
                <label htmlFor="dobOfEmp" className="form-label">
                  DOB of Employee
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="aadhar"
                  value="show"
                  role="checkBox"
                  data-testid="aadhar"
                  onChange={(event) => tableColumnHideShow("aadhar")}
                />{" "}
                <label htmlFor="date&time" className="form-label">
                  Aadhar Number
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="checkbox"
                  id="panNum"
                  value="show"
                  role="checkBox"
                  data-testid="panNum"
                  onChange={(event) => tableColumnHideShow("panNum")}
                />{" "}
                <label htmlFor="date&time" className="form-label">
                  PAN Number
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="checkbox"
                  id="creationDate"
                  value="show"
                  role="checkBox"
                  data-testid="creationDate"
                  onChange={(event) => tableColumnHideShow("creationDate")}
                />{" "}
                <label htmlFor="date&time" className="form-label">
                  Creation Details
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="checkbox"
                  id="updationDate"
                  value="show"
                  role="checkBox"
                  data-testid="updationDate"
                  onChange={(event) => tableColumnHideShow("updationDate")}
                />{" "}
                <label htmlFor="date&time" className="form-label">
                  Updation Details
                </label>
              </div>
            </div>
            <div className="empTable col-lg-12">
              <table
                className="table table-bordered css-serial"
                data-testid="table"
              >
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Name of Employee</th>
                    <th className="heading" id="dobOfEmp_head">
                      Date Of Birth (Mentioned on Aadhar card.)
                    </th>
                    <th className="heading">Employee Id</th>
                    <th className="heading" id="aadhar_head">
                      Aadhar Number
                    </th>
                    <th className="heading" id="panNum_head">
                      Pan Number
                    </th>
                    <th className="heading">Bank Name</th>
                    <th className="heading">IFSC Code</th>
                    <th className="heading">Account number</th>
                    <th className="heading">Address</th>
                    <th className="heading">Date of registration</th>
                    <th className="heading">PF UAN Number</th>
                    <th className="heading">PF Status</th>
                    <th className="heading">Action</th>
                    <th className="heading" id="creationDate_head">
                      Creation Date and User EmpId
                    </th>
                    <th className="heading" id="updationDate_head">
                      Updation Date and user EmpId
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((record: any, Index: number) => {
                      if (record.pfStatus === "Active") {
                        return (
                          <tr key={Index}>
                            <td></td>
                            <td>
                              <input
                                name="name"
                                className="data text eName"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.name}
                                data-testid="eName"
                                readOnly
                              />
                            </td>
                            <td className="dobOfEmp" data-testid="dobOfEmp_td">
                              {indianDate(record.empDob)}
                            </td>
                            <td>{record.empId}</td>
                            <td className="aadhar" data-testid="aadhar_td">
                              {record.aadharNumber}
                            </td>
                            <td className="panNum" data-testid="pan_td">
                              {record.panNumber}
                            </td>
                            <td>
                              <input
                                name="bankName"
                                className="data text eBankName"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.bankName}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="ifscCode"
                                className="data text eIfsc"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.ifscCode}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="accountNumber"
                                className="data text eAccount"
                                onChange={onValueChange}
                                type="number"
                                defaultValue={record.accountNumber}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="address"
                                className="data text"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.address}
                                readOnly
                              />
                            </td>
                            <td>{indianDate(record.dateofRegistration)}</td>
                            <td> {record.pfUanNumber}</td>
                            <td>
                              <select
                                style={{ appearance: "none" }}
                                name="pfStatus"
                                // disabled={true}
                                className="data select"
                                id="select"
                                defaultValue={record.pfStatus}
                                onChange={onValueChange}
                                aria-readonly
                              >
                                {" "}
                                <option value="Active">Active</option>
                                <option value="Exited">Exited</option>
                              </select>
                            </td>
                            <td>
                              <i
                                className="bi bi-pen-fill editIcon"
                                data-testid="editButton"
                                onClick={(e) => onEditBtnClick(e, record._id)}
                              ></i>
                              <i
                                className="bi bi-check-circle-fill save-btn editIcon data-toggle=modal data-target=#myModal saveBtnDisable"
                                data-testid="saveButton"
                                //  style={{ display: "none" }}
                                onClick={(e) => {
                                  onSaveBtnClick(e, record._id, record.name);
                                }}
                              ></i>
                            </td>
                            <td
                              className="creationDate"
                              data-testid="creationDate_td"
                            >{`On ${indianDate(record.createdby?.date)} By ${
                              record.createdby?.empId
                            } `}</td>
                            <td
                              className="updationDate"
                              data-testid="updationDate_td"
                            >
                              {record.updatedby?.date === undefined &&
                              record.updatedby?.empId === undefined
                                ? "Not Updated"
                                : `On ${indianDate(
                                    record.updatedby?.date
                                  )} By ${record.updatedby?.empId}`}{" "}
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            {lastWorkingDay ? (
              <div className="modal lastWorkingDayModal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Select Last Working Day of an Employee
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        // onClick={() => {
                        //   setLastWorkingDay(false)
                        // }}
                        onClick={onSaveLastWorkingDay}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="exampleInputDOB" className="form-label">
                          Last Working Day
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="lastWorkingDay"
                          name="lastWorkingDay"
                          defaultValue={lastWorkingDay}
                          onChange={onValueChange}
                          max={dateFormat("dateInput", new Date())}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={onSaveLastWorkingDay}
                      >
                        Save
                      </button>
                      {/* <button type="button" className="btn btn-primary">
                        Save
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default PfEnrolledList;
