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
            link="/workspace/variant"
          />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
                title="Variant_2"
                link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_3"
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_4"
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_5"
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_6"
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_7"
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_8"
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <VariantCard
            title="Variant_9"
            link="/workspace/variant"
            />
        </Grid>
      </Grid>
    </Box>
  );
}