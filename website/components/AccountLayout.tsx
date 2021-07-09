import Link from 'next/link';
import React from 'react';
import Layout from './Layout';

export interface AccountLayoutProps {
  children: React.ReactNode;
}

function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <Layout fullWidth>
      <div className="w-full min-h-screen h-full flex justify-center">
        <div className="grid grid-cols-10 gap-4 pt-8 h-full w-full max-w-screen-xl">
          <div className="col-span-2 h-full border border-gray-50 rounded bg-white p-4 shadow-lg">
            <ul>
              <li className="py-2">
                <Link href="/account">
                  <a className="text-gray-900 hover:text-gray-500 hover:no-underline border-b-2 border-accent-500 p-1">
                    My Account
                  </a>
                </Link>
              </li>
              <li className="py-2">
                <Link href="/account/rsvps">
                  <a className="text-gray-900 hover:text-gray-500 hover:no-underline border-b-2 border-accent-500 p-1">
                    RSVPs
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 flex justify-center">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccountLayout;
