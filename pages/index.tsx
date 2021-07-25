import React from 'react';
import Layout from '@/components/Layout';
import config from '@/client/config';
import Image from 'next/image';
import campanile from '../public/images/campanile.jpg';
import Container from '@/components/Container';

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
      <div className="pb-4 flex justify-center w-full">
        <Image src={src} alt={name} className="shadow-lg w-full" />
      </div>
      <h2 className="text-lg font-bold pb-0.5 text-gray-900">{name}</h2>
      <h3 className="uppercase text-gray-700">{role}</h3>
      <p className="text-sm text-gray-500">{relation}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-full border-b my-8 border-accent-500" />;
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
      <h1 className={`"${className} text-4xl font-bold pb-4`}>{children}</h1>
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
  return <h2 className={`${className} text-3xl font-bold py-4`}>{children}</h2>;
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
    <div className={wrapperClassName}>
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
        <div className="relative text-center text-white">
          <img
            src="/images/cover-photo.jpg"
            alt="Cover"
            className="rounded shadow-lg w-full"
          />
          <div
            className="absolute top-1/2 left-1/2 text-2xl md:text-4xl lg:text-7xl font-bold text-center select-none"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            Luke & Jadi
            <p className="text-lg md:text-2xl lg:text-4xl">{config.date}</p>
            <p className="text-sm md:text-lg lg:text-2xl">
              {Math.trunc(
                (new Date(`${config.date} 14:00:00`).getTime() -
                  new Date().getTime()) /
                  (1000 * 60 * 60 * 24),
              )}{' '}
              Days
            </p>
          </div>
        </div>
        <Section id="our-story" title="Our Story">
          <span className="hidden md:inline-block py-4 pl-4 w-80 float-right">
            <Image src={campanile} alt="campanile" />
          </span>
          Luke and I met in August 2017 on our second day at Iowa State. We
          lived on the same floor in Eaton Hall and hung out with the same
          friends. I started crushing on Luke within a week, even though for the
          first few days I couldn’t remember his name and referred to him as
          “the guy who is always smiling.” If you know Luke, you know he is
          truly always smiling! Luke took a little longer to make up his mind
          because he said he didn’t know I was interested in him, despite my
          very obvious hints. ;) Luke will say they were not obvious at all. I
          invited Luke to the pool with our friends numerous times and he never
          did end up coming along… In September, Luke FINALLY asked me on a
          date, which was the Iowa vs. Iowa State game in Ames. We sat in the
          end zone together, and I remember the kiss cam went on the people in
          front of us and I was holding my breath thinking we were next. LOL. In
          October 2017, we started dating and two years later we moved in
          together. We will forever be grateful for Iowa State bringing us
          together and being the biggest part of our first four years together.
          <span className="inline-block md:hidden py-4 w-full">
            <Image src={campanile} alt="campanile" />
          </span>
          <SubSection title="The Proposal">
            At the end of April 2021, I asked Luke to take graduation pictures
            with me on campus. He was less than thrilled but agreed because I
            said his mom would want pictures. (Thanks Natalie!) On May 1st, we
            got ready to take a few pictures on central campus. My sister,
            Jaclyn, took pictures of us and at our last spot Luke suggested we
            take a picture without our caps and gowns on. I said we already had
            a few without them and we could be done. He suggested just one more
            with the campanile in the background. Next thing I knew, Luke was on
            a knee and asking me to marry him. I am pretty sure I had my mouth
            wide open for about 5 minutes! Jaclyn and I were both surprised but
            luckily she got some great pictures! I am so lucky that I get to
            marry such an amazing guy and I cannot wait for our future together!
          </SubSection>
        </Section>
        <Section id="wedding-party" title="Wedding Party">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
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
            className="md:grid grid-cols-5 gap-10"
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
        <Section id="the-wedding" title="The Wedding">
          <div className="w-full block md:flex">
            <SubSection wrapperClassName="w-full md:w-1/2" title="Ceremony">
              <h3 className="text-lg font-bold">Lutheran Church of Hope</h3>
              <address>
                925 Jordan Creek Pkwy
                <br />
                West Des Moines, IA 50266
              </address>
              <p className="text-sm text-gray-500 pt-1">
                Enter through the chapel doors
              </p>
            </SubSection>
            <SubSection wrapperClassName="w-full md:w-1/2" title="Reception">
              <h3 className="text-lg font-bold">The Conservatory</h3>
              <address>
                315 E 5th St
                <br />
                Des Moines, IA 50309
              </address>
              <p className="text-sm text-gray-500 pt-1">
                Located above Westrum Optometry and Aviva Salon
              </p>
            </SubSection>
          </div>
        </Section>
        <Section id="guest-accommodations" title="Guest Accommodations">
          We ain&apos;t got none yet
        </Section>
        <Section id="registries" title="Registries">
          {config.registries.map((r) => (
            <RegistryLink key={r.href} href={r.href}>
              {r.text}
            </RegistryLink>
          ))}
        </Section>
      </Layout>
    </Container>
  );
}
