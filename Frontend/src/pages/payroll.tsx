import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

export default function payroll() {
  return (
    <Layout>
      <section id="payroll" className="payroll-div-wrapper">
        <div className="container-fluid margin">
        <h1 className="text-center">Payroll</h1>
          <div style={{ textAlign: "center" }}>
            <img
              className="img-responsive w-80 ps-3"
              src="/payroll3.png"
              alt="site banner"
            />
          </div>

          <div className="row">
            <div className="col-12">
              <p className="text-center p-lg-4 p-md-2 p-1">
                Payroll accounting is essentially the calculation, management,
                recording, and analysis of employees' compensation. In addition,
                payroll accounting also includes reconciling for benefits, and
                withholding taxes and deductions related to compensation.
              </p>
            </div>
          </div>
        </div>
        <div className="update text-center">
          <Link to="/app/owner" className="btn btn-outline-secondary dashboardBtn">Go To Dashboard</Link>
        </div>
      </section>
    </Layout>
  )
}