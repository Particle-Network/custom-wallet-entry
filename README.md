# Snippet: Customizing Wallet Position and Appearance

This snippet demonstrates how to customize the positioning and appearance of a wallet interface using Particle Network's Auth Core Modal.

Check Auth Core demo: https://github.com/Particle-Network/particle-web-auth-core

## Configuring the AuthCoreContextProvider

To set up the Auth Core Modal, wrap your main component with AuthCoreContextProvider and provide the necessary options:

```jsx
<AuthCoreContextProvider
    options={{
        projectId: 'xxxx',
        clientKey: 'xxxx',
        appId: 'xxxx',
        wallet: {
            visible: true,
        },
    }}
>
    <Component {...pageProps} />
</AuthCoreContextProvider>
```

## visible Parameter Explanation

-   **visible: true** - Shows the default wallet icon entry point
-   **visible: false** - Completely disables the wallet entry point

### Note: When set to false, **openWallet** and **buildWalletUrl** won't work.

## Three ways to use the wallet

1. Keep `visible: true`，and can use the wallet entry built in the sdk directly, you can config the wallet entry position like this:

```js
{
  visble: true,
  entryPosition: EntryPosition.BR, // Optional
}
```

2. Keep `visible: true`，and use your own wallet entry, for example a button: "open wallet", and use `openWallet` method to open the wallet.

```js
{
  visble: true,
}
```

```css
.particle-pwe-btn {
    display: none;
}

.particle-pwe-iframe-content {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}
```

3. Use `visible: true` and `buildWalletUrl` to have full control of the wallet postion

```css
.particle-pwe-btn {
    display: none;
}

.particle-pwe-iframe-content {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}
```

## Wallet Centering Methods

### To center the wallet iframe content while keeping the entry point invisible, add this CSS:

```css
.particle-pwe-btn {
    display: none;
}

.particle-pwe-iframe-content {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}
```

## Using the openWallet Function

### Import and use the openWallet function from Auth Core Modal:

check: https://developers.particle.network/reference/auth-web#open-particle-web-wallet

```javascript
import { useAuthCore } from '@particle-network/auth-core-modal';

const { openWallet } = useAuthCore();

openWallet({
    windowSize: 'small',
    topMenuType: 'close',
});
```

### This code demonstrates how to open the wallet with specific options, such as setting the window size and top menu type.

### By following these steps, you can effectively customize the wallet's position and appearance in your application using Particle Network's Auth Core Modal.
