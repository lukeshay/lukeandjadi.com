import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { captureException } from '@sentry/nextjs';
import { parseJWT, getCookie } from '@ljw/auth';
import { AccountRole } from '../../lib/entities/account';
import AccountLayout from '../../components/AccountLayout';
import { selectAllRSVPs } from '../../lib/entities/rsvp';
import { JWT_COOKIE_KEY, JWTPayload } from '../../lib/server/jwt';

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
      <table className="rounded-lg shadow-lg">
        <tr className="p-2 bg-gray-400 text-white">
          <th className="p-2 w-52 rounded-tl-lg">Name</th>
          <th className="p-2 w-52">Email</th>
          <th className="p-2 w-52 rounded-tr-lg">Guests</th>
        </tr>
        {rsvps.map(({ id, name, email, guests }) => (
          <tr className="p-2 border-t" key={id}>
            <td className="p-2">{name}</td>
            <td className="p-2">{email}</td>
            <td className="p-2">{guests || 'Not set'}</td>
          </tr>
        ))}
      </table>
    </AccountLayout>
  );
}
