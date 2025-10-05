import type { AppProps } from 'next/app';
import { Header } from '@/components';
import '@/styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
        <Header />
      <main className="p-4 ">
        <Component {...pageProps} />
      </main>
    </>
  );
}
