import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import { UserData } from "../../components/Layout"

const Ownerprofilebar = () => {
  const { user } = useContext(UserData)

  useEffect(() => {
    let attr = document.querySelectorAll(".navbar-item a")
    console.log(attr)

    attr.forEach(item => {
      if (item.getAttribute("aria-current") === "page") {
        // item.closest(".navbar-item").classList.add("tab") 
      }
    })
  }, [])

  return (
    <>
      <div className="ownerProfilebar">
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
