import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { parseJWT, getCookie } from '@/lib/server/auth';
import { AccountRole } from '@/lib/entities/account';
import AccountLayout from '@/components/AccountLayout';
import { RSVP, selectAllRSVPs } from '@/lib/entities/rsvp';
import { JWT_COOKIE_KEY, JWTPayload } from '@/lib/server/jwt';
import PencilIconOutlined from '@/components/icons/PencilIconOutlined';
import Button from '@/components/Button';
import logger from '@/lib/server/logger';

const TableHeader = () => (
  <tr className="p-2 bg-gray-200">
    <th className="p-2 w-52 rounded-tl">Name</th>
    <th className="p-2 w-52">Email</th>
    <th className="p-2 w-52">Guests</th>
    <th className="p-2 w-52 rounded-tr">Edit</th>
  </tr>
);

const TableRow = ({ id, name, email, guests }: RSVP) => (
  <tr className="p-2 border-t" key={id}>
    <td className="p-2">{name}</td>
    <td className="p-2">{email || 'Not set'}</td>
    <td className="p-2">{guests || 'Not set'}</td>
    <td className="p-2 flex justify-center items-center">
      <Link
        href={`/rsvp/edit/${id}?redirectURI=/account/rsvps&message=${name}'s RSVP has been updated!&autoClose=true`}
      >
        <a className="text-gray-500 cursor-pointer rounded-full p-2 border border-gray-50 hover:ring ring-accent-500 shadow-lg">
          <PencilIconOutlined size={24} />
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

  if (!payload || payload.role === AccountRole.Basic) {
    return { props: { rsvps: [] } };
  }

  try {
    const rsvps = (await selectAllRSVPs()).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });

    const rows = rsvps.map(
      ({ id, name, email, guests }) => `${id}, ${name}, ${email}, ${guests}`,
    );

    return {
      props: { rsvps, csv: `id, name, email, guests\n${rows.join('\n')}` },
    };
  } catch (e) {
    logger.error(`error getting all rsvps: ${e.message}`, e);
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
    <AccountLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-bold text-3xl py-4 px-2">RSVPs</h1>
        {csv && (
          <div>
            <Button onClick={handleDownloadClick}>Download</Button>
          </div>
        )}
      </div>
      <table className="rounded shadow-lg border border-gray-50">
        <thead>
          <TableHeader />
        </thead>
        <tbody>{rsvps.map(TableRow)}</tbody>
      </table>
    </AccountLayout>
  );
}
