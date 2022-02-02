import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PencilIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { withServerSideAuth } from '@clerk/nextjs/ssr';

import { RSVP } from '../../server/entities';
import { RSVPAttributes } from '../../types';
import AccountContainer from '../../components/AccountContainer';
import Button from '../../components/Button';
import logger from '../../server/logger';

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

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async () => {
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
  },
);

const AccountPage = ({
  rsvps,
  csv,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();

  React.useEffect(() => {
    if (rsvps.length === 0) {
      router.push('/account');
    }
  });

  const handleDownloadClick = () => {
    if (!csv) return;

    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');

    const date = new Date();

    downloadLink.download = `Wedding Guest List - ${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}.csv`;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();
  };

  return (
    <AccountContainer>
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
    </AccountContainer>
  );
};

export default AccountPage;
