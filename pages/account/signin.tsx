import React, { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { accountSignInPost } from '../../client/api';
import Form from '../../components/Form';
import Input from '../../components/Input';
import config from '../../client/config';
import Button from '../../components/Button';
import AccountContainer from '../../components/AccountContainer';

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
    <AccountContainer>
      <Layout>
        <Form
          onSubmit={handleSubmit}
          title="Sign In"
          subTitle="Please sign in here. This is only for Luke and Jadi! It will not work for anybody else."
          notSplit
          className="max-w-xl"
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
          <Button type="submit" className="float-right px-6" loading={loading}>
            Sign In
          </Button>
        </Form>
      </Layout>
    </AccountContainer>
  );
}
