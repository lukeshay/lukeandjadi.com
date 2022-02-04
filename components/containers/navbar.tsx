import React, { Fragment } from 'react';
import Link from 'next/link';
import config from '../../client/config';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Transition, Dialog } from '@headlessui/react';

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
    <li className="px-4 py-2 md:px-2 lg:px-4 md:py-0">
      <Link href={href}>
        <a
          className="px-0 py-2 text-base text-gray-700 border-b-2 outline-none select-none hover:no-underline hover:opacity-75 md:text-sm lg:text-base border-accent-500 md:px-2"
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
    <nav className="sticky top-0 z-20 items-center justify-center hidden p-4 font-serif text-gray-700 bg-white border-b border-gray-200 select-none md:flex opacity-95">
      <ul className="flex justify-between w-full max-w-screen-lg">
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
    <nav className="sticky top-0 z-20 block p-4 font-serif bg-white border-b shadow-lg md:hidden border-gray-50">
      <div className="flex justify-between">
        <Link href="/" passHref>
          <h1 className="w-40 text-xl font-bold text-black cursor-pointer lg:text-2xl">
            Luke & Jadi
          </h1>
        </Link>
        <button
          type="button"
          className="px-2 text-gray-700"
          onClick={toggleOpen}
        >
          {open ? (
            <XIcon height={24} width={24} />
          ) : (
            <MenuIcon height={24} width={24} />
          )}
        </button>
      </div>
      <Transition.Root as={Fragment} show={open}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={open}
          onClose={setOpen}
        >
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
                  <NavLink
                    key={`${href}-${text}`}
                    href={href}
                    onClick={toggleOpen}
                  >
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
}

function Navbar() {
  return (
    <>
      <DesktopNavbar links={config.links} />
      <MobileNavbar links={config.links} />
    </>
  );
}

export default Navbar;
