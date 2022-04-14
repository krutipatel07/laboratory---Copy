import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { FirebasePasswordReset } from '../../components/authentication/firebase-reset-password';
import { Logo } from '../../components/logo';
import { withGuestGuard } from '../../hocs/with-guest-guard';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';

const PasswordReset = () => {
  const router = useRouter();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Password Reset | Maket Colaboratory
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px'
            }
          }}
        >
          <Card
            elevation={16}
            sx={{ p: 4 }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">
                Password Reset
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Reset your account password
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
              <FirebasePasswordReset />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordReset;
