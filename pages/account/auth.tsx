import { useRouter } from 'next/router';
import React from 'react';
import { accountAuthPost } from '../../lib/fe/api';

export default function Auth() {
  const router = useRouter();

  React.useEffect(() => {
    const { token } = router.query;
    if (!token) {
      router.push('/');
    } else {
      accountAuthPost(token as string)
        .then(() => router.push('/account'))
        .catch(() => router.push('/'));
    }
  });

  return <></>;
}
