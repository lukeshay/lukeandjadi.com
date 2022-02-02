import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

import BaseContainer from './BaseContainer';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function AccountContainer({ children }: ContainerProps) {
  return (
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
}
