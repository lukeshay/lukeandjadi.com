import React, { ChangeEvent, FormEvent } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

export default function Account() {
  const [values, setValues] = React.useState<any>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }

  return (
    <Layout>
      <Form
        title="Account"
        subTitle="Please fill out all required fields."
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          id="email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          value={values.email}
        />
        <Input
          label="First name"
          id="firstName"
          name="first-name"
          autoComplete="first-name"
          onChange={handleChange}
          value={values.firstName}
        />
        <Input
          label="Last name"
          id="lastName"
          name="last-name"
          autoComplete="last-name"
          onChange={handleChange}
          value={values.lastName}
        />
        <Input
          label="Number of guests"
          id="guests"
          name="guests"
          autoComplete="guests"
          onChange={handleChange}
          value={values.guests}
          type="number"
        />
        <Input
          label="Ceremony"
          id="ceremony"
          name="ceremony"
          autoComplete="ceremony"
          onChange={handleChange}
          value={values.ceremony}
          type="checkbox"
        />
        <Input
          label="Reception"
          id="ceremony"
          name="ceremony"
          autoComplete="ceremony"
          onChange={handleChange}
          value={values.ceremony}
          type="checkbox"
        />
      </Form>
    </Layout>
  );
}
