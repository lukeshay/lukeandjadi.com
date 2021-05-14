import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Layout from '../../../components/Layout';
import { rsvpPut } from '../../../lib/client/api';
import config from '../../../lib/client/config';
import { getRecaptchaToken } from '../../../lib/client/recaptcha';
import { selectRSVPByID } from '../../../lib/entities/rsvp';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<{ id?: string }>,
) {
  if (!ctx.params?.id) {
    return { props: {} };
  }

  const { id } = ctx.params;

  try {
    return { props: await selectRSVPByID(id) };
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
      router.push('/rsvp');
    }
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const token = await getRecaptchaToken();
      const res = await rsvpPut({ ...values, token });
      setValues(res.data);
    } catch (e) {
      alert(
        `There was an error updating your account. If the problem persists, please email ${config.email}.`,
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
        title="RSVP"
        subTitle="Please fill out all required fields! This information will help us in planning for our wedding."
        onSubmit={handleSubmit}
      >
        <Input
          label="Name"
          id="name"
          name="name"
          autoComplete="name"
          onChange={handleChange}
          value={values.name}
          disabled
        />
        <Input
          label="Email"
          id="email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          value={values.email}
          disabled={loading}
        />
        <Input
          label="Guests"
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
