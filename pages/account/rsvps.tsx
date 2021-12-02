import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { parseJWT, getCookie } from '@/server/auth';
import AccountLayout from '@/components/AccountLayout';
import { RSVP } from '@/entities';
import { JWT_COOKIE_KEY, JWTPayload } from '@/server/jwt';
import { PencilIcon } from '@heroicons/react/outline';
import Button from '@/components/Button';
import logger from '@/server/logger';
import AccountContainer from '@/components/AccountContainer';
import { RSVPAttributes } from '@/types';

const TableHeader = () => (
  <tr className="p-2 bg-gray-200">
    <th className="p-2 rounded-tl w-52">Name</th>
    <th className="p-2 w-52">Email</th>
    <th className="p-2 w-52">Guests</th>
    <th className="p-2 rounded-tr w-52">Edit</th>
  </tr>
);

const TableRow = ({ id, name, email, guests }: RSVPAttributes) => (
  <tr className="p-2 border-t" key={id}>
    <td className="p-2">{name}</td>
    <td className="p-2">{email || 'Not set'}</td>
    <td className="p-2">{guests || 'Not set'}</td>
    <td className="flex items-center justify-center p-2">
      <Link
        href={`/rsvp/edit/${id}?redirectURI=/account/rsvps&message=${name}'s RSVP has been updated!&autoClose=true`}
      >
        <a className="p-2 text-gray-500 rounded-full cursor-pointer hover:ring ring-accent-500">
          <PencilIcon width={20} height={20} />
        </a>
      </Link>
    </td>
  </tr>
);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = getCookie(ctx.req, ctx.res, JWT_COOKIE_KEY);

  if (typeof token !== 'string') {
    return { props: { rsvps: [] } };
  }

  const payload = await parseJWT<JWTPayload>(token as string);

  if (!payload || payload.role === 'BASIC') {
    return { props: { rsvps: [] } };
  }

  try {
    const rsvps = await RSVP.findAll({ order: [['name', 'ASC']] });

    const rows = rsvps.map((rsvp) => {
      const { id, name, email, guests } = rsvp.get();
      return `${id}, ${name}, ${email}, ${guests}`;
    });

    return {
      props: {
        rsvps: rsvps.map((rsvp) => ({
          ...rsvp.get(),
          createdAt: null,
          updatedAt: null,
        })),
        csv: `id, name, email, guests\n${rows.join('\n')}`,
      },
    };
  } catch (e) {
    logger.error(`error getting all rsvps: ${(e as Error).message}`, e);
  }

  return { props: { rsvps: [] } };
}

export default function AccountPage({
  rsvps,
  csv,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  React.useEffect(() => {
    if (rsvps.length === 0) {
      router.push('/account');
    }
  });

  function handleDownloadClick() {
    if (!csv) return;

    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');

    const date = new Date();

    downloadLink.download = `Wedding Guest List - ${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}.csv`;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }

  return (
    <AccountContainer>
      <AccountLayout>
        <div className="flex items-center justify-between">
          <h1 className="px-2 py-4 text-3xl text-bold">RSVPs</h1>
          {csv && (
            <div>
              <Button onClick={handleDownloadClick}>Download</Button>
            </div>
          )}
        </div>
        <table className="border border-gray-200">
          <thead>
            <TableHeader />
          </thead>
          <tbody>{rsvps.map(TableRow)}</tbody>
        </table>
      </AccountLayout>
    </AccountContainer>
  );
}
