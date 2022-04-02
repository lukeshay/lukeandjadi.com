import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import config from '../client/config';
// eslint-disable-next-line node/no-unpublished-import
import campanile from '../public/images/campanile.jpg';
// eslint-disable-next-line node/no-unpublished-import
import cover from '../public/images/cover-photo.jpg';
import Container from '../components/containers/container';

type StaticImport = never;

const WeddingPartyMember = ({
  src,
  name,
  role,
  relation,
}: {
  src: StaticImport | string;
  name: string;
  role: string;
  relation: string;
}): JSX.Element => (
  <div className="col-span-1">
    <div className="flex w-full justify-center pb-4">
      <Image alt={name} className="w-full shadow-lg" src={src} />
    </div>
    <h2 className="pb-0.5 text-lg font-semibold text-gray-900">{name}</h2>
    <h3 className="uppercase text-gray-700">{role}</h3>
    <p className="text-sm text-gray-500">{relation}</p>
  </div>
);

const Divider = (): JSX.Element => <div className="my-8 w-full border-b border-accent-500" />;

const Header = ({
  children,
  id,
  className = '',
}: {
  children: string;
  id: string;
  className?: string;
}): JSX.Element => (
  <>
    <Divider />
    {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
    <a
      id={id}
      style={{
        display: 'block',
        position: 'relative',
        top: '-120px',
        visibility: 'hidden',
      }}
    />
    <h1 className={`"${className} pb-2 text-2xl font-bold md:pb-4 md:text-4xl`}>{children}</h1>
  </>
);

const SubHeader = ({ children, className = '' }: { children: string; className?: string }): JSX.Element => (
  <h2 className={`${className} py-2 text-xl font-bold md:py-4 md:text-3xl`}>{children}</h2>
);

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }): JSX.Element => (
  <div>
    <Header id={id}>{title}</Header>
    <div>{children}</div>
  </div>
);

const SubSection = ({
  title,
  children,
  className = '',
  subHeaderClassName = '',
  wrapperClassName = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  subHeaderClassName?: string;
  wrapperClassName?: string;
}): JSX.Element => (
  <div className={`mb-6 ${wrapperClassName}`}>
    <SubHeader className={subHeaderClassName}>{title}</SubHeader>
    <div className={className}>{children}</div>
  </div>
);

const RegistryLink = ({ href, children }: { href: string; children: React.ReactNode }): JSX.Element => (
  <a className="block" href={href} rel="noreferrer" target="_blank">
    {children}
  </a>
);

/* eslint-disable @typescript-eslint/no-require-imports,@typescript-eslint/no-unsafe-assignment,react/forbid-elements */
const Home = (): JSX.Element => (
  <Container>
    <div className="relative mt-6 text-center text-gray-100 md:-mt-8">
      <Image alt="Cover" className="w-full" data-test-id="banner" src={cover} />
      <div
        className="absolute top-1/2 left-1/2 select-none text-center font-cursive text-4xl md:text-6xl lg:text-7xl"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {'Luke & Jadi'}
        <p className="text-lg md:text-2xl lg:text-4xl">{config.date}</p>
        <p className="text-sm font-bold md:text-lg lg:text-2xl">
          {Math.trunc((new Date(2022, 7, 20).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) + 1} {'Days'}
        </p>
        <Link href="/rsvp" passHref prefetch>
          <button
            className="rounded bg-accent-500 px-4 py-2 font-serif text-base font-bold text-white shadow hover:no-underline md:text-lg lg:text-2xl"
            type="button"
          >
            {'RSVP'}
          </button>
        </Link>
      </div>
    </div>
    <Section id="our-story" title="Our Story">
      <span className="float-right hidden w-80 py-4 pl-4 md:inline-block">
        <Image alt="campanile" src={campanile} />
      </span>
      <p className="prose">
        {
          'Luke and I met in August 2017 on our second day at Iowa State. We lived on the same floor in Eaton Hall and hung out with the same friends. I started crushing on Luke within a week, even though for the first few days I could not remember his name and referred to him as “the guy who is always smiling.” If you know Luke, you know he is truly always smiling! Luke took a little longer to make up his mind because he said he did not know I was interested in him, despite my very obvious hints. ;) Luke will say they were not obvious at all. I invited Luke to the pool with our friends numerous times and he never did end up coming along… In September, Luke FINALLY asked me on a date, which was the Iowa vs. Iowa State game in Ames. We sat in the end zone together, and I remember the kiss cam went on the people in front of us and I was holding my breath thinking we were next. LOL. In October 2017, we started dating and two years later we moved in together. We will forever be grateful for Iowa State bringing us together and being the biggest part of our first four years together.'
        }
      </p>
      <span className="inline-block w-full py-4 md:hidden">
        <Image alt="campanile" src={campanile} />
      </span>
      <SubSection title="The Proposal">
        <p className="prose">
          {
            'At the end of April 2021, I asked Luke to take graduation pictures with me on campus. He was less than thrilled but agreed because I said his mom would want pictures. (Thanks Natalie!) On May 1st, we got ready to take a few pictures on central campus. My sister, Jaclyn, took pictures of us and at our last spot Luke suggested we take a picture without our caps and gowns on. I said we already had a few without them and we could be done. He suggested just one more with the campanile in the background. Next thing I knew, Luke was on a knee and asking me to marry him. I am pretty sure I had my mouth wide open for about 5 minutes! Jaclyn and I were both surprised but luckily she got some great pictures! I am so lucky that I get to marry such an amazing guy and I cannot wait for our future together!'
          }
        </p>
      </SubSection>
    </Section>
    <Section id="the-wedding" title="The Wedding">
      <div className="block w-full md:flex">
        <SubSection title="Ceremony" wrapperClassName="w-full md:w-1/2">
          <h3 className="text-lg font-semibold">{'Lutheran Church of Hope'}</h3>
          <address>
            <span className="mb-1">{'925 Jordan Creek Pkwy'}</span>
            <br />
            <span>{'West Des Moines, IA 50266'}</span>
          </address>
          <p className="py-2">
            <strong>{'Time:'}</strong> {'2:00 pm'}
          </p>
          <p className="text-sm text-gray-500">{'Enter through the chapel doors'}</p>
        </SubSection>
        <SubSection title="Reception" wrapperClassName="w-full md:w-1/2">
          <h3 className="text-lg font-semibold">{'The Conservatory'}</h3>
          <address>
            <span className="mb-1">{'315 E 5th St'}</span>
            <br />
            <span>{'Des Moines, IA 50309'}</span>
          </address>
          <p className="py-2">
            <strong>{'Time:'}</strong> {'4:30 pm'}
          </p>
          <p className="text-sm text-gray-500">{'Located above Westrum Optometry and Aviva Salon'}</p>
        </SubSection>
      </div>
    </Section>
    <Section id="guest-accommodations" title="Guest Accommodations">
      <SubSection className="block w-full md:flex" title="Hotels Within Walking Distance">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold">
            {'AC Hotel by Marriott - '}
            <span className="text-red-500">{'Fully Booked'}</span>
          </h3>
          <address>
            <span className="mb-1">{'401 E Grand Ave'}</span>
            <br />
            <span>{'Des Moines, IA 50309'}</span>
          </address>
          <a href="https://www.marriott.com/events/start.mi?id=1630435281687&key=GRP" rel="noreferrer" target="_blank">
            {'Book Here!'}
          </a>
        </div>
        <div className="w-full pt-2 md:w-1/2 md:pt-0">
          <h3 className="text-lg font-semibold">{'Embassy Suites by Hilton'}</h3>
          <address>
            <span className="mb-1">{'101 E Locust St'}</span>
            <br />
            <span>{'Des Moines, IA 50309'}</span>
          </address>
          <a
            href="https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=DSMDNES&groupCode=CESRSW&arrivaldate=2022-08-20&departuredate=2022-08-21&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT"
            rel="noreferrer"
            target="_blank"
          >
            {'Book Here!'}
          </a>
        </div>
      </SubSection>
      <SubSection title="Parking">
        <p className="prose">
          {
            'We recommend parking at the hotel if you are within walking distance. If you are not, the following parking lot will be available which is located across the street from The Conservatory.'
          }
        </p>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">{'LifeServe Blood Center'}</h3>
          <address>
            <span className="mb-1">{'431 E Locust St'}</span>
            <br />
            <span>{'Des Moines, IA 50309'}</span>
          </address>
        </div>
      </SubSection>
      <SubSection title="Time Between Ceremony and Reception">
        <p className="prose">
          {
            'This would be a great time to check in to your hotel or check out East Village. Some bars we recommend are:'
          }
        </p>
        <ul className="ml-4 list-inside list-disc text-gray-600">
          <li>{'Iowa Taproom'}</li>
          <li>{'The Republic on Grand'}</li>
          <li>{'Beechwood Lounge'}</li>
          <li>{'The New Northwestern'}</li>
        </ul>
      </SubSection>
    </Section>
    <Section id="registries" title="Registries">
      {config.registries.map((r) => (
        <RegistryLink href={r.href} key={r.href}>
          {r.text}
        </RegistryLink>
      ))}
    </Section>
    <Section id="wedding-party" title="Wedding Party">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        {config.weddingParty.groomsmen.map((pm) => (
          <WeddingPartyMember
            key={pm.name}
            name={pm.name}
            relation={pm.relation}
            role={pm.role}
            src={require(`../public/images/wedding-party${pm.img}`)}
          />
        ))}
        {config.weddingParty.bridesmaids.map((pm) => (
          <WeddingPartyMember
            key={pm.name}
            name={pm.name}
            relation={pm.relation}
            role={pm.role}
            src={require(`../public/images/wedding-party${pm.img}`)}
          />
        ))}
        {config.weddingParty.others.map((pm) => (
          <WeddingPartyMember
            key={pm.name}
            name={pm.name}
            relation={pm.relation}
            role={pm.role}
            src={require(`../public/images/wedding-party${pm.img}`)}
          />
        ))}
      </div>
      <SubSection className="grid grid-cols-1 gap-10 md:grid-cols-4" subHeaderClassName="pt-8" title="Ushers">
        {config.weddingParty.ushers.map((pm) => (
          <WeddingPartyMember
            key={pm.name}
            name={pm.name}
            relation={pm.relation}
            role={pm.role}
            src={require(`../public/images/wedding-party${pm.img}`)}
          />
        ))}
      </SubSection>
    </Section>
  </Container>
);
/* eslint-enable */

export default Home;
