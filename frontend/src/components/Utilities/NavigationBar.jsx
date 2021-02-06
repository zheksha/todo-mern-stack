import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const signInBtn = (
    <div>
      <i className="fas fa-sign-in-alt mr-1" /> Sign In
    </div>
  );

  const logOutBtn = (
    <div>
      Log out <i className=" ml-1 fas fa-sign-out-alt" />
    </div>
  );
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="d-flex align-items-center ">
              <i className="fab fa-pied-piper-square mr-2" />
              <p className="text-bold m-0 p-0">
                <small>
                  <strong>ATA 1.1</strong>{" "}
                </small>{" "}
                <span className="badge bg-info">
                  <small>
                    <strong>Another Todo App</strong>
                  </small>
                </span>
              </p>
            </div>
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <Link className="nav-link" to="/todos">
                  <i className="fas fa-tasks mr-2"></i>All my tasks
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item mr-3">
                <Link className="nav-link" to="/create">
                  <i className="fas fa-plus-square mr-2"></i>Create new task
                </Link>
              </li>
              <li className="nav-item mr-3">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
              <li className="nav-item mr-3">
                <Link onClick={removeToken} className="nav-link" to="/login">
                  {token ? logOutBtn : signInBtn}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
