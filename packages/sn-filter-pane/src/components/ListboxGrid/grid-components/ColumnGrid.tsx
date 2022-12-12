import { Grid } from '@mui/material';
import React from 'react';

export interface ColumnGridProps {
  widthPercent: number,
  children: React.ReactNode,
}

export const ColumnGrid = ({ widthPercent, children }: ColumnGridProps) => (
  <Grid item width={`${widthPercent}%`} height='100%'>
    {children}
  </Grid>
);
