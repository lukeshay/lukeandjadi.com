import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { rsvpPut } from '@/client/api';
import config from '@/client/config';
import { getRecaptchaToken } from '@/client/recaptcha';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { RSVP } from '@/entities';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<{ id?: string }>,
) {
  if (!ctx.params?.id) {
    return { props: {} };
  }

  const { id } = ctx.params;

  try {
    const res = (await RSVP.findByPk(parseInt(id, 10)))?.get();

    return {
      props: res ? { ...res, createdAt: null, updatedAt: null } : {},
    };
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

      toast(router.query.message || 'Your RSVP has been updated!', {
        type: 'success',
        autoClose: 5000,
      });
    } catch (e) {
      toast(
        `There was an error updating your account. If the problem persists, please email ${config.email}.`,
        { type: 'error' },
      );
    }

    if (
      typeof router.query.redirectURI === 'string' &&
      router.query.redirectURI.startsWith('/')
    ) {
      await router.push(router.query.redirectURI);
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
    <Container>
      <Layout className="-mt-12 md:-mt-28 lg:-mt-52">
        <div className="flex flex-row w-full justify-center">
          <Form
            title="RSVP"
            subTitle="Please fill out all required fields, this information will help us in planning for our wedding! Enter 0 (zero) guests if you cannot attend."
            onSubmit={handleSubmit}
            notSplit
            className="max-w-xl"
          >
            <Input
              label="Name"
              id="name"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              value={values.name}
              disabled
              required
            />
            <Input
              label="Email"
              id="email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={values.email}
              disabled={loading}
              required
            />
            <Input
              label="Guests"
              id="guests"
              name="guests"
              autoComplete="guests"
              onChange={handleChange}
              value={values.guests}
              disabled={loading}
              required
              type="number"
              min={0}
              max={10}
            />
            <Button
              type="submit"
              className="float-right px-6"
              loading={loading}
            >
              Update
            </Button>
          </Form>
        </div>
      </Layout>
    </Container>
  );
}
