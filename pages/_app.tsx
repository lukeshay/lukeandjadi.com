import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState} from 'react';
import {ToastContainer, Slide} from 'react-toastify';
import {ClerkProvider} from '@clerk/nextjs';
import type {AppProps} from 'next/app';
import {GrowthBook, GrowthBookProvider} from '@growthbook/growthbook-react';
import type {FeatureDefinition} from '@growthbook/growthbook-react';
import Head from 'next/head';

// eslint-disable-next-line node/no-unpublished-import
import '../styles/globals.css';

const growthbookInstance = new GrowthBook({});

const useGrowthBook = (): {loading: boolean; growthbook: GrowthBook} => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async (): Promise<void> => {
            const res = await fetch(
                `https://cdn.growthbook.io/api/features/${process.env.NEXT_PUBLIC_GROWTHBOOK_KEY ?? ''}`
            );
            const {features} = (await res.json()) as {features: Record<string, FeatureDefinition>};

            growthbookInstance.setFeatures(features);
            growthbookInstance.setAttributes({
                date: Date.now(),
            });

            setLoading(false);
        };

        if (loading) {
            void run();
        }
    }, [loading]);

    return {
        growthbook: growthbookInstance,
        loading,
    };
};

const MyApp = ({Component, pageProps}: AppProps): JSX.Element => {
    const {loading, growthbook} = useGrowthBook();

    return (
        <>
            <Head>
                <link
                    as="fetch"
                    crossOrigin="anonymous"
                    href={`https://cdn.growthbook.io/api/features/${process.env.NEXT_PUBLIC_GROWTHBOOK_KEY ?? ''}`}
                    key="growthbook-features-preload"
                    rel="preload"
                />
            </Head>
            {loading ? (
                <div>{'Loading'}</div>
            ) : (
                <ClerkProvider>
                    <GrowthBookProvider growthbook={growthbook}>
                        <Component {...pageProps} />
                        <ToastContainer hideProgressBar limit={1} position="bottom-center" transition={Slide} />
                    </GrowthBookProvider>
                </ClerkProvider>
            )}
        </>
    );
};

export default MyApp;
