import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PencilIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { toast } from 'react-toastify';

import { RSVP } from '../../server/entities';
import type { CDCAttributes, RSVPAttributes } from '../../types';
import AccountContainer from '../../components/containers/account-container';
import Button from '../../components/button';
import logger from '../../server/logger';

const TableHeader = (): JSX.Element => (
  <tr className="bg-gray-200 p-2">
    <th className="w-52 rounded-tl p-2">{'Name'}</th>
    <th className="w-52 p-2">{'Email'}</th>
    <th className="w-52 p-2">{'Guests'}</th>
    <th className="w-52 rounded-tr p-2">{'Edit'}</th>
  </tr>
);

const TableRow = ({ id, name, email, guests }: RSVPAttributes): JSX.Element => (
  <tr className="border-t p-2" key={id}>
    <td className="p-2">{name}</td>
    <td className="p-2">{email ?? 'Not set'}</td>
    <td className="p-2">{guests}</td>
    <td className="flex items-center justify-center p-2">
      <Link
        href={`/rsvp/edit/${id}?redirectURI=/account/rsvps&message=${name}'s RSVP has been updated!&autoClose=true`}
        passHref
        prefetch
      >
        <button type="button" className="cursor-pointer rounded-full p-2 text-gray-500 ring-accent-500 hover:ring">
          <PencilIcon height={20} width={20} />
        </button>
      </Link>
    </td>
  </tr>
);

const getServerSideProps: GetServerSideProps<{ rsvps: RSVPAttributes[]; csv: string }> = withServerSideAuth(
  async () => {
    try {
      const rsvps = await RSVP.findAll({ order: [['name', 'ASC']] });

      const rows = rsvps.map((rsvp) => {
        const { id, name, email, guests } = rsvp.get();

        return `${id}, ${name}, ${email ?? ''}, ${guests}`;
      });

      return {
        props: {
          rsvps: rsvps.map((rsvp) => rsvp.get()),
          csv: `id, name, email, guests\n${rows.join('\n')}`,
        },
      };
    } catch (error) {
      logger.error(`error getting all rsvps: ${(error as Error).message}`, error);
    }

    return {
      props: {
        rsvps: [],
        csv: '',
      },
    };
  },
);

const handleDownloadClick = (content: string, type: string, name: string, ext: string): void => {
  const file = new Blob([content], { type });
  const downloadLink = document.createElement('a');

  const date = new Date();

  downloadLink.download = `${name} - ${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}.${ext}`;
  downloadLink.href = window.URL.createObjectURL(file);
  downloadLink.style.display = 'none';
  document.body.append(downloadLink);

  downloadLink.click();
};

const handleDownloadChangesClick = async (): Promise<void> => {
  try {
    const response = await fetch('/api/cdc/rsvps');
    const body = (await response.json()) as unknown as CDCAttributes[];

    handleDownloadClick(JSON.stringify(body, undefined, 2), 'application/json', 'Changes', 'json');
  } catch (error) {
    toast.error(`error downloading changes: ${(error as Error).message}`);
  }
};

const AccountPage = ({ rsvps, csv }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (!rsvps.length) {
      void router.push('/account');
    }
  });

  const handleRSVPsDownloadClick = (): void => {
    if (!csv) return;

    handleDownloadClick(csv, 'text/csv', 'RSVPs', 'csv');
  };

  return (
    <AccountContainer>
      <div className="flex items-center justify-between">
        <h1 className="text-bold px-2 py-4 text-3xl">{'RSVPs'}</h1>
        <div>
          <Button onClick={handleDownloadChangesClick}>{'Download Changes'}</Button>
        </div>
        {csv && (
          <div>
            <Button onClick={handleRSVPsDownloadClick}>{'Download Table'}</Button>
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

export { getServerSideProps };
export default AccountPage;
