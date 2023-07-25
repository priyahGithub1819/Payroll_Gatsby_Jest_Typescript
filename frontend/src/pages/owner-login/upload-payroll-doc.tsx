import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Owners-sidebar";
import { toast } from "react-toastify";

interface Document {
  originalname: string;
  mimetype: string;
  filename: string;
}

const UploadDocument = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUploadError = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        toast.error("File upload failed. Please try again later.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from the server.");
      } else {
        console.error("Error:", error.message);
        toast.error("Error occurred while uploading the file.");
      }
    } else {
      console.error("Unknown Error:", error);
      toast.error("Unknown error occurred. Please try again later.");
    }
  };

  const onFileUpload = async () => {
    window.alert("checking upload");
    if (uploadFile) {
      const formData = new FormData();
      console.log(formData);
      formData.append("myFile", uploadFile);
      console.log(formData.get("myFile"));
      try {
        const response: any = await axios.post(
          "/api/v2/document/upload",
          formData
        );
        toast.success("File uploaded successfully");
      } catch (error: any) {
        handleUploadError(error);
      }
    }
  };

  // const onFileUpload = async () => {
  //   try {
  //     if (uploadFile) {
  //       window.alert("upload")
  //       const formData = new FormData();
  //       formData.append("myFile", uploadFile);
  //       const { data } = await axios.post("api/v2/document/upload", formData);
  //       toast.success("File uploaded successfully");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       // Axios error: handle network or server errors
  //       const axiosError = error as AxiosError;
  //       if (axiosError.response) {
  //         // Error with response from server
  //         console.error(
  //           `Upload failed with status code ${axiosError.response.status}`
  //         );
  //         // Handle specific error status codes 
  //         // For example:
  //         if (axiosError.response.status === 404) {
  //           // File not found on the server
  //           toast.error("File not found on the server");
  //         } else {
  //           // Other server error
  //           toast.error("File upload failed");
  //         }
  //       } else {
  //         // Error with request or no response received
  //         console.error("Error with request or no response received");
  //         // Handle other errors if needed
  //       }
  //     } else {
  //       // Non-Axios error: handle other types of errors
  //       console.error("File upload failed");
  //       // Handle other errors if needed
  //     }
  //   }
  // };
  
  // On clear button click
  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.reload();
  };

  const [docs, setDocs] = useState<Document[]>([]);

  const getAllDocuments = async () => {
    const { data } = await axios.get("/api/v2/document/all");
    if (data.success === false) {
      window.alert(data.error);
    } else if (data.success === true) {
      setDocs(data.docs);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  const seeDocBtnClick = () => {
    const docTable = document.getElementById("documentTable") as HTMLElement;
    docTable.style.display = "block";
    getAllDocuments();
  };

  const closeBtnClick = () => {
    const docTable = document.getElementById("documentTable") as HTMLElement;
    docTable.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="OwnerContainer wrapper">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center ">
              <div className="margin col-lg-9  col-lg-8 col-md-6 col-sm-6 ">
                <h2 className="text-center bulkText">
                  Upload & View Payroll Documents
                </h2>
                <div className="card shadow-lg p-4">
                  <h4>Upload Payroll documents here</h4>
                  <input
                    type="file"
                    id="bulk-file"
                    name="file"
                    className="form-control inputFont"
                    onChange={onFileChange}
                  />
                  <h6 className="text-muted mt-3">
                    Hint : You can upload all types of files here.
                  </h6>
                </div>
                {uploadFile && (
                  <div id="FileDetails">
                    <br />
                    <h2>File Details:</h2>
                    <p>File Name: {uploadFile.name} </p>
                    <p>File Type: {uploadFile.type}</p>
                    <p>
                      {/* Last Modified: {uploadFile.lastModified.toDateString()} */}
                      Last Modified: {new Date(uploadFile.lastModified).toLocaleDateString()}
                    </p>
                    <button
                      className="btn btn-success mt-3"
                      onClick={onFileUpload}
                    >
                      Upload
                    </button>
                    <button
                      className="btn btn-danger mt-3"
                      id="save-clear-btns"
                      onClick={onClearBtnClick}
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="text-center">
                  <button className="btn seeDocBtn" onClick={seeDocBtnClick}>
                    See all Payroll Document here
                  </button>
                </div>
              </div>

              <div
                className="col-lg-9 col-md-8  col-sm-9"
                id="documentTable"
                style={{ display: "none" }}
              >
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeBtnClick}
                ></button>
                <h2 className=" text-center mb-4">List of Documents</h2>
                <div className="empTable">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of File</th>
                        <th className="heading">Type of File</th>
                        <th className="heading">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((doc, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{doc.originalname}</td>
                          <td>{doc.mimetype}</td>
                          <td>
                            <button className="docDownloadBtn btn btn-light">
                              <a href={`/document/${doc.filename}`} download>
                                Download
                              </a>
                            </button>
                          </td>
                        </tr>
                      ))}
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
};

export default UploadDocument;
