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
import clientPromise from '../lib/mongodb'


const dbName= "laboratory";
const collectionName = "projects";

const Home = ({data}) => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  console.log(data);

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

export async function getServerSideProps(context) {
  let isConnected;
  let data;
  try {
    const client = await clientPromise
    const db = client.db(dbName);
    console.log(db); 
    data = await db.collection(collectionName).find({}).limit(20).toArray();
    data = JSON.parse(JSON.stringify(data));
    console.log(data); 
    isConnected = true;
  }
  catch(e) {
    console.log(e);
    isConnected = false
  }

  return {
    props: { data },
  }
}