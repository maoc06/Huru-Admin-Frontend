import '../styles/globals.css';
import { AuthProvider } from '../lib/auth';
import { NavProvider } from '../lib/nav';
import { StatusItemProvider } from '../lib/updateStatusItem';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavProvider>
        <StatusItemProvider>
          <Component {...pageProps} />
        </StatusItemProvider>
      </NavProvider>
    </AuthProvider>
  );
}
export default MyApp;
