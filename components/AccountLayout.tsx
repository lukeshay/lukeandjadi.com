import { useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import Button from './Button';
import Layout from './Layout';

export interface AccountLayoutProps {
  children: React.ReactNode;
}

function AccountLayout({ children }: AccountLayoutProps) {
  const { signOut } = useClerk();

  return (
    <Layout fullWidth>
      <div className="flex justify-center w-full h-full min-h-screen">
        <div className="grid w-full h-full max-w-screen-xl grid-cols-10 gap-4">
          <div className="h-full col-span-2 p-4 pt-8 bg-white border-r border-gray-200">
            <ul>
              <li className="py-2">
                <Link href="/account">
                  <a className="p-1 text-gray-900 border-b-2 hover:text-gray-500 hover:no-underline border-accent-500">
                    My Account
                  </a>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/account/rsvps">
                  <a className="p-1 text-gray-900 border-b-2 hover:text-gray-500 hover:no-underline border-accent-500">
                    RSVPs
                  </a>
                </Link>
              </li>
              <li className="py-2">
                <Button onClick={() => signOut()}>Sign Out</Button>
              </li>
            </ul>
          </div>
          <div className="flex justify-center col-span-6 p-4">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccountLayout;
