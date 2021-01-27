import React from "react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="d-flex align-items-center ">
              <i className="fab fa-pied-piper-square mr-2" />
              <p className="text-bold m-0 p-0">
                <small>
                  <strong>ATA 1.0</strong>{" "}
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
                <Link className="nav-link" to="/">
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
