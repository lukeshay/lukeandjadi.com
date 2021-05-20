import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { captureException } from '@sentry/nextjs';
import { setCookie, parseJWT } from '@ljw/auth';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { AccountRole, selectAccountByEmail } from '../../lib/entities/account';
import { accountPut } from '../../lib/client/api';
import config from '../../lib/client/config';
import AccountLayout from '../../components/AccountLayout';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let { token } = ctx.query;

  if (!token) {
    token = ctx.req.cookies.authorization;

    if (!token) {
      return { props: {} };
    }
  }

  setCookie(ctx.res, 'authorization', token);

  const payload = await parseJWT<{ email: string; role: AccountRole }>(
    token as string,
  );

  if (!payload) {
    return { props: {} };
  }

  try {
    return { props: await selectAccountByEmail(payload.email) };
  } catch (e) {
    captureException(e);
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
      alert(
        `There was an error updating your account. If the problem persists, please email ${config.email}`,
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
        <button
          type="submit"
          className="bg-accent-500 hover:opacity-75 text-gray-800 w-full my-2 p-3 rounded-lg shadow"
          disabled={loading}
        >
          Update
        </button>
      </Form>
    </AccountLayout>
  );
}
