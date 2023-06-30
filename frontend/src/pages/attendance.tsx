import React from "react";
import Layout from "../components/Layout";

export default function attendance() {
  return (
    <Layout>
      <section id="account" className="account-wrapper">
        <div className="container-fluid accountPage margin">
          <div className="centered">
            <h1 className="text-center">Attendance System</h1>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              className=" img-responsive ps-3"
              src="/attendance.jpg"
              alt="site banner"
              style={{ width: "42%" }}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <p className="text-center p-lg-4 p-md-2 p-1">
                We have created a ACLMS system for managing attendance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
