
import React, { useState, useContext, useEffect } from "react"
import { UserData } from "./Layout"
import { navigate } from "gatsby"
import { getLogin } from "../services/api-function";
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

  // on submit button function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData.username || !userData.password) {
      return toast.warn("Please fill up the login details first")
    } else {
      const { success, role, error, message } = await getLogin(userData)
      if (success === false) {
        toast.warn("Invalid Employee ID or Password");
      } else if (success === true && message) {
        navigate("/create-password")
      } else if (success === true && !message) {
        if (role === "superAdmin") {
          navigate("/app/super-admin-dashboard")
        } else if (role === "hrAdmin") {
          navigate("/app/hr-dashboard")
        } else if (role === "owner") {
          navigate("/app/owner")
        } else {
          navigate("/app/employee-profile")
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      if (user.success === true) {
        if (user.role === "admin") {
          navigate("/app/profile")
        } else if (user.role === "super-admin-login") {
          navigate("/app/superadmin")
        } else if (user.role === "user") {
          navigate("/app/employee-profile")
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
