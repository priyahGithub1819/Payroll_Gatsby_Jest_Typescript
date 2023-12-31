import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import { UserData } from "../../components/Layout"

const Ownerprofilebar = () => {
  const { user } = useContext(UserData)

  useEffect(() => {
    let attributes = document.querySelectorAll(".navbar-item a")
    attributes.forEach(item => {
      if (item.getAttribute("aria-current") === "page") {
      }
    })
  }, [])

  return (
    <>
      <div className="owner-profilebar">
        <ul className="list-unstyled components" id="myTab">
          <li className="navbar-item">
            <Link to="/" className="nav-link fw-bold" data-toggle="tab">
              {" "}
              Home
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to="/app/owner"
              className="nav-link fw-bold"
              data-toggle="tab"
            >
              {" "}
              My Dashbord
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
export default Ownerprofilebar
