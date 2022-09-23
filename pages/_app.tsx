import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { useEffect, Component } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      duration:1800,
      delay: 800,
    });
  }, [])
  
  return (
    <SWRConfig
      value={{
        refreshInterval:3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
