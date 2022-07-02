import {useSession} from '@clerk/nextjs';
import Link from 'next/link';
import type {ReactNode} from 'react';

import config from '../../client/config';

const FooterLink = ({
    href,
    children,
    external = false,
}: {
    href: string;
    children: ReactNode;
    external?: boolean;
}): JSX.Element => (
    <li>
        {external ? (
            <a className="text-gray-500" href={href} rel="noreferrer" target="_blank">
                {children}
            </a>
        ) : (
            <Link href={href}>
                {}
                <a className="text-gray-500">{children}</a>
            </Link>
        )}
    </li>
);

const Footer = (): JSX.Element => {
    const {isSignedIn} = useSession();

    return (
        <footer className="mt-8 h-24 w-full border-t py-8">
            <div className="flex w-full justify-center">
                <div className="block w-full max-w-screen-lg justify-between px-2 sm:flex lg:px-0">
                    <div>
                        <h4 className="text-lg font-semibold">{'Wedding Information'}</h4>
                        <ul>
                            {config.weddingLinks.map(({href, text}) => (
                                <FooterLink external href={href} key={`${href}-${text}`}>
                                    {text}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-4 sm:pt-0">
                        <h4 className="text-lg font-semibold">{'Guest Information'}</h4>
                        <ul>
                            {config.guestLinks.map(({href, text}) => (
                                <FooterLink external href={href} key={`${href}-${text}`}>
                                    {text}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-4 sm:pt-0">
                        <h4 className="text-lg font-semibold">{'Registries'}</h4>
                        <ul>
                            {config.registries.map(({href, text}) => (
                                <FooterLink external href={href} key={`${href}-${text}`}>
                                    {text}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full pt-10 pb-2 text-center">&#169;{'2022 Luke Shay and Jadi Reding'}</div>
            <div className="w-full pb-6 text-center">{'Built by Luke Shay'}</div>
            <div className="w-full pb-6 text-center">
                <Link href={isSignedIn ? '/admin' : '/signin'}>{'Admin'}</Link>
            </div>
        </footer>
    );
};

export default Footer;
