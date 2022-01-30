import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { config } from '../../config';
import { setCookie } from '../../server/auth';

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  setCookie(ctx.req, ctx.res, config.get('jwt.signIn.cookie'), '');

  return { props: {} };
}

export default function SignIn() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/');
  });

  return <></>;
}
