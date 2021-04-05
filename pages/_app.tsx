/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <Head>
        <title>Luke & Jadi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className="py-2 w-full">
        <div className="min-h-screen w-full">
          <Component {...pageProps} />
        </div>

        <footer className="flex items-center justify-center w-full h-24 border-t mt-8">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            &#169; 2021 Luke Shay and Jadi Reding
          </a>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
