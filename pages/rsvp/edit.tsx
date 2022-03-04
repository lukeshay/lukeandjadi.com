import React from 'react';
import type { AxiosError } from 'axios';
import type { FormEvent, ChangeEventHandler } from 'react';
import type { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { config as conf } from '../../config';
import { getCookie } from '../../server/services/cookie-service';
import { getRecaptchaToken } from '../../client/recaptcha';
import { getRSVP } from '../../server/services/rsvp-service';
import { parseRSVPJWT } from '../../server/services/jwt-service';
import { rsvpPut } from '../../client/api';
import Button from '../../components/button';
import config from '../../client/config';
import Container from '../../components/containers/container';
import Form from '../../components/form';
import Input from '../../components/input';
import logger from '../../server/infrastructure/logger';
import Select from '../../components/select';
import type { Option } from '../../components/select';
import type { RSVPAttributes } from '../../types';

const REDIRECT = {
  redirect: {
    destination: '/rsvp',
    permanent: false,
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

const AccountPage = (props: RSVPAttributes): JSX.Element => {
  const guestOptions: Option[] = [];

  for (let i = 1; i <= props.maxGuests; i++) {
    guestOptions.push({
      key: String(i),
      value: String(i),
    });
  }

  const [values, setValues] = React.useState<RSVPAttributes & { attending: boolean }>({
    ...props,
    attending: props.guests > 0,
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    setLoading(true);

    try {
      const token = await getRecaptchaToken();

      const res = await rsvpPut({
        ...values,
        guests: values.attending ? values.guests : 0,
        token,
      });

      setValues({
        ...res.data,
        attending: res.data.guests > 0,
      });

      toast(router.query.message ?? 'Your RSVP has been updated!', {
        autoClose: 5000,
        type: 'success',
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

    setLoading(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleGuestsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValues({
      ...values,
      guests: Number(event.target.value),
    });
  };

  const handleAttendingChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValues({
      ...values,
      attending: event.target.value === 'yes',
      guests: Number(1),
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
          <Select
            autoComplete="attending"
            disabled={loading}
            id="attending"
            label="Attending"
            name="attending"
            onChange={handleAttendingChange}
            options={[
              {
                key: 'yes',
                value: 'Yes',
              },
              {
                key: 'no',
                value: 'No',
              },
            ]}
            required
            selected={values.attending ? 'yes' : 'no'}
          />
          {values.attending && (
            <Select
              autoComplete="guests"
              disabled={loading}
              id="guests"
              label="Guests"
              name="guests"
              onChange={handleGuestsChange}
              options={guestOptions}
              required
              selected={values.guests}
            />
          )}
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
