import React, { useState, ChangeEvent } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import Papa from "papaparse";
import { uploadPfEmpInfo } from "../../../services/api-function";
import { toast } from "react-toastify";

interface ParsedData {
  name: string;
  empId: string;
  empDob: string;
  aadharNumber: string;
  panNumber: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
  address: string;
  dateofRegistration: string;
  pfUanNumber: string;
  pfStatus: string;
}
const keysArray: string[] = [];
let columnLength: number;
function NewPfEnrollment() {
  // const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [tableRows, setTableRows] = useState<string[]>([]);
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

  const saveTableDataToDatabase = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (keysArray.length == 12) {
    const allTableRows = document.querySelectorAll("tbody tr");
    const pfEmp: ParsedData[] = [];

    allTableRows.forEach((tr) => {
      let obj: ParsedData = {} as ParsedData;
      const tableDataArray = tr.querySelectorAll("td");
      obj.name = tableDataArray[0].textContent!;
      obj.empId = tableDataArray[1].textContent!;
      obj.empDob = tableDataArray[2].textContent!;
      obj.aadharNumber = tableDataArray[3].textContent!;
      obj.panNumber = tableDataArray[4].textContent!;
      obj.bankName = tableDataArray[5].textContent!;
      obj.ifscCode = tableDataArray[6].textContent!;
      obj.accountNumber = tableDataArray[7].textContent!;
      obj.address = tableDataArray[8].textContent!;
      obj.dateofRegistration = tableDataArray[9].textContent!;
      obj.pfUanNumber = tableDataArray[10].textContent!;
      obj.pfStatus = tableDataArray[11].textContent!;
      pfEmp.push(obj);
    });

    const { error } = await uploadPfEmpInfo(pfEmp);
    if (error) {
      toast.error(error);
    } else {
      toast.success("PF employee information is added successfully.");
    }
    } else if (columnLength == 0) {
      toast.error("Current CSV file is empty.Please upload appropriate CSV file");
    }
    else {
      toast.error("Please upload appropriate CSV file");
    } 
  };

 //Function for Onchange events
 const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0];

  if (!file) {
    return;
  }
 
  // Check if the file is a CSV
  if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
    toast.error("Please upload a CSV file.");
    event.target.value = ""; // Clear the file input to allow selecting again
    return;
  }

  if (file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const valuesArray: string[][] = [];
        const uniqueRows = new Set<string>(); // Using a Set to store unique values

        // Iterating data to get column name and their values
        (results.data as ParsedData[]).forEach((d: ParsedData) => {
          const keys = Object.keys(d);
          keysArray.push(...keys); // Spread the keys into keysArray
          valuesArray.push(Object.values(d));
          keys.forEach((key) => {
            uniqueRows.add(key); // Add each column name to the Set
          });
        });

        // Converting Set back to array of unique values
        setTableRows(Array.from(uniqueRows));
        columnLength = Array.from(uniqueRows).length;
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
      <div className="container new-pf-enrollment">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/hr-management-login/pf-dashboard" data-testid="arrowLink">
              <i className="bi bi-arrow-left-circle-fill" data-testid="leftArrow"></i>
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
                Hint: Upload Employee PF Information CSV file here.
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
              <h6 className="text-muted mt-1">Refer to the sample CSV file image.</h6>
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
                    {tableRows.map((row: string, index: number) => (
                      <th key={index}>{row}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {values.map((value: string[], index: number) => (
                    <tr key={index}>
                      {value.map((val: string, i: number) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save & Clear buttons */}
            <div className="row my-3" id="save-clear-btns" style={{ display: "none" }}>
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
