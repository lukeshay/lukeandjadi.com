/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { configureAPI } from '../client/api';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  configureAPI();

  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID || '', {
      includedDomains: ['lukeandjadi.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default MyApp;
