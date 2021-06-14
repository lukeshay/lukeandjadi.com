import React from 'react';
import Link from 'next/link';
import config from '../lib/client/config';

function NavLink({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <li className="px-4 md:px-2 lg:px-4 py-2 md:py-0">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className="text-gray-700 hover:no-underline hover:opacity-75 text-base md:text-sm lg:text-base border-b-2 border-accent-500 py-2 px-0 md:px-2"
          onClick={onClick}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}

function DesktopNavbar({ links }: { links: { href: string; text: string }[] }) {
  return (
    <nav className="z-20 hidden md:flex justify-center p-4 font-serif shadow-lg items-center text-gray-700 select-none sticky top-0 bg-white opacity-95 border-b border-gray-50">
      <ul className="max-w-screen-lg w-full flex justify-between">
        {links.map(({ href, text }) => (
          <NavLink key={`${href}-${text}`} href={href}>
            {text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

function MobileNavbar({ links }: { links: { href: string; text: string }[] }) {
  const [open, setOpen] = React.useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <nav className="z-20 p-4 block md:hidden sticky top-0 bg-white shadow-lg font-serif border-b border-gray-50">
      <div className="flex justify-between">
        <Link href="/">
          <h1 className="text-xl lg:text-2xl font-bold w-40 text-black cursor-pointer">
            Luke & Jadi
          </h1>
        </Link>
        <button type="button" className="px-2 text-gray-700" onClick={toggleOpen}>
          <span className={`h-6 w-6 text-xl text-center font-bold font-sans ${open ? 'flex' : 'hidden'}`}>X</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${!open ? 'flex' : 'hidden'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <ul className={`pt-8 pb-4 ${open ? 'block' : 'hidden'}`}>
        {links.map(({ href, text }) => (
          <NavLink key={`${href}-${text}`} href={href} onClick={toggleOpen}>
            {text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

function Navbar() {
  return (
    <>
      <DesktopNavbar links={[...config.weddingLinks, ...config.guestLinks]} />
      <MobileNavbar links={[...config.weddingLinks, ...config.guestLinks]} />
    </>
  );
}

export default Navbar;
