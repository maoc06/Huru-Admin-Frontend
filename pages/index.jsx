import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { LoginForm } from '../components/modules';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huru | Staff</title>
        <meta
          name="description"
          content="Aplicación web para gestionar la información de la plataforma Huru"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logo}>
          <Image
            src="/logo-positive.svg"
            alt="Vercel Logo"
            width={195}
            height={111}
          />
        </span>

        <LoginForm />
      </main>
    </div>
  );
}
