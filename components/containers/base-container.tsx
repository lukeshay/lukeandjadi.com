import Head from 'next/head';
import React from 'react';
import { NextSeo } from 'next-seo';

import Navbar from './navbar';
import Footer from './footer';

export interface ContainerProps {
  children: React.ReactNode;
  title?: string;
}

const BaseContainer = ({ children, title }: ContainerProps) => (
  <div className="font-serif">
    <NextSeo
      title={title || 'Luke & Jadi'}
      description={"Luke & Jadi's wedding website!"}
      canonical="https://lukeandjadi.com/"
      openGraph={{
        url: 'https://lukeandjadi.com/',
        title: "Luke & Jadi's Wedding Website",
        description: "Luke & Jadi's wedding website!",
        images: [
          {
            url: 'https://lukeandjadi.com/images/cover-photo.jpg',
            alt: 'Cover Photo',
          },
        ],
        site_name: 'Luke & Jadi',
      }}
    />
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{title || 'Luke & Jadi'}</title>
    </Head>
    <Navbar />
    <div className={`flex justify-center w-full px-2`}>
      <main className={'max-w-4xl'}>{children}</main>
    </div>
    <Footer />
  </div>
);

export default BaseContainer;
