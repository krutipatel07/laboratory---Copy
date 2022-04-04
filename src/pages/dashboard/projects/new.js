import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { ProductCreateForm } from '../../../components/dashboard/product/product-create-form';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../hocs/with-dashboard-layout';
import { gtm } from '../../../lib/gtm';
import {DashboardSidebar} from '../../../components/dashboard/dashboard-sidebar'


const ProductCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Project Create | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          display: 'flex'
        }}
      >
        <DashboardSidebar/>
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Create a new project
            </Typography>
          </Box>
          <ProductCreateForm />
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(ProductCreate);

