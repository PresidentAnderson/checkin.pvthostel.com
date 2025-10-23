import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Check-in - PVT Hostel</title>
        <meta name="description" content="Complete your check-in remotely and pay for your stay at PVT Hostel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* HubSpot Embed Code */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/139620674.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}