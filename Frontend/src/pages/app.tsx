import React from "react";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRout";
import Profile from "./HR Management/hrDashBoard";
import employeeProfile from "./employeeProfile";
import Login from "../components/Login";
import SuperAdmin from "./superAdmin/SuperAdmin";
import Owner from "./Owner/Owner";
import Myprofile from "./Owner/myprofile";
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
            path="/app/hrDashBoard"
            component={Profile}
          />
          <PrivateRoute
            isValidRole={["superAdmin"]}
            path="/app/superadmin"
            component={SuperAdmin}
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
            path="/app/employeeProfile"
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
