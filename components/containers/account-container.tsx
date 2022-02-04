import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

import BaseContainer from './base-container';
import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

const AccountContainer = ({ children }: ContainerProps) => (
  <BaseContainer title="Luke & Jadi | Admin">
    <SignedIn>
      <main className="min-h-screen">
        <div className="flex justify-center col-span-6 p-4">
          <div>{children}</div>
        </div>
      </main>
    </SignedIn>
    <SignedOut>
      <main>
        <p>
          Please{' '}
          <Link href="/account/sign-in">
            <a>sign in</a>
          </Link>{' '}
          to access this page.
        </p>
      </main>
    </SignedOut>
  </BaseContainer>
);

export default AccountContainer;
