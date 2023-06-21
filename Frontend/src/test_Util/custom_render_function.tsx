import React from "react";
import { render as RCH } from "@testing-library/react"; // (RCH:- render component here)
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router,
  RouteComponentProps
} from "@reach/router";
import Layout from "../components/Layout";


const render = (ui: any, { route = "/" } = {}) => {
  const history = createHistory(createMemorySource(route));
  window.history.pushState({}, "", route);
  return RCH(
    <Layout>
      <LocationProvider history={history}>{ui}</LocationProvider>
    </Layout>
  );
};

const multiRender = (routes: { path: string, component: React.ComponentType<RouteComponentProps> }[],{ path = '/'}={}) => {
  const source = createMemorySource(path);
  const history = createHistory(source);
  return RCH(
    <Layout>
    <LocationProvider history={history}>
      <Router>
        {routes.map(({ path, component:Component }) => (
          <Component key={path} path={path} />
        ))}
      </Router>
    </LocationProvider>
    </Layout>
  );
};



export { render,multiRender };
