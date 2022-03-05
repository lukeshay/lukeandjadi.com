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

const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async (context) => {
    const { user } = context;

    if (!user) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

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
  },
  {
    loadSession: true,
    loadUser: true,
  },
);

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
          <tr className="bg-gray-200 p-2">
            <th className="w-16 rounded-tl p-2" />
            <th className="w-52 p-2">{'Name'}</th>
            <th className="w-52 p-2">{'Edited'}</th>
            <th className="w-52 p-2">{'Email'}</th>
            <th className="w-52 p-2">{'Guests'}</th>
            <th className="w-52 p-2">{'Max Guests'}</th>
            <th className="w-52 rounded-tr p-2">{'Edit'}</th>
          </tr>
        </thead>
        <tbody>{rsvps.map(RSVPTableRow)}</tbody>
        <tfoot>
          <tr className="bg-gray-200 p-2">
            <th className="w-52 rounded-bl p-2" />
            <th className="w-52 p-2">{'Totals'}</th>
            <th className="w-52 p-2">{totalEdited}</th>
            <th className="w-52 p-2" />
            <th className="w-52 p-2">{totalGuests}</th>
            <th className="w-52 p-2">{totalMaxGuests}</th>
            <th className="w-52 rounded-br p-2" />
          </tr>
        </tfoot>
      </table>
    </AccountContainer>
  );
};

export { getServerSideProps };
export default AccountPage;
