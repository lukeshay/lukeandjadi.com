import React from 'react';
import type { AxiosError } from 'axios';
import type { ChangeEvent, FormEvent } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Button from '../../components/button';
import config from '../../client/config';
import Container from '../../components/containers/container';
import Form from '../../components/form';
import Input from '../../components/input';
import logger from '../../server/logger';
import { config as conf } from '../../config';
import { getCookie } from '../../server/auth';
import { getRecaptchaToken } from '../../client/recaptcha';
import { getRSVP } from '../../server/services/rsvp-service';
import { parseRSVPJWT } from '../../server/services/jwt-service';
import { rsvpPut } from '../../client/api';

const REDIRECT = {
  redirect: {
    permanent: false,
    destination: '/rsvp',
  },
};

const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    logger.info('getting rsvp cookie from request');

    const jwt = getCookie(ctx.req, ctx.res, conf.get('jwt.rsvp.cookie'));

    if (!jwt || jwt === '') {
      logger.info('no rsvp cookie found');

      return REDIRECT;
    }

    logger.info('parsing rsvp jwt:', jwt);

    const parsed = await parseRSVPJWT(jwt);

    const res = await getRSVP({ id: parsed.id });

    return {
      props: {
        ...res,
        createdAt: null,
        updatedAt: null,
      },
    };
  } catch (error) {
    logger.error((error as Error).message);

    return REDIRECT;
  }
};

const AccountPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [values, setValues] = React.useState<{ name?: string; email?: string; guests?: number }>(props);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    setLoading(true);

    try {
      const token = await getRecaptchaToken();

      const res = await rsvpPut({
        ...values,
        token,
      });

      setValues(res.data);

      toast(router.query.message ?? 'Your RSVP has been updated!', {
        type: 'success',
        autoClose: 5000,
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        (error as AxiosError).isAxiosError &&
        (error as AxiosError).response?.status === 408
      ) {
        await router.push('/rsvp');
        toast('Your session has expired. Please enter your name again!', {
          type: 'error',
        });

        return;
      }

      toast(`There was an error updating your RSVP. If the problem persists, please email ${config.email}.`, {
        type: 'error',
      });
    }

    if (typeof router.query.redirectURI === 'string' && router.query.redirectURI.startsWith('/')) {
      await router.push(router.query.redirectURI);
    }

    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Container>
      <div className="mt-6 flex w-full flex-row justify-center md:-mt-8">
        <Form
          className="max-w-xl"
          notSplit
          onSubmit={handleSubmit}
          subTitle="Please fill out all required fields, this information will help us in planning for our wedding! Enter 0 (zero) guests if you cannot attend."
          title="RSVP"
        >
          <Input
            autoComplete="name"
            disabled
            id="name"
            label="Name"
            name="name"
            onChange={handleChange}
            required
            value={values.name}
          />
          <Input
            autoComplete="email"
            disabled={loading}
            id="email"
            label="Email"
            name="email"
            onChange={handleChange}
            required
            value={values.email}
          />
          <Input
            autoComplete="guests"
            disabled={loading}
            id="guests"
            label="Guests"
            max={10}
            min={0}
            name="guests"
            onChange={handleChange}
            required
            type="number"
            value={values.guests}
          />
          <Button className="my-6 w-full px-6 md:float-right md:w-auto" loading={loading} type="submit">
            {'Update'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export { getServerSideProps };
export default AccountPage;
