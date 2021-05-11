import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { setCookie } from '../../lib/server/cookie';

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  setCookie(ctx.res, 'authorization', '');

  return { props: {} };
}

export default function SignIn() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/');
  });

  return <></>;
}
