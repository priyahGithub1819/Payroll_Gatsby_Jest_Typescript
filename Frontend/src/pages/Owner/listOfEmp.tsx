import React, { useEffect } from "react"
import Layout from "../../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { allUserData } from "../../services/apiFunction"
import SideBar from "../../components/OwnersSidebar"
// import { Link } from "gatsby"
// import axios from "axios"

function App() {
  const [records, setRecords] = useState<any>([])
 const getAllEmployees = async () => {
   let data = await allUserData()
  //  try {
  //    const { data } = await axios.get("/api/v2/payroll/user/all")
  //   //  console.log(data)
      // return data
      setRecords(data.employeeData)
    // } catch (error:any) {
    //   return error.response.data
    // }
  }

  useEffect(() => {
    // console.log("bug")
    getAllEmployees()
    // allUserData().then((data)=>setRecords(data))
    // document.querySelectorAll("td,th").forEach(data => {
    //   data.classList.add("text-center")
    // })
  }, [])

  return (
    <Layout>
      {/* {console.log("bug1")} */}
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-lg-8 col-md-6 col-sm-6 wrapper">
                <h2 className="bulkText text-center">
                  List of Existing Employee
                </h2>
                <div className="empTable">
                  {/* <button onClick={()=>setRecords({})}>press</button> */}
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record:any, Index:number) => {
                        return (
                          <tr key={Index}>
                            <td>{Index + 1}</td>
                            <td>
                              {record.basic.name.firstName}{" "}
                              {record.basic.name.middleName}{" "}
                              {record.basic.name.lastName}
                            </td>
                            <td>{record.payrollData.empId}</td>
                          </tr>
                        )
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
  )
}
export default App
