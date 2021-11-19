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
      <Grid container 
      spacing={3}>
        <Grid item 
        xs>
          <ProductCard
            title="Annex"
            description="Modern home on the coast for a family of 4."
            members = {2}
            image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/carrington/plans/annex/elevations---will-need-to-be-expanded/elevationcraftsman_carrington_annex_main.jpg?sc_lang=en-ca"
            link="/workspace"
          />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
                title="Kanata"
                description="Modern home in the city."
                members = {3}
                image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/caspian/exterior-styles-images/elevationprairie_cityscape_caspian_main.jpg?sc_lang=en-ca"
                link="/workspace"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Vanier End"
            description="Vacation home for a family of 4"
            members = {2}
            image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/thames/exterior-styles-images/elevationprairie_cityscape_thames_main.jpg?sc_lang=en-ca"
            link="/workspace"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Caspian"
            description="Farmhouse for family of 6"
            members = {2}
            image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/hurley/exterior-styles-images/elevationcraftsman_cityscape_hurley_main.jpg?sc_lang=en-ca"
            link="/workspace"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Thames"
            description="Home for a new family with 2 dogs and a baby."
            members = {2}
            image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/cityscape/plans/whistler/elevations/prairie_cityscape_whistler_main.jpg"
            link="/workspace"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Hurley"
            description="Summer home for a family of 3 in the lake country of Ontario."
            members = {2}
            image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/carrington/plans/vanier-end/exterior-styles-images/elevationprairie_carrington_vanierend_main.jpg?sc_lang=en-ca"
            link="/workspace"
            />
        </Grid>
        <Grid item 
        xs>
            <ProductCard
            title="Yukon"
            description="Large Modern home for an adventurous family "
            members = {2}
            image ="https://mattamy.secure.footprint.net/-/media/images/mattamywebsite/canada/calgary/carrington/plans/graydon-corner/exterior-styles-images/elevationcraftsman_carrington_graydoncorner_main.jpg?sc_lang=en-ca"
            link="/workspace"
            />
        </Grid>
      </Grid>
    </Box>
  );
}