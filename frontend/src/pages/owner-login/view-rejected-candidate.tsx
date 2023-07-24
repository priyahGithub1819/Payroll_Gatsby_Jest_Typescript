import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { getOwnerData } from "../../services/api-function";
import Sidebar from "../../components/Owners-sidebar";
import Modal from "react-modal";
import { Link } from "gatsby";

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
  rejectedMessage: string;
}

function App() {
  const [candirecords, setCandirecords] = useState<CandidateRecord[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // To get all Candidate data
  const getAllCandidates = async () => {
    let rejectCandi: CandidateRecord[] = [];
    let data = await getOwnerData();

    if (data.success === true) {
      setCandirecords(data.candiInfo);
    }

    data.candiInfo.map((d: CandidateRecord) => {
      if (d.candiStatus === "Rejected") {
        rejectCandi.push(d);
      }
    });
    setCandirecords(rejectCandi);
  };

  const onButtonClick = (rejectedMessage: string) => {
    setModalIsOpen(true);
    setTimeout(() => {
      var commonModal = document.getElementById("common-modal") as HTMLElement;
      commonModal.innerHTML = `<p>${rejectedMessage}</p>`;
      var heading = document.getElementById("heading") as HTMLElement;
      heading.innerText = "Candidate's rejection details";
    }, 200);
  };

  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-end">
              <div className="margin col-xl-11 col-lg-10 col-md-10 col-sm-6 wrapper">
                <h2 className="bulkText text-center">
                  List of Rejected Candidates
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
                        <th className="heading">Reason of Rejection</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candirecords &&
                        candirecords.map((candirecord: CandidateRecord, Index: number) => {
                          if (candirecord.candiStatus === "Rejected") {
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
                                  <button
                                    id="modalbtn"
                                    data-testid="seeDetailsBtn"
                                    onClick={() =>
                                      onButtonClick(candirecord.rejectedMessage)
                                    }
                                  >
                                    See details
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
                <Modal ariaHideApp={false} isOpen={modalIsOpen}>
                  <h1
                    data-testid="reject-Message-Model"
                    className="RejectMheading text-center pt-4"
                    id="heading"
                  ></h1>
                  <div
                    className="rejectInfoModal"
                    data-testid="reject-message-div"
                    id="common-modal"
                  ></div>
                  <div className="modalBtnDiv">
                    <button
                      className="modalbtn"
                      data-testid="closeRejectModal"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
