import {SignedIn, SignedOut} from '@clerk/nextjs';
import Link from 'next/link';
import type {ReactNode} from 'react';

import BaseContainer from './base-container';

type ContainerProps = {
    children: ReactNode;
};

const AccountContainer = ({children}: ContainerProps): JSX.Element => (
    <BaseContainer title="Luke & Jadi | Admin">
        <SignedIn>
            <main className="min-h-screen">
                <div className="flex justify-center p-4">
                    <div>{children}</div>
                </div>
            </main>
        </SignedIn>
        <SignedOut>
            <main>
                <p>
                    {'Please '}
                    <Link href="/signin" passHref>
                        <button type="button">{'sign in'}</button>
                    </Link>{' '}
                    {' to access this page.'}
                </p>
            </main>
        </SignedOut>
    </BaseContainer>
);

export type {ContainerProps};
export default AccountContainer;
