import Link from 'next/link';
import React from 'react';
import UserIconOutline from './icons/UserIconOutline';

function Navlink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li className="px-2 hover:text-gray-500">
      <Link href={href}>{children}</Link>
    </li>
  );
}

function Navbar() {
  return (
    <nav className="flex justify-between uppercase p-4 shadow-lg items-center text-gray-700 select-none">
      <Link href="/">
        <h1 className="text-2xl font-bold w-40 text-black cursor-pointer">
          Luke & Jadi
        </h1>
      </Link>
      <ul className="flex">
        <Navlink href="/ceremony">Ceremony</Navlink>
        <Navlink href="/reception">Reception</Navlink>
        <Navlink href="/registry">Registry</Navlink>
      </ul>
      <div className="w-40 float-right">
        <div className="hover:text-gray-500 flex cursor-pointer">
          <Link href="/account">
            <UserIconOutline size={34} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
