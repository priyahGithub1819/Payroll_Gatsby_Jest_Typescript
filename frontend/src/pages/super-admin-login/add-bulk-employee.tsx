import React, { useState, ChangeEvent } from "react";
import Layout from "../../components/Layout";
import Papa from "papaparse";
import { createManyUser } from "../../services/api-function";
import Sidebar from "../../components/Sidebar";
import { Link } from "gatsby";
import { toast } from "react-toastify";

interface MyObject {
  empId: string | null;
  role: string | null;
  numberOfMember: string | null;
  status: string | null;
  NameofSpouse: string | null;
  relationship: string | null;
  DOB: string | null;
  child1: string | null;
  child1Gender: string | null;
  DOB1: string | null;
  child2: string | null;
  child2Gender: string | null;
  DOB2: string | null;
  NameofFather: string | null;
  DOB3: string | null;
  NameofMother: string | null;
  DOB4: string | null;
  tempPassword: string | null;
}

interface ChangeHandlerList {
  "Date Of Birth": string;
  "Date Of Birth_1": string;
  "Date Of Birth_2": string;
  "Name of Child 2": string;
  "Number of Members": string;
  "Payment Type": string;
  Relationship: string;
  "Account Number": string;
  "Auto password generator": string;
  "Bank Name": string;
  "Branch Name": string;
  "Confirmation date": string;
  "Contact No": string;
  Department: string;
  Designation: string;
  "Email address": string;
  "Employee ID": string;
  "Full Name": string;
  Gender: string;
  "IFSC Code": string;
  "Joining Date": string;
  Location: string;
  "Marital Status": string;
  "Name of Child 1": string;
  "Name of Father": string;
  "Name of Mother": string;
  "Name of Spouse": string;
  "PAN Number": string;
  "PF UAN Number": string;
  "Probation Period": string;
  Role: string;
  "Work Mode": string;
}
const rowsArray: string[] = [];
function AddBulkEmployee() {
  //State to store table Column name
  const [tableRows, setTableRows] = useState<string[]>([]);
  //State to store the values
  const [values, setValues] = useState<string[][]>([]);

  // On clear btn click
  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    var bulkfile = document.getElementById("bulk-file") as HTMLInputElement;
    var tableWrapper = document.getElementById(
      "table-wrapper"
    ) as HTMLDivElement;
    var saveclearbtns = document.getElementById(
      "save-clear-btns"
    ) as HTMLDivElement;
    var tableinfoheading = document.getElementById(
      "table-info-heading"
    ) as HTMLHeadingElement;

    // Clear the file input field
    if (bulkfile) {
      bulkfile.value = "";
    }

    // Hide table and buttons
    tableWrapper.style.display = "none";
    saveclearbtns.style.display = "none";
    tableinfoheading.classList.add("d-none");

    // Auto-refresh the page
    window.location.reload();
  };

  // On Save btn click
  const emp: MyObject[] = [];
  // Function on Save button click
  const saveTableDataToDatabase = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const columnLength = rowsArray.length;
    e.preventDefault();
    if (columnLength == 18) {
      const [tableColumnName] = document.querySelectorAll("thead tr");
      const allTableRows = document.querySelectorAll("tbody tr");

      allTableRows.forEach((tr) => {
        let obj: MyObject = {} as MyObject;
        let tableDataArray = tr.querySelectorAll("td");

        // Store data in object
        obj.empId = tableDataArray[0].textContent;
        obj.role = tableDataArray[1].textContent;
        obj.numberOfMember = tableDataArray[2].textContent;
        obj.status = tableDataArray[3].textContent;
        obj.NameofSpouse = tableDataArray[4].textContent;
        obj.relationship = tableDataArray[5].textContent;
        obj.DOB = tableDataArray[6].textContent;
        obj.child1 = tableDataArray[7].textContent;
        obj.child1Gender = tableDataArray[8].textContent;
        obj.DOB1 = tableDataArray[9].textContent;
        obj.child2 = tableDataArray[10].textContent;
        obj.child2Gender = tableDataArray[11].textContent;
        obj.DOB2 = tableDataArray[12].textContent;
        obj.NameofFather = tableDataArray[13].textContent;
        obj.DOB3 = tableDataArray[14].textContent;
        obj.NameofMother = tableDataArray[15].textContent;
        obj.DOB4 = tableDataArray[16].textContent;
        obj.tempPassword = tableDataArray[17].textContent;
        emp.push(obj);
      });

      // Post all employees data from array into Database using axios
      const { error } = await createManyUser(emp);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Employee information uploded successfully.");
      }
    } else {
      toast.error("Please upload appropriate CSV file");
    }
  };

  //Function for Onchange events
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    const file = event.target.files && event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const valuesArray: string[][] = [];
          // Iterating data to get column name and their values
          (results.data as ChangeHandlerList[]).forEach(
            (d: ChangeHandlerList) => {
              rowsArray.push(...Object.keys(d));
              valuesArray.push(Object.values(d));
            }
          );

          // const lengthOfArray = rowsArray.length;
          // Filtered Column Names
          setTableRows(
            rowsArray.filter(
              (value, index, self) => self.indexOf(value) === index
            )
          );
          // Filtered Values
          setValues(valuesArray);

          // Display Table Div
          var tableWrapper = document.getElementById(
            "table-wrapper"
          ) as HTMLInputElement;
          tableWrapper.style.display = "block";
          var saveclearbtns = document.getElementById(
            "save-clear-btns"
          ) as HTMLInputElement;
          saveclearbtns.style.display = "block";
          var tableinfoheading = document.getElementById(
            "table-info-heading"
          ) as HTMLInputElement;
          tableinfoheading.classList.remove("d-none");
        },
      });
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
            <div className="row ownerColumn justify-content-center">
              <div className=" margin col-lg-9  col-lg-8 col-md-6 col-sm-6 wrapper">
                <h2 className="text-center bulkText">
                  Upload Bulk Employee Information
                </h2>
                <div className="col-12">
                  <div className="card shadow-lg p-4">
                    <h4>Upload Bulk Employee Information</h4>
                    <input
                      id="bulk-file"
                      type="file"
                      name="file"
                      className="form-control my-3 inputFont"
                      onChange={changeHandler}
                      accept=".csv"
                      data-testid="csvFile"
                    />
                    <h6 className="text-muted">
                      Hint : Upload bulk employee information CSV file here.
                    </h6>
                    <div style={{ textAlign: "center" }}>
                      <img
                        className="img-fluid"
                        src="/payrollEmployeeCSV.png"
                        alt="Sample CSV image"
                        width="510"
                        height="300"
                      />
                    </div>
                    <h6 className="text-muted mt-2">
                      Refer the sample CSV file image
                    </h6>
                  </div>
                </div>
                {/* Table */}
                <div className="col-lg-12">
                  <div id="table-wrapper" className="bulk-emp-table-div">
                    <h1 className="text-center mb-4" id="table-info-heading">
                      Employee Information Table
                    </h1>
                    <table
                      className="table table-striped table-bordered table-sm"
                      data-testid="table-info-heading"
                    >
                      <thead>
                        <tr>
                          {tableRows.map((rows: string, index: number) => {
                            return <th key={index}>{rows}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {values.map((value: string[], index: number) => {
                          return (
                            <tr key={index}>
                              {value.map((val: string, i: number) => {
                                return <td key={i}>{val}</td>;
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="row my-3"
                    id="save-clear-btns"
                    style={{ display: "none" }}
                  >
                    <div className="col-4 offset-8 d-flex justify-content-end ps-5">
                      <button
                        className="btn btn-success"
                        onClick={(e) => saveTableDataToDatabase(e)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={onClearBtnClick}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default AddBulkEmployee;
