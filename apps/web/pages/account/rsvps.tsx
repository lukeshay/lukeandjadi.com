import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { captureException } from '@sentry/nextjs';
import { parseJWT, getCookie } from '@ljw/auth';
import { AccountRole } from '../../lib/entities/account';
import AccountLayout from '../../components/AccountLayout';
import { RSVP, selectAllRSVPs } from '../../lib/entities/rsvp';
import { JWT_COOKIE_KEY, JWTPayload } from '../../lib/server/jwt';
import PencilIconOutlined from '../../components/icons/PencilIconOutlined';
import Link from 'next/link';

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
    <td className="p-2">{email}</td>
    <td className="p-2">{guests || 'Not set'}</td>
    <td className="p-2 flex justify-center items-center">
      <Link href={`/rsvp/edit/${id}?redirectURI=/account/rsvps`}>
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

  console.log(`jwt token: ${token}`);

  const payload = await parseJWT<JWTPayload>(token as string);

  if (!payload || payload.role === AccountRole.Basic) {
    return { props: { rsvps: [] } };
  }

  try {
    return { props: { rsvps: await selectAllRSVPs() } };
  } catch (e) {
    captureException(e);
  }

  return { props: { rsvps: [] } };
}

export default function AccountPage({
  rsvps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  React.useEffect(() => {
    if (rsvps.length === 0) {
      router.push('/account');
    }
  });

  return (
    <AccountLayout>
      <table className="rounded shadow-lg border border-gray-50">
        <TableHeader />
        {rsvps.map(TableRow)}
      </table>
    </AccountLayout>
  );
}
