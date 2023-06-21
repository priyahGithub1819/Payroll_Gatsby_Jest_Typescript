import { Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"

export default function account() {
  return (
    <Layout>
      {/* <section id="account" className=""> */}
        <div className="container-fluid margin account-wrapper">
            <h1>Accounting</h1>
            <img
              className="img-responsive w-80"
              src="/accounting1.jpg"
              alt="site banner"
            />

          <div className="row">
            <div className="col-12">
              <p className="my-0  p-md-2">
                Accounting is the process of recording, analyzing, summarizing,
                and interpreting the financial information of a business
                organization. Accounting information thus generated is of use to
                the stakeholders of the company, namely the employees,
                shareholders, creditors, banks and other lenders, regulatory
                agencies and tax authorities, etc. It is the only way or
                language through which the organization can communicate with the
                internal and external world.
              </p>
            </div>
          </div>
        </div>
      {/* </section> */}
    </Layout>
  )
}
