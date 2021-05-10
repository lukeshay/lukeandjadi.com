import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { setCookie } from '../../lib/be/cookie';
import { parseJWT } from '../../lib/be/jwt';
import { selectAccountByEmail } from '../../lib/entities/user';
import { accountPut } from '../../lib/fe/api';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let { token } = ctx.query;

  if (!token) {
    token = ctx.req.cookies.authorization;

    setCookie(ctx.res, 'authorization', token);

    if (!token) {
      return { props: {} };
    }
  }

  const email = await parseJWT(token as string);

  if (!email) {
    return { props: {} };
  }

  try {
    return { props: await selectAccountByEmail(email) };
  } catch (e) {
    console.error(e.message);
    return { props: {} };
  }
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
        'There was an error updating your account. If the problem persists, please email luke@lukeandjadi.com',
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
    <Layout>
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
        <Input
          label="First name"
          id="firstName"
          name="first-name"
          autoComplete="first-name"
          onChange={handleChange}
          value={values.firstName}
          disabled={loading}
        />
        <Input
          label="Last name"
          id="lastName"
          name="last-name"
          autoComplete="last-name"
          onChange={handleChange}
          value={values.lastName}
          disabled={loading}
        />
        <Input
          label="Number of guests"
          id="guests"
          name="guests"
          autoComplete="guests"
          onChange={handleChange}
          value={values.guests}
          disabled={loading}
          type="number"
        />
        <button
          type="submit"
          className="bg-accent-500 hover:opacity-75 text-gray-800 w-full my-2 p-3 rounded-lg shadow"
          disabled={loading}
        >
          Update
        </button>
      </Form>
    </Layout>
  );
}
