import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { HomeClients } from '../components/home/home-clients';
import { HomeHero } from '../components/home/home-hero';
import { HomeDevelopers } from '../components/home/home-developers';
import { HomeDesigners } from '../components/home/home-designers';
import { HomeFeatures } from '../components/home/home-features';
import { HomeTestimonials } from '../components/home/home-testimonials';
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