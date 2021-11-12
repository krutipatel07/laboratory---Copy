import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from '../dashboard/product/project-card';


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
          <ProductCard
            title="Variant_1"
            description=""
            members = {2}
            link="/workspace/variant"
          />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
                title="Variant_2"
                description=""
                members = {3}
                link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_3"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_4"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_5"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_6"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_7"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_8"
            description=""
            members = {10}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_9"
            description=""
            members = {1}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_10"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_11"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_12"
            description=""
            members = {3}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_14"
            description=""
            members = {2}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="SVariant_15"
            description=""
            members = {5}
            link="/workspace/variant"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Variant_16"
            description=""
            members = {6}
            link="/workspace/variant"
            />
        </Grid>
      </Grid>
    </Box>
  );
}