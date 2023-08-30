// import React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  allUserData,
  editEmpStatusErp,
  getAllCTC,
  editSingleCtc,
} from "../../services/api-function";

import { Link } from "gatsby";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getOwnerData, editCandiStatus } from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";
import { ToastContainer, toast } from "react-toastify";


interface CandidateRecord {
  candidateId: string;
  candidateName: string;
  candiStatus: string;
  eduQual: string;
  primarySkill: string;
  secondarySkill: string;
  noticePeriod: string;
  currentCTC: string;
  expectedCTC: string;
}

interface RejectedReason {
  rejectedMessage: string;
  id: string;
  candidateName: string;
}

const rejectedReasonInitialValue: RejectedReason = {
  rejectedMessage: "",
  id: "",
  candidateName: "",
};


interface CtcData {
  CTC: string;
  Emp_Id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
  createdby?: {
    empId: string;
    date: Date;
  };
  updatedby?: {
    empId: string;
    date: Date;
  };
}

interface Employee {
  Name: string;
  Emp_Id: string;
  CTC: string;
}
interface EmployeeData {
  basic: {
    confirmationDate: string;
    dateOfBirth: string;
    dateOfJoining: string;
    department: string;
    designation: string;
    email: string;
    employeeId: string;
    employmentStatus: string;
    employmentType: string;
    gender: string;
    maritalStatus: string;
    countryCode: string;
    number: number;
    probationPeriod: number;
    selectCount: number;
    workLocation: string;
    workMode: string;
    mobile: {
      countryCode: string;
      number: number;
    };
    name: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
    selfDeclaration: {
      academics: {};
      idProofs: {
        panCard: {
          panCardNumber: string;
        };
      };
      previousCompany: {};
    };
  };
  payrollData: {
    NameofSpouse: string;
    relationship: string;
    DOB: string;
    child1: string;
    child1Gender: string;
    DOB1: string;
    child2: string;
    child2Gender: string;
    DOB2: string;
    DOB3: string;
    DOB4: string;
    NameofFather: string;
    NameofMother: string;
    empId: string;
    empStatus: string;
    numberOfMember: number;
    password: string;
    role: string;
    parents: string;
  };
  empPaymentData: {
    aadharNumber: number;
    accountNumber: number;
    address: string;
    bankName: string;
    dateofRegistration: string;
    empDob: string;
    empId: string;
    ifscCode: string;
    name: string;
    panNumber: string;
    pfStatus: string;
    pfUanNumber: string;
    paymentType: string;
  };
  CTC?: number;
  designation: string;
}

function App() {
  const [records, setRecords] = useState<EmployeeData[]>([]);
  const [empToEdit, setEmpToEdit] = useState<EmployeeData | undefined>();
  const [selectedTable, setSelectedTable] = useState<"selected" | "hold" | "rejected" | "onboard" |null>(null); // Added state for selected table

  const [candirecords, setCandirecords] = useState<CandidateRecord[]>([]);
  const [rejectBoxShow, setRejectBoxShow] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<RejectedReason>(
    rejectedReasonInitialValue
  );
  
  const [rejectReasonHold, setRejectReasonHold] = useState<string>("");

  // To get all candidates
  const getAllCandidates = async () => {
    const holdCandi: CandidateRecord[] = [];
    const data = await getOwnerData();

    if (data.success === true) {
      setCandirecords(data.candiInfo);
    }

    data.candiInfo.forEach((d: CandidateRecord) => {
      if (d.candiStatus === "Hold") {
        holdCandi.push(d);
      }
    });

    setCandirecords(holdCandi);

    const selectedCandidates: CandidateRecord[] = [];
    // const data = await getOwnerData();

    // if (data.success === true) {
    //   setCandirecords(data.candiInfo);
    // }

    data.candiInfo.forEach((d: CandidateRecord) => {
      if (d.candiStatus === "Selected") {
        selectedCandidates.push(d);
      }
    });
    setCandirecords(selectedCandidates);
  };

  useEffect(() => {
    getAllCandidates();
  }, []);

  // To Reject the on-hold candidate
  const saveRejectCandiForHold = async (id: string, candidateName: string) => {
    toast.success("Candidate " + id + " is rejected");
    await editCandiStatus(id, {
      candiStatus: "Rejected",
      rejectedMessage: rejectReasonHold,
    });
    setRejectBoxShow(false);
    getAllCandidates();
  };

  // To Select the on-hold candidate
  const saveApproveCandi = (id: string, candidateName: string) => {
    editCandiStatus(id, { candiStatus: "Selected" });
    getAllCandidates();
    toast.success("Candidate " + candidateName + " is selected");
    getAllCandidates();
  };


  //  const getAllCandidates = async () => {
  //   const selectedCandidates: CandidateRecord[] = [];
  //   const data = await getOwnerData();

  //   if (data.success === true) {
  //     setCandirecords(data.candiInfo);
  //   }

  //   data.candiInfo.forEach((d: CandidateRecord) => {
  //     if (d.candiStatus === "Selected") {
  //       selectedCandidates.push(d);
  //     }
  //   });
  //   setCandirecords(selectedCandidates);
  // };

  useEffect(() => {
     getAllCandidates();
  }, []);

  const saveRejectCandi = async () => {
    if (rejectReason.rejectedMessage) {
      toast.success(
        `Candidate ${rejectReason.candidateName} is rejected successfully`
      );
      await editCandiStatus(rejectReason.id, {
        candiStatus: "Rejected",
        rejectedMessage: rejectReason.rejectedMessage,
      });
      setRejectBoxShow(false);
      setRejectReason(rejectedReasonInitialValue);
      getAllCandidates();
    } else {
      toast.success("Please select any reason to reject the candidate.");
    }
  };

  const saveOnboardCandi = async (id: string, candidateName: string) => {
    toast.success(`Candidate ${id} will be onboarded soon`);
    await editCandiStatus(id, { candiStatus: "Onboard" });
    await getAllCandidates();
  };

return (
  <Layout>
    <div className="OwnerContainer">
      <div className="row ownerRow">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="row ownerColumn justify-content-end">
            <div className="margin col-lg-11 col-md-9 col-sm-10 wrapper">
              <h2 className="text-center bulkText">Candidates Information</h2>
              <div> <label className="radioMargin">
                <input
                  type="radio"
                  name="visibility"
                  value="selected"
                  id="selected"
                  onClick={() => setSelectedTable("selected") }
                />{" "}
                Selected Candidate
              </label>
              <label className="radioMargin">
                <input
                  type="radio"
                  name="visibility"
                  value="hold"
                  id="hold"
                  onClick={() => setSelectedTable("hold")}
                />{" "}
               On Hold Candidate
              </label>
              <label className="radioMargin">
                <input
                  type="radio"
                  name="visibility"
                  value="rejected"
                  id="rejected"
                  onClick={() => setSelectedTable("rejected")}
                />{" "}
                Rejected Candidate
              </label>
              <label className="radioMargin">
                <input
                  type="radio"
                  name="visibility"
                  value="onboard"
                  id="onboard"
                  onClick={() => setSelectedTable("onboard")}
                />{" "}
                Candidates to be onboarded
              </label>
              </div>
             {/* Table of selected candidates */}
              {selectedTable === "selected" && (            
               <div className="row ownerColumn">
                 <div className="margin col-xl-11 col-lg-10 col-md-11 col-sm-9 wrapper">
                   <h2 className="text-center bulkText">
                     List of Selected Candidates
                   </h2>
                   {candirecords.length === 0 ? (
                     <div className="noDataAvailable">Currently no candidate's data available.</div>
                   ) : (
                   <div className="empTable">
                     <table className="table-bordered ownersTable">
                       <thead>
                         <tr>
                           <th className="heading">Sr. No.</th>
                           <th className="heading">Candidate ID</th>
                           <th className="heading">Candidate Name</th>
                           <th className="heading">Educational qualification</th>
                           <th className="heading">Primary Skills</th>
                           <th className="heading">Secondary Skills</th>
                           <th className="heading">Notice Period</th>
                           <th className="heading">Current CTC</th>
                           <th className="heading">Expected CTC</th>
                           <th className="heading">Action</th>
                         </tr>
                       </thead>
                       <tbody>
                         {candirecords.map((candirecord: CandidateRecord, index: number) => {
                           if (candirecord.candiStatus === "Selected") {
                             return (
                               <tr key={index}>
                                 <td>{index + 1}</td>
                                 <td>{candirecord.candidateId}</td>
                                 <td>{candirecord.candidateName}</td>
                                 <td>{candirecord.eduQual}</td>
                                 <td>{candirecord.primarySkill}</td>
                                 <td>{candirecord.secondarySkill}</td>
                                 <td>{candirecord.noticePeriod}</td>
                                 <td>{candirecord.currentCTC}</td>
                                 <td>{candirecord.expectedCTC}</td>
                                 <td>
                                   <div className="col-4 offset-8 d-flex justify-content-end">
                                     <button
                                       className="btn btn-success"
                                       data-testid="onboardBtn"
                                       onClick={(e) =>
                                         saveOnboardCandi(
                                           candirecord.candidateId,
                                           candirecord.candidateName
                                         )
                                       }
                                     >
                                       Onboard
                                     </button>
                                     <button
                                       className="btn btn-danger"
                                       data-testid="rejectBtn"
                                       onClick={() => {
                                         setRejectBoxShow(true);
                                         setRejectReason({
                                           ...rejectReason,
                                           id: candirecord.candidateId,
                                           candidateName: candirecord.candidateName,
                                         });
                                       }}
                                     >
                                       Reject
                                     </button>
                                   </div>
                                 </td>
                               </tr>
                             );
                           }
                         })}
                       </tbody>
                     </table>
                   </div>
                      )}
                   {rejectBoxShow && (
                     <div data-testid="reject-msg-modal" className="modal RejectReasonModal ">
                       <div className="modal-dialog">
                         <div className="modal-content">
                           <div className="modal-header">
                             <h1 className="modal-title fs-5" id="exampleModalLabel">
                               Select reason to reject the candidate{" "}
                             </h1>
                             <button
                               type="button"
                               className="btn-close"
                               data-bs-dismiss="modal"
                               aria-label="Close"
                               onClick={() => {
                                 setRejectBoxShow(false);
                                 setRejectReason(rejectedReasonInitialValue);
                               }}
                             ></button>
                           </div>
                           <div className="modal-body">
                             <div className="mb-3">
                               <div className="myRejectClass">
                                 <label htmlFor="message-text" className="col-form-label">
                                   Reasons:
                                 </label>
                                 <br></br>
                                 <label>
                                   <input
                                     type="radio"
                                     name="rejectedMessage"
                                     value="Lack of Technical knowledge"
                                     onChange={(e) =>
                                       setRejectReason({
                                         ...rejectReason,
                                         rejectedMessage: e.target.value,
                                       })
                                     }
                                   />
                                   Lack of Technical knowledge
                                 </label>
                                 <br></br>
                                 <label>
                                   <input
                                     type="radio"
                                     name="rejectedMessage"
                                     value="Lack of Communication Skills"
                                     onChange={(e) =>
                                       setRejectReason({
                                         ...rejectReason,
                                         rejectedMessage: e.target.value,
                                       })
                                     }
                                   />
                                   Lack of Communication Skills
                                 </label>
                                 <label>
                                   <input
                                     type="radio"
                                     name="rejectedMessage"
                                     value="Lack of grasping power"
                                     onChange={(e) =>
                                       setRejectReason({
                                         ...rejectReason,
                                         rejectedMessage: e.target.value,
                                       })
                                     }
                                   />
                                   Lack of grasping power
                                 </label>
                                 <label>
                                   <input
                                     type="radio"
                                     name="rejectedMessage"
                                     value="Not accepted offer letter"
                                     onChange={(e) =>
                                       setRejectReason({
                                         ...rejectReason,
                                         rejectedMessage: e.target.value,
                                       })
                                     }
                                   />
                                   Not accepted offer letter
                                 </label>
                                 <br></br>
                                 <label>
                                   <input
                                     type="radio"
                                     name="rejectedMessage"
                                     value="Delay in joining"
                                     onChange={(e) =>
                                       setRejectReason({
                                         ...rejectReason,
                                         rejectedMessage: e.target.value,
                                       })
                                     }
                                   />
                                   Delay in joining
                                 </label>
                                 <br></br>
                                 <label>Details</label>
                               </div>
                               <textarea
                                 className="form-control"
                                 id="message-text"
                                 name="rejectedMessage"
                                 data-testid="rejectReason"
                                 onChange={(e) =>
                                   setRejectReason({
                                     ...rejectReason,
                                     rejectedMessage: e.target.value,
                                   })
                                 }
                                 value={rejectReason.rejectedMessage}
                               ></textarea>
                             </div>
                           </div>
                           <div className="modal-footer">
                             <button
                               type="button"
                               data-testid="closeRejectModal"
                               className="btn btn-secondary"
                               data-bs-dismiss="modal"
                               onClick={() => {
                                 setRejectBoxShow(false);
                                 setRejectReason(rejectedReasonInitialValue);
                               }}
                             >
                               Close
                             </button>
                             <button
                               type="button"
                               data-testid="finalRejectButton"
                               className="btn btn-primary"
                               onClick={(e) => saveRejectCandi()}
                             >
                               Reject
                             </button>
                           </div>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             
              )}
               {/* Table of on hold candidates */}
               {selectedTable === "hold" && ( 
               <div className="row ownerColumn">
               <div className="margin col-xl-12 col-lg-10 col-md-11 col-sm-6 wrapper">
                 <h2 className="bulkText text-center">
                   List of On Hold Candidates
                 </h2>
                 {candirecords.length === 0 ? (
                   <div className="noDataAvailable">Currently no candidate's data available.</div>
                 ) : (
                 <div className="empTable">
                   <table className="table-bordered ownersTable">
                     <thead>
                       <tr>
                         <th className="heading">Sr. No.</th>
                         <th className="heading">Candidate ID</th>
                         <th className="heading">Candidate Name</th>
                         <th className="heading">Educational qualification</th>
                         <th className="heading">Primary Skills</th>
                         <th className="heading">Secondary Skills</th>
                         <th className="heading">Notice Period</th>
                         <th className="heading">Current CTC</th>
                         <th className="heading">Expected CTC</th>
                         <th className="heading">Action</th>
                       </tr>
                     </thead>
                     <tbody>
                       {candirecords.map((candirecord, Index) => {
                         if (candirecord.candiStatus === "Hold") {
                           return (
                             <tr key={Index}>
                               <td>{Index + 1}</td>
                               <td>{candirecord.candidateId}</td>
                               <td>{candirecord.candidateName}</td>
                               <td>{candirecord.eduQual}</td>
                               <td>{candirecord.primarySkill}</td>
                               <td>{candirecord.secondarySkill}</td>
                               <td>{candirecord.noticePeriod}</td>
                               <td>{candirecord.currentCTC}</td>
                               <td>{candirecord.expectedCTC}</td>
                               <td>
                                 <div className="col-4 offset-8 d-flex justify-content-end">
                                   <button
                                     className="btn btn-success"
                                     data-testid="selectBtn"
                                     onClick={() =>
                                       saveApproveCandi(
                                         candirecord.candidateId,
                                         candirecord.candidateName
                                       )
                                     }
                                   >
                                     Select
                                   </button>
                                   <button
                                     className="btn btn-danger"
                                     data-testid="rejectBtn"
                                     onClick={() => setRejectBoxShow(true)}
                                   >
                                     Reject
                                   </button>
                                   {rejectBoxShow && (
                                     <div
                                       data-testid="reject-msg-modal"
                                       className="modal RejectReasonModal"
                                     >
                                       <div className="modal-dialog">
                                         <div className="modal-content">
                                           <div className="modal-header">
                                             <h1
                                               className="modal-title fs-5"
                                               id="exampleModalLabel"
                                             >
                                               Select reason to reject the
                                               candidate
                                             </h1>
                                             <button
                                               type="button"
                                               className="btn-close"
                                               data-bs-dismiss="modal"
                                               aria-label="Close"
                                               onClick={() => {
                                                 setRejectBoxShow(false);
                                               }}
                                             ></button>
                                           </div>
                                           <div className="modal-body">
                                             <div className="mb-3">
                                               <div className="myRejectClass">
                                                 <label
                                                   htmlFor="message-text"
                                                   className="col-form-label"
                                                 >
                                                   Reasons:
                                                 </label>
                                                 <br></br>
                                                 <label>
                                                   <input
                                                     type="radio"
                                                     name="rejectedMessageHold"
                                                     value="Lack of Technical knowledge"
                                                     onChange={(e) =>
                                                       setRejectReasonHold(
                                                         e.target.value
                                                       )
                                                     }
                                                   />
                                                   Lack of Technical knowledge
                                                 </label>
                                                 <br></br>
                                                 <label>
                                                   <input
                                                     type="radio"
                                                     name="rejectedMessageHold"
                                                     value="Lack of Communication Skills"
                                                     onChange={(e) =>
                                                       setRejectReasonHold(
                                                         e.target.value
                                                       )
                                                     }
                                                   />
                                                   Lack of Communication Skills
                                                 </label>
                                                 <label>
                                                   <input
                                                     type="radio"
                                                     name="rejectedMessageHold"
                                                     value="Lack of grasping power"
                                                     onChange={(e) =>
                                                       setRejectReasonHold(
                                                         e.target.value
                                                       )
                                                     }
                                                   />
                                                   Lack of grasping power
                                                 </label>
                                                 <label>
                                                   <input
                                                     type="radio"
                                                     name="rejectedMessage"
                                                     value="Not accepted offer letter"
                                                     onChange={(e) =>
                                                       setRejectReasonHold(
                                                         e.target.value
                                                       )
                                                     }
                                                   />
                                                   Not accepted offer letter
                                                 </label>
                                                 <br></br>
                                                 <label>
                                                   <input
                                                     type="radio"
                                                     name="rejectedMessage"
                                                     value="Delay in joining"
                                                     onChange={(e) =>
                                                       setRejectReasonHold(
                                                         e.target.value
                                                       )
                                                     }
                                                   />
                                                   Delay in joining
                                                 </label>
                                                 <br></br>
                                                 <label>Details</label>
                                               </div>
                                               <textarea
                                                 className="form-control"
                                                 id="message-text"
                                                 data-testid="rejectReason"
                                                 name="rejectedMessage"
                                                 onChange={(e) =>
                                                   setRejectReasonHold(
                                                     e.target.value
                                                   )
                                                 }
                                                 value={rejectReasonHold}
                                               ></textarea>
                                             </div>
                                           </div>
                                           <div className="modal-footer">
                                             <button
                                               type="button"
                                               className="btn btn-secondary"
                                               data-testid="closeRejectModal"
                                               data-bs-dismiss="modal"
                                               onClick={() =>
                                                 setRejectBoxShow(false)
                                               }
                                             >
                                               Close
                                             </button>
                                             <button
                                               type="button"
                                               className="btn btn-primary"
                                               data-testid="finalRejectButton"
                                               onClick={() =>
                                                saveRejectCandiForHold(
                                                   candirecord.candidateId,
                                                   candirecord.candidateName
                                                 )
                                               }
                                             >
                                               Reject
                                             </button>
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                   )}
                                 </div>
                               </td>
                             </tr>
                           );
                         }
                         return null;
                       })}
                     </tbody>
                   </table>
                 </div>
                 )}
               </div>
             </div>
              )}
                {/* Table of rejected candidates */}
               {selectedTable === "rejected" && ( 
                <div className="empTable">
                  <table className="table table-bordered css-serial">
                  <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Name of Employee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record: EmployeeData, Index: number) => {
                          if (record.basic.employmentType ==="INTERN")
                            return (
                              <tr key={Index}>
                                <td></td>
                                <td>{record.payrollData.empId}</td>
                                <td>
                                  {record.basic.name.firstName}{" "}
                                  {record.basic.name.middleName}{" "}
                                  {record.basic.name.lastName}
                                </td>
                              </tr>
                            );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
                {/* Table of candidates to be onboarded */}
               {selectedTable === "onboard" && ( 
                <div className="empTable">
                  <table className="table table-bordered css-serial">
                  <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Name of Employee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record: EmployeeData, Index: number) => {
                          if (record.basic.employmentType ==="INTERN")
                            return (
                              <tr key={Index}>
                                <td></td>
                                <td>{record.payrollData.empId}</td>
                                <td>
                                  {record.basic.name.firstName}{" "}
                                  {record.basic.name.middleName}{" "}
                                  {record.basic.name.lastName}
                                </td>
                              </tr>
                            );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
}

export default App;
