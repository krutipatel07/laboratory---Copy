import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VariantCard from './variantCard';


export default function DesignGrid() {
  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
      <Grid container 
      spacing={3}>
        <Grid item 
        xs>
          <VariantCard
            title="Variant_1"
            members = {2}
            comments = {12}
            image={"https://media.istockphoto.com/photos/residential-building-blueprint-plan-real-estate-housing-project-picture-id1288292255"}
            link="/workspace/variant"
          />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
                title="Variant_2"
                members = {3}
                comments = {6}
                image={"https://upload.wikimedia.org/wikipedia/commons/9/9a/Sample_Floorplan.jpg"}
                link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_3"
            members = {2}
            comments = {34}
            image={"https://www.houseplanshelper.com/images/how-to-read-floor-plans-compass-mark.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_4"
            members = {2}
            comments = {2}
            image={"https://media.istockphoto.com/photos/modern-interior-design-floor-plan-3d-render-picture-id1210637949?b=1&k=20&m=1210637949&s=170667a&w=0&h=_AYB0vxwWWVFSUjaNpVb3X88ybQLLXtdNJUW8IllR1E="}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_5"
            members = {2}
            comments = {21}
            image={"https://static.turbosquid.com/Preview/001152/874/ZK/3D-floor-plan_DHQ.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_6"
            members = {2}
            comments = {4}
            image={"https://static.turbosquid.com/Preview/001201/665/78/floor-plan-3D_DHQ.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_7"
            members = {2}
            comments = {7}
            image={"https://static.turbosquid.com/Preview/2020/04/05__05_53_16/2bed001.png8E58081D-9D5B-4C44-8042-F1BB1E4A0FB4DefaultHQ.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_8"
            members = {10}
            comments = {47}
            image={"https://static.turbosquid.com/Preview/2016/12/13__16_39_23/cgcos_fp2_05.jpgA66FA8A4-FAA2-4EA7-B73D-22F549864621Zoom.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_9"
            members = {1}
            comments = {16}
            image={"https://online.visual-paradigm.com/repository/images/4605071b-3b7a-4891-bdc5-43975736c2ab/floor-plan-design/office-floor-plan.png"}
            link="/workspace/variant"
            />
        </Grid>
      </Grid>
    </Box>
  );
}