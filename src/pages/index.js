import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { HomeHero } from '../components/home/home-hero';
import { withMainLayout } from '../hocs/with-main-layout';
import { gtm } from '../lib/gtm';

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
        Maket Colaboratory
        </title>
      </Head>
      <main>
        <HomeHero />
        <Divider />
      </main>
    </>
  );
};

export default withMainLayout(Home);