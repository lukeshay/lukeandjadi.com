import {useRouter} from 'next/router';
import type {ChangeEvent, FormEvent} from 'react';
import React from 'react';
import {toast} from 'react-toastify';

import Button from '../../components/button';
import Form from '../../components/form';
import Input from '../../components/input';
import {rsvpSearchGet} from '../../client/api';
import config from '../../client/config';
import Container from '../../components/containers/container';
import {getRecaptchaToken} from '../../client/recaptcha';

const RSVPPage = (): JSX.Element => {
    const [values, setValues] = React.useState<{name: string}>({name: ''});
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        setLoading(true);

        try {
            const token = await getRecaptchaToken();

            await rsvpSearchGet({
                ...values,
                token,
            });

            await router.push(`/rsvp/edit`);

            setLoading(false);
            setValues({name: ''});
        } catch {
            toast(`That RSVP could not be found. If the problem persists, please email ${config.email}.`, {
                type: 'warning',
            });
            setLoading(false);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValues({
            ...values,
            [event.target.id]: event.target.value,
        });
    };

    return (
        <Container>
            <div className="mt-6 flex w-full flex-row justify-center md:-mt-8">
                <Form
                    className="max-w-xl"
                    notSplit
                    onSubmit={handleSubmit}
                    subTitle="Please search for your name as it appears on your invite! Email contact@lukeandjadi.com if you have any questions."
                    title="RSVP"
                >
                    <Input
                        autoComplete="name"
                        disabled={loading}
                        id="name"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        required
                        value={values.name}
                    />
                    <Button className="my-6 w-full px-6 md:float-right md:w-auto" loading={loading} type="submit">
                        {'Search'}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default RSVPPage;
