import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ThreeSections } from '../components/layouts';
import { Content, CentralPanel, LateralPanel } from '../components/templates';
import { useAuth } from '../lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const auth = useAuth();

  const [messageSelected, setMessageSelected] = useState(null);

  useEffect(() => {
    if (!auth.isLogged()) router.push('/');
  }, [auth, router]);

  return (
    <div>
      <Head>
        <title>Huru | Dashboard</title>
        <meta
          name="description"
          content="Aplicación web para gestionar la información de la plataforma Huru"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThreeSections
        content={<Content messageInfo={messageSelected} />}
        inbox={<CentralPanel setMessageSelected={setMessageSelected} />}
        lateralPanel={<LateralPanel />}
      />
    </div>
  );
}
