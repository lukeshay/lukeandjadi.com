import Head from 'next/head';
import Navbar from '@/components/Navbar';
import React from 'react';
import Footer from './Footer';

export interface ContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function BaseContainer({ children, title }: ContainerProps) {
  return (
    <div className="font-serif">
      <Head>
        <title>{title || 'Luke & Jadi'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
