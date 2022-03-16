import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { AmplifyLogin } from '../../components/authentication/amplify-login';
import { Auth0Login } from '../../components/authentication/auth0-login';
import { FirebaseLogin } from '../../components/authentication/firebase-login';
import { JWTLogin } from '../../components/authentication/jwt-login';
import { Logo } from '../../components/logo';
import { withGuestGuard } from '../../hocs/with-guest-guard';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { makeStyles } from '@material-ui/core';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  return (
    <>
      <Head>
        <title>
          Login | Maket Colaboratory
        </title>
      </Head>
      <Box
        >
        <NextLink
        href="/"
        passHref
      >
          <Button
            sx={{ m: 1.5 }}
            component="a"
            variant="text"
          >
            <ArrowBackOutlinedIcon/>
          </Button>
        </NextLink>
        </Box>
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
              xs: '60px'
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
                Log in
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
              {platform === 'Amplify' && <AmplifyLogin />}
              {platform === 'Auth0' && <Auth0Login />}
              {platform === 'Firebase' && <FirebaseLogin />}
              {platform === 'JWT' && <JWTLogin />}
            </Box>
            <Divider sx={{ my: 3 }} />
            <NextLink
              href={disableGuard
                ? `/authentication/register?disableGuard=${disableGuard}`
                : '/authentication/register'}
              passHref
            >
              <Link
                color="textSecondary"
                variant="body2"
              >
                Create new account
              </Link>
            </NextLink>
            {platform === 'Amplify' && (
              <NextLink
                href={disableGuard
                  ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                  : '/authentication/password-recovery'}
                passHref
              >
                <Link
                  color="textSecondary"
                  sx={{ mt: 1 }}
                  variant="body2"
                >
                  Forgot password
                </Link>
              </NextLink>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;