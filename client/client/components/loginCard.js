import LoginForm from "./loginForm";
import axios from "axios";

const LoginCard = (props) => {
  if (axios.defaults.headers.common.Authorization) {
    return <h1> "hi" </h1>;
  }
  return <LoginForm callBack={props.callBack}></LoginForm>;
};

export default LoginCard;