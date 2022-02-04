/* eslint-disable @next/next/no-img-element */
import React from 'react';
import BaseContainer from './base-container';

export interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => (
  <BaseContainer>
    <div className="z-0 -mb-40 top-14 md:-mb-48 lg:-mb-60 xl:-mb-96 md:sticky">
      <img
        src="/images/flowers-1.png"
        alt="flowers"
        className="object-cover w-full"
      />
    </div>
    <main className="w-full min-h-screen">{children}</main>
  </BaseContainer>
);

export default Container;
