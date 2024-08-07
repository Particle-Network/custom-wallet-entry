
# Customizing Wallet Position and Appearance with Particle Auth

This project showcases how to tailor the positioning and appearance of a wallet interface using Particle Network's Auth Core Modal. Key features include:

- Remove the default Particle Network themed button with a custom button to open the wallet modal.
- Triggering the wallet modal from any custom button.
- Using an iframe to position the wallet modal anywhere within your application.
- Customizing themes and styles to fit your app's design.

## Configuring AuthCoreContextProvider

To set up the Auth Core Modal, wrap your main component with `AuthCoreContextProvider` and provide the necessary options. 

Below is an example of a `layout.tsx` file for a Next.js project:

```tsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Particle imports
import { AuthType } from "@particle-network/auth-core";
import { Sei, SeiTestnet } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCoreContextProvider
            options={{
                // All env variable must be defined at runtime
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
                appId: process.env.NEXT_PUBLIC_APP_ID!,
                themeType: 'dark', // Theme for the login modal
                fiatCoin: 'USD',
                language: 'en',
                wallet: {
                    // Set to false to remove the embedded wallet modal
                    visible: true,
                    themeType: 'dark', // Theme for the wallet modal
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
          {children}
        </AuthCoreContextProvider>
      </body>
    </html>
  );
}

```

- The `themeType` parameter outside the `wallet` object refers to the login modal.
- The `themeType` parameter inside the `wallet` object refers to the wallet modal.
- Customize the theme style using the `customStyle` object.

For more examples on how to use the `customStyle` object, refer to the [Customizing Wallet Modal docs](https://developers.particle.network/guides/configuration/appearance/wallet).

Here is the improved section:

### Visible Parameter Explanation

- **visible: true** - Displays the default wallet icon entry point.
- **visible: false** - Completely disables the wallet entry point.

> Note: When set to false, **openWallet** and **buildWalletUrl** will NOT function.

## Two Ways to Customize the Wallet Entry Point

1. **Use a Custom Wallet Entry Point**
   Keep `visible: true`, but create your own wallet entry, such as a button labeled "Open Wallet", and use the `openWallet()` method to open the wallet.

   ```jsx
   const { openWallet } = useAuthCore();

   // Open the wallet modal from a custom button
   const toggleParticleWallet = async () => {
       openWallet({
           windowSize: 'small',
           topMenuType: 'close',
       });
   };
   ```

   To remove the default Particle button used as the wallet entry point, add the following CSS to your `global.css`:

   ```css
   .particle-pwe-btn {
       display: none;
   }
   ```

   Use the `particle-pwe-iframe-content` class to position the wallet modal on the screen:

   ```css
   .particle-pwe-iframe-content {
       top: 50% !important;
       left: 50% !important;
       transform: translate(-50%, -50%) !important;
   }
   ```

   This method allows limited customization of the modal's display location by modifying the CSS class in your `global.css`.

Here is the improved section:

2. **Custom Integration with Flexibility**
   For advanced customization and integration, set `visible: true` and use `buildWalletUrl()` to have full control over the wallet's position.

   The `buildWalletUrl()` method from `useAuthCore()` allows you to generate a wallet URL that can be embedded within an iframe, giving you the freedom to place the iframe wherever you want.

    ```tsx
    const { buildWalletUrl } = useAuthCore();

    // State to store the wallet URL and modal visibility
    const [walletUrl, setWalletUrl] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Generate the wallet URL and open the modal
    const generateWalletUrl = async () => {
        const url = buildWalletUrl({
            topMenuType: 'close',
        });

        // Set the URL in the state and open the modal
        setWalletUrl(url);
        setIsModalOpen(true);
    };

    // Add the message event listener
    // This is required to close the wallet from the 'x' button
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data === 'PARTICLE_WALLET_CLOSE_IFRAME') {
                console.log('Wallet iframe closed.');
                setIsModalOpen(false);
                setWalletUrl(''); // Optionally clear the wallet URL or take other actions
            }
        };

        window.addEventListener('message', handleMessage);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    // Place the iframe in your UI components
    return isModalOpen ? (
        <iframe
            id="particle-auth-core-iframe-wallet"
            className="w-96"
            style={{ height: '40rem' }}
            src={walletUrl}
        />
    ) : (
        <button onClick={generateWalletUrl}>Open Wallet</button>
    );
    ```

    > Note: The iframe ID must be `particle-auth-core-iframe-wallet`.

    To hide the original Particle button, update the `particle-pwe-btn` class in your `global.css`:

    ```css
    .particle-pwe-btn {
        display: none;
    }
    ```

This approach provides greater flexibility and control over the wallet's behavior and appearance, allowing you to seamlessly integrate it into your application's UI.