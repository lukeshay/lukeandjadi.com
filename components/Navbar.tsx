import React from 'react';
import Link from 'next/link';
import UserIconOutline from './icons/UserIconOutline';

function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li className="px-0 md:px-3 lg:px-6 py-1 md:py-0 hover:text-gray-500 text-base md:text-sm lg:text-base">
      <Link href={href}>{children}</Link>
    </li>
  );
}

function DesktopNavbar({ links }: { links: { href: string; text: string }[] }) {
  return (
    <nav className="hidden md:flex justify-between uppercase p-4 shadow-lg items-center text-gray-700 select-none sticky top-0 bg-white opacity-95">
      <Link href="/">
        <h1 className="text-xl lg:text-2xl font-bold w-40 text-black cursor-pointer">
          Luke & Jadi
        </h1>
      </Link>
      <ul className="flex">
        {links.map(({ href, text }) => (
          <NavLink href={href}>{text}</NavLink>
        ))}
      </ul>
      <div className="w-40 flex justify-end">
        <div className="hover:text-gray-500 flex cursor-pointer">
          <Link href="/account">
            <UserIconOutline size={34} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function MobileNavbar({ links }: { links: { href: string; text: string }[] }) {
  const [open, setOpen] = React.useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <nav className="p-4 block md:hidden sticky top-0 bg-white shadow-lg">
      <div className="flex justify-between uppercase">
        <Link href="/">
          <h1 className="text-xl lg:text-2xl font-bold w-40 text-black cursor-pointer">
            Luke & Jadi
          </h1>
        </Link>
        <button type="button" className="px-2" onClick={toggleOpen}>
          X
        </button>
      </div>
      {open && (
        <>
          <ul className="py-4 border-b">
            {links.map(({ href, text }) => (
              <NavLink href={href}>{text}</NavLink>
            ))}
          </ul>
          <div className="pt-4">
            <Link href="/account">
              <UserIconOutline size={34} />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

function Navbar() {
  const links = [
    { href: '#wedding-party', text: 'Wedding party' },
    { href: '#ceremony', text: 'Ceremony' },
    { href: '#reception', text: 'Reception' },
    { href: '#registry', text: 'Registry' },
  ];

  return (
    <>
      <DesktopNavbar links={links} />
      <MobileNavbar links={links} />
    </>
  );
}

export default Navbar;
