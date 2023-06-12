import React from 'react';
import { Grid } from '@mui/material';
import getSegmentsSizes from './get-segment-sizes';

interface SelectionSegmentsIndicatorProps {
  qDimensionInfo: EngineAPI.INxDimensionInfo,
  fullHeight: boolean,
}

const SelectionSegmentsIndicator = ({ qDimensionInfo, fullHeight }: SelectionSegmentsIndicatorProps) => {
  if (!qDimensionInfo) {
    return null;
  }
  const ratios = getSegmentsSizes(qDimensionInfo);
  const segmentHeight = fullHeight ? '100%' : '4px';
  const segments = [
    {
      key: 'green',
      style: {
        background: '#009845',
        height: segmentHeight,
        width: ratios.green,
      },
    },
    {
      key: 'white',
      style: {
        background: '#fff',
        height: segmentHeight,
        width: ratios.white,
      },
    },
    {
      key: 'grey',
      style: {
        background: '#d2d2d2',
        height: segmentHeight,
        width: ratios.grey,
      },
    },
  ];

  return (
    <Grid container bgcolor='#a9a9a9' borderTop='1px solid #cccccc' height={fullHeight ? '100%' : undefined}>
      {segments.map((s) => (
        <Grid item key={s.key} style={s.style} />
      ))}
    </Grid>
  );
};

export default SelectionSegmentsIndicator;
