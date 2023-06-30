import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <Layout>
      <section id="home-carousel" className="home-carousel-wrapper">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
            ></li>
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
            ></li>
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
            ></li>
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
            ></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="/imgg4.jpg"
                alt="First slide"
              />{" "}
              <div className="carousel-caption first-slide-carousel-caption d-none d-md-block">
                <h2 className="fw-bolder">UVXCEL - UNITED WE EXCEL!</h2>
                <p className="fw-bold">
                  Payroll management system of uvXcel provides the detailed
                  information of payroll of every employee anytime anywhere.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="/account.jpg"
                alt="Second slide"
              />
              <div className="carousel-caption d-none d-md-block first-slide-carousel-caption">
                <h2>Accounting and Payroll</h2>
                <p>
                  Payroll accounting is essentially the calculation, management,
                  recording, and analysis of employees' compensation.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="/eccom.jpg"
                alt="Third slide"
              />{" "}
              <div className="carousel-caption d-none d-md-block first-slide-carousel-caption">
                <h2>Ecommerce</h2>
                <p>
                  eCommerce Product Development and Integration eCommerce
                  Platform Analysis, Fitment, Recommendations eCommerce Platform
                  Services and Implementation Omni-Channel Implementation
                  Integrations with Back office Systems like WMS, OMS, ERP,
                  Logistics
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="/project.jpg"
                alt="Fourth slide"
              />
              <div className="carousel-caption d-none d-md-block first-slide-carousel-caption">
                <h2>Projects</h2>
                <p>
                  1. React Js 2. Mongo DB 3. Business Intelligence 4.
                  Application Development 5. Data Architecture
                </p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>
      <section id="dms" className="dms-wrapper">
        <div className="container-fluid indexContainer">
          <h2 className="text-center pb-3" data-testid="mainHeader">
            Welcome to the Payroll Management System
          </h2>
          <div className="row justify-content-center indexContainerRow">
            <div className="col-lg-8 col-md-8 mt-3 ">
              <p>
                The <i>Payroll Management System </i>provides easy access to all
                the important features which are required in Payroll management
                system anytime anywhere.
              </p>
              <p>
                This system have many features like Upload CTC, Update CTC and
                to upload and view all important documents which are required in
                Payroll system to maintain the employee's record.
              </p>
              <p>
                Morever, here in this system there is provision of role based
                access. Employee can see his/her all information which is
                related to his/her Salary and Designation.
              </p>
              <p>Owner has his own login for his special rights.</p>
              <p>
                Both Super admin and HR admin has there own individual accesses
                depending on their requirement.
              </p>
            </div>
            <div className="col-lg-4 col-md-4 mt-4 mt-md-0 mb-3">
              <div className="text-md-end text-center">
                <img
                  src="/hero-img.png"
                  alt="site banner"
                  className="dms-img img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
