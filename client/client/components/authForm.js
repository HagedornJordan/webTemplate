import { useState, useEffect } from "react";

import ToolCard from "./toolCard";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../features/user/userSlice";
import axiosInstance from "../helpers/axios";

axiosInstance.defaults.withCredentials = "True";
const initialFields = {
    username : "",
    password : "",
};

const AuthForm = (props) => {
    const user = useSelector((state) => state.user.username)
    const dispatch = useDispatch()

    const [isSignup, setSignup] = useState(false);
    var requestUrl = "http://localhost:3000/login"
    let fields = initialFields;

    //console.log(isSignup);

    if (isSignup) {
        requestUrl = "http://localhost:3000/register"
        fields = {...fields, 
            email : ""
        }
    }

    const [formFields, setFormFields] = useState(fields);

  const storedUser = {
    "name" : "",
    "id" : "",
  }
  const handleSubmit = (event) => {
    const user = {
      username: formFields.username,
      email : formFields.email,
    };
    event.preventDefault();
    axiosInstance.request({
        url: requestUrl,
        method: "post",
        withCredentials: true ,
        data: {
          username: user.username,
          password: formFields.password,
          email : user.email
        }
      }).then((res) => {
        console.log(res)
        dispatch(setUser(user));
      });
  };

  const handleFieldChange = (e) => {
      const ff = formFields;
      ff[e.target.id] = e.target.value;
      setFormFields(formFields => ({
          ...ff
      }));
  };

  const flipForm = () => {
    console.log(isSignup);
    setSignup(isSignup => !isSignup);
  };

  useEffect(() => {
    setFormFields(fields)
}, [isSignup]);

  return (
    <ToolCard>
      <div className="flex-1">
        <div className="content-center">
          <h1 className="m-2 text-center text-xl "> {isSignup ? "Register" : "Login" }</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex-0">
              {Object.entries(formFields).map((val, i) =>
              <div key={i} className="flex-0 pt-5 flex flex-row justify-center">
              <label className="mr-8" htmlFor={val[0]}>
              {val[0]}
              </label>
              <input
              value={formFields[val[0]]}
                className="border-2"
                id={val[0]}
                type="text"
                onChange={handleFieldChange}
              ></input>
            </div>
              )}
            <div className="flex-0 pt-5 flex flex-row justify-center mb-2">
            <input className="" type="submit" value="Submit" />
            </div>
          </div>
        </form>
        <div className="flex-0 pt-5 flex flex-row justify-center mb-2"> 
            <button onClick={flipForm}> {isSignup ? "Already have an account?" : "Need to Register?" } </button>
        </div>
      </div>
    </ToolCard>
  );
};

export default AuthForm;