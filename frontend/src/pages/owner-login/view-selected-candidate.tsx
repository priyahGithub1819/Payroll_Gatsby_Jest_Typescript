import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { getOwnerData, editCandiStatus } from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CandidateRecord {
  candidateId: string;
  candidateName: string;
  eduQual: string;
  primarySkill: string;
  secondarySkill: string;
  noticePeriod: string;
  currentCTC: string;
  expectedCTC: string;
  candiStatus: string;
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

function App() {
  const [candirecords, setCandirecords] = useState<CandidateRecord[]>([]);
  const [rejectBoxShow, setRejectBoxShow] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<RejectedReason>(
    rejectedReasonInitialValue
  );

  const getAllCandidates = async () => {
    const selectedCandidates: CandidateRecord[] = [];
    const data = await getOwnerData();

    if (data.success === true) {
      setCandirecords(data.candiInfo);
    }

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
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
