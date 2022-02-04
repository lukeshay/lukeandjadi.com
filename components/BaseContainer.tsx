import Head from 'next/head';
import React from 'react';
import { NextSeo } from 'next-seo';

import Navbar from './Navbar';
import Footer from './Footer';

export interface ContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function BaseContainer({ children, title }: ContainerProps) {
  return (
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
      {children}
      <Footer />
    </div>
  );
}
