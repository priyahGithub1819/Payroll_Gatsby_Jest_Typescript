import React, { useEffect } from "react"
import Layout from "../../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { allUserData, getAllPfEmpData } from "../../services/apiFunction"
import Modal from "react-modal"
import SideBar from "../../components/SideBar"
import { indianDate } from "../../services/utils"

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [records, setRecords] = useState<any>([])

  //Function to fetch data from database
  const getAllEmployees = async () => {
    let combinedData = []

    let l = await allUserData()
    const payrollUser = l.employeeData
    // console.log(data)

    let k = await getAllPfEmpData()
    const empPaymentData = k.empInfo
    console.log(empPaymentData)

    let pfUser = new Map()

    for (let i = 0; i < empPaymentData.length; i++) {
      pfUser.set(empPaymentData[i].empId, i)
    }

    // console.log(user)

    for (let i = 0; i < payrollUser.length; i++) {
      // console.log(user.get(empPaymentData[i].empId))
      if (pfUser.has(payrollUser[i].payrollData.empId)) {
        combinedData.push({
          ...payrollUser[i],
          empPaymentData: empPaymentData[pfUser.get(payrollUser[i].payrollData.empId)],
        })
      }
      else {
        combinedData.push({ ...payrollUser[i] })
      }
    }
    console.log(combinedData)

    setRecords(combinedData)
  }
  //Basic information modal data
  const onButtonClick = (
    email: string,
    dob: any,
    contNo: number,
    gender: string,
    joiningD: any,
    probationP: number,
    confDate: any
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      var input = document.getElementById("common-modal") as HTMLInputElement

      input.innerHTML = `<table class="profileTable table table-bordered table-striped table-sm"><thead className="thead">
      <tr>
        <th>Email Address</th>
        <th>Date of Birth</th>
        <th>Contact Number</th>
        <th>Gender</th>
        <th>Joining Date</th>
        <th>Probation Period</th>
        <th>Confirmation Date</th>
      </tr>
    </thead><tbody><tr>

    <td>${email === undefined ? "NA" : email}</td>
    <td>${indianDate(dob) === undefined ? "NA" : indianDate(dob)}</td>
    <td>${contNo === undefined ? "NA" : contNo}</td>

    <td>${gender}</td>
    <td>${indianDate(joiningD) === undefined ? "NA" : indianDate(joiningD)}</td>
    <td>${probationP === undefined ? "NA" : probationP}</td>
    <td>${indianDate(confDate) === undefined ? "NA" : indianDate(confDate)}</td>
  </tr></tbody></table>`
      var innerValue = document.getElementById("heading") as HTMLInputElement
      innerValue.innerText = "Basic Information"
    }, 200)
  }
  //Employee position modal
  const onButtonClick1 = (
    department: string,
    designation: string,
    location: string,
    role: string,
    workMode: string
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      var input = document.getElementById("common-modal") as HTMLInputElement

      input.innerHTML = ` <table class="profileTable table table-bordered table-striped table-sm"> 
      <thead class="thead">
      <tr>
        <th>Department</th>
        <th>Designation</th>
        <th>Location</th>
        <th>Role</th>
        <th>Work Mode</th>
      </tr>
    </thead>
     <tbody> <tr>

     <td>${department === undefined ? "NA" : department}</td>
     <td>${designation === undefined ? "NA" : designation}</td>
     <td>${location === undefined ? "NA" : location}</td>
     <td>${role === undefined ? "NA" : role}</td>
     <td>${workMode === undefined ? "NA" : workMode}</td>

   </tr></tbody> </table>`
   var innerValue = document.getElementById("heading") as HTMLInputElement
   innerValue.innerText = "Employee Position"
    }, 200)
  }
  //Family information modal
  const onButtonClick2 = (
    fmember:number,
    status:string,
    parents:string,
    Nspouse:string,
    relationship:string,
    sDOB:any,
    c1Name:string,
    c1Gender:string,
    c1DOB:any,
    c2Name:string,
    c2Gender:string,
    c2DOB:any,
    fName:string,
    fDOB:any,
    mName:string,
    mDOB:any
  ) => {
    console.log(status)
    console.log(sDOB)
    console.log(c1DOB)
    setModalIsOpen(true)
    setTimeout(() => {
      var input = document.getElementById("common-modal") as HTMLInputElement

      input.innerHTML = `<table class="table table-bordered table-sm table-striped">
      <thead>
        <tr>
          <th class="text-center">Number of Family Members</th>
          <th class="text-center">Status</th>
          ${status === "MARRIED"
          ? `<th class="text-center">Spouse Details</th>
          <th class="c1-hide text-center">Child 1</th>
          <th class="c2-hide text-center">Child 2</th>`
          : ` <th class="text-center">Father Details</th>
              <th class="text-center">Mother Details</th>`
        }
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${fmember === undefined ? "NA" : fmember}</td>
          <td>${status === undefined ? "NA" : status}</td>
        ${status === "MARRIED"
          ? `
            <td>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Relationship</th>
                    <th scope="col">DOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${Nspouse === undefined ? "NA" : Nspouse}</td>
                    <td>${relationship === undefined ? "NA" : relationship}</td>
                    <td>${(sDOB && indianDate(sDOB)) === undefined
            ? "NA"
            : indianDate(sDOB)
          }</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="c1-hide">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${c1Name === undefined ? "NA" : c1Name}</td>
                    <td>${c1Gender === undefined ? "NA" : c1Gender}</td>
                    <td>${(c1DOB && indianDate(c1DOB)) === undefined
            ? "NA"
            : indianDate(c1DOB)
          }</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="c2-hide">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${c2Name === undefined ? "NA" : c2Name}</td>
                    <td>${c2Gender === undefined ? "NA" : c2Gender}</td>
                    <td>${(c2DOB && indianDate(c2DOB)) === undefined
            ? "NA"
            : indianDate(c2DOB)
          }</td>
                  </tr>
                </tbody>
              </table>
            </td>`
          : `<td>
            <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">DOB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${fName === undefined ? "NA" : fName}</td>
                      <td>${(fDOB && indianDate(fDOB)) === undefined
            ? "NA"
            : indianDate(fDOB)
          }</td>
                    </tr>
                  </tbody>
                </table> 
              </td><td>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">DOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${mName === undefined ? "NA" : mName}</td>
                    <td>${(mDOB && indianDate(mDOB)) === undefined
            ? "NA"
            : indianDate(mDOB)
          }</td?
                  </tr>
                </tbody>
              </table>
            </td>`
        }
        </tr>
      </tbody>
    </table>`
    var innerValue = document.getElementById("heading") as HTMLInputElement
    innerValue.innerText = "Family Information"
      // Conditions for hiding/showing children
      if (c1Name === "" || c1Name === undefined) {
        document.querySelectorAll(".c1-hide").forEach(i => {
          i.classList.add("d-none")
        })
      } else {
        document.querySelectorAll(".c1-hide").forEach(i => {
          i.classList.remove("d-none")
        })
      }
      if (c2Name === "" || c2Name === undefined) {
        document.querySelectorAll(".c2-hide").forEach(i => {
          i.classList.add("d-none")
        })
      } else {
        document.querySelectorAll(".c2-hide").forEach(i => {
          i.classList.remove("d-none")
        })
      }
    }, 200)
  }
  //Pan and Pf Uan details modal
  const onButtonClick3 = (pan:any, pf:any) => {
    setModalIsOpen(true)
    setTimeout(() => {
      var input = document.getElementById("common-modal") as HTMLInputElement

      input.innerHTML = `<table class="profileTable table table-bordered table-striped table-sm">  <thead className="thead">
      <tr>
        <th>Pan Number</th>
        <th>PF UAN Number</th>
      </tr>
    </thead> <tbody><tr>
    <td>${pan === undefined ? "NA" : pan}</td>
    <td>${pf === undefined ? "NA" : pf}</td>
  </tr></tbody></table>`
      var innerValue = document.getElementById("heading") as HTMLInputElement
    innerValue.innerText = "PAN & PF information"
    }, 200)
  }
  //Payment details modal
  const onButtonClick4 = (
    paymentType:string,
    bankName:string,
    ifscCode:string,
    accountNumber:number
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      var input = document.getElementById("common-modal") as HTMLInputElement
      input.innerHTML = `
      <table class="profileTable table table-bordered table-striped table-sm">  <thead className="thead"><tr>
      <th>Payment Type</th>
      <th>Bank Name</th>
      <th>IFSC Code</th>
      <th>Account Number</th>
    </tr> </thead><tbody> <tr>
      <td>${paymentType === undefined ? "NEFT" : paymentType}</td>
      <td>${bankName === undefined ? "NA" : bankName}</td>
      <td>${ifscCode === undefined ? "NA" : ifscCode}</td>
      <td>${accountNumber === undefined ? "NA" : accountNumber}</td>
    </tr></tbody></table>`
      var innerValue = document.getElementById("heading") as HTMLInputElement
    innerValue.innerText = "Payment Information"
    }, 200)
  }

  useEffect(() => {
    getAllEmployees()
    document.querySelectorAll("td,th").forEach(data => {
      data.classList.add("text-center")
    })
    getAllEmployees()
  }, [])

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow justify-content-center ">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-xl-11 col-lg-10 col-md-10 col-sm-6 wrapper">
                {/* <div className="col-lg-11"> */}
                <h2 className="text-center tableHeading">
                  View All Employee Details
                </h2>
                <h5 className="d-none">
                  Get information of all employee into excel sheet
                  <button type="button" className="exportBtn d-none">
                    Export to Excel
                  </button>
                </h5>
                {/* </div> */}
                <div className="AllEmpListTable">
                  <table className="table table-bordered css-serial">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Basic Information</th>
                        <th className="heading">Employee Position </th>
                        <th className="heading">Family Information </th>
                        <th className="heading"> PAN and Pf UAN </th>
                        <th className="heading">Payment Details </th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record:any, Index:number) => {
                          return (
                            <tr key={Index}>
                              <td></td>
                              <td>
                                {record.basic.name.firstName}{" "}
                                {record.basic.name.middleName}{" "}
                                {record.basic.name.lastName}
                              </td>
                              <td>{record.payrollData.empId}</td>
                              <td>
                                <button
                                  id="modalbtn1"
                                  onClick={() =>
                                    onButtonClick(
                                      record.basic.email,
                                      record.basic.dateOfBirth,
                                      record.basic.mobile.number,
                                      record.basic.gender,
                                      record.basic.dateOfJoining,
                                      record.basic.probationPeriod,
                                      record.basic.confirmationDate
                                    )
                                  }
                                >
                                  See Information{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  id="modalbtn2"
                                  onClick={() =>
                                    onButtonClick1(
                                      record.basic.department,
                                      record.basic.designation,
                                      record.basic.workLocation,
                                      record.payrollData.role,
                                      record.basic.workMode
                                    )
                                  }
                                >
                                  {" "}
                                  See Information{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  id="modalbtn3"
                                  onClick={() =>
                                    onButtonClick2(
                                      record.payrollData.numberOfMember,
                                      record.basic.maritalStatus,
                                      record.payrollData.parents,
                                      record.payrollData.NameofSpouse,
                                      record.payrollData.relationship,
                                      record.payrollData.DOB,
                                      record.payrollData.child1,
                                      record.payrollData.child1Gender,
                                      record.payrollData.DOB1,
                                      record.payrollData.child2,
                                      record.payrollData.child2Gender,
                                      record.payrollData.DOB2,
                                      record.payrollData.NameofFather,
                                      record.payrollData.DOB3,
                                      record.payrollData.NameofMother,
                                      record.payrollData.DOB4
                                    )
                                  }
                                >
                                  See Information{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  id="modalbtn4"
                                  onClick={() =>
                                    onButtonClick3(record.basic.selfDeclaration.idProofs.panCard.panCardNumber, record.empPaymentData.pfUanNumber)
                                  }
                                >
                                  See Information{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  id="modalbtn5"
                                  onClick={() =>
                                    onButtonClick4(
                                      record.empPaymentData.paymentType,
                                      record.empPaymentData.bankName,
                                      record.empPaymentData.ifscCode,
                                      record.empPaymentData.accountNumber
                                    )
                                  }
                                >
                                  See Information{" "}
                                </button>
                              </td>
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
        {/* modal */}
        <Modal isOpen={modalIsOpen} test-dataid= "myModal">
          <h1 className="heading text-center pt-4" id="heading"></h1>
          <div style={{ overflowX: "scroll", width: "100%" }}>
            <div className="familyInformation" id="common-modal"></div>
          </div>
          <div>
            <button className="modalbtn" onClick={() => setModalIsOpen(false)}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
    // </div>
  )
}
export default App
