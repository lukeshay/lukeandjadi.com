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
  <li className="px-4 py-2 md:px-2 md:py-0 lg:px-4">
    <Link href={href} passHref>
      <button
        className="select-none border-b-2 border-accent-500 px-0 py-2 text-base text-gray-700 outline-none hover:no-underline hover:opacity-75 md:px-2 md:text-sm lg:text-base"
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    </Link>
  </li>
);

const DesktopNavbar = ({ links }: { links: { href: string; text: string }[] }): JSX.Element => (
  <nav className="sticky top-0 z-20 hidden select-none items-center justify-center border-b border-gray-200 bg-white p-4 font-serif text-gray-700 opacity-95 md:flex">
    <ul className="flex w-full max-w-screen-lg justify-between">
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
    <nav className="sticky top-0 z-20 block border-b border-gray-50 bg-white p-4 font-serif shadow-lg md:hidden">
      <div className="flex justify-between">
        <Link href="/" passHref>
          <h1 className="w-40 cursor-pointer text-xl font-bold text-black lg:text-2xl">{'Luke & Jadi'}</h1>
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
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <ul className="flex flex-col bg-white pt-8 pr-2">
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
