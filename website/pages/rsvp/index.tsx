import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { rsvpSearchGet } from '../../lib/client/api';
import config from '../../lib/client/config';

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
    <Layout>
      <Form
        title="RSVP"
        subTitle="Please search for your name as it appears on your invite! Email contact@lukeandjadi.com if you have any questions."
        onSubmit={handleSubmit}
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
        <Button type="submit" className="w-full" loading={loading}>
          Search
        </Button>
      </Form>
    </Layout>
  );
}
