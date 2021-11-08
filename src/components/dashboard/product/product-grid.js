import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from './project-card';


export default function ProjectGrid() {
  return (
    <Box
        sx={{
          backgroundColor: 'background.default',
          
        }}
      >
      <Grid container spacing={3}>
        <Grid item xs>
          <ProductCard
            title="Rustic Vancouver Cottage"
            description="Modern cottage on the coast for a family of 4."
            members = {2}
          />
        </Grid>
        <Grid item xs>
            <ProductCard
                title="Modern Montreal Bungalow"
                description="Modern cottage on the coast for a family of 4."
                members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {10}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {1}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {3}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {2}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {5}
            />
        </Grid>
        <Grid item xs>
            <ProductCard
            title="Seaside Vacation Home"
            description="Vacation home for a family of 4"
            members = {6}
            />
        </Grid>
      </Grid>
    </Box>
  );
}