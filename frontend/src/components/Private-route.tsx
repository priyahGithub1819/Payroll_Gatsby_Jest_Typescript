import React, { useContext, useState, useEffect } from "react";
import { navigate } from "gatsby";
import { UserData } from "../components/Layout";
import { RouteComponentProps } from "@reach/router";

interface LoadUser {
  employee: {
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
  };
  success: boolean;
}

interface PrivateRoutPropsType extends RouteComponentProps {
  isValidRole: string[];
  path: string;
  component: React.ComponentType<RouteComponentProps>;
}

const PrivateRoute: React.FC<PrivateRoutPropsType> = ({
  isValidRole,
  component: Component,
  ...rest
}: PrivateRoutPropsType): React.ReactElement | null => {
  const [loadUser, setLoadUser] = useState<LoadUser>();
  const { protectedUser: data, callUser, protectedApi } = useContext(UserData);

  useEffect(() => {
    callUser();
    protectedApi();
  }, []);

  useEffect(() => {
    if (data) {
      setLoadUser(data);
    }
  }, [data]);

  if (loadUser) {
    if (loadUser.success === true) {
      if (!isValidRole.includes(loadUser.employee.payrollData.role)) {
        navigate("/app/login");
        window.alert(
          `${loadUser.employee.payrollData.role} cannot access this resource`
        );
        return null;
      } else {
        return <Component {...rest} />;
      }
    } else {
      navigate("/app/login");
      window.alert(data.error);
      return null;
    }
  }

  return null;
};
export default PrivateRoute;
