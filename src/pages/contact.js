import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Typography } from '@mui/material';
import { ContactForm } from '../components/contact/contact-form';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { gtm } from '../lib/gtm';
import NextLink from 'next/link';

const Contact = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const user = localStorage.getItem("lab-user");
  return (
    <>
      <Head>
        <title>
          Contact | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            {/* back button to dashboard will display only if user is logged in, */}
            {user && 
              <NextLink
                href="/dashboard/projects"
                passHref
              >
                <Button
                  component="a"
                  startIcon={<ArrowLeftIcon fontSize="small" />}
                >
                  Dashboard
                </Button>
              </NextLink>
            }
            
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >
              Contact
            </Typography>
            <Typography variant="h1">
              Talk to our account expert
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
              Have questions or suggestions about our product? Let us know how we can best serve your needs.
            </Typography>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
