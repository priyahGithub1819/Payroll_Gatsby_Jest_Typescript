import axios from "axios";


interface loginData {
  username: string;
  password: string;
}
interface IConfig {
  headers: {
    "Content-Type": string;
  };
}
interface  MyObject  {
  empId: string | null;
  role: string | null;
  numberOfMember: string | null;
  status: string | null;
  NameofSpouse: string | null;
  relationship : string | null;
  DOB : string | null;
  child1 : string | null;
  child1Gender: string | null;
  DOB1 : string | null;
  child2 :string | null;
  child2Gender: string | null;
  DOB2 : string | null;
  NameofFather: string | null;
  DOB3 : string | null;
  NameofMother : string | null;
  DOB4 : string | null;
  tempPassword: string | null;
}
interface EmployeeData {
  basic: {
    confirmationDate: string;
    dateOfBirth: string;
    dateOfJoining: string;
    department: string;
    designation: string;
    email: string;
    employeeId: string;
    employmentStatus: string;
    employmentType: string;
    gender: string;
    maritalStatus: string;
    countryCode: string;
    number: number;
    probationPeriod: number;
    selectCount: number;
    workLocation: string;
    workMode: string;
    mobile: {
      countryCode: string;
      number: number;
    };
    name: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
    selfDeclaration: {
      academics: {};
      idProofs: {
        panCard: {
          panCardNumber: string;
        };
      };
      previousCompany: {};
    };
  };
  payrollData: {
    NameofSpouse: string;
    relationship: string;
    DOB: string;
    child1: string;
    child1Gender: string;
    DOB1: string;
    child2: string;
    child2Gender: string;
    DOB2: string;
    DOB3: string;
    DOB4: string;
    NameofFather: string;
    NameofMother: string;
    empId: string;
    empStatus: string;
    numberOfMember: number;
    password: string;
    role: string;
    parents: string;
  };
  empPaymentData: {
    aadharNumber: number;
    accountNumber: number;
    address: string;
    bankName: string;
    dateofRegistration: string;
    empDob: string;
    empId: string;
    ifscCode: string;
    name: string;
    panNumber: string;
    pfStatus: string;
    pfUanNumber: string;
    paymentType: string;
  };
  CTC?: number,
  designation: string, 
}

interface Candidate {
  candidateId: string;
  candidateName: string;
  eduQual: string;
  primarySkill: string;
  secondarySkill: string;
  noticePeriod: string;
  currentCTC: string;
  expectedCTC: string;
  candiStatus: string;
}

interface allUserData {
  numberOfMember: string;
  parents: string;
  NameofSpouse: string;
  relationship: string;
  DOB: string;
  child1: string;
  DOB1: string;
  child1Gender: string;
  child2: string;
  DOB2: string;
  child2Gender: string;
  empId: string;
}

interface Employee {
  Emp_Id: string;
  Name: string;
  CTC: string;
}

interface CandidateStatus {
  candiStatus: string; 
  rejectedMessage?: string;
}

// interface CandidateStatus {
// candiStatus: string
// candidateId: string
// candidateName: string
// createdAt: string
// currentCTC: number
// eduQual: string
// expectedCTC: string
// noticePeriod: string
// primarySkill: string
// secondarySkill: string
// id: string
// rejectedMessage: string
// }

// interface RejectedMsg extend CandidateStatus {
// candidateName: string
// id: string
// rejectedMessage: string
// }

interface EmployeeCtc {
  CTC: number | undefined;
}

// login function
export const getLogin = async (userData: loginData) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v2/login", userData, config);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// change password
export const createNewPassword = async (userData: string) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v2/payroll/user/password/new",
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// check user valid our not
export const loadUser = async () => {
  try {
    const { data } = await axios.get("/api/v2/me");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//logout function
export const logoutUser = async () => {
  try {
    const { data } = await axios.get("/api/v2/logout");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// user attendance data
export const getUserData = async (month: number, year: number) => {
  let api;
  if (month !== undefined) {
    api = `/api/v2/user/data?month=${month}&year=${year}`;
  } else {
    api = `/api/v2/user/data`;
  }
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//create user {super admin}
export const createUser = async (userData: allUserData) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/payroll/user/create",
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// add many user {super admin}
export const createManyUser = async (userData: MyObject[]) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/payroll/many-user/create",
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//all user data (super Admin)
export const allUserData = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/all");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//Create CTC(Owner login)
export const createCtcData = async (ctcdata: Employee[]) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/payroll/ctc/create",
      ctcdata,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//Confirm emp
export const createConfirmEmp = async (confirmempdata: string) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/payroll/confirmCandidate/create",
      confirmempdata,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//To show the candidates list to the Owner on Candidate selection page
export const getOwnerData = async () => {
  try {
    const { data } = await axios.get("/api/v2/owner/data");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//user ctc (employee)
export const getMyCTC = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/ctc");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//Upload Candidate Information and Save to database(hr Admin login)
export const uploadCandiInfo = async (candiInfo: Candidate[]) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/payroll/candidate/all",
      candiInfo,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//get allctc (owner)
export const getAllCTC = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/all/ctc");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// Edit employee information
export const editEmpStatusPayroll = async (id: string, userData: string[]) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v2/edit-emp/payroll/${id}`,
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response;
  }
};
// Edit employee information

export const editEmpStatusErp = async (id: string, userData: EmployeeData) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v2/edit-emp/erp/${id}`,
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response;
  }
};

// Edit candidate status
export const editCandiStatus = async (id: string, userData: CandidateStatus) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v2/edit-candi/${id}`,
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// Edit candidate status
export const editRejectCandiInfo = async (id: string, userData: string) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v2/edit-rejectcandi/${id}`,
      userData,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//To show the employee list
export const getAllPfEmpData = async () => {
  try {
    const { data } = await axios.get("/api/v2/pfEmp/data");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//Upload employee Information and Save to database(hr Admin login)
export const uploadPfEmpInfo = async (empInfo: string) => {
  try {
    const config: IConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/payroll/pfEmployee/all",
      empInfo,
      config
    );
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

//get all employee ID from ERP
export const getNewUsers = async () => {
  try {
    const data = await axios.get("/api/v2/payroll/user/new");
    return data.data;
  } catch (error: any) {
    return error;
  }
};

// to get name , designation of employee according to empId
export const getSingleEmp = async (id: string) => {
  try {
    const data = await axios.get(`/api/v2/single-emp/${id}`);
    return data.data;
  } catch (error: any) {
    return error;
  }
};

// to get a PF Information of a single employee
export const getSinglePfData = async (id: string) => {
  try {
    const data = await axios.get(`/api/v2/single-pfemp/${id}`);
    return data.data;
  } catch (err) {
    return err;
  }
};

// edit single ctc data
export const editSingleCtc = async (empId: string, editData: EmployeeCtc) => {
  try {
    const data = await axios.put(`/api/v2/edit-ctc/${empId}`, editData);
    return data;
  } catch (err) {
    return err;
  }
};
