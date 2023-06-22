import React, { useEffect } from "react"
import Layout from "../../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { allUserData } from "../../services/apiFunction"
import SideBar from "../../components/OwnersSidebar"

function App() {
  const [records, setRecords] = useState<any>([])
 const getAllEmployees = async () => {
   let data = await allUserData()
      setRecords(data.employeeData)
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  return (
    <Layout>
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
