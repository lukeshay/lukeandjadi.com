/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { ClerkProvider } from '@clerk/nextjs';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID || '', {
      includedDomains: ['lukeandjadi.com'],
    });

    const onRouteChangeComplete = () => {
      Fathom.trackPageview();
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);

  return (
    <ClerkProvider>
      <Component {...pageProps} />
      <ToastContainer
        hideProgressBar
        position="bottom-center"
        transition={Slide}
        limit={1}
      />
    </ClerkProvider>
  );
}

export default MyApp;
