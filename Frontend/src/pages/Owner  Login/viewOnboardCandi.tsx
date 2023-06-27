import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { getOwnerData } from "../../services/apiFunction";
import SideBar from "../../components/OwnersSidebar";
import { Link } from "gatsby";

function App() {
  const [candirecords, setCandirecords] = useState<any>([]);
  const [rejectBoxShow, setRejectBoxShow] = useState(false);

  //To get All candidates data
  const getAllCandidates = async () => {
    let onbordCandi: any = [];
    let data = await getOwnerData();

    if (data.success === true) {
      setCandirecords(data.candiInfo);
    }

    data.candiInfo.map((d: any) => {
      if (d.candiStatus === "Onboard") {
        onbordCandi.push(d);
      }
    });
    setCandirecords(onbordCandi);
  };
  useEffect(() => {
    getAllCandidates();
  }, []);

  //To display list of Candidates to be onboard
  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-end">
              <div className="margin col-xl-11 col-lg-10 col-md-10 col-sm-6 wrapper">
                <h2 className="bulkText text-center mb-4">
                  List of Candidates to be Onboarded
                </h2>
                <div className="empTable">
                  <table className="table table-bordered">
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
                      </tr>
                    </thead>
                    <tbody>
                      {candirecords &&
                        candirecords.map((candirecord: any, Index: number) => {
                          if (candirecord.candiStatus == "Onboard") {
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
                              </tr>
                            );
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
  );
}

export default App;
