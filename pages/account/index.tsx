import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

import { config } from '../../config';
import { setCookie, getCookie } from '../../server/auth';
import AccountContainer from '../../components/AccountContainer';
import AccountLayout from '../../components/AccountLayout';
import Form from '../../components/Form';
import Input from '../../components/Input';
import logger from '../../server/logger';
import { parseAccountJWT } from 'server/services/jwt-service';
import { getAccount } from 'server/services/account-service';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let { token } = ctx.query;

  if (typeof token !== 'string') {
    token = getCookie(ctx.req, ctx.res, config.get('jwt.signIn.cookie'));

    if (typeof token !== 'string') {
      return { props: {} };
    }
  }

  setCookie(ctx.req, ctx.res, config.get('jwt.signIn.cookie'), token, {
    sameSite: 'strict',
    httpOnly: true,
    overwrite: true,
    path: '/',
    maxAge: config.get('jwt.signIn.salt.ttl') * 1000,
  });

  const payload = await parseAccountJWT(token);

  if (!payload) {
    return { props: {} };
  }

  try {
    const res = await getAccount({ email: payload.email });

    return {
      props: res
        ? {
            ...res,
            updatedAt: null,
            createdAt: null,
          }
        : {},
    };
  } catch (e) {
    logger.error(`error selecting account: ${(e as Error).message}`, e);
  }

  return { props: {} };
};

export default function AccountPage(props: any) {
  const [values] = React.useState<any>(props);
  const router = useRouter();

  React.useEffect(() => {
    if (!props.id) {
      router.push('/account/signin');
    }
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleChange() {}

  return (
    <AccountContainer>
      <AccountLayout>
        <Form
          title="Account"
          subTitle="Please fill out all required fields! This information will help us in planning for our wedding."
          onSubmit={handleSubmit}
          notSplit
        >
          <Input
            label="Email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={values.email}
            disabled
          />
        </Form>
      </AccountLayout>
    </AccountContainer>
  );
}
