import React from "react";
import Layout from "../components/Layout";
import PrivateRoute from "../components/Private-route";
// import Profile from "./hr-management-login/hr-dashboard";
import Profile from "./hr-management-login/hr-dashboard";
import employeeProfile from "./employee-profile";
import Login from "../components/Login";
import superAdminDashboard from "./super-admin-login/super-admin-dashboard";
import Owner from "./owner-login/owner-dashboard";
import Myprofile from "./owner-login/owner-profile";
import { Router, RouteComponentProps } from "@reach/router";

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

const App = () => {
  return (
    <>
      <Layout>
        <Router>
          <PrivateRoute
            isValidRole={["hrAdmin"]}
            path="/app/hr-dashboard"
            component={Profile}
          />
          <PrivateRoute
            isValidRole={["superAdmin"]}
            path="/app/super-admin-dashboard"
            component={superAdminDashboard}
          />
          <PrivateRoute
            isValidRole={["owner"]}
            path="/app/owner"
            component={Owner}
          />
          <PrivateRoute
            isValidRole={[
              "technicalEmployee",
              "accountEmployee",
              "marketingEmployee",
            ]}
            path="/app/employee-profile"
            component={employeeProfile}
          />
          <PrivateRoute
            isValidRole={["owner"]}
            path="/myProfile"
            component={Myprofile}
          />
          <Login path="/app/login" />
        </Router>
      </Layout>
    </>
  );
};
export default App;
