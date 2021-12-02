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
import { AxiosError } from 'axios';
import { defaultSalt, defaultSecret, getCookie, parseJWT } from '@/server/auth';
import { RSVP_JWT_COOKIE_KEY } from '@/server/jwt';

const REDIRECT = {
  redirect: {
    permanent: false,
    destination: '/rsvp',
  },
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const jwt = getCookie(ctx.req, ctx.res, RSVP_JWT_COOKIE_KEY);

    if (!jwt) {
      console.log('no cookie');
      return { props: {} };
    }

    const parsed = await parseJWT<{ id: string }>(jwt, defaultSecret, {
      ...defaultSalt,
      ttl: 1800000,
    });

    if (!parsed?.id) {
      console.log('jwt invalid');
      return { props: {} };
    }

    const res = (await RSVP.findByPk(parsed.id))?.get();

    console.log('res');

    return {
      props: res ? { ...res, createdAt: null, updatedAt: null } : REDIRECT,
    };
  } catch (e) {
    console.error((e as Error).message);
    return REDIRECT;
  }
}

export default function AccountPage(props: any) {
  const [values, setValues] = React.useState<any>(props);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

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
      if (
        typeof e === 'object' &&
        (e as AxiosError).isAxiosError &&
        (e as AxiosError).response?.status === 408
      ) {
        await router.push('/rsvp');
        toast('Your session has expired. Please enter your name again!', {
          type: 'error',
        });

        return;
      }

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
      <Layout>
        <div className="flex flex-row justify-center w-full mt-12 lg:mt-0">
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
