import Head from "next/head";
import styles from "../styles/Home.module.css";
import CenterLayout from "../components/centerLayout";
import NavHeader from "../components/navHeader";
import LoginCard from "../components/loginCard";
//import BlinkButton from "../components/blinkButton";
//import axiosInstance  from "axios";
import {useState, useEffect} from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
      setMounted(true)
      const storedUser = localStorage.getItem('current_user');
      if (storedUser) setUser(storedUser);
  }, [])

 const userSetCB = (user) => {
    localStorage.setItem('current_user', user);
    setUser(user);
  }

  return (
    <>
      <NavHeader user={user}/>
      <CenterLayout>
        {mounted && (user === null) && <LoginCard userSetCB={userSetCB}/> }
      </CenterLayout>
    </>
  );
}
