import React, { useState } from "react";
import Layout from "../../components/Layout";
import Papa from "papaparse";
import { createCtcData } from "../../services/apiFunction";
import SideBar from "../../components/OwnersSidebar";
import { Link } from "gatsby";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCTC() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);
  // On clear btn click
  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    var bulkFile = document.getElementById("bulk-file") as HTMLInputElement;
    bulkFile.value = "";
    var tablewrappers = document.getElementById("table-wrapper") as HTMLElement;
    tablewrappers.style.display = "none";
    var saveClearBtns = document.getElementById(
      "save-clear-btns"
    ) as HTMLElement;
    saveClearBtns.style.display = "none";
  };
  // On Save btn click
  const empCTC: any = [];
  // Function on Save button click
  const saveCTCinfoToDatabase = async (e: any) => {
    e.preventDefault();
    // Target `table-tbody Rows` and store it in an array.
    // e.g. the below array will [tr,tr] if the row count is 2 in that table body.
    const allTableRows = document.querySelectorAll("tbody tr");
    // ForEach loop to target/access data of each Row of table.
    allTableRows.forEach((tr) => {
      // Empty object to store each row's data. Means this object will contain single employee data.
      let obj: any = {};
      // Target td i.e. Data from Row and store it in an Array.
      // e.g. format of below array for this project will be [td, td, td, td, td] if the Columns are 5 in a Row
      let tableDataArray = tr.querySelectorAll("td");
      // Store data in object
      obj.Emp_Id = tableDataArray[0].textContent;
      obj.Name = tableDataArray[1].textContent;
      obj.CTC = tableDataArray[2].textContent;
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
  };
  const changeHandler = (event: any) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const rowsArray: any = [];
        const valuesArray: any = [];
        // Iterating data to get column name and their values
        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        // Parsed Data Response in array format
        setParsedData(results.data);
        // Filtered Column Names
        setTableRows(rowsArray[0]);
        // Filtered Values
        setValues(valuesArray);
        // Display Table Div
        var tablewrappers = document.getElementById(
          "table-wrapper"
        ) as HTMLElement;
        tablewrappers.style.display = "block";
        var saveClearBtns = document.getElementById(
          "save-clear-btns"
        ) as HTMLElement;
        saveClearBtns.style.display = "block";
      },
    });
  };

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
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
                    <table className="table table-striped table-bordered table-sm"  data-testid="table-info-heading">
                      <thead>
                        <tr>
                          {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {values.map((value: any, index) => {
                          return (
                            <tr key={index}>
                              {value.map((val: any, i: any) => {
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
