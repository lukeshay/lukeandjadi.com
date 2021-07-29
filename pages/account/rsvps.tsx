import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { parseJWT, getCookie } from '@/server/auth';
import AccountLayout from '@/components/AccountLayout';
import { RSVP, RSVPAttributes } from '@/entities';
import { JWT_COOKIE_KEY, JWTPayload } from '@/server/jwt';
import PencilIconOutlined from '@/components/icons/PencilIconOutlined';
import Button from '@/components/Button';
import logger from '@/server/logger';
import AccountContainer from '@/components/AccountContainer';

const TableHeader = () => (
  <tr className="p-2 bg-gray-200">
    <th className="p-2 w-52 rounded-tl">Name</th>
    <th className="p-2 w-52">Email</th>
    <th className="p-2 w-52">Guests</th>
    <th className="p-2 w-52 rounded-tr">Edit</th>
  </tr>
);

const TableRow = ({ id, name, email, guests }: RSVPAttributes) => (
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
    <AccountContainer>
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
    </AccountContainer>
  );
}
