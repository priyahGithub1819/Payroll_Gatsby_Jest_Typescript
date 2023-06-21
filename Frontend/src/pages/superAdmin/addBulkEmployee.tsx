import React, { useState } from "react"
import Layout from "../../components/Layout"
import Papa from "papaparse"
import { createManyUser } from "../../services/apiFunction"
import SideBar from "../../components/SideBar"
import { Link } from "gatsby"
import { toast } from "react-toastify"

function AddBulkEmployee() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState<any>([])
  //State to store table Column name
  const [tableRows, setTableRows] = useState<any>([])
  //State to store the values
  const [values, setValues] = useState<any>([])
  // On clear btn click
  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    var bulkfile = document.getElementById("bulk-file") as HTMLInputElement
    bulkfile.value = ""
    var tableWrapper = document.getElementById("table-wrapper") as HTMLInputElement
    tableWrapper.style.display = "none"
    var saveclearbtns = document.getElementById("save-clear-btns") as HTMLInputElement
    saveclearbtns.style.display = "none"
    var tableinfoheading = document.getElementById("table-info-heading") as HTMLInputElement
    tableinfoheading.classList.add("d-none")
  }
  // On Save btn click
  const emp: any[] = []
  // Function on Save button click
  const saveTableDataToDatabase = async (e: any) => {
    e.preventDefault()
    const allTableRows = document.querySelectorAll("tbody tr")
    allTableRows.forEach(tr => {
      let obj: any = {}
      let tableDataArray = tr.querySelectorAll("td")
      // Store data in object
      obj.empId = tableDataArray[0].textContent
      obj.role = tableDataArray[1].textContent
      obj.numberOfMember = tableDataArray[2].textContent
      obj.status = tableDataArray[3].textContent
      obj.NameofSpouse = tableDataArray[4].textContent
      obj.relationship = tableDataArray[5].textContent
      obj.DOB = tableDataArray[6].textContent
      obj.child1 = tableDataArray[7].textContent
      obj.child1Gender = tableDataArray[8].textContent
      obj.DOB1 = tableDataArray[9].textContent
      obj.child2 = tableDataArray[10].textContent
      obj.child2Gender = tableDataArray[11].textContent
      obj.DOB2 = tableDataArray[12].textContent
      obj.NameofFather = tableDataArray[13].textContent
      obj.DOB3 = tableDataArray[14].textContent
      obj.NameofMother = tableDataArray[15].textContent
      obj.DOB4 = tableDataArray[16].textContent
      obj.tempPassword = tableDataArray[17].textContent
      emp.push(obj)
    })
    // Post all employees data from array into Database using axios
    const { error } = await createManyUser(emp)
    console.log(emp)
    if (error) {
      // window.alert(error)
      toast.error(error);
    } else {
      // alert("data Added successfully")
      toast.success("Information added successfully.");
    }
  }

  const changeHandler = (event: any) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray: any = []
        const valuesArray: any = []
        // Iterating data to get column name and their values
        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d))
          valuesArray.push(Object.values(d))
        })
        // Parsed Data Response in array format
        setParsedData(results.data)
        // Filtered Column Names
        setTableRows(rowsArray[0])
        // Filtered Values
        setValues(valuesArray)
        // Display Table Div
        var tableWrapper = document.getElementById("table-wrapper") as HTMLInputElement
        tableWrapper.style.display = "block"
        var saveclearbtns = document.getElementById("save-clear-btns") as HTMLInputElement
        saveclearbtns.style.display = "block"
        var tableinfoheading = document.getElementById("table-info-heading") as HTMLInputElement
        tableinfoheading.classList.remove("d-none")
      },
    })
  }

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
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
                    />
                    <h6 className="text-muted">Hint : Upload bulk employee information CSV file here.</h6>
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
                    <table className="table table-striped table-bordered table-sm">
                      <thead>
                        <tr>
                          {tableRows.map((rows:any, index:number) => {
                            return <th key={index}>{rows}</th>
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {values.map((value:any, index:number) => {
                          return (
                            <tr key={index}>
                              {value.map((val:any, i:number) => {
                                return <td key={i}>{val}</td>
                              })}
                            </tr>
                          )
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
                        onClick={e => saveTableDataToDatabase(e)}
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
  )
}
export default AddBulkEmployee
