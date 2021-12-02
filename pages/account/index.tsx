import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';
import { setCookie, parseJWT, getCookie } from '@/server/auth';
import Form from '@/components/Form';
import Input from '@/components/Input';
import AccountLayout from '@/components/AccountLayout';
import { JWT_COOKIE_KEY, JWTPayload } from '@/server/jwt';
import logger from '@/server/logger';
import AccountContainer from '@/components/AccountContainer';
import { Account } from '@/entities';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let { token } = ctx.query;

  if (typeof token !== 'string') {
    token = getCookie(ctx.req, ctx.res, JWT_COOKIE_KEY);

    if (typeof token !== 'string') {
      return { props: {} };
    }
  }

  setCookie(ctx.req, ctx.res, JWT_COOKIE_KEY, token as string, {
    sameSite: 'strict',
    httpOnly: true,
    overwrite: true,
    path: '/',
  });

  const payload = await parseJWT<JWTPayload>(token as string);

  if (!payload) {
    return { props: {} };
  }

  try {
    const res = (
      await Account.findOne({ where: { email: payload.email } })
    )?.get();
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
}

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
