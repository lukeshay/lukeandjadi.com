import Head from 'next/head';
import React from 'react';
import { NextSeo } from 'next-seo';

import Navbar from './navbar';
import Footer from './footer';

type BaseContainerProps = {
  children: React.ReactNode;
  title?: string;
};

const BaseContainer = ({ children, title }: BaseContainerProps): JSX.Element => (
  <div className="font-serif">
    <NextSeo
      canonical="https://lukeandjadi.com/"
      description={"Luke & Jadi's wedding website!"}
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
        // eslint-disable-next-line camelcase
        site_name: 'Luke & Jadi',
      }}
      title={title ?? 'Luke & Jadi'}
    />
    <Head>
      <link href="/favicon.ico" rel="icon" />
      <title>{title ?? 'Luke & Jadi'}</title>
    </Head>
    <Navbar />
    <div className="flex justify-center w-full px-2">
      <main className="max-w-4xl">{children}</main>
    </div>
    <Footer />
  </div>
);

export type { BaseContainerProps };
export default BaseContainer;
