/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { configureAPI } from '@/client/api';
import { useAppInit, reportWebVitals } from '@lukeshay/next-ga';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  useAppInit();
  configureAPI();

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        hideProgressBar
        position="bottom-center"
        transition={Slide}
        limit={1}
      />
    </>
  );
}

export { reportWebVitals };

export default MyApp;
