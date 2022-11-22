import {
  Grid, Popover, styled, Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { IListLayout } from '../../hooks/types';
import useFieldName from '../../hooks/use-field-name';
import { store } from '../../store';
import ListboxContainer from '../ListboxContainer';
import { COLLAPSED_HEIGHT } from '../ListboxGrid/distribute-resources';
import SelectionSegmentsIndicator from './SelectionSegmentsIndicator';

export interface FoldedListboxProps {
  layout: IListLayout;
}

export const FoldedListbox = ({ layout }: FoldedListboxProps) => {
  const fieldName = useFieldName(layout);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef(null);
  const { options, constraints } = store.getState();

  const StyledGrid = styled(Grid)(() => ({
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: '1px solid #d9d9d9',
    borderRadius: '3px',
    height: COLLAPSED_HEIGHT,
    overflow: 'hidden',
    ':hover': !constraints?.active && {
      border: '1px solid #595959',
    },
  }));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.target as Node) && !constraints?.active) {
      setPopoverOpen(true);
    }
  };

  const handleClose = () => setPopoverOpen(false);

  return (
    <div ref={containerRef}>
      <StyledGrid container direction='column' onClick={handleClick}>
        <Grid container flexGrow={1} alignItems={'center'} padding='0 8px'>
          <Typography variant="subtitle2" fontSize='13px'>
            {fieldName}
          </Typography>
        </Grid>
        <Grid item width='100%'>
          <SelectionSegmentsIndicator
            qDimensionInfo={layout.qListObject.qDimensionInfo}
          ></SelectionSegmentsIndicator>
        </Grid>
        <Popover
          open={popoverOpen}
          onClose={handleClose}
          anchorEl={containerRef.current}
          PaperProps={{
            style: {
              height: '330px',
              overflow: 'hidden',
            },
          }}
        >
          <ListboxContainer
            layout={layout}
            listboxOptions={options.listboxOptions ?? {}}
            constraints={constraints}
          ></ListboxContainer>
        </Popover>
      </StyledGrid>
    </div>
  );
};
