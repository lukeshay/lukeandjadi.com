import React from 'react';

import BaseContainer from './base-container';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => (
  <BaseContainer>
    <div className="z-0 -mb-40 top-14 md:-mb-48 lg:-mb-60 xl:-mb-96 md:sticky">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="flowers" className="object-cover w-full" src="/images/flowers-1.png" />
    </div>
    <main className="w-full min-h-screen">{children}</main>
  </BaseContainer>
);

export type { ContainerProps };
export default Container;
