/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import React from 'react';
import config from '@/client/config';
import flowers from '../public/flowers.png';
import { ToastContainer, Slide } from 'react-toastify';
import { configureAPI } from '@/client/api';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  configureAPI();

  const router = useRouter();

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
