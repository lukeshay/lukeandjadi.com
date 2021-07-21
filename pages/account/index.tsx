import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { setCookie, parseJWT, getCookie } from '@/server/auth';
import Form from '@/components/Form';
import Input from '@/components/Input';
import { selectAccountByEmail } from '@/entities/account';
import { accountPut } from '@/client/api';
import config from '@/client/config';
import AccountLayout from '@/components/AccountLayout';
import { JWT_COOKIE_KEY, JWTPayload } from '@/server/jwt';
import Button from '@/components/Button';
import logger from '@/server/logger';

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
    return { props: await selectAccountByEmail(payload.email) };
  } catch (e) {
    logger.error(`error selecting account: ${e.message}`, e);
  }

  return { props: {} };
}

export default function AccountPage(props: any) {
  const [values, setValues] = React.useState<any>(props);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!props.id) {
      router.push('/account/signin');
    }
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await accountPut(values);
      setValues(res.data);
    } catch (e) {
      toast(
        `There was an error updating your account. If the problem persists, please email ${config.email}`,
        { type: 'error' },
      );
    }

    setLoading(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <AccountLayout>
      <Form
        title="Account"
        subTitle="Please fill out all required fields! This information will help us in planning for our wedding."
        onSubmit={handleSubmit}
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
        <Button type="submit" className="w-full" loading={loading}>
          Update
        </Button>
      </Form>
    </AccountLayout>
  );
}
