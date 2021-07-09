/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import React from 'react';
import config from '../lib/client/config';
import flowers from '../public/flowers.png';
import { ToastContainer, Slide } from 'react-toastify';
import { configureAPI } from '../lib/client/api';
import { useRouter } from 'next/router';

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      {external ? (
        <a
          className="text-gray-500"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link href={href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-gray-500">{children}</a>
        </Link>
      )}
    </li>
  );
}

FooterLink.defaultProps = {
  external: false,
};

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  configureAPI();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Luke & Jadi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {!router.pathname.includes('/account') && (
        <div className="lg:sticky top-0 z-0 w-full -mb-10 lg:-mb-96">
          <Image src={flowers} alt="flowers" layout="responsive" />
        </div>
      )}
      <div className="py-2 w-full font-serif">
        <div className="min-h-screen w-full">
          <Component {...pageProps} />
        </div>
        <footer className="w-full h-24 border-t mt-8 py-8">
          <div className="flex justify-center w-full">
            <div className="block sm:flex justify-between w-full max-w-screen-lg px-2 lg:px-0">
              <div>
                <h4 className="font-semibold text-lg">Wedding Information</h4>
                <ul>
                  {config.weddingLinks.map(({ href, text }) => (
                    <FooterLink key={`${href}-${text}`} href={href} external>
                      {text}
                    </FooterLink>
                  ))}
                </ul>
              </div>
              <div className="pt-4 sm:pt-0">
                <h4 className="font-semibold text-lg">Guest Information</h4>
                <ul>
                  {config.guestLinks.map(({ href, text }) => (
                    <FooterLink key={`${href}-${text}`} href={href} external>
                      {text}
                    </FooterLink>
                  ))}
                </ul>
              </div>
              <div className="pt-4 sm:pt-0">
                <h4 className="font-semibold text-lg">Registries</h4>
                <ul>
                  {config.registries.map(({ href, text }) => (
                    <FooterLink key={`${href}-${text}`} href={href} external>
                      {text}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full text-center pt-10 pb-2">
            &#169;2021 Luke Shay and Jadi Reding
          </div>
          <div className="w-full text-center pb-6">Built by Luke Shay</div>
        </footer>
        <ToastContainer
          hideProgressBar
          position="bottom-center"
          transition={Slide}
          limit={1}
        />
      </div>
    </>
  );
}

export default MyApp;
