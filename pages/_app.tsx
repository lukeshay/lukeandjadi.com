import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';

// eslint-disable-next-line node/no-unpublished-import
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID ?? '', {
      includedDomains: ['lukeandjadi.com'],
    });

    const onRouteChangeComplete = (): void => {
      Fathom.trackPageview();
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);

  return (
    <ClerkProvider>
      <Component {...pageProps} />
      <ToastContainer hideProgressBar limit={1} position="bottom-center" transition={Slide} />
    </ClerkProvider>
  );
};

export default MyApp;
