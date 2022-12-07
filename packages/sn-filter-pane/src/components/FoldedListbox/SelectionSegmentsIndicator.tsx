import React from 'react';
import { Grid } from '@mui/material';
import { motion } from "framer-motion";
import getSegmentsSizes from './get-segment-sizes';

interface SelectionSegmentsIndicatorProps {
  qDimensionInfo: EngineAPI.INxDimensionInfo,
}

const SelectionSegmentsIndicator = ({ qDimensionInfo }: SelectionSegmentsIndicatorProps) => {
  if (!qDimensionInfo) {
    return null;
  }
  const ratios = getSegmentsSizes(qDimensionInfo);
  const segmentHeight = '4px';
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
    <Grid container bgcolor='#a9a9a9' borderTop='1px solid #cccccc'>
      {segments.map((s) => (
        <>
          {/* <Grid item key={s.key} style={s.style} /> */}
          <motion.div key={s.key} style={{ display: 'flex', height: s.style.height, background: s.style.background }} animate={{ width: s.style.width }} transition={{ bounce: false }} />
        </>
      ))}
    </Grid>
  );
};

export default SelectionSegmentsIndicator;
