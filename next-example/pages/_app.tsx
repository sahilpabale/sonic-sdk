import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SonicProvider } from '../lib';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SonicProvider>
      <Component {...pageProps} />
    </SonicProvider>
  );
}
