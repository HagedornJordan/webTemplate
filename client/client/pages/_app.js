import '../styles/globals.css'
import store from '../app/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  console.log("MyApp")
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
