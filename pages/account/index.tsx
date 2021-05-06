import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import useSWR from 'swr';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { Account } from '../../lib/entities/user';
import { accountPut } from '../../lib/fe/api';
import fetcher from '../../lib/fe/fetcher';

export default function AccountPage() {
  const [values, setValues] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const { data, error } = useSWR<Account>('/account', fetcher);
  const router = useRouter();

  React.useEffect(() => {
    if (error) {
      router.push('/account/signin');
    } else if (data) {
      setValues(data);
    }
  }, [data, error]);

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

  function handleBooleanChange(event: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.id]: event.target.checked });
  }

  return (
    <Layout>
      <Form
        title="Account"
        subTitle="Please fill out all required fields!"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          id="email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          value={values.email}
          disabled={loading || (!data && !error)}
        />
        <Input
          label="First name"
          id="firstName"
          name="first-name"
          autoComplete="first-name"
          onChange={handleChange}
          value={values.firstName}
          disabled={loading || (!data && !error)}
        />
        <Input
          label="Last name"
          id="lastName"
          name="last-name"
          autoComplete="last-name"
          onChange={handleChange}
          value={values.lastName}
          disabled={loading || (!data && !error)}
        />
        <Input
          label="Number of guests"
          id="numberOfGuests"
          name="guests"
          autoComplete="guests"
          onChange={handleChange}
          value={values.numberOfGuests}
          disabled={loading || (!data && !error)}
          type="number"
        />
        <Input
          label="Ceremony"
          id="ceremony"
          name="ceremony"
          autoComplete="ceremony"
          onChange={handleBooleanChange}
          checked={values.ceremony}
          disabled={loading || (!data && !error)}
          type="checkbox"
        />
        <Input
          label="Reception"
          id="reception"
          name="reception"
          autoComplete="reception"
          onChange={handleBooleanChange}
          checked={values.reception}
          disabled={loading || (!data && !error)}
          type="checkbox"
        />
        <button
          type="submit"
          className="bg-accent-500 hover:opacity-75 text-gray-800 w-full my-2 p-3 rounded-lg shadow"
          disabled={loading || (!data && !error)}
        >
          Update
        </button>
      </Form>
    </Layout>
  );
}
