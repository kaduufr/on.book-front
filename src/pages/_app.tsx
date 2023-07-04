import {AppProps} from "next/app";
import Head from "next/head";
import '@assets/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
