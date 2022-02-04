import React from 'react';

import BaseContainer from './base-container';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => (
  <BaseContainer>
    <div className="top-14 z-0 -mb-40 md:sticky md:-mb-48 lg:-mb-60 xl:-mb-96">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="flowers" className="w-full object-cover" src="/images/flowers-1.png" />
    </div>
    <main className="min-h-screen w-full">{children}</main>
  </BaseContainer>
);

export type { ContainerProps };
export default Container;
