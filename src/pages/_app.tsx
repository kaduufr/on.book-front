import { AppProps } from 'next/app'
import Head from 'next/head'
import '@assets/globals.css'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
