import React, { useEffect, useState, useContext } from "react"
// import "bootstrap/dist/css/bootstrap.min.css"
import { loadUser } from "../../services/apiFunction"
import Layout from "../../components/Layout"

const Profile = () => {
  const [user, setUser] = useState<any>({success:false})
  // const getUser = async () => {
  //   const data = await loadUser()
  //   console.log("data")
  //   console.log(data)
  //   setUser(data)
  // }
  useEffect(() => {
    loadUser().then((data)=>setUser(data)).catch(()=>alert("refresh the page"))
  }, [])
  return (
    <>
      {user.success ? (
        <Layout>
          <div className="hrContainer margin">
            <div className="row justify-content-center">
              <div className="hrAdminBtnDiv col-lg-10 ">
                <a
                  href="/app/hrdashboard" role="button" data-testid="hrdashboardBtn"
                  className="btn btn-outline-secondary hrAdminBtn mr-3"
                >
                  My Dashboard
                </a>
                <a href="#access" data-testid="allAccessBtn" role="button" className="btn btn-outline-secondary hrAdminBtn" >
                  View All Access
                </a>
              </div>

              <div className="card shadow-lg p-3 rounded m-3 col-xl-5 col-lg-5 col-md-9">
                <div className="card-body HrProfileBody">
                  <h2 data-testid="profileHeading"> Hr Admin Profile</h2>
                  <hr />
                  <img
                    className="card-img-bottom"
                    src="/Profile.png"
                    alt="Card image"
                  />
                  <div className="card-title">
                    <p>Name : {user.employee.basic.name.firstName}</p>
                    <p>Employee ID : {user.employee.payrollData.empId}</p>
                    <p>Contact No : {user.employee.basic.mobile.number}</p>
                    <p>Designation : {user.employee.basic.designation}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6 ">
                {" "}
                <img src="/pointing.jpg" alt="" className="w-100 mt-3" />
              </div>
            </div>

            <div className="row justify-content-around" id="access">
              <div className="col-lg-11 col-md-9"><h2 className="text-center bulkText">Hr Access</h2></div>
              <div className="col-lg-3 col-md-9 card accessDiv">
                <h3 className="text-center">View Access</h3>
                <hr />
                <img
                  className="w-15 mx-auto"
                  src="/view&edit.png"
                  alt="Card image"
                />
                <h5 className="accessH5">
                  <li>View Employees List</li>
                </h5>
                <h5 className="accessH5">
                  <li>View and Edit Rejected candidate List</li>
                </h5>
                <p>
                  Hr Admin can view a list of all employees on the payroll and
                  can edit information of an employees whenever it requires. Hr
                  Admin can view and edit list of rejected candidates.
                </p>
              </div>

              <div className=" col-lg-3 col-md-9 card accessDiv">
                <h3 className="text-center">Upload Access</h3>
                <hr />
                <img
                  className="w-15 mx-auto"
                  src="/uploadCsv.png"
                  alt="Card image"
                />
                <h5 className="text-center">
                  <li>Upload Candidates List</li>
                </h5>
                <p>
                  {" "}
                  Hr Admin can upload the list of shortlisted candidates list
                  for further process.{" "}
                </p>
              </div>

              <div className=" col-lg-3 col-md-9 card accessDiv">
                <h3 className="text-center viewDiv">PF management</h3>
                <hr />
                <img className="w-15 mx-auto" src="/pf.jpg" alt="Card image" />
                <h5 className="text-center .accessH5">
                  <li>PF management</li>
                </h5>
                <p> HR Admin can manage employees PF record </p>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        ""
      )}
    </>
  )
}
export default Profile
