import React from 'react';
import Layout from '@/components/Layout';
import config from '@/client/config';
import Image from 'next/image';
import campanile from '../public/images/campanile.jpg';
import Container from '@/components/Container';
import Link from 'next/link';

function WeddingPartyMember({
  src,
  name,
  role,
  relation,
}: {
  src: any;
  name: string;
  role: string;
  relation: string;
}) {
  return (
    <div className="col-span-1">
      <div className="flex justify-center w-full pb-4">
        <Image src={src} alt={name} className="w-full shadow-lg" />
      </div>
      <h2 className="text-lg font-semibold pb-0.5 text-gray-900">{name}</h2>
      <h3 className="text-gray-700 uppercase">{role}</h3>
      <p className="text-sm text-gray-500">{relation}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-full my-8 border-b border-accent-500" />;
}

function Header({
  children,
  id,
  className,
}: {
  children: string;
  id: string;
  className?: string;
}) {
  return (
    <>
      <Divider />
      {/* eslint-disable-next-line */}
      <a
        id={id}
        style={{
          display: 'block',
          position: 'relative',
          top: '-120px',
          visibility: 'hidden',
        }}
      />
      <h1
        className={`"${className} text-2xl md:text-4xl font-bold pb-2 md:pb-4`}
      >
        {children}
      </h1>
    </>
  );
}

Header.defaultProps = {
  className: '',
};

function SubHeader({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2 className={`${className} text-xl md:text-3xl font-bold py-2 md:py-4`}>
      {children}
    </h2>
  );
}

SubHeader.defaultProps = {
  className: '',
};

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div>
      <Header id={id}>{title}</Header>
      <div>{children}</div>
    </div>
  );
}

function SubSection({
  title,
  children,
  className,
  subHeaderClassName,
  wrapperClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  subHeaderClassName?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={`mb-6 ${wrapperClassName}`}>
      <SubHeader className={subHeaderClassName}>{title}</SubHeader>
      <div className={className}>{children}</div>
    </div>
  );
}

SubSection.defaultProps = {
  className: '',
  subHeaderClassName: '',
  wrapperClassName: '',
};

function RegistryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a target="_blank" href={href} className="block" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <Container>
      <Layout>
        <div className="relative mt-16 text-center text-gray-100 md:mt-16">
          <img
            src="/images/cover-photo.jpg"
            alt="Cover"
            className="w-full"
            data-test-id="banner"
          />
          <div
            className="absolute text-4xl text-center select-none font-cursive top-1/2 left-1/2 md:text-6xl lg:text-7xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            Luke & Jadi
            <p className="text-lg md:text-2xl lg:text-4xl">{config.date}</p>
            <p className="text-sm font-bold md:text-lg lg:text-2xl">
              {Math.trunc(
                (new Date(2022, 7, 20).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24),
              ) + 1}{' '}
              Days
            </p>
            <Link href="/rsvp">
              <a className="px-4 py-2 font-serif text-base font-bold text-white rounded shadow hover:no-underline md:text-lg lg:text-2xl bg-accent-500">
                RSVP
              </a>
            </Link>
          </div>
        </div>
        <Section id="our-story" title="Our Story">
          <span className="hidden float-right py-4 pl-4 md:inline-block w-80">
            <Image src={campanile} alt="campanile" />
          </span>
          <p className="prose">
            Luke and I met in August 2017 on our second day at Iowa State. We
            lived on the same floor in Eaton Hall and hung out with the same
            friends. I started crushing on Luke within a week, even though for
            the first few days I couldn’t remember his name and referred to him
            as “the guy who is always smiling.” If you know Luke, you know he is
            truly always smiling! Luke took a little longer to make up his mind
            because he said he didn’t know I was interested in him, despite my
            very obvious hints. ;) Luke will say they were not obvious at all. I
            invited Luke to the pool with our friends numerous times and he
            never did end up coming along… In September, Luke FINALLY asked me
            on a date, which was the Iowa vs. Iowa State game in Ames. We sat in
            the end zone together, and I remember the kiss cam went on the
            people in front of us and I was holding my breath thinking we were
            next. LOL. In October 2017, we started dating and two years later we
            moved in together. We will forever be grateful for Iowa State
            bringing us together and being the biggest part of our first four
            years together.
          </p>
          <span className="inline-block w-full py-4 md:hidden">
            <Image src={campanile} alt="campanile" />
          </span>
          <SubSection title="The Proposal">
            <p className="prose">
              At the end of April 2021, I asked Luke to take graduation pictures
              with me on campus. He was less than thrilled but agreed because I
              said his mom would want pictures. (Thanks Natalie!) On May 1st, we
              got ready to take a few pictures on central campus. My sister,
              Jaclyn, took pictures of us and at our last spot Luke suggested we
              take a picture without our caps and gowns on. I said we already
              had a few without them and we could be done. He suggested just one
              more with the campanile in the background. Next thing I knew, Luke
              was on a knee and asking me to marry him. I am pretty sure I had
              my mouth wide open for about 5 minutes! Jaclyn and I were both
              surprised but luckily she got some great pictures! I am so lucky
              that I get to marry such an amazing guy and I cannot wait for our
              future together!
            </p>
          </SubSection>
        </Section>
        <Section id="the-wedding" title="The Wedding">
          <div className="block w-full md:flex">
            <SubSection wrapperClassName="w-full md:w-1/2" title="Ceremony">
              <h3 className="text-lg font-semibold">Lutheran Church of Hope</h3>
              <address>
                925 Jordan Creek Pkwy
                <br />
                West Des Moines, IA 50266
              </address>
              <p className="py-2">
                <strong>Time:</strong> 2:00 pm
              </p>
              <p className="text-sm text-gray-500">
                Enter through the chapel doors
              </p>
            </SubSection>
            <SubSection wrapperClassName="w-full md:w-1/2" title="Reception">
              <h3 className="text-lg font-semibold">The Conservatory</h3>
              <address>
                315 E 5th St
                <br />
                Des Moines, IA 50309
              </address>
              <p className="py-2">
                <strong>Time:</strong> 4:30 pm
              </p>
              <p className="text-sm text-gray-500">
                Located above Westrum Optometry and Aviva Salon
              </p>
            </SubSection>
          </div>
        </Section>
        <Section id="guest-accommodations" title="Guest Accommodations">
          <SubSection
            title="Hotels Within Walking Distance"
            className="block w-full md:flex"
          >
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-semibold">AC Hotel by Marriott</h3>
              <address>
                401 E Grand Ave
                <br />
                Des Moines, IA 50309
              </address>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.marriott.com/events/start.mi?id=1630435281687&key=GRP"
              >
                Book Here!
              </a>
            </div>
            <div className="w-full pt-2 md:w-1/2 md:pt-0">
              <h3 className="text-lg font-semibold">
                Embassy Suites by Hilton
              </h3>
              <address>
                101 E Locust St
                <br />
                Des Moines, IA 50309
              </address>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=DSMDNES&groupCode=CESRSW&arrivaldate=2022-08-20&departuredate=2022-08-21&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT"
              >
                Book Here!
              </a>
            </div>
          </SubSection>
          <SubSection title="Parking">
            <p className="prose">
              We recommend parking at the hotel if you are within walking
              distance. If you are not, the following parking lot will be
              available which is located across the street from The
              Conservatory.
            </p>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">LifeServe Blood Center</h3>
              <address>
                431 E Locust St
                <br />
                Des Moines, IA 50309
              </address>
            </div>
          </SubSection>
          <SubSection title="Time Between Ceremony and Reception">
            <p className="prose">
              This would be a great time to check in to your hotel or check out
              East Village. Some bars we recommend are:
            </p>
            <ul className="ml-4 text-gray-600 list-disc list-inside">
              <li>Iowa Taproom</li>
              <li>The Republic on Grand</li>
              <li>Beechwood Lounge</li>
              <li>The New Northwestern</li>
            </ul>
          </SubSection>
        </Section>
        <Section id="registries" title="Registries">
          {config.registries.map((r) => (
            <RegistryLink key={r.href} href={r.href}>
              {r.text}
            </RegistryLink>
          ))}
        </Section>
        <Section id="wedding-party" title="Wedding Party">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {config.weddingParty.groomsmen.map((pm) => (
              <WeddingPartyMember
                key={pm.name}
                src={require(`../public/images/wedding-party${pm.img}`)}
                name={pm.name}
                role={pm.role}
                relation={pm.relation}
              />
            ))}
            {config.weddingParty.bridesmaids.map((pm) => (
              <WeddingPartyMember
                key={pm.name}
                src={require(`../public/images/wedding-party${pm.img}`)}
                name={pm.name}
                role={pm.role}
                relation={pm.relation}
              />
            ))}
            {config.weddingParty.others.map((pm) => (
              <WeddingPartyMember
                key={pm.name}
                src={require(`../public/images/wedding-party${pm.img}`)}
                name={pm.name}
                role={pm.role}
                relation={pm.relation}
              />
            ))}
          </div>
          <SubSection
            title="Ushers"
            className="grid grid-cols-1 gap-10 md:grid-cols-4"
            subHeaderClassName="pt-8"
          >
            {config.weddingParty.ushers.map((pm) => (
              <WeddingPartyMember
                key={pm.name}
                src={require(`../public/images/wedding-party${pm.img}`)}
                name={pm.name}
                role={pm.role}
                relation={pm.relation}
              />
            ))}
          </SubSection>
        </Section>
      </Layout>
    </Container>
  );
}
