import React, { useEffect } from "react"
import Layout from "../../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { getOwnerData } from "../../services/apiFunction"
import { editCandiStatus } from "../../services/apiFunction"
import SideBar from "../../components/OwnersSidebar"
import { Link } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [candirecords, setCandirecords] = useState<any>([])
  const [rejectBoxShow, setRejectBoxShow] = useState<any>(false)
  const [rejectReason, setRejectReason] = useState<any>("")

  // To get all candidate
  const getAllCandidates = async () => {
    let holdCandi:any = []
    let data = await getOwnerData()

    if (data.success === true) {
      setCandirecords(data.candiInfo)
    }

    data.candiInfo.map((d:any) => {
      if (d.candiStatus === "Hold") {
        holdCandi.push(d)
      }
    })
    setCandirecords(holdCandi)
  }
  //End of get all candiadates

  useEffect(() => {
    getAllCandidates()
  }, [])

  //To Reject the on hold candidate
  const saveRejectCandi = async (id:any, candidateName:any) => {
   toast.success("Candidate " + id + " is rejected")
    await editCandiStatus(id, {
      candiStatus: "Rejected",
      rejectedMessage: rejectReason,
    })
    setRejectBoxShow(false)
    getAllCandidates()
  }

  //To Select the on hold candidate
  const saveApproveCandi = (id:any, candidateName:any) => {
    editCandiStatus(id, { candiStatus: "Selected" })
    getAllCandidates()
    //window.alert("Candidate " + candidateName + " is selected")
    toast.success("Candidate " + candidateName + " is selected");
    getAllCandidates()
  }

  //To display data on Webpage
  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-end">
              <div className="margin col-xl-12 col-lg-10 col-md-11 col-sm-6 wrapper">
                <h2 className="bulkText text-center">
                  List of On Hold Candidates
                </h2>
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
                      {candirecords &&
                        candirecords.map((candirecord:any, Index:number) => {
                          if (candirecord.candiStatus == "Hold") {
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
                                      data-testid = "selectBtn"
                                      onClick={e =>
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
                                      data-testid = "rejectBtn"
                                      onClick={() => setRejectBoxShow(true)}
                                    >
                                      Reject
                                    </button>
                                    {rejectBoxShow ? (
                                      <div data-testid="reject-msg-modal" className="modal RejectReasonModal ">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h1
                                                className="modal-title fs-5"
                                                id="exampleModalLabel"
                                              >
                                                Select reason to reject the
                                                candidate{" "}
                                              </h1>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => {
                                                  setRejectBoxShow(false)
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
                                                      name="rejectedMessage"
                                                      value="Lack of Technical knowledge"
                                                      onChange={e =>
                                                        setRejectReason(
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
                                                      name="rejectedMessage"
                                                      value="Lack of Communication Skills"
                                                      onChange={e =>
                                                        setRejectReason(
                                                          e.target.value
                                                        )
                                                      }
                                                    />
                                                    Lack of Communication Skills
                                                  </label>
                                                  <label>
                                                    <input
                                                      type="radio"
                                                      name="rejectedMessage"
                                                      value="Lack of grasping power"
                                                      onChange={e =>
                                                        setRejectReason(
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
                                                      onChange={e =>
                                                        setRejectReason(
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
                                                      onChange={e =>
                                                        setRejectReason(
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
                                                  data-testid = "rejectReason"
                                                  name="rejectedMessage"
                                                  onChange={e =>
                                                    setRejectReason(
                                                      e.target.value
                                                    )
                                                  }
                                                  value={rejectReason}
                                                ></textarea>
                                              </div>
                                            </div>
                                            <div className="modal-footer">
                                              <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-testid = "closeRejectModal"
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
                                                data-testid = "finalRejectButton"
                                                onClick={e =>
                                                  saveRejectCandi(
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
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )
                          }
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
