
// Reusable code snippets for tooltips
export const openWalletCode = `// Open the wallet modal from a custom button
const toggleParticleWallet = async () => {
    openWallet({
        windowSize: 'small',
        topMenuType: 'close',
    });
};`;

export const iframeLocation = `// The iframe embedded in a modal
<iframe
    id="particle-auth-core-iframe-wallet"
    className="w-full h-96 border-0"
    src={walletUrl}
/>`;

export const buildWalletUrlCode = `// Open the wallet modal from a custom button
    const generateWalletUrl = async () => {
        const url = buildWalletUrl({
            topMenuType: 'close',
        });

        // Associate the URL in the state
        setWalletUrl(url);
    };`;

export const particleIframeCss = `.particle-pwe-iframe-content {
  top: 50% !important;
  left: 15% !important;
  transform: translate(-50%, -50%) !important;
}`;
