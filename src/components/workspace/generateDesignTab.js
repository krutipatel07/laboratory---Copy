import React, { useState, useEffect} from 'react';
import { Box, Button, Container, Typography} from '@mui/material';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withRouter, useRouter } from 'next/router'
import { Logo } from '../logo';
import ConstraintsFloor01 from './constraintsFloor01';
import axios from 'axios'


const GenerateDesignTab = withRouter((props) => {
  const [click, setClick] = useState(false)
  const router = useRouter();
  const [length,setLength] = useState()
  const projectId = router.query.id || router.query.projectId;
  const [show, setShow] = useState(true)


  const handleClick = async (e) => {
    setShow(false)
  };

  useEffect(() => {
    axios.get(`/api/projects/${projectId}`)
      .then(res => {
          // fetch existing parameters form a project
          const length = res.data.data.search_parameters.length;
          setLength(length);
        }
      )
      .catch(error => console.log(error));
      setShow(true)
  }, [projectId]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mb: 8, mt: 4
        }}
      >
       {show && length===0 ?
        <Container maxWidth="xl" sx={{textAlign: "center"}}>
            <Typography sx={{textAlign: 'center', fontSize: '20px', paddingTop: '100px'}}>Let's generate your first design</Typography>
            <Logo
                  sx={{
                    height: open ? 45 : 55,
                    width: open ? 55 : 55,
                    justifyContent: 'center',
                    m:2
                  }}
                  variant="light"
                />
            <div><Button variant="contained" onClick={handleClick} sx={{mt: 3, '&:hover': {backgroundColor: "#000000"}}}>
                GENERATE DESIGNS</Button></div>
        </Container> : <ConstraintsFloor01 setValue={props.setValue} projectId= {props.router.query.id}/> }   

      </Box>
    </>
  );
})

export default withAuthGuard(GenerateDesignTab);