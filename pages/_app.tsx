import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: "xxx",
        clientKey: "xxx",
        appId: "xxx",
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
