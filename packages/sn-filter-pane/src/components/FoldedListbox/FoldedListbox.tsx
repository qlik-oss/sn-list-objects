import {
  Grid, styled, Tooltip, Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import { IListboxResource } from '../../hooks/types';
import useFieldName from '../../hooks/use-field-name';
import type { IStores } from '../../store';
import { COLLAPSED_HEIGHT } from '../ListboxGrid/distribute-resources';
import DrillDown from './drillDown';
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
  const { constraints, stardustTheme, options, translator } = stores.store.getState();
  const isRtl = options.direction === 'rtl';
  const isDrillDown = resource.layout.qListObject.qDimensionInfo.qGrouping === 'H';

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
        <Grid container flexGrow={1} alignItems={'center'} sx={{ flexDirection: isRtl ? 'row-reverse' : 'row', flexWrap: 'nowrap' }} padding='0 8px'>
          {isDrillDown
            && <Tooltip title={translator?.get('Listbox.DrillDown')} enterDelay={2000}>
              <div>
                < DrillDown style={{ fontSize: '12px', padding: isRtl ? '0 0 0 6px' : '0 6px 0 0' }} />
              </div>
            </Tooltip>
          }
          <Tooltip title={fieldName} enterDelay={2000}>
            <Typography variant="subtitle2" fontSize='13px' noWrap>
              {fieldName}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item width='100%'>
          <SelectionSegmentsIndicator
            qDimensionInfo={resource.layout.qListObject.qDimensionInfo}
          ></SelectionSegmentsIndicator>
        </Grid>
      </StyledGrid>
    </div>
  );
};
