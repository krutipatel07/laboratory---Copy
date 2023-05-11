import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { gtm } from '../lib/gtm';

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
        Maket
        </title>
      </Head>
      <main>
        <h1>Welcome to nextjs</h1>
      </main>
    </>
  );
};

// export default withMainLayout(Home);
export default (Home);