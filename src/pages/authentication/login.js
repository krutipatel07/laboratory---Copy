import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { FirebaseLogin } from '../../components/authentication/firebase-login';
import { Logo } from '../../components/logo';
import { gtm } from '../../lib/gtm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const Login = () => {
  const router = useRouter();
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
              {/* we are using firebase to authenticates signup and login */}
              <FirebaseLogin />
            </Box>
            <Divider sx={{ my: 3 }} />
            
            <Box
              sx={{
                display:'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* redirect to the sign up page */}
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
            {/* redirects to the password reset page */}
            <NextLink
              href={"/authentication/password-reset"}
              passHref
            >
              <Link
                color="textSecondary"
                variant="body2"
              >
                Forgot your password?
              </Link>
            </NextLink>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;