/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Navbar from '../components/Navbar';
import { configureAPI } from '../lib/fe/api';
import '../styles/globals.css';

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-gray-500">{children}</a>
      </Link>
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
      </Head>
      <Navbar />

      <div className="py-2 w-full">
        <div className="min-h-screen w-full">
          <Component {...pageProps} />
        </div>

        <footer className="w-full h-24 border-t mt-8 py-8">
          <div className="flex justify-center w-full">
            <div className="block sm:flex justify-between w-full max-w-screen-lg px-2 lg:px-0">
              <div>
                <h4 className="font-semibold">The Wedding</h4>
                <ul>
                  <FooterLink href="#our-story">Our Story</FooterLink>
                  <FooterLink href="#wedding-party">Wedding party</FooterLink>
                  <FooterLink href="#ceremony">Ceremony</FooterLink>
                  <FooterLink href="#reception">Reception</FooterLink>
                  <FooterLink href="#registry">Registry</FooterLink>
                </ul>
              </div>
              <div className="pt-4 sm:pt-0">
                <h4 className="font-semibold">RSVP</h4>
                <ul>
                  <FooterLink href="/rsvp/ceremony">Ceremony</FooterLink>
                  <FooterLink href="/rsvp/reception">Reception</FooterLink>
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
