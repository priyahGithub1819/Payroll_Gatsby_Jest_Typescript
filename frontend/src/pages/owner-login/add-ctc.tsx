import React, { useState, ChangeEvent } from "react";
import Layout from "../../components/Layout";
import Papa from "papaparse";
import { createCtcData } from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";
import { Link } from "gatsby";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Employee {
  Emp_Id: string;
  Name: string;
  CTC: string;
}

const keysArray: string[] = [];
function AddCTC() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState<Employee[]>([]);
  // State to store table Column name
  const [tableRows, setTableRows] = useState<string[]>([]);
  // State to store the values
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
    // tableinfoheading.classList.add("d-none");

    // Auto-refresh the page
    window.location.reload();
  };

  // Function on Save button click
  const saveCTCinfoToDatabase = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const columnLength = keysArray.length;
    // Target `table-tbody Rows` and store it in an array.
    const allTableRows = document.querySelectorAll("tbody tr");
    const empCTC: Employee[] = [];
    if (columnLength == 3) {
      // ForEach loop to target/access data of each Row of table.
      allTableRows.forEach((tr) => {
        // Empty object to store each row's data. Means this object will contain single employee data.
        let obj: Employee = {} as Employee;
        // Target td i.e. Data from Row and store it in an Array.
        const tableDataArray = tr.querySelectorAll("td");
        // Store data in object
        obj.Emp_Id = tableDataArray[0].textContent || "";
        obj.Name = tableDataArray[1].textContent || "";
        obj.CTC = tableDataArray[2].textContent || "";
        // Push object into `empCTC` array
        empCTC.push(obj);
      });

      // Post all employees CTC data from array into Database using axios
      const { error } = await createCtcData(empCTC);
      if (error) {
        toast.error(error);
      } else {
        toast.success("CTC of an employee uploaded successfully.");
      }
    } else {
      toast.error("Please upload aprropriate CSV file");
    }
  };

  //Function for Onchange events
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const valuesArray: string[][] = [];
          const uniqueRows = new Set<string>(); // Using a Set to store unique values

          // Iterating data to get column name and their values
          (results.data as Employee[]).forEach((d: Employee) => {
            const keys = Object.keys(d);
            keysArray.push(...keys); // Spread the keys into keysArray
            valuesArray.push(Object.values(d));
            keys.forEach((key) => {
              uniqueRows.add(key); // Add each column name to the Set
            });
          });

          // Converting Set back to array of unique values
          setTableRows(Array.from(uniqueRows));
          setValues(valuesArray);

          // Display Table Div
          var tableWrapper = document.getElementById(
            "table-wrapper"
          ) as HTMLDivElement;
          tableWrapper.style.display = "block";
          var saveclearbtns = document.getElementById(
            "save-clear-btns"
          ) as HTMLDivElement;
          saveclearbtns.style.display = "block";

          // Check if the element exists before accessing its classList
          var tableinfoheading = document.getElementById(
            "table-info-heading"
          ) as HTMLHeadingElement;
          if (tableinfoheading) {
            tableinfoheading.classList.remove("d-none");
          }
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
            {/* File Uploader */}
            <div className="row ownerColumn justify-content-center">
              <div className=" margin col-lg-9  col-lg-8 col-md-6 col-sm-6 wrapper">
                <h2 className="text-center bulkText">Upload CTC information</h2>
                <div className="col-12">
                  <div className="card shadow-lg p-4">
                    <h4>Upload CTC information of Employee</h4>
                    <input
                      id="ctc-file"
                      type="file"
                      name="file"
                      className="form-control"
                      onChange={changeHandler}
                      accept=".csv"
                      style={{ display: "block", margin: "10px auto" }}
                      data-testid="csvFile"
                    />
                    <h6 className="text-muted">Upload CTC CSV file here.</h6>
                    <div style={{ textAlign: "center" }}>
                      <img
                        className="img-fluid w-75"
                        src="/CTC.png"
                        alt="Sample CSV image"
                      />
                    </div>
                    <h6 className="text-muted">
                      Refer the Sample CSV file image
                    </h6>
                  </div>
                </div>

                {/* Table */}
                <div className="col-lg-12">
                  <div id="table-wrapper" className="bulk-emp-table-div">
                    <h1 className="text-center mb-4">
                      Employee CTC Information Table
                    </h1>
                    <table
                      className="table table-striped table-bordered table-sm"
                      data-testid="table-info-heading"
                    >
                      <thead>
                        <tr>
                          {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {values.map((value, index) => {
                          return (
                            <tr key={index}>
                              {value.map((val, i) => {
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
                        onClick={(e) => saveCTCinfoToDatabase(e)}
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

export default AddCTC;
