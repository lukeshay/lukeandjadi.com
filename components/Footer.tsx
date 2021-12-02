import config from '@/client/config';
import Link from 'next/link';

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      {external ? (
        <a
          className="text-gray-500"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link href={href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-gray-500">{children}</a>
        </Link>
      )}
    </li>
  );
}

FooterLink.defaultProps = {
  external: false,
};

export default function Footer() {
  return (
    <footer className="w-full h-24 py-8 mt-8 border-t">
      <div className="flex justify-center w-full">
        <div className="justify-between block w-full max-w-screen-lg px-2 sm:flex lg:px-0">
          <div>
            <h4 className="text-lg font-semibold">Wedding Information</h4>
            <ul>
              {config.weddingLinks.map(({ href, text }) => (
                <FooterLink key={`${href}-${text}`} href={href} external>
                  {text}
                </FooterLink>
              ))}
            </ul>
          </div>
          <div className="pt-4 sm:pt-0">
            <h4 className="text-lg font-semibold">Guest Information</h4>
            <ul>
              {config.guestLinks.map(({ href, text }) => (
                <FooterLink key={`${href}-${text}`} href={href} external>
                  {text}
                </FooterLink>
              ))}
            </ul>
          </div>
          <div className="pt-4 sm:pt-0">
            <h4 className="text-lg font-semibold">Registries</h4>
            <ul>
              {config.registries.map(({ href, text }) => (
                <FooterLink key={`${href}-${text}`} href={href} external>
                  {text}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full pt-10 pb-2 text-center">
        &#169;2021 Luke Shay and Jadi Reding
      </div>
      <div className="w-full pb-6 text-center">Built by Luke Shay</div>
    </footer>
  );
}
