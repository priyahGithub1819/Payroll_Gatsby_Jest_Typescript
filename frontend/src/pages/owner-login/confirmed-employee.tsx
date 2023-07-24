import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { allUserData } from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";

interface Employee {
  basic: {
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    probationPeriod: number;
    designation: string;
    confirmationDate: string;
  };
  payrollData: {
    empStatus: string;
    empId: string;
  };
}

function App(): JSX.Element {
  const [records, setRecords] = useState<Employee[]>([]);

  useEffect(() => {
    const getAllEmployees = async (): Promise<void> => {
      try {
        const data = await allUserData();
        setRecords(data.employeeData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    getAllEmployees();
  }, []);

  useEffect(() => {
    const addTextCenterClass = (): void => {
      document.querySelectorAll("td,th").forEach((data) => {
        data.classList.add("text-center");
      });
    };

    addTextCenterClass();
  }, []);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day.slice(0, 2)}-${month}-${year}`;
  };

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
                      {records.map((record: Employee, index: number) => {
                        const {
                          basic: {
                            name: { firstName, middleName, lastName },
                            probationPeriod,
                            designation,
                            confirmationDate,
                          },
                          payrollData: { empStatus, empId },
                        } = record;

                        if (empStatus === "Confirmed") {
                          return (
                            <tr key={index}>
                              <td></td>
                              <td>
                                {firstName} {middleName} {lastName}
                              </td>
                              <td>{empId}</td>
                              <td>{probationPeriod} Months</td>
                              <td>{designation}</td>
                              <td>
                                {confirmationDate
                                  ? formatDate(confirmationDate)
                                  : ""}
                              </td>
                            </tr>
                          );
                        }
                        return null;
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
