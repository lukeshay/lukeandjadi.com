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
        <p>
          <span className="hidden md:inline-block py-4 pl-4 w-80 float-right">
            <img src="/campanile.jpg" alt="campanile" />
          </span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          maximus, urna vel vulputate tempor, diam metus rhoncus mauris, viverra
          volutpat odio leo eu purus. Nullam feugiat nibh posuere vulputate
          dapibus. Quisque ornare congue leo ac fringilla. Nam non diam
          ultrices, dapibus enim in, rhoncus erat. Nam nec justo lacinia massa
          volutpat convallis ut sit amet sapien. Sed at odio facilisis, varius
          eros ut, gravida nisi. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Vestibulum mollis ultricies
          tortor vitae porta. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Donec vehicula, purus
          porta lacinia lacinia, nibh diam sollicitudin nulla, pellentesque
          interdum arcu arcu nec erat. Fusce fringilla ullamcorper tellus, in
          facilisis mauris ultricies non. Donec dui orci, porta eu aliquet in,
          pharetra eu arcu. Curabitur pharetra quis massa ut sollicitudin. Cras
          at molestie quam.
          <br />
          <br />
          Cras sagittis ullamcorper diam, sed commodo enim rutrum in. Aliquam
          convallis eros vitae rhoncus hendrerit. Pellentesque vel dui eget
          neque ultrices sodales. Vestibulum quis viverra ante. Donec commodo
          cursus ipsum, sed dapibus dolor venenatis in. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Suspendisse volutpat tincidunt lorem quis aliquet. Nulla
          facilisi.
          <br />
          <br />
          Ut nisl metus, auctor id neque et, mollis pulvinar nibh. Nam in erat
          luctus, sodales lacus eget, sollicitudin urna. Proin vel cursus nisl.
          Vestibulum mauris purus, elementum vitae pellentesque in, dictum vel
          ex. Nullam in arcu ex. Donec varius viverra orci, eu congue ligula
          efficitur quis. Curabitur et libero vulputate, laoreet mauris eget,
          semper ante. Curabitur et ipsum a eros convallis maximus nec quis
          orci. Suspendisse finibus suscipit nulla, id dignissim sapien sagittis
          non. Vestibulum at risus vitae lacus tincidunt tempus. Aliquam nec
          felis eros. Maecenas vel leo libero. Nulla in placerat ante.
          Vestibulum nisi magna, volutpat at molestie in, suscipit quis diam.
          Aenean vulputate nisl ac purus rutrum efficitur.
          <br />
          <br />
          Aliquam rhoncus hendrerit volutpat. Nullam finibus vitae velit ut
          rhoncus. In et eleifend arcu, quis rhoncus massa. Morbi ac libero
          velit. Vestibulum eget nulla eu magna maximus aliquet a in nibh.
          Curabitur et rutrum urna. In elementum id turpis a condimentum.
          Aliquam vitae erat pretium, rutrum purus vitae, eleifend est.
          Curabitur pretium efficitur elementum. Suspendisse libero risus,
          iaculis ultricies dignissim ut, pellentesque a enim. Nullam faucibus,
          ligula vitae placerat commodo, arcu elit porttitor nisl, ut fringilla
          justo sem ac felis. Integer dictum, justo ac eleifend vestibulum,
          felis massa aliquet elit, a gravida quam ex ut enim.
          <br />
          <br />
          Proin tristique tortor tristique elit tempor, sed gravida risus
          facilisis. Cras sed iaculis tortor, sit amet faucibus dui. Sed
          sollicitudin vitae sem vel ullamcorper. Aenean vel hendrerit quam.
          Duis orci lorem, bibendum ac euismod a, viverra vestibulum velit.
          Vivamus aliquet purus vel neque blandit, at ultricies odio
          ullamcorper. Curabitur dignissim et nisi quis ornare. Morbi laoreet
          lectus nibh, vitae hendrerit nunc dapibus ac. Quisque eget ipsum at
          tellus tincidunt sodales vel ac justo. Etiam sed lectus in nibh
          posuere lacinia vitae nec justo. Nullam sodales felis ac urna
          sollicitudin, eget pharetra diam mollis. Pellentesque in dolor ligula.
          Quisque iaculis, risus id dignissim luctus, ex lectus vulputate orci,
          at sagittis massa arcu eget dolor. Aenean ac venenatis mi, et
          consectetur turpis. Sed vel enim eu dui venenatis dapibus hendrerit
          eget nulla.
        </p>
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