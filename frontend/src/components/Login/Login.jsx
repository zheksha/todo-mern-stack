import React, { useState } from "react";
import { Input } from "../Utilities/Input";
import axios from "axios";
import "./login.styles.scss";
import { ToastSuccess, ToastWarning } from "../Utilities/Toast";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });
  const [newUser, setNewUser] = useState({ email: "", password: "", name: "" });

  const [showToastWarning, setShowToastWarning] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onNewInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const fetchUserData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/login",
        user
      );

      localStorage.setItem("token", data.token);
      setShowToastSuccess(true);
      setTimeout(() => window.location.replace("/todos"), 500);
    } catch (error) {
      console.error(error);
      setShowToastWarning(true);
    }
  };

  const signUpNewUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/signup",
        newUser
      );
      localStorage.setItem("token", data.token);
      setShowToastSuccess(true);
      setTimeout(() => window.location.replace("/todos"), 500);
    } catch (error) {
      console.error(error);
      setShowToastWarning(true);
    }
  };

  const alertText = {
    warning: "Failure",
    success: "Success",
  };

  const alertBlock = (
    <div>
      {showToastWarning ? (
        <ToastWarning
          text={alertText.warning}
          onClick={() => setShowToastWarning(false)}
        />
      ) : null}
      {showToastSuccess ? (
        <ToastSuccess
          text={alertText.success}
          onClick={() => setShowToastSuccess(false)}
        />
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div>
      {alertBlock}
      <div className="container">
        <div className="row">
          <div className="col-sm-6 bg-info p-0">
            <div className="card-header  text-white">
              <h4>
                {" "}
                <small>
                  <i className="fas fa-door-open mr-2"></i>
                </small>
                <strong>Login</strong>
              </h4>
            </div>
            <div className="card-body p-3">
              <div className="row mb-0 ">
                <div className="col-10 m-auto p-0 d-flex flex-column ">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    required={true}
                    onChange={onInputChange}
                    value={user.email}
                  />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Please enter password"
                    onChange={onInputChange}
                    value={user.password}
                    required={true}
                  />

                  <button onClick={fetchUserData} className="btn btn-success">
                    <i className="fas fa-sign-in-alt mr-1"></i> Log in
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 bg-secondary p-0">
            <div className="card-header  text-dark">
              <h4>
                <small>
                  <i className="fas fa-user-plus mr-2"></i>
                </small>
                <strong> Sign Up</strong>
              </h4>
            </div>
            <div className="card-body p-3">
              <div className=" row  mb-0">
                <div className="col-10 m-auto p-0 d-flex flex-column">
                  <Input
                    id="name"
                    type="name"
                    name="name"
                    placeholder="Please enter name"
                    required={true}
                    onChange={onNewInputChange}
                    value={newUser.name}
                  />

                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    required={true}
                    onChange={onNewInputChange}
                    value={newUser.email}
                  />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Please enter password"
                    onChange={onNewInputChange}
                    value={newUser.password}
                    required={true}
                  />

                  <button
                    onClick={signUpNewUser}
                    type="button"
                    className="btn btn-primary"
                  >
                    <i className="fas fa-user-plus"></i> Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
