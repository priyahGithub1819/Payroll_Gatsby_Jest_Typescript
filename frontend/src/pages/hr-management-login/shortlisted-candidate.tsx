import React, { useState, ChangeEvent } from "react";
import Layout from "../../components/Layout";
import { Link } from "gatsby";
import Papa from "papaparse";
import { uploadCandiInfo } from "../../services/api-function";
import { toast } from "react-toastify";

interface Candidate {
  candidateId: string;
  candidateName: string;
  eduQual: string;
  primarySkill: string;
  secondarySkill: string;
  noticePeriod: string;
  currentCTC: string;
  expectedCTC: string;
  candiStatus: string;
  rejectionMsg: string;
}

const keysArray: string[] = [];
function ShortlistedCandidate() {
  // const [parsedData, setParsedData] = useState<Candidate[]>([]);
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

    // Auto-refresh the page
    window.location.reload();
  };

  const saveCandiInfoToDb = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (keysArray.length == 10) {
      const allTableRows = document.querySelectorAll("tbody tr");
      const candidate: Candidate[] = [];
      allTableRows.forEach((tr: any) => {
        let obj: Partial<Candidate> = {}; // Use Partial<Candidate> to allow undefined properties
        let tableDataArray = tr.querySelectorAll("td");

        obj.candidateId = tableDataArray[0].textContent;
        obj.candidateName = tableDataArray[1].textContent;
        obj.eduQual = tableDataArray[2].textContent;
        obj.primarySkill = tableDataArray[3].textContent;
        obj.secondarySkill = tableDataArray[4].textContent;
        obj.noticePeriod = tableDataArray[5].textContent;
        obj.currentCTC = tableDataArray[6].textContent;
        obj.expectedCTC = tableDataArray[7].textContent;
        obj.candiStatus = tableDataArray[8].textContent;
        obj.rejectionMsg = tableDataArray[9].textContent;
        candidate.push(obj as Candidate); // Assert obj as Candidate
      });

      const { error } = await uploadCandiInfo(candidate);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Candidate information is added successfully.");
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
          (results.data as Candidate[]).forEach((d: Candidate) => {
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
      <div className="container candiBulkContainer">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/app/hr-dashboard" data-testid="arrowLink">
              <i className="bi bi-arrow-left-circle-fill"></i>
            </Link>
          </div>
          <div className="col-lg-8 cardDiv">
            <div className="card shadow-lg p-4">
              <h2 className="bulkText">Upload Candidate Information</h2>
              <input
                id="bulk-file"
                type="file"
                name="file"
                className="form-control"
                onChange={changeHandler}
                accept=".csv"
                data-testid="inputFile"
                style={{ display: "block", margin: "10px auto" }}
              />
              <h6 className="text-muted">
                Hint: Upload candidate information CSV file here.
              </h6>
              <div className="csvEgImg">
                <img
                  className="img-fluid"
                  src="/candidatesCSV.png"
                  alt="Sample CSV image"
                  width="510"
                  height="300"
                />
              </div>
              <h6 className="text-muted">Refer to the sample CSV file image</h6>
            </div>
          </div>

          {/* Table */}
          <div className="col-lg-10">
            <div id="table-wrapper" className="bulk-emp-table-div">
              <h1 className="text-center mb-4">
                Candidate's Information Table
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
                  {values.map((value: string[], index: number) => {
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
              <div className="col-4 offset-8 d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={(e) => saveCandiInfoToDb(e)}
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

export default ShortlistedCandidate;
