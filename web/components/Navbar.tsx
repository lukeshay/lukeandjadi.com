import React from 'react';
import Link from 'next/link';

function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li className="px-0 md:px-2 lg:px-4 py-1 md:py-0">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-gray-700 hover:no-underline hover:opacity-75 text-base md:text-sm lg:text-base border-b-2 border-accent-500 p-2">
          {children}
        </a>
      </Link>
    </li>
  );
}

function DesktopNavbar({ links }: { links: { href: string; text: string }[] }) {
  return (
    <nav className="z-20 hidden md:flex justify-center p-4 font-serif shadow-lg items-center text-gray-700 select-none sticky top-0 bg-white opacity-95">
      <ul className="max-w-screen-lg w-full flex justify-between">
        {links.map(({ href, text }) => (
          <NavLink href={href}>{text}</NavLink>
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
    <nav className="z-20 p-4 block md:hidden sticky top-0 bg-white shadow-lg font-serif">
      <div className="flex justify-between">
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
              <NavLink key={`${href}-${text}`} href={href}>
                {text}
              </NavLink>
            ))}
          </ul>
          <div className="pt-4">
            <ul>
              <NavLink href="/account">RSVP</NavLink>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

function Navbar() {
  const links = [
    { href: '/', text: 'Home' },
    { href: '/#our-story', text: 'Our story' },
    { href: '/#wedding-party', text: 'Wedding party' },
    { href: '/#our-wedding', text: 'Our wedding' },
    { href: '/#registry', text: 'Registry' },
    { href: '/rsvp', text: 'RSVP' },
    { href: '/#guest-accommodations', text: 'Guest accommodations' },
  ];

  return (
    <>
      <DesktopNavbar links={links} />
      <MobileNavbar links={links} />
    </>
  );
}

export default Navbar;
