import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { setCookie } from '@/lib/server/auth';
import { JWT_COOKIE_KEY } from '@/lib/server/jwt';

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  setCookie(ctx.req, ctx.res, JWT_COOKIE_KEY, '');

  return { props: {} };
}

export default function SignIn() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/');
  });

  return <></>;
}
