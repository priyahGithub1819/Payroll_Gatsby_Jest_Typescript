import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import { Link } from "gatsby";
import { indianDate } from "../../services/utils";
import { allUserData } from "../../services/apiFunction";

export default function EmployeeList() {
  const [records, setRecords] = useState([]);

  // to get all records from db
  const getAllEmployees = async () => {
    let data = await allUserData();
    setRecords(data.employeeData);
  };

  //calling all records function
  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <Layout>
      <div className="container-fluid HrEmployeeContainer margin">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Link to="/app/hrDashBoard">
              <i
                className="bi bi-arrow-left-circle-fill"
                data-testid="leftArrow"
              ></i>
            </Link>
            <div className="hrTableHeading">
              <h1 className="animate-charcter">List of All Employees</h1>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="empTable">
              {/* table start */}
              <table
                className="table table-bordered"
                data-testid="employeeTable"
              >
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Employee Id</th>
                    <th className="heading">Employee Name</th>
                    <th className="heading">Date of Joining</th>
                    <th className="heading">Probation Period</th>
                    <th className="heading">Confirmation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((record: any, Index: number) => {
                      return (
                        <tr key={Index}>
                          <td>{Index + 1}</td>
                          <td>{record.payrollData.empId}</td>
                          <td>
                            {record.basic.name.firstName}{" "}
                            {record.basic.name.MiddleName}{" "}
                            {record.basic.name.lastName}
                          </td>
                          <td>{indianDate(record.basic.dateOfJoining)}</td>
                          <td>{record.basic.probationPeriod} Months</td>
                          <td>{indianDate(record.basic.confirmationDate)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {/* table end */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
