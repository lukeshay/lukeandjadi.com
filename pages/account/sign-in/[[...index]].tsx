import { SignIn } from '@clerk/nextjs';

import Container from '../../../components/containers/container';

const SignInPage = () => (
  <Container>
    <SignIn path="/account/sign-in" routing="path" redirectUrl="/account" />
  </Container>
);

export default SignInPage;
