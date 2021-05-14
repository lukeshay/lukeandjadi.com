/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Navbar from '../components/Navbar';
import { configureAPI } from '../lib/client/api';
import config from '../lib/client/config';
import '../styles/globals.css';

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
        <a className="text-gray-500" href={href} target="_blank">
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

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  configureAPI();

  return (
    <>
      <Head>
        <title>Luke & Jadi</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </Head>
      <Navbar />
      <img
        src="/flowers.png"
        alt="flowers"
        className="lg:sticky top-0 z-0 w-full -mb-10 lg:-mb-96"
      />

      <div className="py-2 w-full font-serif">
        <div className="min-h-screen w-full">
          <Component {...pageProps} />
        </div>

        <footer className="w-full h-24 border-t mt-8 py-8">
          <div className="flex justify-center w-full">
            <div className="block sm:flex justify-between w-full max-w-screen-lg px-2 lg:px-0">
              <div>
                <h4 className="font-semibold">Information</h4>
                <ul>
                  {config.links.map(({ href, text }) => (
                    <FooterLink href={href} external>
                      {text}
                    </FooterLink>
                  ))}
                </ul>
              </div>
              <div className="pt-4 sm:pt-0">
                <h4 className="font-semibold">Registries</h4>
                <ul>
                  {config.registries.map(({ href, text }) => (
                    <FooterLink href={href} external>
                      {text}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full text-center pt-6 pb-2">
            &#169;2021 Luke Shay and Jadi Reding
          </div>
          <div className="w-full text-center pb-6">Built by Luke Shay</div>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
