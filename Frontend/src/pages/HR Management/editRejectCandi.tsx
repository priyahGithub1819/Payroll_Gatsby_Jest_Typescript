import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import { Link } from "gatsby";
import { getOwnerData } from "../../services/apiFunction";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [candirecords, setCandirecords] = useState<any>([]);
  const [rejectCandi, setRejectCandi] = useState<any>([]);
  const [candiToEdit, setCandiToEdit] = useState<any>({
    candidateId: "",
    candidateName: "",
    eduQual: "",
    primarySkill: "",
    secondarySkill: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    candiStatus: "",
    rejectedMessage: "",
  });
  // To get all candidate from db
  const getAllCandidates = async () => {
    // console.log("hii from")
    let data = await getOwnerData();
    
    if (data.success === true) {
      data.candiInfo.map((record: any) => {
        if (record?.candiStatus === "Rejected") {
          rejectCandi.push(record);
        }
      });
      setCandirecords([...rejectCandi]);
    }
  };

  // calling function
  useEffect(() => {
    getAllCandidates();
  }, []);

  const onValueChange = (e: any) => {
    setCandiToEdit({ ...candiToEdit, [e.target.name]: e.target.value });
  };
  //On edit button click
  const onEditBtnClick = async (e: any, candiId: number) => {

    const tableRow = e.target.closest("tr");
    const rowData = tableRow.querySelectorAll(".data");
    tableRow.querySelectorAll(".data").forEach((input: any) => {
      input.style.border = "1px solid black";
    });
    tableRow.querySelector(".save-btn").style.display = "";
    rowData.forEach((element: any) => {
      element.removeAttribute("readOnly");
    });
    const currentCandi = await axios.get(`/api/v2/single-candi/${candiId}`);
    setCandiToEdit(currentCandi.data);
  };
  //On save button click
  const onSaveBtnClick = async (e: any, candiId: number, name: string) => {

    if (
      candiToEdit.candidateName === "" ||
      candiToEdit.eduQual === "" ||
      candiToEdit.primarySkill === "" ||
      candiToEdit.secondarySkill === "" ||
      candiToEdit.noticePeriod === "" ||
      candiToEdit.currentCTC === "" ||
      candiToEdit.expectedCTC === ""
    ) {
      toast.error("Field should not be empty.");
      // toast.error("Field should not be empty.", {
      //   position: toast.POSITION.TOP_CENTER,
      // })
      if (candiToEdit.candidateName === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".name").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (candiToEdit.eduQual === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".eduQual").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (candiToEdit.primarySkill === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".primarySkill").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (candiToEdit.secondarySkill === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".secondarySkill").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (candiToEdit.noticePeriod === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".noticePeriod").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (candiToEdit.currentCTC === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".currectCTC").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
      if (candiToEdit.expectedCTC === "") {
        const tableRow = e.target.closest("tr");
        tableRow.querySelectorAll(".expectedCTC").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
      }
    } else {
      await axios.put(`/api/v2/edit-rejectcandi/${candiId}`, candiToEdit);
      e.target.style.display = "none";
      await getAllCandidates();
      const tableRow = e.target.closest("tr");
      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style.border = "none";
      });
      toast.success("Information of " + name + " is updated successfully.");
    }
  };
  return (
    <Layout>
      <div className="container-fluid HrEmployeeContainer margin">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/app/hrdashboard">
              {/* <img
                src="/arrow.png"
                alt=""
                className="arrowImg"
                // style={{ width: "3%" }}
              /> */}
              <i
                className="bi bi-arrow-left-circle-fill"
                data-testid="arrowBtn"
              ></i>
            </Link>
            <div className="hrTableHeading">
              <h1 className="animate-charcter" data-testid="tableHeading">
                View and Edit Rejected Candidates
              </h1>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="empTable">
              {/* table  */}
              <table
                className="table table-bordered"
                data-testid="editRejectTable"
              >
                <thead>
                  <tr>
                    <th className="heading" role="column">
                      Sr. No.
                    </th>
                    <th className="heading" role="column">
                      Candidate ID
                    </th>
                    <th className="heading" role="column">
                      Candidate Name
                    </th>
                    <th className="heading" role="column">
                      Educational qualification
                    </th>
                    <th className="heading" role="column">
                      Primary Skills
                    </th>
                    <th className="heading" role="column">
                      Secondary Skills
                    </th>
                    <th className="heading" role="column">
                      Notice Period
                    </th>
                    <th className="heading" role="column">
                      Current CTC
                    </th>
                    <th className="heading" role="column">
                      Expected CTC
                    </th>
                    <th className="heading" role="column">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candirecords &&
                    candirecords.map((candirecord: any, Index: number) => {
                      if (candirecord.candiStatus == "Rejected") {
                        return (
                          <tr key={Index}>
                            <td>{Index + 1}</td>
                            <td>{candirecord.candidateId}</td>
                            <td>
                              <input
                                name="candidateName"
                                className="data name"
                                data-testid = "candidateName"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.candidateName}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="eduQual"
                                className="data text eduQual"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.eduQual}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="primarySkill"
                                className="data primarySkill"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.primarySkill}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="secondarySkill"
                                className="data secondarySkill"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.secondarySkill}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="noticePeriod"
                                className="data text noticePeriod"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.noticePeriod}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="currentCTC"
                                data-testid = "currentCTC"
                                className="data text currectCTC"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.currentCTC}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="expectedCTC"
                                className="data text expectedCTC"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.expectedCTC}
                                readOnly
                              />
                            </td>
                            <td>
                              {/* <button
                                onClick={e =>
                                  onEditBtnClick(e, candirecord.candidateId)
                                }
                                className="editBtn edit"
                              >
                                Edit
                              </button> */}
                              <i
                                className="bi bi-pen-fill editIcon"
                                role="editBtn"
                                onClick={(e) =>
                                  onEditBtnClick(e, candirecord.candidateId)
                                }
                              ></i>
                              {/* <button
                                className=" save-btn editBtn edit"
                                style={{ display: "none" }}
                                onClick={e =>
                                  onSaveBtnClick(e, candirecord.candidateId)
                                }
                              >
                                Save
                              </button> */}
                              <i
                                className="bi bi-check-circle-fill save-btn editIcon"
                                style={{ display: "none" }}
                                role="saveBtn"
                                onClick={(e) =>
                                  onSaveBtnClick(
                                    e,
                                    candirecord.candidateId,
                                    candirecord.candidateName
                                  )
                                }
                              ></i>
                            </td>
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
    </Layout>
  );
}
export default App;
