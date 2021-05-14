import React, { FormEvent } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { accountSignInPost } from '../../lib/client/api';
import Form from '../../components/Form';
import Input from '../../components/Input';
import config from '../../lib/client/config';

export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await accountSignInPost(email);
      await router.push('/account/check-email');
    } catch (e) {
      alert(
        `There was an error signing in. If the problem persists, please email ${config.email}`,
      );
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Form
        onSubmit={handleSubmit}
        title="Sign In"
        subTitle="Please sign in here. This is only for special people!"
      >
        <Input
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="bg-accent-500 hover:opacity-75 text-gray-800 w-full my-2 p-3 rounded-lg shadow"
          disabled={loading}
        >
          Sign In
        </button>
      </Form>
    </Layout>
  );
}
