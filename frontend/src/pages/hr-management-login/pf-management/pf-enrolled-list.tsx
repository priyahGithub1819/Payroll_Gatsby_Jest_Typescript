import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import { getAllPfEmpData } from "../../../services/api-function";
import axios from "axios";
import { toast } from "react-toastify";
import { indianDate, dateFormat } from "../../../services/utils";

interface PfEmployee {
  _id: number;
  name: string;
  empId: string;
  empDob: string;
  aadharNumber: string;
  panNumber: string;
  bankName: string;
  ifscCode: string;
  accountNumber: number;
  address: string;
  dateofRegistration: string;
  pfUanNumber: string;
  pfStatus: string;
  lastWorkingDay: string;
  createdby: {
    date: string;
    empId: string;
  };
  updatedby: {
    date: string;
    empId: string;
  };
}

function PfEnrolledList() {
  const [records, setRecords] = useState<PfEmployee[]>([]);
  const [pfEmpToEdit, setPfEmpToEdit] = useState<PfEmployee>({
    _id: 0,
    name: "",
    empId: "",
    empDob: "",
    aadharNumber: "",
    panNumber: "",
    bankName: "",
    ifscCode: "",
    accountNumber: 0,
    address: "",
    dateofRegistration: "",
    pfUanNumber: "",
    pfStatus: "",
    lastWorkingDay: "",
    createdby: {
      date: "",
      empId: "",
    },
    updatedby: {
      date: "",
      empId: "",
    },
  } as PfEmployee);

  const [lastWorkingDay, setLastWorkingDay] = useState<boolean>(false);
  const [originalPfEmpToEdit, setOriginalPfEmpToEdit] =
    useState<PfEmployee | null>(null);

  const getAllPfEmpList = async () => {
    try {
      setRecords([]);
      const data = await getAllPfEmpData();
      setRecords(data.empInfo);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAllPfEmpList();
  }, []);

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPfEmpToEdit({ ...pfEmpToEdit, [name]: value });
    if (name === "pfStatus" && value === "Exited") {
      setLastWorkingDay(true);
    }
  };

  const onEditBtnClick = async (
    e: React.MouseEvent<HTMLElement>,
    empId: string
  ) => {
    const target = e.target as HTMLElement;
    const tableRow = target.closest("tr");
    if (tableRow) {
      const rowData = tableRow.querySelectorAll(".data");
      rowData.forEach((input: any) => {
        input.style.display = "block";
        input.style.border = "1px solid black";
      });

      const saveBtn = tableRow.querySelector(".save-btn") as HTMLElement;
      if (saveBtn) {
        saveBtn.classList.add("saveBtnEnable");
      }

      const cancelBtn = tableRow.querySelector(".cancelIcon");
      if (cancelBtn) {
        cancelBtn.classList.add("cancelIconEnable");
      }

      const editBtn = tableRow.querySelector(".editIcon");
      if (editBtn) {
        editBtn.classList.add("editIconDisable");
      }

      rowData.forEach((element: any) => {
        element.removeAttribute("readOnly");
      });

      try {
        const currentEmp = await axios.get(`/api/v2/single-pfemp/${empId}`);
        setPfEmpToEdit(currentEmp.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  const bankName = /^[A-Za-z\s]+$/;
  const ifscCode = /^[A-Za-z]{4}\d{7}$/;

  const onSaveBtnClick = async (
    e: React.MouseEvent<HTMLElement>,
    empId: number,
    name: string,
    employeeId: string
  ) => {
    console.log(pfEmpToEdit.lastWorkingDay);
    console.log(pfEmpToEdit.pfStatus);

    if (
      pfEmpToEdit?.bankName === "" ||
      pfEmpToEdit?.ifscCode === "" ||
      pfEmpToEdit?.accountNumber === 0 ||
      pfEmpToEdit?.address === ""
    ) {
      toast.warn("Field should not be empty.");
      const target = e.target as HTMLElement;

      const tableRow = target.closest("tr");
      if (tableRow) {
        if (pfEmpToEdit.bankName === "") {
          tableRow.querySelectorAll(".eBankName").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }

        if (pfEmpToEdit.ifscCode === "") {
          tableRow.querySelectorAll(".eIfsc").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }

        if (pfEmpToEdit.accountNumber === 0) {
          tableRow.querySelectorAll(".eAccount").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (pfEmpToEdit.address === "") {
          tableRow.querySelectorAll(".eAddress").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
      }
    } else if (!bankName.test(pfEmpToEdit?.bankName)) {
      toast.warn("Invalid bank name. Only alphabets are allowed.");
      const target = e.target as HTMLElement;
      const tableRow = target.closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".eBankName").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
    } else if (!ifscCode.test(pfEmpToEdit?.ifscCode)) {
      toast.warn("Invalid IFSC code. Please enter a valid IFSC code.");
      const target = e.target as HTMLElement;
      const tableRow = target.closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".eIfsc").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
    } else if (
      pfEmpToEdit?.address.length < 3 ||
      pfEmpToEdit?.address.length > 255
    ) {
      toast.warn("Address length should be between 3 and 255 characters.");
      const target = e.target as HTMLElement;
      const tableRow = target.closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".eAddress").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      return;
    } else if (
      pfEmpToEdit?.accountNumber.toString().length !== 10 &&
      pfEmpToEdit?.accountNumber.toString().length !== 12
    ) {
      toast.warn("Account number should be 10 or 12 digits.");
      const target = e.target as HTMLElement;

      const tableRow = target.closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".eAccount").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
    }
    // else if (
    //   pfEmpToEdit?.pfStatus === "Exited" &&
    //   pfEmpToEdit?.lastWorkingDay === undefined
    // ) {
    //   toast.warn(
    //     "You have selected PF Status 'Exited' please provide exited date"
    //   );
    // }
    else {
      try {
        await axios.put(`/api/v2/edit-pfemp/${empId}`, pfEmpToEdit);
        const target = e.target as HTMLElement;

        const tableRow = target.closest("tr");
        if (tableRow) {
          const saveBtn = tableRow.querySelector(".save-btn") as HTMLElement;
          saveBtn.classList.remove("saveBtnEnable");
          saveBtn.classList.add("saveBtnDisable");

          const cancelBtn = tableRow.querySelector(".cancelIcon");
          if (cancelBtn) {
            cancelBtn.classList.remove("cancelIconEnable");
            cancelBtn.classList.add("cancelIconDisable");
          }

          const editBtn = tableRow.querySelector(".editIcon");
          if (editBtn) {
            editBtn.classList.remove("editIconDisable");
            editBtn.classList.add("editIconEnable");
          }

          tableRow.querySelectorAll(".data").forEach((input: any) => {
            input.style = "appearance: none";
            input.style.border = "none";
          });

          toast.success(
            "Information of " + employeeId + " is updated successfully."
          );

          await getAllPfEmpList();
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const onCancelBtnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const tableRow = (e.currentTarget as HTMLElement).closest("tr");
    if (tableRow) {
      const rowData = tableRow.querySelectorAll(".data");
      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style = "appearance: none";
        input.style.border = "none";
      });
      rowData.forEach((element: any) => {
        element.setAttribute("readOnly", true);
      });

      const saveBtn = tableRow.querySelector(".save-btn");
      if (saveBtn) {
        saveBtn.classList.remove("saveBtnEnable");
        saveBtn.classList.add("saveBtnDisable");
      }

      const cancelBtn = tableRow.querySelector(".cancelIcon");
      if (cancelBtn) {
        cancelBtn.classList.remove("cancelIconEnable");
        cancelBtn.classList.add("cancelIconDisable");
      }

      const editBtn = tableRow.querySelector(".editIcon");
      if (editBtn) {
        editBtn.classList.remove("editIconDisable");
        editBtn.classList.add("editIconEnable");
      }
      await getAllPfEmpList();
    }
  };

  const onSaveLastWorkingDay = () => {
    if (!pfEmpToEdit.lastWorkingDay) {
      toast.warn("Please select the last working day of an employee.");
    } else {
      setLastWorkingDay(false);
    }
  };

  function tableColumnHideShow(id: string) {
    const checkboxValue = document.getElementById(
      id
    ) as HTMLInputElement | null;

    if (checkboxValue) {
      if (checkboxValue.checked) {
        const allCol = document.getElementsByClassName(
          id
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < allCol.length; i++) {
          allCol[i].style.display = "table-cell";
        }

        const IdHead = document.getElementById(id + "_head") as HTMLElement;
        IdHead.style.display = "table-cell";

        const IdData = document.getElementById(id) as HTMLInputElement;
        IdData.value = "hide";
      } else {
        const allCol = document.getElementsByClassName(
          id
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < allCol.length; i++) {
          allCol[i].style.display = "none";
        }

        const IdHead = document.getElementById(id + "_head") as HTMLElement;
        IdHead.style.display = "none";

        const IdData = document.getElementById(id) as HTMLInputElement;
        IdData.value = "show";
      }
    }
  }

  const modalCancelBtn = async () => {
    console.log(pfEmpToEdit?.pfStatus);
    console.log(pfEmpToEdit?.lastWorkingDay);
    setLastWorkingDay(false);
    setPfEmpToEdit({ ...pfEmpToEdit, pfStatus: "Active" });
    await getAllPfEmpList();
  };
  return (
    <Layout>
      <div className="container-fluid pfEnrolledListContainer">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <Link
              to="/hr-management-login/pf-dashboard/"
              data-testid="arrowLink"
            >
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
                />
                <label htmlFor="dobOfEmp" className="form-label employeeInfo">
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
                />
                <label htmlFor="date&time" className="form-label employeeInfo">
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
                />
                <label htmlFor="date&time" className="form-label employeeInfo">
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
                />
                <label htmlFor="date&time" className="form-label employeeInfo">
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
                />
                <label htmlFor="date&time" className="form-label employeeInfo">
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
                  {records?.map((record: PfEmployee, index: number) => {
                    if (record.pfStatus === "Active") {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td className="eName" data-testid="eName">
                            {record.name}
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
                              className="data text eAddress"
                              onChange={onValueChange}
                              type="text"
                              defaultValue={record.address}
                              readOnly
                            />
                          </td>
                          <td>{indianDate(record.dateofRegistration)}</td>
                          <td>{record.pfUanNumber}</td>
                          <td>
                            <select
                              style={{ appearance: "none" }}
                              name="pfStatus"
                              className="data select"
                              id="select"
                              defaultValue={record.pfStatus}
                              onChange={onValueChange}
                              aria-readonly
                            >
                              <option value="Active">Active</option>
                              <option value="Exited">Exited</option>
                            </select>
                          </td>
                          <td>
                            <i
                              className="bi bi-pen-fill editIcon"
                              data-testid="editButton"
                              onClick={(e) => onEditBtnClick(e, record.empId)}
                            ></i>
                            <i
                              className="bi bi-check-circle-fill save-btn editIcon data-toggle=modal data-target=#myModal saveBtnDisable"
                              data-testid="saveButton"
                              onClick={(e) => {
                                onSaveBtnClick(
                                  e,
                                  record._id,
                                  record.name,
                                  record.empId
                                );
                              }}
                            ></i>
                            <i
                              className="bi bi-x-circle-fill cancelIcon cancelIconDisable"
                              onClick={(
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                onCancelBtnClick(e);
                              }}
                            ></i>
                          </td>
                          <td
                            className="creationDate"
                            data-testid="creationDate_td"
                          >
                            {`On ${indianDate(record.createdby?.date)} By ${
                              record.createdby?.empId
                            }`}
                          </td>
                          <td
                            className="updationDate"
                            data-testid="updationDate_td"
                          >
                            {record.updatedby?.date === undefined &&
                            record.updatedby?.empId === undefined
                              ? "Not Updated"
                              : `On ${indianDate(record.updatedby?.date)} By ${
                                  record.updatedby?.empId
                                }`}
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>

            {lastWorkingDay && (
              <div className="modal lastWorkingDayModal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-6" id="exampleModalLabel">
                        Select Last Working Day of an Employee
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={modalCancelBtn}
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
                          defaultValue={
                            lastWorkingDay ? lastWorkingDay.toString() : ""
                          }
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
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PfEnrolledList;
