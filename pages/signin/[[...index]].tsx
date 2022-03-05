import { SignIn } from '@clerk/nextjs';

import Container from '../../components/containers/container';

const SignInPage = (): JSX.Element => (
  <Container>
    <SignIn path="/signin" redirectUrl="/admin" routing="path" />
  </Container>
);

export default SignInPage;
