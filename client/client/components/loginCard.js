import axios from "axios";
import AuthForm from "./authForm";

const LoginCard = (props) => {
  if (axios.defaults.headers.common.Authorization) {
    return <h1> "hi" </h1>;
  }
  return <AuthForm callBack={props.callBack} isSignupForm={true}></AuthForm>;
};

export default LoginCard;