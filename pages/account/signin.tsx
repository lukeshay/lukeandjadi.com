import React, { FormEvent } from 'react';
import Layout from '../../components/Layout';
import { accountSignInPost } from '../../lib/fe/api';
import { useRouter } from 'next/router';
import Form from '../../components/Form';
import Input from '../../components/Input';

export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await accountSignInPost(email);
      router.push('/account/check-email');
    } catch (e) {
      console.error(e.res);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Form
        onSubmit={handleSubmit}
        title="Sign In"
        subTitle="Please sign in here. If you do not have an account, one will be
            created. If you do not want to RSVP here, you can contact us
            directly!"
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
          className="bg-blue-600 hover:opacity-75 text-white w-full my-2 p-3 rounded-lg shadow"
          disabled={loading}
        >
          Sign In
        </button>
      </Form>
    </Layout>
  );
}
