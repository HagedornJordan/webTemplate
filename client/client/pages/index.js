import Head from "next/head";
import styles from "../styles/Home.module.css";
import CenterLayout from "../components/centerLayout";
import NavHeader from "../components/navHeader";
import LoginCard from "../components/loginCard";
//import BlinkButton from "../components/blinkButton";
//import axiosInstance  from "axios";
const Home = (props) => {
  return (
    <>
      <NavHeader user={props.user} />
      <CenterLayout>
        {true && props.user === null && (
          <LoginCard userSetCB={props.userSetCB} />
        )}
      </CenterLayout>
    </>
  );
};

export default Home;
