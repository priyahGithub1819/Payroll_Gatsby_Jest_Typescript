import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { allUserData } from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";

function App() {
  const [records, setRecords] = useState<any>([]);

  //To get All employee data
  const getAllEmployees = async () => {
    let data = await allUserData();
    setRecords(data.employeeData);
  };

  useEffect(() => {
    getAllEmployees();
    document.querySelectorAll("td,th").forEach((data) => {
      data.classList.add("text-center");
    });
  }, []);

  //To dipslay the List of confirmed employee
  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-lg-8 col-md-8 col-sm-9 wrapper">
                <h2 className="text-center bulkText">
                  List of Confirmed Employees
                </h2>
                <div className="empTable">
                  <table className="table table-bordered css-serial">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Probation Period</th>
                        <th className="heading">Designation</th>
                        <th className="heading">Confirmed date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record: any, Index: number) => {
                          let confirmationdate =
                            record.basic.confirmationDate.split("-");
                          if (record.payrollData.empStatus === "Confirmed")
                            return (
                              <tr key={Index}>
                                <td></td>
                                <td>
                                  {record.basic.name.firstName}{" "}
                                  {record.basic.name.middleName}{" "}
                                  {record.basic.name.lastName}
                                </td>
                                <td>{record.payrollData.empId}</td>
                                <td>{record.basic.probationPeriod} Months</td>
                                <td>{record.basic.designation}</td>
                                <td>
                                  {confirmationdate[2]
                                    ? confirmationdate[2].slice(0, 2) +
                                      "-" +
                                      confirmationdate[1] +
                                      "-" +
                                      confirmationdate[0]
                                    : ""}
                                </td>
                              </tr>
                            );
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
  );
}
export default App;
