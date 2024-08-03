import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthCoreContextProvider
            options={{
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
                appId: process.env.NEXT_PUBLIC_APP_ID!,
                wallet: {
                    visible: true,
                },
            }}
        >
            <Component {...pageProps} />
        </AuthCoreContextProvider>
    );
}

export default MyApp;
