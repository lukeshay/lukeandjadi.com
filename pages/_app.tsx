import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {ToastContainer, Slide} from 'react-toastify';
import {ClerkProvider} from '@clerk/nextjs';
import type {AppProps} from 'next/app';

// eslint-disable-next-line node/no-unpublished-import
import '../styles/globals.css';

const MyApp = ({Component, pageProps}: AppProps): JSX.Element => (
    <ClerkProvider>
        <Component {...pageProps} />
        <ToastContainer hideProgressBar limit={1} position="bottom-center" transition={Slide} />
    </ClerkProvider>
);

export default MyApp;
