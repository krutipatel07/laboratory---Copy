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
      sx={{
        // backgroundColor: 'background.dark',
      }}>
        <NextLink
        href="/"
        passHref
      >
          <Button
            sx={{ m: 1.5 }}
            component="a"
            variant="text"
          >
            <ArrowBackOutlinedIcon 
            // sx={{color: "#ffffff"}}
            />
          </Button>
        </NextLink>
        </Box>
      <Box
        component="main"
        sx={{
          // backgroundColor: 'background.dark',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            // backgroundColor: 'background.dark',
            py: {
              xs: '60px'
            }
          }}
        >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // color: 'secondary.contrastText',
              }}
            >
              {/* <NextLink
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
              </NextLink> */}
              <Typography variant="h4">
                Create a new account
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 8
              }}
            >
            {/* we are using firebase to authenticates signup and login */}
              <FirebaseRegister />
            </Box>
            {/* <Divider sx={{ my: 3 }} /> */}

            <Box
              sx={{
                textAlign: "center"
              }}
            >
                <NextLink
                  href={disableGuard
                    ? `/authentication/login?disableGuard=${disableGuard}`
                    : '/authentication/login'}
                  passHref
                >
                <Typography variant="body2" sx={{mt:2, 
                  // color: 'secondary.contrastText',
                  }}>
                    Aleady have an account?
                  
                  <Link
                     color="#FFD19D"
                    variant="body2"
                  >
                      Login
                  </Link>
                  </Typography>
                </NextLink>
              {/* redirects to the password reset page */}
                <NextLink
                  href={"/authentication/password-reset"}
                  passHref
                >
                  <Link
                    color="#FFD19D"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </NextLink>
            </Box>

          {/* <button type="button" onClick={() => {
              throw new Error("Sentry Frontend Error");
          }}>
              Throw error
          </button> */}
        </Container>
      </Box>
    </>
  );
};

export default Register;