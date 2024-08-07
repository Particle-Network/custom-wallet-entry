import type { AppProps } from 'next/app';
import '../styles/globals.css';

// Particle imports
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import { Sei, SeiTestnet } from '@particle-network/chains';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthCoreContextProvider
            options={{
                // All env variable must be defined at runtime
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
                appId: process.env.NEXT_PUBLIC_APP_ID!,
                themeType: 'dark',
                fiatCoin: 'USD',
                language: 'en',
                wallet: {
                    // Set to false to remove the embedded wallet modal
                    visible: true,
                    themeType: 'dark',
                    customStyle: {
                        // Locks the chain selector to predetermined chains
                        supportChains: [SeiTestnet, Sei],
                        dark: {
                            colorAccent: '#7DD5F9',
                            colorPrimary: '#21213a',
                            colorOnPrimary: '#171728',
                            primaryButtonBackgroundColors: ['#5ED7FF', '#E89DE7'],
                            primaryIconButtonBackgroundColors: ['#5ED7FF', '#E89DE7'],
                            primaryIconTextColor: '#FFFFFF',
                            primaryButtonTextColor: '#0A1161',
                            cancelButtonBackgroundColor: '#666666',
                            backgroundColors: [
                                '#14152e',
                                [
                                    ['#e6b1f766', '#e6b1f700'],
                                    ['#7dd5f94d', '#7dd5f900'],
                                ],
                            ],
                            messageColors: ['#7DD5F9', '#ed5d51'],
                            borderGlowColors: ['#7bd5f940', '#323233'],
                            modalMaskBackgroundColor: '#141430b3',
                        },
                    },
                },
            }}
        >
            <Component {...pageProps} />
        </AuthCoreContextProvider>
    );
}

export default MyApp;
