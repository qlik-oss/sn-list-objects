import { stardust } from '@nebula.js/stardust';
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
import KEYS from '../keys';

export interface FoldedListboxClickEvent {
  event: React.MouseEvent<HTMLDivElement>;
  resource: IListboxResource;
}
export interface FoldedListboxProps {
  resource: IListboxResource;
  onClick: ({ event, resource }: FoldedListboxClickEvent) => void;
  stores: IStores;
  tabIndex?: number;
}
interface StyledGridProps {
  constraints?: stardust.Constraints;
  stardustTheme?: stardust.Theme;
  containerRef: React.RefObject<HTMLDivElement>;
}

const StyledGrid = styled(Grid, { shouldForwardProp: (p) => !['constraints', 'stardustTheme', 'containerRef'].includes(p as string) })<StyledGridProps>(
  ({ constraints, stardustTheme, containerRef }) => ({
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
    '&:focus:not(:hover)': {
      boxShadow: 'inset 0 0 0 2px #3F8AB3 !important',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  }),
);

export const FoldedListbox = ({ resource, onClick, stores }: FoldedListboxProps) => {
  const fieldName = useFieldName(resource.layout);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    constraints, stardustTheme, options, translator,
  } = stores.store.getState();
  const isRtl = options.direction === 'rtl';
  const isDrillDown = resource.layout.qListObject.qDimensionInfo.qGrouping === 'H';

  const changeFocus = (event: React.KeyboardEvent) => {
    // @ts-ignore
    event.target?.setAttribute('tabIndex', '-1');
    // @ts-ignore
    event.target?.blur();
    // Then it propagates to the top-level (i.e. to filter pane)
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      return;
    }
    switch (event.key) {
      case KEYS.ESC:
        changeFocus(event);
        break;
      case KEYS.ENTER:
      // @ts-ignore
        onClick({ event, resource });
        break;
      case KEYS.LEFT:
      case KEYS.RIGHT:
        return; // let it propagate to top-level      default:
      default:
        return;
    }

    // Note: We should not stop propagation here as it will block the containing app
    // from handling keydown events.
    event.preventDefault();
  };

  return (
    <div ref={containerRef}>
      <StyledGrid
        constraints={constraints}
        stardustTheme={stardustTheme}
        containerRef={containerRef}
        className="folded-listbox-container"
        container
        onKeyDown={handleKeyDown}
        direction='column'
        data-testid={`collapsed-title-${fieldName}`}
        onClick={(event) => onClick({ event, resource })}>
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
