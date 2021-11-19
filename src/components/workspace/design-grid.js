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
            image={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3290-1st-level-500px-71387195.jpg"}
            link="/workspace/variant"
          />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
                title="Variant_2"
                members = {3}
                comments = {6}
                image={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3287-1st-level-500px-1b1fd892.jpg"}
                link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_3"
            members = {2}
            comments = {34}
            image={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3992-1st-level-500px-7caa7172.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_4"
            members = {2}
            comments = {2}
            image={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3153-v3-1st-level-500px-c742b6b0.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_5"
            members = {2}
            comments = {21}
            image={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3942-1st-level-500px-9c90faf8.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_6"
            members = {2}
            comments = {4}
            image={"https://drummondhouseplans.com/assets/_entemp_/plan-house-3284-cjg1-1st-level-500px-7e30a2db.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_7"
            members = {2}
            comments = {7}
            image={"https://media.istockphoto.com/photos/modern-interior-design-floor-plan-3d-render-picture-id1210637949?b=1&k=20&m=1210637949&s=170667a&w=0&h=_AYB0vxwWWVFSUjaNpVb3X88ybQLLXtdNJUW8IllR1E="}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_8"
            members = {10}
            comments = {47}
            image={"https://static.turbosquid.com/Preview/001152/874/ZK/3D-floor-plan_DHQ.jpg"}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_9"
            members = {1}
            comments = {16}
            image={"https://static.turbosquid.com/Preview/001201/665/78/floor-plan-3D_DHQ.jpg"}
            link="/workspace/variant"
            />
        </Grid>
      </Grid>
    </Box>
  );
}