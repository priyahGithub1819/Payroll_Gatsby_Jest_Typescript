
import React, { useState, useContext, useEffect } from "react"
import Layout from "./Layout";
import { UserData } from "./Layout"
import { navigate } from "gatsby"
import { getLogin } from "../services/apiFunction";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import { PageProps } from "gatsby";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"
import { Link, RouteComponentProps } from "@reach/router"

interface IUserData {
  username: string,
  password: string
}

const Login = (props: RouteComponentProps) => {
  // show password
  const showPasswordFunction = () => {
    var password = document.getElementById("employeePassword") as HTMLInputElement | null;
    if (password !== null) {
      if (password.type === "password") {
        password.type = "text"
      } else {
        password.type = "password"
      }
    }
  }

  const [userData, setUserData] = useState<IUserData>
    ({
      username: '',
      password: '',
    });
    
  const { user } = useContext(UserData)
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }
// const [error, setError] = useState("")
// const [showUser, setShowUser] = useState(false)

  // on submit button function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("click!!!!!");
    //setShowUser(false)
    event.preventDefault();
    if (!userData.username || !userData.password) {
      // return window.alert("Please fill the login detail first")
      return toast.error("Please fill the login detail first")

    } else {
      const { success, role, error, message } = await getLogin(userData)
      if (success === false) {
       // setError("Invalid Employee ID or Password")
        toast.error("Invalid Employee ID or Password");
        console.log("Invalid Employee ID or Password");
        
        let myContainer = document.getElementById('errorMsg') as HTMLElement;
        myContainer.innerHTML = "Invalid Employee ID or Password";

        //document.getElementById('errorMsg').value = 'hello '
 
      } else if (success === true && message) {
        navigate("/createPassword")
      } else if (success === true && !message) {
        if (role === "superAdmin") {
          navigate("/app/superadmin")
        } else if (role === "hrAdmin") {
          navigate("/app/hrdashboard")
        } else if (role === "owner") {
          console.log("here")
          navigate("/app/owner")
        } else {
          navigate("/app/profile1")
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      if (user.success === true) {
        if (user.role === "admin") {
          navigate("/app/profile")
        } else if (user.role === "superAdmin") {
          navigate("/app/superadmin")
        } else if (user.role === "user") {
          navigate("/app/profile1")
        }
      }
    }
  }, [user])
  return (

    <div className="container login-wrapper margin">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-7 col-md-9">
          <form className="card loginCard mb-3" onSubmit={handleSubmit} data-test="login-form">
            <div className=" row justify-content-center">
            <h1>User Login</h1> 
              <hr />
              <div className="col-11">
                <div className="form-group mb-3">
                  <label className="fw-bold" aria-labelledby="Employee Id">
                    Employee Id
                  </label>
                  <input
                  data-test="username"
                    id="exampleInputUserID"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="form-control mt-2 inputFont"
                    value={userData.username}
                    onChange={handleUpdate}
                    title="Input"
                  />
                </div>
              </div>
              <div className="col-11">
                <div className="form-group mb-4">
                  <label className="fw-bold" data-testid="pwd">
                    Password
                  </label>
                  <input
                  data-test="password"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control mt-2 inputFont"
                    value={userData.password}
                    onChange={handleUpdate}
                    id="employeePassword"
                    title="Input"
                  />
                </div>
              </div>
              <div className="col-11">
              <div id="errorMsg" data-testid="errorMsg" style={{color:"red"}}></div>
                <div className="form-group form-check mb-4">
                  <input
                    onChange={showPasswordFunction}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    title="Input"
                  />
                  <label role="checkbox" aria-checked="true" className="form-check-label">
                    Show Password
                  </label>
                  
                </div>
              </div>
            </div>
            <button data-test="submit-button" type="submit" className="btn btn-primary loginBtn m-auto " data-testid="myLoginBtn" title="Log In">
             Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default Login;
