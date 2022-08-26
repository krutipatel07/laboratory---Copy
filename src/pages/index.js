import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { HomeHero } from '../components/home/home-hero';
import { withMainLayout } from '../hocs/with-main-layout';
import { gtm } from '../lib/gtm';
import HomePageSignUp from './authentication/register'

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
        {/* <HomeHero /> */}
        <HomePageSignUp />
        <Divider />
      </main>
    </>
  );
};

// export default withMainLayout(Home);
export default (Home);