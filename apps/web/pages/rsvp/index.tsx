import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { rsvpSearchGet } from '../../lib/client/api';

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
      alert(
        'That RSVP could not be found. If the problem persists, please email luke@lukeandjadi.com',
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
        subTitle="Please search for your name as it appears on your invite! Email luke@lukeandjadi.com if you have any questions."
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
        <button
          type="submit"
          className="bg-accent-500 hover:opacity-75 text-gray-800 w-full my-2 p-3 rounded-lg shadow"
          disabled={loading}
        >
          Search
        </button>
      </Form>
    </Layout>
  );
}
