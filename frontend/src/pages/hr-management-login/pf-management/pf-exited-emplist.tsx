import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/Layout";
import { getAllPfEmpData, allUserData } from "../../../services/api-function";
import { indianDate } from "../../../services/utils";

interface PfEmployee {
  name: string;
  empDob: string;
  empId: string;
  aadharNumber: string;
  panNumber: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
  address: string;
  dateofRegistration: string;
  pfUanNumber: string;
  lastWorkingDay?: string;
  updatedby?: {
    empId?: string;
    date?: string;
  };
}

interface PayrollUser {
  payrollData: {
    empId: string;
  };
  basic: {
    dateOfJoining: string;
  };
}

function PfExitedEmpList() {
  const [records, setRecords] = useState<any[]>([]);

  const getAllPfEmpList = async () => {
    let combinedData: any[] = [];

    let pfData = await getAllPfEmpData();
    const empPaymentData: PfEmployee[] = pfData.empInfo;

    let empData = await allUserData();
    const payrollUser: PayrollUser[] = empData.employeeData;

    let user = new Map<string, number>();

    for (let i = 0; i < payrollUser.length; i++) {
      user.set(payrollUser[i].payrollData.empId, i);
    }

    for (let i = 0; i < empPaymentData.length; i++) {
      if (user.has(empPaymentData[i].empId)) {
        combinedData.push({
          ...empPaymentData[i],
          ...payrollUser[user.get(empPaymentData[i].empId)!],
        });
      } else {
        combinedData.push(empPaymentData[i]);
      }
    }

    setRecords(combinedData);
  };

  useEffect(() => {
    getAllPfEmpList();
  }, []);

  return (
    <Layout>
      <div className="container-fluid pfEnrolledListContainer">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/hr-management-login/pf-dashboard" data-testid="arrowLink">
              <i className="bi bi-arrow-left-circle-fill" data-testid="leftArrow"></i>
            </Link>
            <h2 className="text-center mb-4" data-testid="heading">
              List of Exited PF Employees{" "}
            </h2>

            <div className="empTable col-lg-12">
              <table className="table table-bordered css-serial" data-testid="table">
                <thead>
                  <tr>
                    <th className="heading" role="column">
                      Sr. No.
                    </th>
                    <th className="heading" role="column">
                      Name of Employee
                    </th>
                    <th className="heading" role="column">
                      Date Of Birth (Mentioned on Aadhar card.)
                    </th>
                    <th className="heading" role="column">
                      Employee Id
                    </th>
                    <th className="heading" role="column">
                      Aadhar Number
                    </th>
                    <th className="heading" role="column">
                      Pan Number
                    </th>
                    <th className="heading" role="column">
                      Bank Name
                    </th>
                    <th className="heading" role="column">
                      IFSC Code
                    </th>
                    <th className="heading" role="column">
                      Account number
                    </th>
                    <th className="heading" role="column">
                      Address
                    </th>
                    <th className="heading" role="column">
                      Date of registration
                    </th>
                    <th className="heading" role="column">
                      PF UAN Number
                    </th>
                    <th className="heading" role="column">
                      Joining Date
                    </th>
                    <th className="heading" role="column">
                      Last Working Day
                    </th>
                    <th className="heading" role="column">
                      Deletion Date and User EmpId
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record: any, index: number) => {
                    if (record.pfStatus === "Exited") {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td>{record.name}</td>
                          <td>{indianDate(record.empDob)}</td>
                          <td>{record.empId}</td>
                          <td>{record.aadharNumber}</td>
                          <td>{record.panNumber}</td>
                          <td>{record.bankName}</td>
                          <td>{record.ifscCode}</td>
                          <td>{record.accountNumber}</td>
                          <td>{record.address}</td>
                          <td>{record.dateofRegistration}</td>
                          <td>{record.pfUanNumber}</td>
                          <td>{indianDate(record.basic.dateOfJoining)}</td>
                          <td>{indianDate(record.lastWorkingDay || "")}</td>
                          <td>{`By ${record.updatedby?.empId} on ${indianDate(
                            record.updatedby?.date || ""
                          )}`}</td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PfExitedEmpList;
