import React from "react";
import Layout from "../components/Layout";

export default function ecommerce() {
  return (
    <Layout>
      <div className="container-fluid margin account-wrapper">
        <h1>Ecommerce</h1>
        <img
          className="img-responsive w-50"
          src="/Ecom.png"
          alt="site banner"
        />
        <div className="row">
          <div className="col-12 text-center">
            <p>1. eCommerce Product Development and Integration</p>
            <p>2. eCommerce Platform Analysis, Fitment, Recommendations</p>
            <p>3. eCommerce Platform Services and Implementation</p>
            <p>4. Omni-Channel Implementation</p>
            <p>
              5. Integrations with Backoffice Systems like WMS, OMS,
              ERP,Logistics
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
