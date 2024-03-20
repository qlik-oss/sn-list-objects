import React from 'react';
import { Grid } from '@mui/material';
import getSegmentsSizes from './get-segment-sizes';
import { ISelectionsComponent, IStyles } from '../../hooks/types/components';

interface SelectionSegmentsIndicatorProps {
  qDimensionInfo: EngineAPI.INxDimensionInfo,
  fullHeight: boolean,
  styles?: IStyles,
}

type SelectionState = ('selected' | 'selectedExcluded' | 'possible' | 'alternative' | 'excluded');

const SelectionSegmentsIndicator = ({ qDimensionInfo, fullHeight, styles }: SelectionSegmentsIndicatorProps) => {
  if (!qDimensionInfo) {
    return null;
  }
  const ratios = getSegmentsSizes(qDimensionInfo);
  const segmentHeight = fullHeight ? '100%' : '4px';
  const { selections = {} as ISelectionsComponent['colors'] } = styles?.listbox || {};

  // The keys also determine the order in which the sections will be rendered.
  const keys: SelectionState[] = ['selected', 'selectedExcluded', 'possible', 'alternative', 'excluded'];
  const segments = keys.map((key: SelectionState) => ({
    key,
    style: {
      background: selections[key],
      height: segmentHeight,
      width: ratios[key],
    },
  }));

  return (
    <Grid container borderTop='1px solid #cccccc' height={fullHeight ? '100%' : undefined}>
      {segments.map((s) => (
        <Grid item key={s.key} style={s.style} />
      ))}
    </Grid>
  );
};

export default SelectionSegmentsIndicator;
