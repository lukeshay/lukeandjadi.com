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
    return { props: {} };
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

export default function AccountPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  React.useEffect(() => {
    if (props.rsvps.length === 0) {
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
        {props.rsvps.map((e) => (
          <tr className="p-2 border-t" key={e.id}>
            <td className="p-2">{e.name}</td>
            <td className="p-2">{e.email}</td>
            <td className="p-2">{e.guests || 'Not set'}</td>
          </tr>
        ))}
      </table>
    </AccountLayout>
  );
}
