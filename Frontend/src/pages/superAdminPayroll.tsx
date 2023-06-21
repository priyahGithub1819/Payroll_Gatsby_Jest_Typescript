import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

export default function superadminpayroll() {
  return (
    <Layout>
      {/* <section id="payroll" className="payroll-div-wrapper"> */}
      <div className="container-fluid margin account-wrapper">
        <h1>Payroll</h1>
        <img
          className="img-responsive w-80"
          src="/payroll3.png"
          alt="site banner"
        />
        <div className="row">
          <div className="col-12">
            <p className="my-0  p-md-2">
              Payroll accounting is essentially the calculation, management,
              recording, and analysis of employees' compensation. In addition,
              payroll accounting also includes reconciling for benefits, and
              withholding taxes and deductions related to compensation.
            </p>
          </div>
        </div>
        <div className="update">
          <Link
            to="/app/superadmin"
            className="btn btn-outline-secondary dashboardBtn mb-3"
          >
            Go To Dashboard
          </Link>
        </div>
      </div>

      {/* </section> */}
    </Layout>
  )
}
