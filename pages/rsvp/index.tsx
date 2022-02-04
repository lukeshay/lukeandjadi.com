import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/button';
import Form from '../../components/form';
import Input from '../../components/input';
import { rsvpSearchGet } from '../../client/api';
import config from '../../client/config';
import Container from '../../components/containers/container';

export default function AccountPage() {
  const [values, setValues] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      await rsvpSearchGet(values);

      await router.push(`/rsvp/edit`);

      setLoading(false);
      setValues({});
    } catch (e) {
      toast(
        `That RSVP could not be found. If the problem persists, please email ${config.email}.`,
        { type: 'warning' },
      );
      setLoading(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <Container>
        <div className="flex flex-row justify-center w-full mt-6 md:-mt-8">
          <Form
            title="RSVP"
            subTitle="Please search for your name as it appears on your invite! Email contact@lukeandjadi.com if you have any questions."
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
              disabled={loading}
              required
            />
            <Button
              type="submit"
              className="w-full md:w-auto md:float-right px-6 my-6"
              loading={loading}
            >
              Search
            </Button>
          </Form>
        </div>
    </Container>
  );
}
