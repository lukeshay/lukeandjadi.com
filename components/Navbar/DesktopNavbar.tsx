import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href}>
      <a
        className={`${className} text-gray-800 font-bold p-3 hover:no-underline hover:bg-gray-100 hover:bg-opacity-80 rounded-lg hover:bg-accent-500 transition duration-100 ease-in-out`}
      >
        {children}
      </a>
    </Link>
  );
}

function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Menu.Item>
      {() => (
        <NavLink
          href={href}
          className="w-full group flex items-center px-2 py-2"
        >
          {children}
        </NavLink>
      )}
    </Menu.Item>
  );
}

function MenuDiv({
  children,
  label,
}: {
  children: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center items-center w-full px-3 font-bold focus:outline-none hover:bg-accent-500 rounded-lg h-[45px]">
        {label}
        <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg focus:outline-none bg-opacity-95">
          <div className="px-1 py-1 ">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function Nav() {
  return (
    <nav className="hidden md:block z-20 select-none sticky top-0 py-3 bg-white opacity-95 items-center font-medium text-lg">
      <div className="flex flex-direct-col justify-between px-2 w-full max-w-screen-lg mx-auto items-center">
        <ul className="flex flex-direction-col justify-between items-center">
          <li>
            <NavLink href="/#our-story">Our Story</NavLink>
          </li>
          <li>
            <NavLink href="/#wedding-party">Wedding Party</NavLink>
          </li>
          <li>
            <MenuDiv label="The Wedding">
              <MenuItem href="/#the-wedding">Ceremony</MenuItem>
              <MenuItem href="/#the-wedding">Reception</MenuItem>
              <MenuItem href="/#guest-accommodations">
                Guest Accommodations
              </MenuItem>
            </MenuDiv>
          </li>
          <li>
            <MenuDiv label="Registries">
              <MenuItem href="https://www.amazon.com/wedding/share/lukeandjadi">
                Amazon
              </MenuItem>
              <MenuItem href="https://tgt.gifts/jadiandluke">Target</MenuItem>
              <MenuItem href="https://www.zola.com/registry/lukeandjadi">
                Zola Cash Funds
              </MenuItem>
            </MenuDiv>
          </li>
        </ul>
        <Link href="/rsvp">
          <a className="bg-accent-500 text-gray-800 py-3 px-6 rounded-lg hover:no-underline hover:bg-opacity-80 ease-in-out">
            RSVP
          </a>
        </Link>
      </div>
    </nav>
  );
}
