import React, { useState, createContext, useEffect } from "react";
import { loadUser } from "../services/apiFunction";
import NavBar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

interface PageProps {
  children: React.ReactNode;
}

export const UserData = createContext<any>({});

const Layout: React.FC<PageProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [protectedUser, setProtectedUser] = useState();

  const callUser = async () => {

    const data = await loadUser();
    setUser(data);
  };
  const protectedApi = async () => {
    const data = await loadUser();
    setProtectedUser(data);
  };
  function presentYear() {
    const d = new Date();
    let year = d.getFullYear();
    return year;
  }

  useEffect(() => {
    callUser()
  }, []);

  return (
    <>
      <UserData.Provider
        value={{ user, callUser, protectedApi, protectedUser }}
      >
        <div className="layout">
          <NavBar />
          {children}
          <footer id="footer" className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-md-5 text-center text-md-start">
                  <p className="ps-3">
                    Copyright © {presentYear()} uvXcel - All Rights Reserved
                  </p>
                </div>
                <div className="offset-lg-5 offset-md-2 col-lg-3 col-md-5 text-center text-md-start">
                  <div className="footer-contact">
                    <p>
                      Email : <a href="mailto:hr@uvxcel.com">hr@uvxcel.com</a>
                    </p>
                    <p className="">Phone: +91-20-6706259</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </UserData.Provider>
    </>
  );
};
export default Layout;
