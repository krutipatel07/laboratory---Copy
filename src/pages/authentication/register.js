import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { FirebaseRegister } from '../../components/authentication/firebase-register';
import { Logo } from '../../components/logo';
import { gtm } from '../../lib/gtm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const Register = () => {
  const router = useRouter();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Register | Maket Colaboratory
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
                Sign Up
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
            {/* we are using firebase to authenticates signup and login */}
              <FirebaseRegister />
            </Box>
            <Divider sx={{ my: 3 }} />
            <NextLink
              href={disableGuard
                ? `/authentication/login?disableGuard=${disableGuard}`
                : '/authentication/login'}
              passHref
            >
            <Typography variant="body2">
                Aleady have an account?
              
              <Link
                color="textSecondary"
                variant="body2"
              >
                  Login
              </Link>
              </Typography>
            </NextLink>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;