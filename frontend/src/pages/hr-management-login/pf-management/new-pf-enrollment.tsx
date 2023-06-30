import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import Papa from "papaparse";
import { uploadPfEmpInfo } from "../../../services/api-function";
import { toast } from "react-toastify";

function NewPfEnrollment() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState<any>([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState<any>([]);

  //State to store the values
  const [values, setValues] = useState<any>([]);

  // clear Button
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

  // Function on Save button click
  const pfEmp: any[] = [];
  const saveTableDataToDatabase = async (e: any) => {
    e.preventDefault();

    // Target `table-tbody Rows` and store it in an array.
    const allTableRows = document.querySelectorAll("tbody tr");

    //to target data of each Row of table.
    allTableRows.forEach((tr) => {
      // Empty object to store each row's data.
      let obj: any = {};
      // Target td
      let tableDataArray = tr.querySelectorAll("td");
      // Store data in object
      obj.name = tableDataArray[1].textContent;
      obj.empId = tableDataArray[2].textContent;
      obj.empDob = tableDataArray[3].textContent;
      obj.aadharNumber = tableDataArray[4].textContent;
      obj.panNumber = tableDataArray[5].textContent;
      obj.bankName = tableDataArray[6].textContent;
      obj.ifscCode = tableDataArray[7].textContent;
      obj.accountNumber = tableDataArray[8].textContent;
      obj.address = tableDataArray[9].textContent;
      obj.dateofRegistration = tableDataArray[10].textContent;
      obj.pfUanNumber = tableDataArray[11].textContent;
      obj.pfStatus = tableDataArray[12].textContent;

      pfEmp.push(obj);
    });

    // Post all employees data from array into Database using axios

    const { error } = await uploadPfEmpInfo(pfEmp);
    if (error) {
      // window.alert(error)
      toast.error(error);
    } else {
      // alert("Information of added successfully")
      toast.success("PF employee information is added successfully.");
    }
    //window.location.reload(false)
  };

  // onChange function
  const changeHandler = (event: any) => {
    // Passing file data
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const rowsArray: any[] = [];
        const valuesArray: any[] = [];
        //to get column name and their values
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
        var tablewrapperer = document.getElementById(
          "table-wrapper"
        ) as HTMLElement;
        tablewrapperer.style.display = "block";
        var saveclearbtnsValue = document.getElementById(
          "save-clear-btns"
        ) as HTMLElement;
        saveclearbtnsValue.style.display = "block";
      },
    });
  };
  return (
    <Layout>
      <div className="container new-pf-enrollment">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/hr-management-login/pf-dashboard" data-testid="arrowLink">
              <i
                className="bi bi-arrow-left-circle-fill"
                data-testid="leftArrow"
              ></i>
            </Link>
          </div>
          <div className="col-lg-8 cardDiv">
            <div className="card shadow-lg p-4">
              <h2 className="bulkText" data-testid="heading">
                Upload Employee PF Information
              </h2>
              <input
                id="bulk-file"
                type="file"
                name="file"
                className="form-control my-3 inputFont"
                onChange={changeHandler}
                accept=".csv"
                data-testid="inputFile"
              />
              <h6 className="text-muted">
                Hint : Upload Employee PF Information CSV file here.
              </h6>
              <div className="csvEgImg">
                <img
                  className="img-fluid"
                  src="/pfEmployeeCSV.png"
                  alt="Sample CSV image"
                  width="510"
                  height="300"
                  data-testid="csvEgImg"
                />
              </div>
              <h6 className="text-muted mt-1">
                Refer the sample CSV file image
              </h6>
            </div>
          </div>

          {/* Table */}
          <div className="col-lg-10">
            <div
              id="table-wrapper"
              className="bulk-emp-table-div"
              data-testid="tableContainer"
            >
              <h1 className="text-center mb-4" id="table-info-heading">
                Employee PF Information Table
              </h1>
              <table
                className="table table-striped table-bordered table-sm"
                data-testid="table-info-heading"
              >
                <thead>
                  <tr>
                    {tableRows.map((rows: any, index: number) => {
                      return <th key={index}>{rows}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {values.map((value: any, index: number) => {
                    return (
                      <tr key={index}>
                        {value.map((val: any, i: number) => {
                          return <td key={i}>{val}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Save & Clear buttons */}
            <div
              className="row my-3"
              id="save-clear-btns"
              style={{ display: "none" }}
            >
              <div className="col-4 offset-8 d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={(e) => saveTableDataToDatabase(e)}
                >
                  Save
                </button>
                <button className="btn btn-danger" onClick={onClearBtnClick}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default NewPfEnrollment;
