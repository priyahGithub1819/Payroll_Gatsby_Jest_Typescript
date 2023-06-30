import React from "react";
import * as ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, getByLabelText, queryByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../test_Util/custom-render-function";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../../pages/super-admin-login/view-all-employee";
// import Modal from "../../pages/super-admin-login/view-all-employee";
import {
  getByTestId,
  waitFor,
  screen,
  getAllByTestId,
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import Modal from "react-modal";

const data = {
  success: true,
  employeeData: [
    {
      basic: {
        name: {
          firstName: "Priya",
          middleName: "Prajyot",
          lastName: "Hatipkar",
        },

        mobile: {
          countryCode: "+91",
          number: 9860234523,
        },
        selectCount: 0,
        employeeId: "UISPL0004",
        gender: "Female",
        dateOfJoining:
          "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
        maritalStatus: "SINGLE",
        probationPeriod: 3,
        confirmationDate: "2022-05-12T18:30:00.000Z",
        dateOfBirth: "2000-11-18T00:00:00.000Z",
        employmentStatus: "active",
        employmentType: "FTE",
        designation: "JUNIOR SOFTWARE ENGINEER",
        department: "SOFTWARE DEVELOPMENT",
        workMode: "WFH",
        workLocation: "Pune",
        selfDeclaration: {
          idProofs: {
            bloodGroup: "B-Positive",
            aadhaarCard: {
              aadhaarNumber: 673465324246,
              verifyStatus: "Pending",
              uploadedAt: "2023-04-13T13:30:19.872Z",
            },
            panCard: {
              panCardNumber: "AYRPP0909Q",
              verifyStatus: "Pending",
              uploadedAt: "2023-04-13T13:30:19.872Z",
            },
            passport: {
              verifyStatus: "Pending",
              uploadedAt: "2023-04-13T13:30:19.872Z",
            },
          },
          academics: [],
          previousCompany: [],
        },
        email: "praptig@uvxcel.com",
      },
      payrollData: {
        updatedby: {
          empId: "UISPL0005",
          date: "2023-04-13T14:23:06.648Z",
        },
        createdby: {
          empId: "UISPL0001",
          date: "2023-04-13T13:49:48.759Z",
        },
        _id: "6438042c1ed10be60f9d952a",
        empId: "UISPL0004",
        __v: 0,
        DOB3: "1966-06-06",
        DOB4: "1970-07-08",
        NameofFather: "Anil Gomekar",
        NameofMother: "Savita Gomekar",
        numberOfMember: 2,
        role: "technicalEmployee",
        empStatus: "Confirmed",
      },
    },
    {
      basic: {
        name: {
          firstName: "Pratik ",
          middleName: "Dilip",
          lastName: "Raut",
        },
        mobile: {
          countryCode: "+91",
          number: 9867456786,
        },
        selectCount: 0,
        employeeId: "UISPL0006",
        gender: "Male",
        dateOfJoining:
          "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
        maritalStatus: "SINGLE",
        probationPeriod: 3,
        confirmationDate: "2023-07-12T18:30:00.000Z",
        dateOfBirth: "1998-12-28T00:00:00.000Z",
        employmentStatus: "active",
        employmentType: "FTE",
        designation: "JUNIOR ACCOUNTANT ",
        department: "ACCOUNT",
        workMode: "WFH",
        workLocation: "Pune",
        selfDeclaration: {
          idProofs: {
            bloodGroup: "B-Positive",
            aadhaarCard: {
              aadhaarNumber: 234356787898,
              verifyStatus: "Pending",
              uploadedAt: "2023-04-14T09:15:59.565Z",
            },
            panCard: {
              panCardNumber: "AYRPT5567Y",
              verifyStatus: "Pending",
              uploadedAt: "2023-04-14T09:15:59.565Z",
            },
            passport: {
              verifyStatus: "Pending",
              uploadedAt: "2023-04-14T09:15:59.565Z",
            },
          },
          academics: [],
          previousCompany: [],
        },
        email: "pratikr@uvxcel.com",
      },
      payrollData: {
        empStatus: "Pending",
        _id: "643919e12a78b7517d0510db",
        empId: "UISPL0006",
        DOB3: "1968-12-09",
        DOB4: "1970-03-08",
        NameofFather: "Dilip Raut",
        NameofMother: "ABC",
        numberOfMember: 3,
        role: "technicalEmployee",
      },
    },
  ],
};

const user = {
  success: true,
  empInfo: [
    {
      updatedby: {
        empId: "UISPL0002",
        date: "2023-04-19T09:56:58.878Z",
      },
      createdby: {
        empId: "UISPL0002",
        date: "2023-04-13T12:48:11.559Z",
      },
      _id: "64380b8d6a184d03adc85af0",
      empId: "UISPL0004",
      __v: 0,
      aadharNumber: 673465324246,
      accountNumber: 23459178357,
      address: "Amravati",
      bankName: "Kotak Mahindra",
      dateofRegistration: "2023-04-03",
      empDob: "2001-04-16",
      ifscCode: "bkhg1234567",
      name: "Prapti Gomekar",
      panNumber: "AYRPP0909Q",
      pfStatus: "Active",
      pfUanNumber: 98767891656,
    },
  ],
};

// For testing creating fake api to return fake data for testing purpose
//Here creating server
const server = setupServer();

const customeServerCall = () => {
  return server.use(
    rest.get("/api/v2/payroll/user/all", (req, res, ctx) => {
      return res(ctx.json(data));
    })
  );
};

const getAllPfEmpData = () => {
  return server.use(
    rest.get("/api/v2/pfEmp/data", (req, res, ctx) => {
      return res(ctx.json(user));
    })
  );
};

describe("View all emp.test.tsx", () => {
  //Run sever
  beforeAll(() => {
    server.listen();
  });
  //Reset server
  afterEach(() => server.resetHandlers());
  //Stop server
  afterAll(() => server.close());
  //First test case
  test("should render component and checking test inside it", async () => {
    //Calling custome server
    customeServerCall();

    // singlePfServerCall();
    server.use(
      rest.get("/api/v2/me", (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            employee: {
              basic: {
                name: {
                  firstName: "Prapti",
                  middleName: "Anil",
                  lastName: "Gomekar",
                },
                mobile: {
                  countryCode: "+91",
                  number: 9860234523,
                },
                selectCount: 0,
                employeeId: "UISPL0004",
                gender: "Female",
                dateOfJoining:
                  "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
                maritalStatus: "SINGLE",
                probationPeriod: 3,
                confirmationDate: "2022-05-12T18:30:00.000Z",
                dateOfBirth: "2000-11-18T00:00:00.000Z",
                employmentStatus: "active",
                employmentType: "FTE",
                designation: "JUNIOR SOFTWARE ENGINEER",
                department: "SOFTWARE DEVELOPMENT",
                workMode: "WFH",
                workLocation: "Pune",
                selfDeclaration: {
                  idProofs: {
                    bloodGroup: "B-Positive",
                    aadhaarCard: {
                      aadhaarNumber: 673465324246,
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                    panCard: {
                      panCardNumber: "AYRPP0909Q",
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                    passport: {
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                  },
                  academics: [],
                  previousCompany: [],
                },
                email: "praptig@uvxcel.com",
              },
              payrollData: {
                updatedby: {
                  empId: "UISPL0005",
                  date: "2023-04-13T14:23:06.648Z",
                },
                createdby: {
                  empId: "UISPL0001",
                  date: "2023-04-13T13:49:48.759Z",
                },
                _id: "6438042c1ed10be60f9d952a",
                empId: "UISPL0004",
                __v: 0,
                DOB3: "1966-06-06",
                DOB4: "1970-07-08",
                NameofFather: "Anil Gomekar",
                NameofMother: "Savita Gomekar",
                numberOfMember: 2,
                role: "technicalEmployee",
                empStatus: "Confirmed",
                password:
                  "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
              },
            },
          })
        );
      })
    );

    getAllPfEmpData();
    // redering component here
    const { debug, findByText, queryAllByTestId, getAllByTestId, getByTestId,container } =
      render(<App />, {
        route: "/super-admin-login/view-all-employee",
      });
    //checking that text is present or not in modal
    await findByText("Priya Prajyot Hatipkar");
    const testModal = getAllByTestId("modalbtn5")[0] as HTMLElement;
    fireEvent.click(testModal);
    await findByText("Close");
    debug();
  });

  test("Verify that the modal is initially closed", () => {
    //Calling custome server
    customeServerCall();

    // singlePfServerCall();
    server.use(
      rest.get("/api/v2/me", (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            employee: {
              basic: {
                name: {
                  firstName: "Prapti",
                  middleName: "Anil",
                  lastName: "Gomekar",
                },
                mobile: {
                  countryCode: "+91",
                  number: 9860234523,
                },
                selectCount: 0,
                employeeId: "UISPL0004",
                gender: "Female",
                dateOfJoining:
                  "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
                maritalStatus: "SINGLE",
                probationPeriod: 3,
                confirmationDate: "2022-05-12T18:30:00.000Z",
                dateOfBirth: "2000-11-18T00:00:00.000Z",
                employmentStatus: "active",
                employmentType: "FTE",
                designation: "JUNIOR SOFTWARE ENGINEER",
                department: "SOFTWARE DEVELOPMENT",
                workMode: "WFH",
                workLocation: "Pune",
                selfDeclaration: {
                  idProofs: {
                    bloodGroup: "B-Positive",
                    aadhaarCard: {
                      aadhaarNumber: 673465324246,
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                    panCard: {
                      panCardNumber: "AYRPP0909Q",
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                    passport: {
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                  },
                  academics: [],
                  previousCompany: [],
                },
                email: "praptig@uvxcel.com",
              },
              payrollData: {
                updatedby: {
                  empId: "UISPL0005",
                  date: "2023-04-13T14:23:06.648Z",
                },
                createdby: {
                  empId: "UISPL0001",
                  date: "2023-04-13T13:49:48.759Z",
                },
                _id: "6438042c1ed10be60f9d952a",
                empId: "UISPL0004",
                __v: 0,
                DOB3: "1966-06-06",
                DOB4: "1970-07-08",
                NameofFather: "Anil Gomekar",
                NameofMother: "Savita Gomekar",
                numberOfMember: 2,
                role: "technicalEmployee",
                empStatus: "Confirmed",
                password:
                  "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
              },
            },
          })
        );
      })
    );

    getAllPfEmpData();
    // Render the modal component
    const {
      debug,
      findByText,
      queryAllByTestId,
      getAllByTestId,
      container,
      queryByTestId,
    } = render(<App />, {
      route: "/super-admin-login/view-all-employee",
    });

    // Verify that the modal is initially closed
    expect(queryByTestId("myModal")).toBeNull();
  });

  test("Modal should open when isOpen is true", async () => {
    customeServerCall();

    // singlePfServerCall();
    server.use(
      rest.get("/api/v2/me", (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            employee: {
              basic: {
                name: {
                  firstName: "Prapti",
                  middleName: "Anil",
                  lastName: "Gomekar",
                },
                mobile: {
                  countryCode: "+91",
                  number: 9860234523,
                },
                selectCount: 0,
                employeeId: "UISPL0004",
                gender: "Female",
                dateOfJoining:
                  "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
                maritalStatus: "SINGLE",
                probationPeriod: 3,
                confirmationDate: "2022-05-12T18:30:00.000Z",
                dateOfBirth: "2000-11-18T00:00:00.000Z",
                employmentStatus: "active",
                employmentType: "FTE",
                designation: "JUNIOR SOFTWARE ENGINEER",
                department: "SOFTWARE DEVELOPMENT",
                workMode: "WFH",
                workLocation: "Pune",
                selfDeclaration: {
                  idProofs: {
                    bloodGroup: "B-Positive",
                    aadhaarCard: {
                      aadhaarNumber: 673465324246,
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                    panCard: {
                      panCardNumber: "AYRPP0909Q",
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                    passport: {
                      verifyStatus: "Pending",
                      uploadedAt: "2023-04-13T13:30:19.872Z",
                    },
                  },
                  academics: [],
                  previousCompany: [],
                },
                email: "praptig@uvxcel.com",
              },
              payrollData: {
                updatedby: {
                  empId: "UISPL0005",
                  date: "2023-04-13T14:23:06.648Z",
                },
                createdby: {
                  empId: "UISPL0001",
                  date: "2023-04-13T13:49:48.759Z",
                },
                _id: "6438042c1ed10be60f9d952a",
                empId: "UISPL0004",
                __v: 0,
                DOB3: "1966-06-06",
                DOB4: "1970-07-08",
                NameofFather: "Anil Gomekar",
                NameofMother: "Savita Gomekar",
                numberOfMember: 2,
                role: "technicalEmployee",
                empStatus: "Confirmed",
                password:
                  "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
              },
            },
          })
        );
      })
    );

    getAllPfEmpData();
    // Render the modal component with isOpen set to true
    const {
      debug,
      findByText,
      queryAllByTestId,
      getAllByTestId,
      container,
      queryByTestId,
    } = render(<App />, {
      route: "/super-admin-login/view-all-employee",
    });
    const { getByTestId } = render(<Modal isOpen={true} />);
    const testModal = getByTestId("modalbtn5");
    fireEvent.click(testModal);
    await findByText("Close");
    debug();
    // Verify that the modal is initially open
    // const modal = getByTestId('myModal');
    // expect(modal).toBeInTheDocument();
  });

  test("Modal should close when Close button is clicked", () => {
    // Render the modal component with isOpen set to true
    const { getByText, queryByTestId } = render(<Modal isOpen={true} />);

    // Get the Close button element
    const closeButton = getByText("Close");

    // Fire a click event on the Close button
    fireEvent.click(closeButton);

    // Verify that the modal is now closed
    const modal = queryByTestId("myModal");
    expect(modal).toBeNull();
  });

  test("Modal should display the provided heading", () => {
    // Render the modal component with a heading
    const headingText = "Test Heading";
    const { getByText } = render(
      <Modal isOpen={true}>
        <h1 className="heading text-center pt-4" id="heading">
          {headingText}
        </h1>
      </Modal>
    );

    // Verify that the heading is rendered correctly
    const heading = getByText(headingText);
    expect(heading).toBeInTheDocument();
  });

  test("Modal should display the provided content", () => {
    // Render the modal component with content
    const contentText = "Test Content";
    const { getByText } = render(
      <Modal isOpen={true}>
        <div className="familyInformation" id="common-modal">
          {contentText}
        </div>
      </Modal>
    );

    // Verify that the content is rendered correctly
    const content = getByText(contentText);
    expect(content).toBeInTheDocument();
  });
});
