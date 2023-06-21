import React from "react"
import Layout from "../components/Layout"

export default function marketing() {
  return (
    <Layout>
      {/* <section id="account" className="account-wrapper wrapper"> */}
      <div className="container-fluid account-wrapper margin">
        <h1>Marketing & New Leads</h1>
          <img
            className=" img-responsive w-50"
            src="/marketing.jpg"
            alt="site banner"
          />

        <div className="row">
          <div className="col-12">
            <p className=" p-lg-4 p-md-2">
              Lead generation is the process of gaining the interest of
              potential customers in order to increase future sales. It is a
              crucial part of the sales process of many companies. A lead is
              anyone who has shown interest in a company's products or services
              but may not yet be qualified to buy.
            </p>
          </div>
        </div>
      </div>
      {/* </section> */}
    </Layout>
  )
}
