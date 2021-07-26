import React from 'react';
import BaseContainer from './BaseContainer';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <BaseContainer>
      <div className="lg:sticky top-0 z-0 w-full -mb-10 lg:-mb-72 xl:-mb-96">
        <img src="/images/flowers.png" alt="flowers" />
      </div>
      <main className="min-h-screen">{children}</main>
    </BaseContainer>
  );
}
