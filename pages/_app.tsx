import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'
import Router from "next/router";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import "../styles/globals.css";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  nProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => nProgress.start());
  Router.events.on("routeChangeComplete", () => nProgress.done());

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
          <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;