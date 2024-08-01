# Snippet: Customizing Wallet Position and Appearance

This snippet demonstrates how to customize the positioning and appearance of a wallet interface using Particle Network's Auth Core Modal.

## Configuring the AuthCoreContextProvider

To set up the Auth Core Modal, wrap your main component with AuthCoreContextProvider and provide the necessary options:

```jsx
<AuthCoreContextProvider
  options={{
    projectId: "xxxx",
    clientKey: "xxxx",
    appId: "xxxx",
    wallet: {
      visible: true,
    },
  }}
>
  <Component {...pageProps} />
</AuthCoreContextProvider>
```

## visible Parameter Explanation

- **visible: true** - Shows the default wallet icon entry point
- **visible: false** - Completely disables the wallet entry point

### Note: When set to false, **openWallet** won't work, but you can use **buildWalletUrl** to generate a wallet address and display it in a custom iframe.

## Wallet Centering Methods

### To center the wallet iframe content while keeping the entry point invisible, add this CSS:

``` css
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

```javascript
import { useAuthCore } from "@particle-network/auth-core-modal";

const { openWallet } = useAuthCore();

openWallet({
  windowSize: "small",
  topMenuType: "close",
});
```

### This code demonstrates how to open the wallet with specific options, such as setting the window size and top menu type.

### By following these steps, you can effectively customize the wallet's position and appearance in your application using Particle Network's Auth Core Modal.

