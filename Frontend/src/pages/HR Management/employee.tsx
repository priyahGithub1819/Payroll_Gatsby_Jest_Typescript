import React, { useEffect } from "react"
import Layout from "../../components/Layout"
// import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Link } from "gatsby"
import { indianDate } from "../../services/utils"
import {
  allUserData,
  getSingleEmp,
  editEmpStatusErp,
} from "../../services/apiFunction"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
import Modal from "react-modal"

export default function EmployeeList() {
  const [records, setRecords] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [modalData, setModalData] = useState<any>({})

  console.log(modalData)

  // to get all records from db
  const getAllEmployees = async () => {
    let data = await allUserData()
    console.log(data.employeeData)
    setRecords(data.employeeData)
  }
  //calling all records function
  useEffect(() => {
    getAllEmployees()
    console.log(window.location.pathname);
    
  }, [])

  // to target particular record
  // const onValueChange = (e:any) => {}

  // const empEditModal = (record:any) => {
  //   setModalData(record.basic)
  //   console.log(record.basic)
  //   setModalIsOpen(true)
  // }


  return (
    <Layout>
      <div className="container-fluid HrEmployeeContainer margin">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Link to="/app/hrdashboard">
              {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
              <i className="bi bi-arrow-left-circle-fill" data-testid="leftArrow"></i>
            </Link>
            <div className="hrTableHeading">
              <h1 className="animate-charcter">List of All Employees</h1>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="empTable">
              {/* table start */}
              <table className="table table-bordered" data-testid="employeeTable">
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Employee Id</th>
                    <th className="heading">Employee Name</th>
                    <th className="heading">Date of Joining</th>
                    <th className="heading">Probation Period</th>
                    <th className="heading">Confirmation Date</th>
                    {/* <th className="heading">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((record:any, Index:number) => {
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

                           {/* <td>

                            <button
                              id="empModal"
                              onClick={() => {
                                empEditModal(record)

                               

                              }}
                              className="editBtn"
                            >
                              Edit
                            </button>

                          </td> */}

                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {/* table end */}
            </div>


            {/* modal */}
            {/* <Modal id="employeeModal" isOpen={modalIsOpen}>
              <section className="modalSection ">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setModalIsOpen(false)
                    setModalData({})
                  }}
                ></button>

                <div className="titleCard fw-bold mb-3 p-2 ">
                  <h1 className="text-center">Edit Employee Details</h1>
                </div>
                <div className="row justify-content-center border mb-3">
                  <form id="empEditForm">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="firstName"
                          className="form-label fw-bold"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First name"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="middleName"
                          className="form-label fw-bold"
                        >
                          Middle Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="middleName"
                          placeholder="Middle name"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="lastName"
                          className="form-label fw-bold"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="joiningDate"
                          className="form-label fw-bold"
                        >
                          Joining Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="joiningDate"
                          name="dateOfJoining"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="probationperiod"
                          className="form-label fw-bold"
                        >
                          Probation Period
                        </label>
                        <select name="probationPeriod" className="form-select">
                          <option hidden>select Probation Period</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Months</option>
                          <option value="9">9 Months</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="confirmationDate"
                          className="form-label fw-bold"
                        >
                          Confirmation Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="confirmationDate"
                          name="confirmationDate"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div>
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={() => {
                      setModalIsOpen(false)
                      setModalData({})
                    }}
                  >
                    Close
                  </button>
                </div>
              </section>
            </Modal> */}

          </div>
        </div>
      </div>
    </Layout>
  )
}
 
