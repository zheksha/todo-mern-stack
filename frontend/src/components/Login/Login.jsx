import React, { useState } from "react";
import { Input } from "../Utilities/Input";
import axios from "axios";
import "./login.styles.scss";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

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
      window.location.replace("/todos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">Register</div>
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
                      <i className="fas fa-user-plus mr-1"></i> Sign up
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
