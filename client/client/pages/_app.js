import '../styles/globals.css'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {
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

  return <Component {...pageProps} user={user} userSetCB={userSetCB}/>
}

export default MyApp
