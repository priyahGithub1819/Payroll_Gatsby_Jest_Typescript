import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import { Link } from "gatsby";
import { getOwnerData } from "../../services/api-function";
import { toast } from "react-toastify";

interface CandidateRecord {
  candidateId: number;
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
  // All use state
  const [candirecords, setCandirecords] = useState<CandidateRecord[]>([]);
  const [rejectCandi, setRejectCandi] = useState<CandidateRecord[]>([]);
  const [oldData, setOldata] = useState<CandidateRecord[]>([]);
  const [candiToEdit, setCandiToEdit] = useState<CandidateRecord>({
    candidateId: 0,
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
  const ctc = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  const decimalRegex = /^\d+(\.\d{0,2})?$/;
  const education = /^[a-zA-Z\s\-.,()']{2,50}$/;
  const skills = /r"^[^!@#$%^&*()_+{}\[\]:;\"'<>.?~`|\\/-]*([, ]{1}[^!@#$%^&*()_+{}\[\]:;\"'<>.?~`|\\/-]*)*$"/;

  // To get all candidate from db
  const getAllCandidates = async () => {
    let data = await getOwnerData();

    if (data.success === true) {
      data.candiInfo.forEach((record: CandidateRecord) => {
        if (record?.candiStatus === "Rejected") {
          rejectCandi.push(record);
        }
      });
      setCandirecords([...rejectCandi]);
      setOldata([...rejectCandi]);
    }
  };

  // calling function
  useEffect(() => {
    getAllCandidates();
  }, []);

  // onChange function
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandiToEdit({ ...candiToEdit, [e.target.name]: e.target.value });
  };

  //On edit button click
  //On edit button click
  const onEditBtnClick = async (
    e: React.MouseEvent<HTMLElement>,
    candiId: number
  ) => {
    const tableRow = e.currentTarget.closest("tr");
    if (tableRow) {
      const rowData = tableRow.querySelectorAll(".data");
      tableRow.querySelectorAll(".data").forEach((input: any) => {
        input.style.border = "1px solid black";
      });
      const saveBtn = tableRow.querySelector(".save-btn") as HTMLElement;
      if (saveBtn) {
        saveBtn.style.display = "";
      }
      rowData.forEach((element: any) => {
        element.removeAttribute("readOnly");
      });
      const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
     // const saveButton = tableRow?.querySelector(".save-btn") as HTMLElement;
      const editBtn = tableRow?.querySelector(".editIcon") as HTMLElement;
      cancelBtn.style.display = "";
      //saveButton.style.display = "";
      editBtn.style.display = "none";
      const currentCandi = await axios.get(`/api/v2/single-candi/${candiId}`);
      setCandiToEdit(currentCandi.data);
    }
  };

  const onCancleButtonClick = async (
    e: React.MouseEvent<HTMLElement>,
    candiId: number
  ) => {
    const target = e.target as HTMLElement;
    const tableRow = target.closest("tr");
    const rowData = tableRow?.querySelectorAll(".data");
    const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
      const saveButton = tableRow?.querySelector(".save-btn") as HTMLElement;
      const editBtn = tableRow?.querySelector(".editIcon") as HTMLElement;
      cancelBtn.style.display = "none";
      saveButton.style.display = "none";
      editBtn.style.display = "";

      setCandirecords([...oldData]);
      console.log(rowData);
      console.log(candiId);
      
      console.log(oldData[0].candidateId);
      if(candiId && oldData){
       let filterData = oldData.filter((r)=> r.candidateId === candiId);
       console.log(filterData);
       
        //console.log(oldData);
      }
      
      if (tableRow) {
        tableRow.querySelectorAll(".data").forEach((input: any) => {
          input.style.border = "none";
          input.readOnly = true;
        });
      }
  };

  //On save button click
  const onSaveBtnClick = async (
    e: React.MouseEvent<HTMLElement>,
    candiId: number,
    name: string
  ) => {
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
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        if (candiToEdit.candidateName === "") {
          tableRow.querySelectorAll(".name").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (candiToEdit.eduQual === "") {
          tableRow.querySelectorAll(".eduQual").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (candiToEdit.primarySkill === "") {
          tableRow.querySelectorAll(".primarySkill").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (candiToEdit.secondarySkill === "") {
          tableRow.querySelectorAll(".secondarySkill").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (candiToEdit.noticePeriod === "") {
          tableRow.querySelectorAll(".noticePeriod").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (candiToEdit.currentCTC === "") {
          tableRow.querySelectorAll(".currectCTC").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
        if (candiToEdit.expectedCTC === "") {
          tableRow.querySelectorAll(".expectedCTC").forEach((input: any) => {
            input.style.border = "2px solid red";
          });
        }
      }
    }
    // else if (!skills.test(candiToEdit.primarySkill)) {
    //   const tableRow = (e.target as HTMLElement).closest("tr");
    //   if (tableRow) {
    //     tableRow.querySelectorAll(".primarySkill").forEach((input: any) => {
    //       input.style.border = "2px solid red";
    //     });
    //     toast.error("Please enter only characters.");
    //   }
    // }
    // else if (!skills.test(candiToEdit.secondarySkill)) {
    //   const tableRow = (e.target as HTMLElement).closest("tr");
    //   if (tableRow) {
    //     tableRow.querySelectorAll(".secondarySkill").forEach((input: any) => {
    //       input.style.border = "2px solid red";
    //     });
    //     toast.error("Please enter only characters.");
    //   }
    // }
     else if (!education.test(candiToEdit.eduQual)) {
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".eduQual").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
        toast.error("Please enter only characters");
      }
    } else if (!education.test(candiToEdit.candidateName)) {
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".name").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
        toast.error("Please enter only characters");
      }
    } else if (
      !ctc.test(candiToEdit.expectedCTC) ||
      !decimalRegex.test(candiToEdit.expectedCTC)
    ) {
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".expectedCTC").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
        toast.error("Please fill the appropriate value.");
      }
    } else if (
      !ctc.test(candiToEdit.currentCTC) ||
      !decimalRegex.test(candiToEdit.currentCTC)
    ) {
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".currectCTC").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
        toast.error("Please fill the appropriate value.");
      }
    } else if (Number(candiToEdit.currentCTC) < 1) {
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".currectCTC").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
        toast.error("Field should not be zero.");
      }
    } else if (Number(candiToEdit.expectedCTC) < 1) {
      const tableRow = (e.target as HTMLElement).closest("tr");
      if (tableRow) {
        tableRow.querySelectorAll(".expectedCTC").forEach((input: any) => {
          input.style.border = "2px solid red";
        });
        toast.error("Field should not be zero.");
      }
    } else {
      await axios.put(`/api/v2/edit-rejectcandi/${candiId}`, candiToEdit);
      (e.target as HTMLElement).style.display = "none";
      await getAllCandidates();
      const tableRow = (e.target as HTMLElement).closest("tr");
      const cancelBtn = tableRow?.querySelector(".cancel-btn") as HTMLElement;
      const editBtn = tableRow?.querySelector(".editIcon") as HTMLElement;
      if (tableRow) {
        tableRow.querySelectorAll(".data").forEach((input: any) => {
          input.style.border = "none";
          input.readOnly = true;
        });
        cancelBtn.style.display = "none";
        editBtn.style.display = "";
      }
      toast.success("Information of " + name + " is updated successfully.");
    }
  };

  return (
    <Layout>
      <div className="container-fluid HrEmployeeContainer margin">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/app/hr-dashboard">
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
                    candirecords.map(
                      (candirecord: CandidateRecord, Index: number) => {
                        if (candirecord.candiStatus === "Rejected") {
                          return (
                            <tr key={Index}>
                              <td>{Index + 1}</td>
                              <td>{candirecord.candidateId}</td>
                              <td>
                                <input
                                  name="candidateName"
                                  className="data name"
                                  data-testid="candidateName"
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
                                  data-testid="currentCTC"
                                  className="data text currectCTC"
                                  onChange={onValueChange}
                                  type="number"
                                  defaultValue={candirecord.currentCTC}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  name="expectedCTC"
                                  className="data text expectedCTC"
                                  onChange={onValueChange}
                                  type="number"
                                  defaultValue={candirecord.expectedCTC}
                                  readOnly
                                />
                              </td>
                              <td>
                                <i
                                  className="bi bi-pen-fill editIcon"
                                  role="editBtn"
                                  onClick={(e) =>
                                    onEditBtnClick(e, candirecord.candidateId)
                                  }
                                ></i>
                                <i
                                  className="bi bi-x-square editIcon cancel-btn"
                                  role="editBtn"
                                  style={{ display: "none" }}
                                  onClick={(e) =>
                                    onCancleButtonClick(
                                      e,
                                      candirecord.candidateId
                                    )
                                  }
                                ></i>
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
                      }
                    )}
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
