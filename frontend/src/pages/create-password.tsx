import React, { useState } from "react"
import { navigate } from "gatsby"
//import { getLogin } from "../services/apiFunction"
import Layout from "../components/Layout"
//import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { createNewPassword } from "../services/api-function"

const CreatePassword = () => {
  const [newPassword, setNewPassword] = useState({
    changePassword: "",
    confirmPassword: "",
  })

  const handlePasswordInput = event => {
    const { name, value, localName } = event.target
    setNewPassword({ ...newPassword, [name]: value })

    const inputRef = document.querySelector(`${localName}[name = ${name}]`)
    const errorRef = inputRef.closest(".mb-3").lastChild
    const isWhitespace = /^(?=.*\s)/
    const isContainsUppercase = /^(?=.*[A-Z])/
    const isContainsLowercase = /^(?=.*[a-z])/
    const isContainsNumber = /^(?=.*[0-9])/
    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/
    const isValidLength = /^.{10,16}$/

    if (isWhitespace.test(value)) {
      inputRef.classList.add("inputError")
      inputRef.classList.remove("inputSuccess")
      errorRef.classList.add("errorRef")
      return (errorRef.innerHTML = "Password must not contain Whitespaces.")
    } else {
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
      errorRef.style.display = "none"
    }
    if (!isContainsUppercase.test(value)) {
      inputRef.classList.add("inputError")
      inputRef.classList.remove("inputSuccess")
      errorRef.classList.add("errorRef")
      return (errorRef.innerHTML =
        "Password must have at least one Uppercase Character.")
    } else {
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
      errorRef.style.display = "none"
    }
    if (!isContainsLowercase.test(value)) {
      inputRef.classList.add("inputError")
      inputRef.classList.remove("inputSuccess")
      errorRef.classList.add("errorRef")
      return (errorRef.innerHTML =
        "Password must have at least one Lowercase Character.")
    } else {
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
      errorRef.style.display = "none"
    }
    if (!isContainsNumber.test(value)) {
      inputRef.classList.add("inputError")
      inputRef.classList.remove("inputSuccess")
      errorRef.classList.add("errorRef")
      return (errorRef.innerHTML = "Password must contain at least one Digit.")
    } else {
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
      errorRef.style.display = "none"
    }
    if (!isContainsSymbol.test(value)) {
      inputRef.classList.add("inputError")
      inputRef.classList.remove("inputSuccess")
      errorRef.classList.add("errorRef")
      return (errorRef.innerHTML =
        "Password must contain at least one Special Symbol.")
    } else {
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
      errorRef.style.display = "none"
    }
    if (!isValidLength.test(value)) {
      inputRef.classList.add("inputError")
      inputRef.classList.remove("inputSuccess")
      errorRef.classList.add("errorRef")
      return (errorRef.innerHTML = "Password must be 10-16 Characters Long.")
    } else {
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
      errorRef.style.display = "none"
    }
  }

  const handlePasswordInput1 = event => {
    const { name, value } = event.target
    setNewPassword({ ...newPassword, [name]: value })
  }
  const updatePassword = async event => {
    event.preventDefault()
    if (!newPassword.changePassword || !newPassword.confirmPassword) {
      return window.alert("please fill the form first")
    } else if (newPassword.changePassword !== newPassword.confirmPassword) {
      return window.alert("password is not matched")
    }
    const password = newPassword.changePassword
    const { success, error } = await createNewPassword({ password })
    if (success === false) {
      return window.alert(error)
    } else {
      window.alert("Your password is successfully updated.")
      return navigate("/app/login")
    }
  }
  //  show password
  const showPasswordFunction = () => {
    var password = document.getElementById("employeePassword")
    if (password.type === "password") {
      password.type = "text"
    } else {
      password.type = "password"
    }
  }

  return (
    <Layout>
      <div className="container login-wrapper margin">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-7 col-md-9">
            <form class="login_form loginCard card" method="post">
              <div className="row justify-content-center">
                <h1>Change Password</h1>
                <hr />
                <div className="col-11">
                  <div class="font mb-3 form-group">
                    <label className="fw-bold" for="exampleInputUserID">
                      Change Password
                    </label>
                    <input
                      type="password"
                      name="changePassword"
                      className="loginInput form-control mt-2 inputFont"
                      placeholder="Enter New Password"
                      onChange={handlePasswordInput}
                      value={newPassword.changePassword}
                    />
                    <div></div>
                  </div>
                </div>
                <div className="col-11">
                  <div class="font font2 form-group mb-4">
                    <label className="fw-bold" for="employeePassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="loginInput form-control mt-2 inputFont"
                      placeholder="Enter Confirm Password"
                      id="employeePassword"
                      onChange={handlePasswordInput1}
                      value={newPassword.confirmPassword}
                    />
                  </div>
                </div>
                <div className="col-11">
                  <div className="form-group form-check mb-4">
                    <input
                      type="checkbox"
                      onChange={showPasswordFunction}
                      className="showPass form-check-input inputFont"
                    />{" "}
                    <label className="form-check-label" for="exampleCheck1">
                      Show Password
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={updatePassword}
                className="btn btn-primary loginBtn m-auto"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CreatePassword
