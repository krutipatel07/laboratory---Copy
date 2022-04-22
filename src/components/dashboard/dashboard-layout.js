
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  // paddingTop: 64,
  paddingTop: 15,
  [theme.breakpoints.up('lg')]: {
    // paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
