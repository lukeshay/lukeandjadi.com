import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Layout from '../components/Layout';

function WeddingPartyMember({
  src,
  name,
  role,
  relation,
}: {
  src: string;
  name: string;
  role: string;
  relation: string;
}) {
  return (
    <div className="col-span-1">
      <div className="pb-4 flex justify-center w-full">
        <div>
          <img src={src} alt="Luke Shay" className="shadow-lg" />
        </div>
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

function Header({ children, id }: { children: string; id: string }) {
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
      <h1 className="text-4xl font-bold pb-4">{children}</h1>
    </>
  );
}

function SubHeader({ children }: { children: string }) {
  return <h2 className="text-3xl font-bold pb-4 pt-8">{children}</h2>;
}

function RegistryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a about="_blank" href={href}>
      {children}
    </a>
  );
}

interface Member {
  img: string;
  name: string;
  role: string;
  relation: string;
}

export async function getStaticProps() {
  const weddingPartyConfigPath = path.join(process.cwd(), 'wedding-party.json');
  const weddingPartyConfigFile = await fs.readFile(weddingPartyConfigPath);

  const weddingPartyConfig = JSON.parse(
    weddingPartyConfigFile.toString('utf-8'),
  ) as {
    groomsmen: Member[];
    bridesmaids: Member[];
    others: Member[];
    parents: Member[];
    grandparents: Member[];
    ushers: Member[];
  };

  return {
    props: {
      weddingPartyConfig,
    }, // will be passed to the page component as props
  };
}

export default function Home({
  weddingPartyConfig,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <img
        src="/cover-photo.jpg"
        alt="Cover"
        className="rounded shadow-lg w-full"
        data-test-id="banner"
      />
      <div className="w-full">
        <Header id="our-story">Our Story</Header>
        <div>
          <span className="hidden md:inline-block py-4 pl-4 w-80 float-right">
            <img src="/campanile.jpg" alt="campanile" />
          </span>
          <h2 className="text-3xl font-bold pb-4">How We Met</h2>
          <p>
            Luke and I met in August 2017 on our second day at Iowa State after
            moving into Eaton Hall. We lived on the same floor and hung out with
            the same friends. I started crushing on Luke within a week, even
            though for the first few days I couldn’t remember his name and
            referred to him as “the guy who is always smiling.” If you know
            Luke, you know he is truly always smiling! Luke took a little longer
            to make up his mind because he said he didn’t know I was interested
            in him, despite my very obvious hints. ;) I invited Luke to the pool
            with our friends numerous times and he never did end up coming
            along… In September, Luke FINALLY asked me on a date, which was the
            Iowa vs. Iowa State game in Ames. We sat in the end zone together
            and I remember the kiss cam went on the people in front of us and I
            was holding my breath thinking we were next. LOL. In October 2017,
            we started dating and two years later we moved in together. We will
            forever be grateful for Iowa State bringing us together and being
            the biggest part of our first four years together.
          </p>
          <SubHeader>The Proposal</SubHeader>
          <p>
            At the end of April 2021, I asked Luke to take graduation pictures
            with me on campus. He was less than thrilled but agreed because I
            said his mom would want pictures. (Thanks Natalie!) On May 1st, we
            got ready to take a few pictures on central campus. My sister,
            Jaclyn, took pictures of us and at our last spot Luke suggested we
            take a picture without our caps and gowns on. I said we already had
            a few without them and we could be done. He suggested just one more
            with the campanile in the background. Next thing I knew Luke was on
            a knee and asking me to marry him. I am pretty sure I had my mouth
            wide open for about 5 minutes! Jaclyn and I were both surprised but
            luckily she got some great pictures! I am so lucky that I get to
            marry such an amazing guy and I cannot wait for our future together!
          </p>
        </div>
      </div>
      <div className="w-full">
        <Header id="wedding-party">Wedding Party</Header>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {weddingPartyConfig.groomsmen.map((pm) => (
            <WeddingPartyMember
              key={pm.name}
              src={pm.img}
              name={pm.name}
              role={pm.role}
              relation={pm.relation}
            />
          ))}
          {weddingPartyConfig.bridesmaids.map((pm) => (
            <WeddingPartyMember
              key={pm.name}
              src={pm.img}
              name={pm.name}
              role={pm.role}
              relation={pm.relation}
            />
          ))}
          {weddingPartyConfig.others.map((pm) => (
            <WeddingPartyMember
              key={pm.name}
              src={pm.img}
              name={pm.name}
              role={pm.role}
              relation={pm.relation}
            />
          ))}
        </div>
        <SubHeader>Ushers</SubHeader>
        <div className="md:grid grid-cols-5 gap-10">
          {weddingPartyConfig.ushers.map((pm) => (
            <WeddingPartyMember
              key={pm.name}
              src={pm.img}
              name={pm.name}
              role={pm.role}
              relation={pm.relation}
            />
          ))}
        </div>
        <SubHeader>Parents</SubHeader>
        <div className="md:grid grid-cols-5 gap-10">
          {weddingPartyConfig.parents.map((pm) => (
            <WeddingPartyMember
              key={pm.name}
              src={pm.img}
              name={pm.name}
              role={pm.role}
              relation={pm.relation}
            />
          ))}
        </div>
      </div>
      <div className="w-full block md:flex">
        <div className="w-full md:w-1/2">
          <Header id="ceremony">Ceremony</Header>
          <p>1234 Address Street</p>
          <p>City, State 12345</p>
        </div>
        <div className="w-full md:w-1/2">
          <Header id="reception">Reception</Header>
          <p>1234 Address Street</p>
          <p>City, State 12345</p>
        </div>
      </div>
      <div className="w-full">
        <Header id="registry">Registry</Header>
        <div>
          <RegistryLink href="https://amazon.com">Amazon</RegistryLink>
        </div>
        <div>
          <RegistryLink href="https://target.com">Target</RegistryLink>
        </div>
        <div>
          <RegistryLink href="https://bedbathandbeyond.com">
            Bed, Bath & Beyond
          </RegistryLink>
        </div>
      </div>
    </Layout>
  );
}
