import { SignIn } from '@clerk/nextjs';

import Container from '../../../components/containers/container';

const SignInPage = (): JSX.Element => (
  <Container>
    <SignIn path="/account/sign-in" redirectUrl="/account" routing="path" />
  </Container>
);

export default SignInPage;
