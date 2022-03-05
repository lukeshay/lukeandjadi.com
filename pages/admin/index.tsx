import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import React, { useEffect } from 'react';
import type { GetServerSideProps } from 'next';

import { RSVP, RSVPVariant } from '../../server/entities';
import { serialize } from '../../server/utils/entity-util';
import AccountContainer from '../../components/containers/account-container';
import Button from '../../components/button';
import logger from '../../server/infrastructure/logger';
import RSVPTableRow from '../../components/admin/rsvp-table-row';
import type { CDCAttributes, SerializedRSVPAttributes } from '../../types';
import { downloadFile } from '../../client/file-downloads';

const getServerSideProps: GetServerSideProps = withServerSideAuth(async () => {
  try {
    const rsvps = await RSVP.findAll({
      include: {
        as: 'variants',
        model: RSVPVariant,
      },
      order: [['name', 'ASC']],
    });

    let totalGuests = 0;
    let totalMaxGuests = 0;
    let totalEdited = 0;

    const rows = rsvps.map((rsvp) => {
      const { id, name, email, guests, maxGuests, changed, updatedAt } = serialize(rsvp.get());

      totalGuests += guests;
      totalMaxGuests += maxGuests;

      if (changed) {
        totalEdited++;
      }

      return [id, name, changed, email, guests, maxGuests, updatedAt].join(', ');
    });

    const csvRows = [
      ['ID', 'Name', 'Edited', 'Email', 'Guests', 'Max Guests', 'Updated At'].join(', '),
      ...rows,
      ['Totals', '', totalEdited, '', totalGuests, totalMaxGuests, ''].join(', '),
    ];

    return {
      props: {
        csv: csvRows.join('\n'),
        rsvps: rsvps.map((rsvp) => serialize(rsvp.get({ plain: true }))),
        totalEdited,
        totalGuests,
        totalMaxGuests,
      },
    };
  } catch (error) {
    logger.error(`error getting all rsvps: ${(error as Error).message}`, error);
  }

  return {
    props: {
      csv: '',
      rsvps: [],
    },
  };
});

const handleDownloadChangesClick = async (): Promise<void> => {
  try {
    const response = await fetch('/api/cdc/rsvps');
    const body = (await response.json()) as unknown as CDCAttributes[];

    downloadFile(JSON.stringify(body, undefined, 2), 'application/json', 'Changes', 'json');
  } catch (error) {
    toast.error(`error downloading changes: ${(error as Error).message}`);
  }
};

type AccountPageProps = {
  csv: string;
  rsvps: SerializedRSVPAttributes[];
  totalGuests: number;
  totalMaxGuests: number;
  totalEdited: number;
};

const AccountPage = ({ rsvps, csv, totalGuests, totalMaxGuests, totalEdited }: AccountPageProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (!rsvps.length) {
      void router.push('/account');
    }
  });

  const handleRSVPsDownloadClick = (): void => {
    if (!csv) return;

    downloadFile(csv, 'text/csv', 'RSVPs', 'csv');
  };

  return (
    <AccountContainer>
      <div className="flex max-w-6xl items-center justify-between">
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
      <div className="w-full max-w-6xl rounded border border-gray-200">
        <div className="grid grid-cols-10  gap-2 rounded-t bg-gray-200">
          <p className="col-span-3 rounded-tl p-2 text-center">{'Name'}</p>
          <p className="col-span-1 p-2 text-center">{'Edited'}</p>
          <p className="col-span-3 p-2 text-center">{'Email'}</p>
          <p className="col-span-1 p-2 text-center">{'Guests'}</p>
          <p className="col-span-2 rounded-tr p-2 text-center">{'Max Guests'}</p>
        </div>
        <div className="border-collapse">{rsvps.map(RSVPTableRow)}</div>
        <div className="grid grid-cols-10  gap-2 rounded-b bg-gray-200">
          <p className="col-span-3 rounded-bl p-2">{'Totals'}</p>
          <p className="col-span-1 p-2 text-center">{totalEdited}</p>
          <p className="col-span-3 p-2 text-center" />
          <p className="col-span-1 p-2 text-center">{totalGuests}</p>
          <p className="col-span-2 rounded-br p-2 text-center">{totalMaxGuests}</p>
        </div>
      </div>
    </AccountContainer>
  );
};

export { getServerSideProps };
export default AccountPage;
