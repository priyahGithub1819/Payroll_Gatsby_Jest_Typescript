import React from "react"
import Layout from "../components/Layout"

export default function projects() {
  return (
    <Layout>
      <div className="container-fluid margin  account-wrapper">
        <h1>Projects</h1>
        <img
          className=" img-responsive w-80"
          src="/ProjectNew.png"
          alt="site banner"
        />
        <div className="row">
          <div className="col-12">
            {/* <div className="text-center"> */}
            <ul className="list-unstyled">
              <li>
                <p>
                  1. React Js <a href="#">Read More</a>
                </p>
              </li>
              <li>
                <p>
                  2. Mongo DB <a href="#">Read More</a>
                </p>
              </li>
              <li>
                <p>
                  3. Business Intelligence <a href="#">Read More</a>
                </p>
              </li>
              <li>
                <p>
                  4. Application Development <a href="#">Read More</a>
                </p>
              </li>
              <li>
                <p>
                  5. Data Architecture <a href="#">Read More</a>
                </p>
              </li>
            </ul>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}
