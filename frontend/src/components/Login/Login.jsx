import React, { useState } from "react";
import { Input } from "../Utilities/Input";
import axios from "axios";
import "./login.styles.scss";
import { ToastSuccess, ToastWarning } from "../Utilities/Toast";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

  const [showToastWarning, setShowToastWarning] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchUserData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/login",
        user
      );
      console.log(data.token);
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
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4>Sign Up</h4>
              </div>
              <div className="card-body">
                <form action="" method="">
                  <div className="form-group row mb-0">
                    <div className="col-md-8 m-auto">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Please enter email"
                        required={true}
                        onChange={onInputChange}
                        value={user.email}
                      />
                    </div>
                  </div>

                  <div className="form-group row ">
                    <div className="col-md-8 m-auto">
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Please enter password"
                        onChange={onInputChange}
                        value={user.password}
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="col-md-8 m-auto d-flex justify-content-center">
                    <button
                      onClick={fetchUserData}
                      className="btn btn-success mr-3"
                    >
                      <i className="fas fa-sign-in-alt mr-1"></i> Log in
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-user-plus mr-1"></i> Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
