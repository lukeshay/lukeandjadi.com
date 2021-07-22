import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { rsvpSearchGet } from '@/client/api';
import config from '@/client/config';
import Container from '@/components/Container';

export default function AccountPage() {
  const [values, setValues] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await rsvpSearchGet(values);

      await router.push(`/rsvp/edit/${res.data.id}`);
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
      <Layout className="-mt-12 md:-mt-28 lg:-mt-52">
        <div className="flex flex-row w-full justify-center">
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
              className="float-right px-6"
              loading={loading}
            >
              Search
            </Button>
          </Form>
        </div>
      </Layout>
    </Container>
  );
}
