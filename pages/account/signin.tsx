import React, { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { accountSignInPost } from '@/client/api';
import Form from '@/components/Form';
import Input from '@/components/Input';
import config from '@/client/config';
import Button from '@/components/Button';

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
      toast(
        `There was an error signing in. If the problem persists, please email ${config.email}`,
        { type: 'error', autoClose: false },
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
        <Button type="submit" className="w-full" loading={loading}>
          Sign In
        </Button>
      </Form>
    </Layout>
  );
}
