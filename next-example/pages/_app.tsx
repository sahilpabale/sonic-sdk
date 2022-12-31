import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SonicProvider } from '@0xsonic/sdk';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SonicProvider>
      <Component {...pageProps} />
    </SonicProvider>
  );
}
