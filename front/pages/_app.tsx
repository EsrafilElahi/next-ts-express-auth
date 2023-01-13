import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../redux/store";
import "../styles/globals.css";

export type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type NextPropsLayout = AppProps & {
  Component: NextPageLayout;
};

function MyApp({ Component, pageProps }: NextPropsLayout) {
  const { store } = wrapper.useWrappedStore(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Next Auth Express Typescript</title>
        <link rel="icon" href="/icon/heraBtn.svg" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={store.__persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
