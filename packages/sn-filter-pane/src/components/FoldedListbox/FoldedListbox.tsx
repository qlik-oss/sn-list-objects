import {
  Grid, styled, Tooltip, Typography
} from '@mui/material';
import React, { useRef } from 'react';
import { IListboxResource } from '../../hooks/types';
import useFieldName from '../../hooks/use-field-name';
import type { IStores } from '../../store';
import { COLLAPSED_HEIGHT } from '../ListboxGrid/distribute-resources';
import SelectionSegmentsIndicator from './SelectionSegmentsIndicator';

export interface FoldedListboxClickEvent {
  event: React.MouseEvent<HTMLDivElement>;
  resource: IListboxResource;
}
export interface FoldedListboxProps {
  resource: IListboxResource;
  onClick: ({ event, resource }: FoldedListboxClickEvent) => void;
  stores: IStores;
}

export const FoldedListbox = ({ resource, onClick, stores }: FoldedListboxProps) => {
  const fieldName = useFieldName(resource.layout);
  const containerRef = useRef<HTMLDivElement>(null);
  const { constraints, stardustTheme, options } = stores.store.getState();
  const isRtl = options.direction === 'rtl';

  const StyledGrid = styled(Grid)(() => ({
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: '1px solid #d9d9d9',
    borderRadius: '3px',
    height: COLLAPSED_HEIGHT,
    overflow: 'hidden',
    cursor: constraints?.active ? 'default' : 'pointer',
    ':hover': !constraints?.active && {
      border: '1px solid #595959',
    },
    backgroundColor: stardustTheme?.getStyle('object', '', 'listBox.backgroundColor') ?? '#FFFFFF',
    color: stardustTheme?.getStyle('object', '', 'listBox.title.main.color') ?? '#404040',
    width: containerRef?.current?.clientWidth,
  }));

  return (
    <div ref={containerRef}>
      <StyledGrid container direction='column' onClick={(event) => onClick({ event, resource })}>
        <Tooltip title={fieldName} enterDelay={2000}>
          <Grid container flexGrow={1} alignItems={'center'} sx={{ justifyContent: isRtl ? 'flex-end' : 'flex-start' }} padding='0 8px'>
            <Typography variant="subtitle2" fontSize='13px' noWrap>
              {fieldName}
            </Typography>
          </Grid>
        </Tooltip>
        <Grid item width='100%'>
          <SelectionSegmentsIndicator
            qDimensionInfo={resource.layout.qListObject.qDimensionInfo}
          ></SelectionSegmentsIndicator>
        </Grid>
      </StyledGrid>
    </div>
  );
};
