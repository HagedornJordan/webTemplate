import { useState } from "react";

import ToolCard from "./toolCard";
import axiosInstance from "../helpers/axios";

axiosInstance.defaults.withCredentials = "True";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const storedUser = {
    "name" : "",
    "id" : "",
    "access_token" : "",
    "refresh_token": "",
  }

  const handleSubmit = (event) => {
    const user = {
      username: username,
      password: password,
    };
    event.preventDefault();
    axiosInstance.request({
        url: "http://192.168.86.250:8000/login/",
        method: "post",
        data: {
          username: username,
          password: password,
        }
      }).then((res) => {
        storedUser.name = username;
        storedUser.access_token = res.data.access;
        storedUser.refresh_token = res.data.refresh;

        localStorage.setItem('current_user', JSON.stringify(storedUser));
        const token = res.data.access;
        if (token) {
          axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;
        }
        props.callBack(storedUser);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <ToolCard>
      <div className="flex-1">
        <div className="content-center">
          <h1 className="m-2 text-center text-xl "> Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex-0">
            <div className="flex-0 pt-5 flex flex-row justify-center">
              <label className="mr-8" htmlFor="username">
                Username
              </label>
              <input
                className="border-2"
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleUsernameChange}
              ></input>
            </div>
            <div className="flex-0 pt-5 flex flex-row justify-center mb-2">
              <label className="mr-8" htmlFor="password">
                Password
              </label>
              <input
                className="border-2"
                id="password"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="flex-0 pt-5 flex flex-row justify-center mb-2">
            <input className="" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </ToolCard>
  );
};

export default LoginForm;