import NextLink from 'next/link';
import { Box, Button, Container, Typography,AppBar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRight } from '../../icons/arrow-right';
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';


const useStyles = makeStyles({
  flexGrow: {
    flex: '1',
  },
  button: {
    '&:hover': {
      backgroundColor: '#D8AC6E',
      color: 'transperant',
  },
}})

export const HomeHero = (props) => {
  const theme = useTheme();
  const classes = useStyles()

  const LandingPage = styled(AppBar)(({ theme }) => ({
    // backgroundColor: 'background.paper',
    // ...(theme.palette.mode === 'dark'
    //   ? {
    //     // color:'#002E4E',
    //     background: 'linear-gradient(to bottom, #000000, #D8AC6E)',
    //   }
    //   : {
    //     backgroundColor: 'background.paper',
    //   })
  }));
  
  return (
    <>
    <LandingPage>  
      <Box
        sx={{
          backgroundColor: 'background.paper',
          // background: 'linear-gradient(to bottom, #000000, #D8AC6E)',
          pt: 6
        }}
        {...props}>
        <Container
          maxWidth="md"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            color="primary"
            variant="overline"
          >
            Introducing
          </Typography>
          <Typography
            align="center"
            variant="h1"
          >
            Architectural Prototyping, Simplified
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            variant="subtitle1"
            sx={{ py: 3 }}
          >
            A generative and collaborative design tool for architects with one
            common goal in mind, help you communicate with your clients &amp; unleash your creative abilities.
          </Typography>
          <Box
            sx={{
              alignItems: {
                sm: 'center',
                xs: 'flex-start'
              },
              display: 'flex',
              flexDirection: {
                sm: 'row',
                xs: 'column'
              },
              py: 3,
              m: -1,
              '& > *': {
                m: 1
              }
            }}
          >
            {['Generate', 'Collaborate'].map((item) => (
              <Box
                key={item}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  m: 2
                }}
              >
                <Typography variant="subtitle2">
                  {item == 'Iterate' ? item : item}
                </Typography>
                <ArrowRight
                  color="success"
                  sx={{ ml: 3 }}
                />
              </Box>
            ))}
            <Typography variant="subtitle2">
                  Iterate
                </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mx: -1,
              mt: 2,
              mb: 6,
              '& > a': {
                m: 1
              }
            }}
          >
            <NextLink
              href="/authentication/register"
              passHref
            >
              <Button
                component="a"
                size="large"
                variant="contained"
                className={classes.button}
              >
                Sign up
              </Button>
            </NextLink>
            <NextLink
              href="/authentication/login"
              passHref
            >
              <Button
                component="a"
                size="large"
                variant="outlined"
              >
                Log in
              </Button>
            </NextLink>
          </Box>
        </Container>
        <Box
          sx={{
            maxWidth: 980,
            width: '100%',
            mx: 'auto'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              pt: 'calc(600 / 980 * 100%)',
              '& img': {
                height: 'auto',
                position: 'absolute',
                top: 0,
                width: '100%'
              }
            }}
          >
            <img
              alt=""
              // src={`/static/home/hero_${theme.palette.mode}.png`}
              src={`/static/home/new_hero.png`}
            />
          </Box>
        </Box>
        <Box sx={{ py: 8 }}>
          <Container
            maxWidth="md"
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              px: 3
            }}
          >
          </Container>
        </Box>
      </Box>
    </LandingPage>
    </>
  );
};
