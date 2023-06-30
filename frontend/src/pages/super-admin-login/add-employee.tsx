import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/global.css";
import { navigate } from "gatsby";
import { createUser } from "../../services/api-function";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNewUsers, getSingleEmp } from "../../services/api-function";
import { dateFormat } from "../../services/utils";

const regAlphaSpace = /^[a-zA-Z ]*$/;
const isValidEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const validEmailType = ["uvxcel.com", "uvxcel.in"];
const nameValidation = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const Superadmin = (location: any) => {
  const [checkError, setCheckError] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState();
  const [id, setId] = useState([]);
  const getAllEmployees = async () => {
    let data = await getNewUsers();
    setId(data.data);
  };
  useEffect(() => {
    getAllEmployees();
  }, []);

  function spaceBlock() {
    let allInputs = document.querySelectorAll(
      ".preventSpaces"
    ) as NodeListOf<Element>;
    allInputs.forEach((input: any) => {
      if (input.selectionStart === 0) {
        // window.event.code.preventDefault()
      }
    });
  }

  // Function to Show hide password
  const showPasswordFunction = () => {
    var password = document.getElementById(
      "employeePassword"
    ) as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };
  // Function for employee who has single parent
  const numberOfMembers = () => {
    let singleRadio = document.getElementById("famInput1") as HTMLInputElement;
    let marriedRadio = document.getElementById("famInput") as HTMLInputElement;
    let exampleInputnumberOfMember = document.getElementById(
      "exampleInputnumberOfMember"
    ) as HTMLInputElement;
    let famInput2 = document.getElementById("famInput2") as HTMLInputElement;
    let famInput3 = document.getElementById("famInput3") as HTMLInputElement;
    if (exampleInputnumberOfMember.value === "1" && singleRadio.checked) {
      var parentT = document.getElementById("parents") as HTMLElement;
      parentT.style.display = "block";
      document.querySelectorAll(".motherDiv").forEach((item: any) => {
        item.style.display = "none";
      });
      document.querySelectorAll(".fatherDiv").forEach((item: any) => {
        item.style.display = "none";
      });
    } else if (
      exampleInputnumberOfMember.value !== "1" &&
      singleRadio.checked
    ) {
      var parentT = document.getElementById("parents") as HTMLElement;
      parentT.style.display = "none";
      document.querySelectorAll(".singleParent").forEach((parent: any) => {
        if (parent.checked) {
          parent.checked = false;
        }
      });
      document.querySelectorAll(".motherDiv").forEach((item: any) => {
        item.style.display = "block";
      });
      document.querySelectorAll(".fatherDiv").forEach((item: any) => {
        item.style.display = "";
      });
    } else if (
      exampleInputnumberOfMember.value === "1" &&
      marriedRadio.checked
    ) {
      var parentT = document.getElementById("parents") as HTMLElement;
      parentT.style.display = "none";
    } else {
      var parentT = document.getElementById("parents") as HTMLElement;
      parentT.style.display = "none";
      document.querySelectorAll(".motherDiv").forEach((item: any) => {
        item.style.display = "block";
      });
      document.querySelectorAll(".fatherDiv").forEach((item: any) => {
        item.style.display = "block";
      });
    }
    if (famInput2.checked) {
      document.querySelectorAll(".motherDiv").forEach((item: any) => {
        item.style.display = "none";
      });
      document.querySelectorAll(".fatherDiv").forEach((item: any) => {
        item.style.display = "";
      });
    } else if (famInput3.checked) {
      document.querySelectorAll(".fatherDiv").forEach((item: any) => {
        item.style.display = "none";
      });
      document.querySelectorAll(".motherDiv").forEach((item: any) => {
        item.style.display = "";
      });
    }
  };

  //  To show child details
  const ref: any = useRef(null);
  const ref1: any = useRef(null);
  const child1Click = (event: any) => {
    if (ref.current.checked) {
      var children1 = document.getElementsByClassName("child1")[0] as any;
      children1.style = "display:block";
    } else {
      children1 = document.getElementsByClassName("child1")[0];
      children1.style = "display:none";
    }
  };
  const child2Click = (event: any) => {
    if (ref1.current.checked) {
      var children2 = document.getElementsByClassName("child2")[0] as any;
      children2.style = "display:block";
    } else {
      children2 = document.getElementsByClassName("child2")[0];
      children2.style = "display:none";
    }
  };

  // on click of child information
  const ref2: any = useRef(null);
  const childInfoClick = (event: any) => {
    if (ref2.current.checked) {
      var childCheckBox = document.getElementById("childCheckBox") as any;
      childCheckBox.style = "display:block";
    } else {
      var childCheckBox = document.getElementById("childCheckBox") as any;
      childCheckBox.style = "display:none";
    }
  };

  // useState to show forms
  const [showFormNo, setShowFormNo] = useState(1);
  const [defaultValue, setDefaultValue] = useState({
    name: "",
    designation: "",
    maritalStatus: "",
  });

  // useState to set Data
  const [employeeData1, setEmployeeData1] = useState({
    role: "",
    tempPassword: "",
    empId: "",
  });

  const [employeeData2, setEmployeeData2] = useState({
    numberOfMember: "",
    parents: "",
    NameofSpouse: "",
    relationship: "",
    DOB: "",
    child1: "",
    DOB1: "",
    child1Gender: "",
    child2: "",
    DOB2: "",
    child2Gender: "",
    NameofFather: "",
    DOB3: "",
    NameofMother: "",
    DOB4: "",
  });

  // To validation for DOB
  function getAge(DOB: any) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  //1st form On change - Basic Information of Employee
  const handleFirstFormInput = async (e: any) => {
    // validations for 1st form
    const { name, value, localName } = e.target;
    if (name === "empId") {
      // to set password field
      employeeData1.tempPassword = value;
      // to set name and designation
      const data = await getSingleEmp(value);
      let nameOfEmployee =
        data.basic.name.firstName +
        " " +
        data.basic.name.middleName +
        " " +
        data.basic.name.lastName;
      let designation = data.basic.designation;
      let maritalStatus = data.basic.maritalStatus;
      setDefaultValue({ name: nameOfEmployee, designation, maritalStatus });
    }

    const inputRef = document.querySelector(
      `${localName}[name = ${name}]`
    ) as any;
    const errorRef = inputRef.closest(".mb-3").lastChild as HTMLInputElement;
    if (name === "empId") {
      if (value.length > 0 && value[0].toUpperCase() !== "U") {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "EmpId first letter must be 'U' ");
      } else if (value.length > 1 && value[1].toUpperCase() !== "I") {
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "EmpId second letter must be 'I' ");
      } else if (value.length > 2 && value[2].toUpperCase() !== "S") {
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "EmpId third letter must be 'S'");
      } else if (value.length > 3 && value[3].toUpperCase() !== "P") {
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "EmpId fourth letter must be 'P'");
      } else if (value.length > 4 && value[4].toUpperCase() !== "L") {
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "EmpId fifth letter must be 'L'");
      } else if (
        (value.length > 5 && value.length < 9) ||
        (value.length > 5 && value.length > 9)
      ) {
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "EmpId must contain  5 letter and 4 digits";
      } else if (value.length === 9 && isNaN(value.slice(5)) === true) {
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "After 5 letter enter 4 number";
      } else {
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else {
      setCheckError(false);
      inputRef.classList.remove("inputError");
      inputRef.classList.add("inputSuccess");
      errorRef.classList.remove("errorRef");
    }
    setEmployeeData1({ ...employeeData1, [name]: value });
  };

  //2nd form On change - Employee Position
  const handleSecondFormInput = (e: any) => {
    // validations for 2nd form
    const { name, value } = e.target;
    const relationship = employeeData2.relationship;
    const inputRef = document.querySelector(`[name = ${name}]`) as any;
    const errorRef = inputRef.closest(".mb-3").lastChild as HTMLInputElement;

    if (name === "NameofSpouse" && value.length > 0) {
      if (!employeeData2.numberOfMember) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter number of family member first";
      } else if (regAlphaSpace.test(value) === false) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter only alphabets.";
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "NameofFather" && value.length > 0) {
      if (!employeeData2.numberOfMember) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter number of family member first";
      } else if (regAlphaSpace.test(value) === false) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter only alphabets.";
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "NameofMother" && value.length > 0) {
      if (regAlphaSpace.test(value) === false) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter only alphabets.";
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "child1" && value.length > 0) {
      if (regAlphaSpace.test(value) === false) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter only alphabets.";
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "child2" && value.length > 0) {
      if (regAlphaSpace.test(value) === false) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter only alphabets.";
      } else {
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else {
      setCheckError(false);
      inputRef.classList.remove("inputError");
      inputRef.classList.add("inputSuccess");
      errorRef.classList.remove("errorRef");
    }
    if (name === "DOB" && relationship === "Husband") {
      const age: any = getAge(value);
      if (age < 21) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "Age must be greater than 21 years ");
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "DOB" && relationship === "Wife") {
      const age: any = getAge(value);
      if (age < 18) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "Age must be greater than 18 years ");
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "DOB3") {
      const age: any = getAge(value);
      if (age < 42) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "Please enter correct age.");
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    } else if (name === "DOB4") {
      const age: any = getAge(value);
      if (age < 42) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        return (errorRef.innerHTML = "Please enter correct age.");
      } else {
        setCheckError(false);
        inputRef.classList.remove("inputError");
        inputRef.classList.add("inputSuccess");
        errorRef.classList.remove("errorRef");
      }
    }
    if (name === "DOB1") {
      if (!employeeData2.child1) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter name of child 1 first";
      }
    }
    if (name === "DOB2") {
      if (!employeeData2.child1) {
        setCheckError(true);
        inputRef.classList.add("inputError");
        inputRef.classList.remove("inputSuccess");
        errorRef.classList.add("errorRef");
        errorRef.innerHTML = "Please enter name of child 2 first";
      }
    }

    setEmployeeData2({ ...employeeData2, [name]: value });
  };

  // on first form submit
  const handleFirstForm = (e: any) => {
    e.preventDefault();
    var form1ErrorMsg = document.getElementById(
      "form1ErrorMsg"
    ) as HTMLInputElement;
    if (
      !employeeData1.empId ||
      !employeeData1.role ||
      !employeeData1.tempPassword
    ) {
      form1ErrorMsg.style.color = "red";
      return (form1ErrorMsg.innerHTML = "Please fill the form first");
    } else if (employeeData1.empId !== employeeData1.tempPassword) {
      form1ErrorMsg.style.color = "red";
      return (form1ErrorMsg.innerHTML = "You have entered wrong password");
    } else if (!checkError) {
      form1ErrorMsg.style.display = "none";
      setShowFormNo(2);
    }
  };

  // on second form submit
  const handleSecondForm = async (e: any) => {
    e.preventDefault();
    var form2ErrorMsg = document.getElementById(
      "form2ErrorMsg"
    ) as HTMLInputElement;
    if (!employeeData2.numberOfMember) {
      form2ErrorMsg.style.color = "red";
      return (form2ErrorMsg.innerHTML = "Please fill the form first");
    }

    // validation for status single
    if (
      defaultValue.maritalStatus === "SINGLE" &&
      (!employeeData2.NameofFather ||
        !employeeData2.DOB3 ||
        !employeeData2.NameofMother ||
        !employeeData2.DOB4)
    ) {
      form2ErrorMsg.style.color = "red";
      return (form2ErrorMsg.innerHTML = "Please fill the form first");
    }

    // validation for status married
    if (
      defaultValue.maritalStatus === "MARRIED" &&
      (!employeeData2.NameofSpouse ||
        !employeeData2.relationship ||
        !employeeData2.DOB)
    ) {
      form2ErrorMsg.style.color = "red";

      return (form2ErrorMsg.innerHTML = "Please fill the form first");
    } else if (
      defaultValue.maritalStatus === "MARRIED" &&
      ref.current.checked &&
      (!employeeData2.child1 ||
        !employeeData2.child1Gender ||
        !employeeData2.DOB1)
    ) {
      form2ErrorMsg.style.color = "red";
      return (form2ErrorMsg.innerHTML = "Please fill the form first");
    } else if (
      defaultValue.maritalStatus === "MARRIED" &&
      ref1.current.checked &&
      (!employeeData2.child2 ||
        !employeeData2.child2Gender ||
        !employeeData2.DOB2)
    ) {
      form2ErrorMsg.style.color = "red";
      return (form2ErrorMsg.innerHTML = "Please fill the form first");
    } else {
      const allUserData = {
        ...employeeData1,
        ...employeeData2,
      };

      const { success, message, error, payrollUser } = await createUser(
        allUserData
      );
      if (success === false) {
        return window.alert(error);
      } else if (!checkError) {
        toast.success(message);
      }
    }
    setDefaultValue({
      name: "",
      designation: "",
      maritalStatus: "",
    });
    setEmployeeData1({
      role: "",
      tempPassword: "",
      empId: "",
    });
    setEmployeeData2({
      numberOfMember: "",
      parents: "",
      NameofSpouse: "",
      relationship: "",
      DOB: "",
      child1: "",
      DOB1: "",
      child1Gender: "",
      child2: "",
      DOB2: "",
      child2Gender: "",
      NameofFather: "",
      DOB3: "",
      NameofMother: "",
      DOB4: "",
    });
    navigate("/super-admin-login/add-employee/");
    setShowFormNo(1);
  };

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9 margin wrapper">
            <div className="superAdminFormContainer">
              <div className="row ownerColumn justify-content-center">
                <div className="col-xl-9 col-lg-11 col-md-10">
                  {/* First form */}
                  {showFormNo === 1 ? (
                    <div className="formDiv form-1">
                      <h2 className="Detail" data-testid="empAccount">
                        Create Employee Account
                      </h2>
                      <hr></hr>
                      <div id="showErrorMsg" className="formErrorMsg"></div>
                      <form>
                        {}
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputempID"
                            className="form-label"
                          >
                            Employee ID
                          </label>
                          <select
                            id="empId"
                            className="form-select"
                            name="empId"
                            value={employeeData1.empId}
                            onChange={handleFirstFormInput}
                          >
                            <option selected disabled value="">
                              Select Employee Id
                            </option>
                            {id &&
                              id.map((id: any, index: number) => (
                                <option key={index} value={id.empId}>
                                  {id.empId}
                                </option>
                              ))}
                          </select>
                          <p></p>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputempID"
                            className="form-label"
                          >
                            Name of Employee
                          </label>
                          <div className="">
                            <input
                              type="text"
                              className="form-control inputFont"
                              name="nameOfEmployee"
                              value={defaultValue.name}
                              onChange={handleFirstFormInput}
                              id="nameOfEmployee"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputempID"
                            className="form-label"
                          >
                            Designation
                          </label>
                          <div className="">
                            <input
                              type="text"
                              className="form-control inputFont"
                              name="designation"
                              value={defaultValue.designation}
                              onChange={handleFirstFormInput}
                              id="designation"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="Role" className="form-label">
                            Role
                          </label>
                          <select
                            className="form-select "
                            required
                            name="role"
                            value={employeeData1.role}
                            onChange={handleFirstFormInput}
                          >
                            <option selected disabled value="">
                              {" "}
                              Role
                            </option>
                            <option value="super-admin-login">Super Admin</option>
                            <option value="hrAdmin">Hr Admin</option>
                            <option value="technicalEmployee">
                              Technical Employee
                            </option>
                            <option value="accountEmployee">
                              Account Employee
                            </option>
                            <option value="marketingEmployee">
                              Marketing Employee
                            </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputempID"
                            className="form-label"
                          >
                            Password
                          </label>
                          <div className="">
                            <input
                              type="password"
                              className="form-control inputFont"
                              name="tempPassword"
                              value={employeeData1.tempPassword}
                              onChange={handleFirstFormInput}
                              id="employeePassword"
                            />

                            <h6 className="text-muted mt-1 text-start">
                              Hint : Password must be same as Employee Id
                            </h6>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          onChange={showPasswordFunction}
                          id="showPass"
                        />{" "}
                        <label
                          htmlFor="exampleInputempID"
                          className="form-label"
                        >
                          Show Password
                        </label>
                        <div id="form1ErrorMsg" className="formErrorMsg"></div>
                        <div className="container">
                          <div className="formButtonDiv row justify-content-center">
                            <div className="col-lg-3 col-sm-3 col-md-3">
                              {/* For moving to 2nd form */}
                              <button
                                type="submit"
                                className="btn btn-primary nextBtn"
                                onClick={handleFirstForm}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* Second form */}
                  {showFormNo === 2 ? (
                    <div className="formDiv form-2">
                      <h2 className="Detail"> Family Information </h2>
                      <hr></hr>
                      <form>
                        <div className="Formcontainer">
                          <div className="row">
                            <div className="mb-3 famDiv col-sm">
                              <label
                                htmlFor="exampleInputnoOfMember"
                                className="form-label"
                              >
                                Number of Family Members
                              </label>
                              <input
                                type="number"
                                className="form-control inputFont"
                                id="exampleInputnumberOfMember"
                                name="numberOfMember"
                                value={employeeData2.numberOfMember}
                                onChange={handleSecondFormInput}
                              />
                            </div>
                            <div className="mb-3 famDiv col-sm">
                              <label
                                htmlFor="exampleInputGender"
                                className="form-label"
                              >
                                Status
                              </label>
                              <div className="famRadioBtn">
                                <input
                                  type="radio"
                                  name="status"
                                  value="married"
                                  id="famInput"
                                  defaultChecked={
                                    defaultValue.maritalStatus === "MARRIED"
                                      ? true
                                      : false
                                  }
                                />
                                <label htmlFor="married">Married</label>
                                <input
                                  type="radio"
                                  name="status"
                                  value="single"
                                  id="famInput1"
                                  defaultChecked={
                                    defaultValue.maritalStatus === "SINGLE"
                                      ? true
                                      : false
                                  }
                                />
                                <label htmlFor="single">Single</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="mb-3 famDiv"
                              id="parents"
                              style={{ display: "none" }}
                            >
                              <label htmlFor="singleParent">
                                Please select father or mother
                              </label>
                              <div className="famRadioBtn">
                                <input
                                  type="radio"
                                  name="parents"
                                  className="singleParent"
                                  value="father"
                                  id="famInput2"
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="singlefather">Father</label>
                                <input
                                  type="radio"
                                  className="singleParent"
                                  name="parents"
                                  value="mother"
                                  id="famInput3"
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="singleMother">Mother</label>
                              </div>
                            </div>
                          </div>
                          {defaultValue &&
                          defaultValue.maritalStatus === "MARRIED" ? (
                            <div id="spouse">
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="mb-3 famDiv">
                                    <label
                                      htmlFor="exampleInputOccupation"
                                      className="form-label"
                                    >
                                      Name of Spouse
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control inputFont"
                                      id="exampleInputNameofSpouse"
                                      name="NameofSpouse"
                                      onKeyDown={spaceBlock}
                                      value={employeeData2.NameofSpouse}
                                      onChange={handleSecondFormInput}
                                    />

                                    <p></p>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3 famDiv">
                                    <label
                                      htmlFor="exampleInputnumberOfPassword"
                                      className="form-label"
                                    >
                                      Relationship
                                    </label>
                                    <select
                                      className="relationClass"
                                      required
                                      value={employeeData2.relationship}
                                      name="relationship"
                                      onChange={handleSecondFormInput}
                                    >
                                      <option hidden value="">
                                        {" "}
                                        Relationship
                                      </option>
                                      <option value="Husband">Husband </option>
                                      <option value="Wife">Wife</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3 famDiv">
                                    <label
                                      htmlFor="exampleInputDOB"
                                      className="form-label"
                                    >
                                      Date Of Birth
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control inputFont"
                                      id="exampleInputDOB1"
                                      name="DOB"
                                      value={employeeData2.DOB}
                                      onChange={handleSecondFormInput}
                                    />
                                    <p></p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="mb-3 famDiv">
                                  <input
                                    type="checkbox"
                                    className="childInfoClick"
                                    id="famInput1"
                                    name="childInfoClick"
                                    value="childInfoClick"
                                    ref={ref2}
                                    onClick={childInfoClick}
                                    onChange={handleSecondFormInput}
                                  />
                                  <label htmlFor="childInfo">
                                    Child Information
                                  </label>
                                </div>
                                <div className="mb-3 famDiv">
                                  <div
                                    className="childCheckBox"
                                    id="childCheckBox"
                                  >
                                    <input
                                      type="checkbox"
                                      className="child1Box"
                                      id="famInput1"
                                      name="childCheck1"
                                      value="child1"
                                      ref={ref}
                                      onClick={child1Click}
                                      onChange={handleSecondFormInput}
                                    />
                                    <label htmlFor="child1">Child 1</label>
                                    <input
                                      type="checkbox"
                                      id="famInput"
                                      className="child2Box"
                                      name="childCheck2"
                                      value="child2"
                                      ref={ref1}
                                      onClick={child2Click}
                                      onChange={handleSecondFormInput}
                                    />
                                    <label htmlFor="child2">Child 2</label>
                                  </div>
                                </div>

                                <div
                                  id="children"
                                  className="row justify-content-center childrenInfo"
                                >
                                  <div
                                    className="familyInfo child1"
                                    id="child1"
                                  >
                                    <div className="row">
                                      <div></div>
                                      <div className="mb-3 famDiv col-md-4">
                                        <label
                                          htmlFor="exampleInput Child1"
                                          className="form-label"
                                        >
                                          Name of Child 1
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control inputFont"
                                          id="exampleInputChild1"
                                          name="child1"
                                          onKeyDown={spaceBlock}
                                          value={employeeData2.child1}
                                          onChange={handleSecondFormInput}
                                        />
                                        <p></p>
                                      </div>

                                      <div className="mb-3 famDiv col-md-4">
                                        <label
                                          htmlFor="exampleInputGender"
                                          className="form-label"
                                        >
                                          Gender
                                        </label>
                                        <div className="famRadioBtn">
                                          <input
                                            type="radio"
                                            name="child1Gender"
                                            value="Male"
                                            id="famInput"
                                            onChange={handleSecondFormInput}
                                          />
                                          <label htmlFor="married">Male</label>
                                          <input
                                            type="radio"
                                            name="child1Gender"
                                            value="Female"
                                            id="famInput1"
                                            onChange={handleSecondFormInput}
                                          />
                                          <label htmlFor="single">Female</label>
                                        </div>
                                      </div>
                                      <div className="mb-3 famDiv col-md-4">
                                        <label
                                          htmlFor="exampleInputDOB"
                                          className="form-label"
                                        >
                                          Date Of Birth
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control inputFont"
                                          id="exampleInputDOB1"
                                          name="DOB1"
                                          value={employeeData2.DOB1}
                                          onChange={handleSecondFormInput}
                                          max={dateFormat(
                                            "dateInput",
                                            new Date()
                                          )}
                                        />
                                        <p></p>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="familyInfo child2 "
                                    id="child2"
                                  >
                                    <div className="row">
                                      <div className="mb-3 famDiv col-sm">
                                        <label
                                          htmlFor="exampleInputChild2"
                                          className="form-label"
                                        >
                                          Name of Child 2
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control inputFont"
                                          id="exampleInputChild2"
                                          name="child2"
                                          onKeyDown={spaceBlock}
                                          value={employeeData2.child2}
                                          onChange={handleSecondFormInput}
                                        />
                                        <p></p>
                                      </div>
                                      <div className="mb-3 famDiv col-sm">
                                        <label
                                          htmlFor="exampleInputGender"
                                          className="form-label"
                                        >
                                          Gender
                                        </label>
                                        <div className="famRadioBtn">
                                          <input
                                            type="radio"
                                            name="child2Gender"
                                            value="Male"
                                            id="famInput"
                                            onChange={handleSecondFormInput}
                                          />
                                          <label htmlFor="married">Male</label>
                                          <input
                                            type="radio"
                                            name="child2Gender"
                                            value="Female"
                                            id="famInput1"
                                            onChange={handleSecondFormInput}
                                          />
                                          <label htmlFor="single">Female</label>
                                        </div>
                                      </div>
                                      <div className="mb-3 famDiv col-sm">
                                        <label
                                          htmlFor="exampleInputDOB"
                                          className="form-label"
                                        >
                                          Date Of Birth
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control inputFont"
                                          id="exampleInputDOB2"
                                          name="DOB2"
                                          value={employeeData2.DOB2}
                                          onChange={handleSecondFormInput}
                                          max={dateFormat(
                                            "dateInput",
                                            new Date()
                                          )}
                                        />
                                        <p></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div id="newDiv">
                              <div className="row" id="parent">
                                <div className="mb-3 famDiv col-md-6 fatherDiv">
                                  <label
                                    htmlFor="exampleInputOccupation"
                                    className="form-label"
                                  >
                                    Name of Father
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control inputFont"
                                    id="exampleInputNameofFather"
                                    name="NameofFather"
                                    onKeyDown={spaceBlock}
                                    value={employeeData2.NameofFather}
                                    onChange={handleSecondFormInput}
                                  />
                                  <p></p>
                                </div>
                                <div className="mb-3 famDiv col-md-6 fatherDiv">
                                  <label
                                    htmlFor="exampleInputDOB"
                                    className="form-label"
                                  >
                                    Date Of Birth
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control inputFont"
                                    id="exampleInputDOB1"
                                    name="DOB3"
                                    value={employeeData2.DOB3}
                                    onChange={handleSecondFormInput}
                                  />
                                  <p></p>
                                </div>
                              </div>
                              <div className="row" id="parent">
                                <div className="mb-3 famDiv col-md-6 motherDiv">
                                  <label
                                    htmlFor="exampleInputOccupation"
                                    className="form-label"
                                  >
                                    Name of Mother
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control inputFont"
                                    id="exampleInputNameofMother"
                                    name="NameofMother"
                                    onKeyDown={spaceBlock}
                                    value={employeeData2.NameofMother}
                                    onChange={handleSecondFormInput}
                                  />
                                  <p></p>
                                </div>
                                <div className="mb-3 famDiv col-md-6 motherDiv">
                                  <label
                                    htmlFor="exampleInputDOB"
                                    className="form-label"
                                  >
                                    Date Of Birth
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control inputFont"
                                    id="exampleInputDOB1"
                                    name="DOB4"
                                    value={employeeData2.DOB4}
                                    onChange={handleSecondFormInput}
                                  />
                                  <p></p>
                                </div>
                              </div>
                            </div>
                          )}
                          <br />
                          <div className="container">
                            <div
                              id="form2ErrorMsg"
                              className="formErrorMsg"
                            ></div>
                            <div className="formButtonDiv row justify-content-center">
                              <div className="col-lg-3 col-sm-3 col-md-3">
                                {/* For moving to 1st form */}
                                <button
                                  className="btn btn-primary nextBtn "
                                  onClick={() => setShowFormNo(1)}
                                >
                                  Previous
                                </button>
                              </div>
                              <div className="col-lg-3 col-sm-3  col-md-3">
                                {/* To submit the form */}
                                <button
                                  type="submit"
                                  className="btn btn-primary nextBtn"
                                  onClick={handleSecondForm}
                                >
                                  Finish
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Superadmin;
