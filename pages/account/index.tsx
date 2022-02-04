import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PencilIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { toast } from 'react-toastify';

import { RSVP } from '../../server/entities';
import { RSVPAttributes } from '../../types';
import AccountContainer from '../../components/containers/account-container';
import Button from '../../components/button';
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

  const handleDownloadClick = (
    content: string,
    type: string,
    name: string,
    ext: string,
  ) => {
    const file = new Blob([content], { type });
    const downloadLink = document.createElement('a');

    const date = new Date();

    downloadLink.download = `${name} - ${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}.${ext}`;
    downloadLink.href = window.URL.createObjectURL(file);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();
  };

  const handleRSVPsDownloadClick = () => {
    if (!csv) return;

    handleDownloadClick(csv, 'text/csv', 'RSVPs', 'csv');
  };

  const handleDownloadChangesClick = async () => {
    try {
      const response = await fetch('/api/cdc/rsvps');
      const body = await response.json();

      handleDownloadClick(
        JSON.stringify(body, undefined, 2),
        'application/json',
        'Changes',
        'json',
      );
    } catch (e) {
      toast.error(`error downloading changes: ${(e as Error).message}`);
    }
  };

  return (
    <AccountContainer>
      <div className="flex items-center justify-between">
        <h1 className="px-2 py-4 text-3xl text-bold">RSVPs</h1>
        <div>
          <Button onClick={handleDownloadChangesClick}>Download Changes</Button>
        </div>
        {csv && (
          <div>
            <Button onClick={handleRSVPsDownloadClick}>Download Table</Button>
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
