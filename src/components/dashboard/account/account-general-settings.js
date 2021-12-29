import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import { useAuth } from '../../../hooks/use-auth';

export const AccountGeneralSettings = (props) => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  return (
    <Box
      sx={{ mt: 4 }}
      {...props}>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Basic details
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Avatar
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.email}`}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button>
                  Change
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.email}
                  label="Full Name"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />
                <Button>
                  Save
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.email}
                  disabled
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dashed'
                    }
                  }}
                />
                <Button>
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
