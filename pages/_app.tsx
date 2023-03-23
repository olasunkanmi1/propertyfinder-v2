import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'
import Router from "next/router";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import "../styles/globals.css";
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_PF_API

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  nProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => nProgress.start());
  Router.events.on("routeChangeComplete", () => nProgress.done());

  return (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;