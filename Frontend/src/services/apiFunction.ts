import axios from "axios"
interface loginData {
  username: string,
  password: string
}
interface IConfig {
  headers: {
    "Content-Type": string
  }
}

// login function
export const getLogin = async (userData: any) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post("/api/v2/login", userData, config)
    return data
  } catch (error:any) {
    return error.response?.data
  }
}
// change password

export const createNewPassword = async (userData: string) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }

    const { data } = await axios.put(
      "/api/v2/payroll/user/password/new",
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

// check user valid our not
export const loadUser = async () => {
  try {
    const { data } = await axios.get("/api/v2/me")

    return data
  } catch (error:any) {
    return error.response?.data
  }
}
//logout function
export const logoutUser = async () => {
  try {
    const { data } = await axios.get("/api/v2/logout")
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

// user attendance data
export const getUserData = async (month: number, year: number) => {
  let api
  if (month !== undefined) {
    api = `/api/v2/user/data?month=${month}&year=${year}`
  } else {
    api = `/api/v2/user/data`
  }
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//create user {super admin}
export const createUser = async (userData: any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/user/create",
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

// add many user {super admin}
export const createManyUser = async (userData: any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/many-user/create",
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//all user data (super Admin)
export const allUserData = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/all")
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//Create CTC(Owner login)
export const createCtcData = async (ctcdata:any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/ctc/create",
      ctcdata,
      config
    )

    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//Confirm emp

export const createConfirmEmp = async (confirmempdata:any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/confirmCandidate/create",
      confirmempdata,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//To show the candidates list to the Owner on Candidate selection page
export const getOwnerData = async () => {
  try {
    const { data } = await axios.get("/api/v2/owner/data")
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//user ctc (employee)
export const getMyCTC = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/ctc")
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//Upload Candidate Information and Save to database(hr Admin login)
export const uploadCandiInfo = async (candiInfo:any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/candidate/all",
      candiInfo,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//get allctc (owner)
export const getAllCTC = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/all/ctc")
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

// Edit employee information
export const editEmpStatusPayroll = async (id:string, userData:any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.put(
      `/api/v2/edit-emp/payroll/${id}`,
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response
  }
}
// Edit employee information
export const editEmpStatusErp = async (id:string, userData:any) => {
  try {
    const config:IConfig = {headers: { "Content-Type": "application/json" } }
    const { data } = await axios.put(
      `/api/v2/edit-emp/erp/${id}`,
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response
  }
}

// Edit candidate status
export const editCandiStatus = async (id:string, userData:any) => {
  try {
        const config:IConfig = {headers: { "Content-Type": "application/json" } }

    const { data } = await axios.put(
      `/api/v2/edit-candi/${id}`,
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

// Edit candidate status
export const editRejectCandiInfo = async (id:string, userData:any) => {
  try {
        const config:IConfig = {headers: { "Content-Type": "application/json" } }

    const { data } = await axios.put(
      `/api/v2/edit-rejectcandi/${id}`,
      userData,
      config
    )
    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//To show the employee list
export const getAllPfEmpData = async () => {
  try {
    const { data } = await axios.get("/api/v2/pfEmp/data")
    return data
  } catch (error:any) {
    return error.response?.data
  }  

}

//Upload employee Information and Save to database(hr Admin login)
export const uploadPfEmpInfo = async (empInfo:any) => {
  try {
        const config:IConfig = {headers: { "Content-Type": "application/json" } }

    const { data } = await axios.post(
      "/api/v2/payroll/pfEmployee/all",
      empInfo,
      config
    )

    return data
  } catch (error:any) {
    return error.response?.data
  }
}

//get all employee ID from ERP

export const getNewUsers = async () => {
  try {
    const data = await axios.get("/api/v2/payroll/user/new")
    return data.data
  } catch (error:any) {
    return error
  }
}
// to get name , designation of employee according to empId
export const getSingleEmp = async (id:string) => {
  try {
    const data = await axios.get(`/api/v2/single-emp/${id}`)
    return data.data
  } catch (error:any) {
    return error
  }
}


// to get a PF Information of a single employee
export const getSinglePfData = async (id:string) => {
  try {
    const data = await axios.get(`/api/v2/single-pfemp/${id}`)
    return data.data
  }
  catch (err) {
    return err
  }
}

// edit single ctc data
export const editSingleCtc = async (empId:string, editData:any) => {
  try {
    const data = await axios.put(`/api/v2/edit-ctc/${empId}`, editData)
    return data

  }
  catch (err) {
    return err
  }
}

