import type { MouseEventHandler } from 'react';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Transition, Dialog } from '@headlessui/react';

import config from '../../client/config';

const NavLink = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => (
  <li className="px-4 py-2 md:px-2 lg:px-4 md:py-0">
    <Link href={href} passHref>
      <button
        className="px-0 py-2 text-base text-gray-700 border-b-2 outline-none select-none hover:no-underline hover:opacity-75 md:text-sm lg:text-base border-accent-500 md:px-2"
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    </Link>
  </li>
);

const DesktopNavbar = ({ links }: { links: { href: string; text: string }[] }): JSX.Element => (
  <nav className="sticky top-0 z-20 items-center justify-center hidden p-4 font-serif text-gray-700 bg-white border-b border-gray-200 select-none md:flex opacity-95">
    <ul className="flex justify-between w-full max-w-screen-lg">
      {links.map(({ href, text }) => (
        <NavLink href={href} key={`${href}-${text}`}>
          {text}
        </NavLink>
      ))}
    </ul>
  </nav>
);

const MobileNavbar = ({ links }: { links: { href: string; text: string }[] }): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  return (
    <nav className="sticky top-0 z-20 block p-4 font-serif bg-white border-b shadow-lg md:hidden border-gray-50">
      <div className="flex justify-between">
        <Link href="/" passHref>
          <h1 className="w-40 text-xl font-bold text-black cursor-pointer lg:text-2xl">{'Luke & Jadi'}</h1>
        </Link>
        <button className="px-2 text-gray-700" onClick={toggleOpen} type="button">
          {open ? <XIcon height={24} width={24} /> : <MenuIcon height={24} width={24} />}
        </button>
      </div>
      <Transition.Root as={Fragment} show={open}>
        <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen} open={open} static>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>
          </div>
          <div className="fixed inset-y-0 right-0 flex max-w-full pt-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <ul className="flex flex-col pt-8 pr-2 bg-white">
                {links.map(({ href, text }) => (
                  <NavLink href={href} key={`${href}-${text}`} onClick={toggleOpen}>
                    {text}
                  </NavLink>
                ))}
              </ul>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </nav>
  );
};

const Navbar = (): JSX.Element => (
  <>
    <DesktopNavbar links={config.links} />
    <MobileNavbar links={config.links} />
  </>
);

export default Navbar;
