import AccountContainer from '../../components/AccountContainer';
import Layout from '../../components/Layout';

export default function CheckEmail() {
  return (
    <AccountContainer>
      <Layout>
        <div className="pt-32">
          <h1 className="pb-4 text-4xl font-bold text-center">
            Please check your email for a sign in link!
          </h1>
        </div>
      </Layout>
    </AccountContainer>
  );
}
