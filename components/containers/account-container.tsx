import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import type { ReactNode } from 'react';

import BaseContainer from './base-container';

type ContainerProps = {
  children: ReactNode;
};

const AccountContainer = ({ children }: ContainerProps): JSX.Element => (
  <BaseContainer title="Luke & Jadi | Admin">
    <SignedIn>
      <main className="min-h-screen">
        <div className="col-span-6 flex justify-center p-4">
          <div>{children}</div>
        </div>
      </main>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn redirectUrl="/admin" />
    </SignedOut>
  </BaseContainer>
);

export type { ContainerProps };
export default AccountContainer;
