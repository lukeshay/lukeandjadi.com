/* eslint-disable react/jsx-props-no-spreading */
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <div>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
