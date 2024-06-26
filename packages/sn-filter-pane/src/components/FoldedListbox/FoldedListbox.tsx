import { stardust } from '@nebula.js/stardust';
import {
  Grid, styled, Tooltip, Typography,
} from '@mui/material';
import React from 'react';
import { IListboxResource } from '../../hooks/types';
import useFieldName from '../../hooks/use-field-name';
import type { IStores } from '../../store';
import DimensionIcon from './DimensionIcon';
import SelectionSegmentsIndicator from './SelectionSegmentsIndicator';
import KEYS from '../keys';
import getSizes from './get-sizes';
import { IStyles } from '../../hooks/types/components';
import useTranslations from '../../hooks/use-translations';

export interface FoldedListboxClickEvent {
  event: React.MouseEvent<HTMLObjectElement | HTMLDivElement>;
  resource: IListboxResource;
}
export interface FoldedListboxProps {
  resource: IListboxResource;
  onClick: ({ event, resource }: FoldedListboxClickEvent) => void;
  stores: IStores;
  tabIndex?: number;
  isInPopover?: boolean;
}
interface StyledGridProps {
  constraints?: stardust.Constraints;
  styles?: IStyles;
  isInPopover: boolean;
  height: number;
}
interface StyledDivProps {
  isInPopover?: boolean;
}

const POPOVER_PADDING = 2;

const StyledDiv = styled('div', { shouldForwardProp: (p) => !['isInPopover'].includes(p as string) })<StyledDivProps>(
  ({ isInPopover }) => ({
    '&:focus': {
      boxShadow: 'inset 0 0 0 2px #3F8AB3 !important',
    },
    '&:focus-visible': {
      outline: 'none',
    },
    padding: isInPopover ? `${POPOVER_PADDING}px` : undefined,
  }),
);

const StyledGrid = styled(Grid, { shouldForwardProp: (p) => !['constraints', 'styles', 'isInPopover', 'height'].includes(p as string) })<StyledGridProps>(
  ({
    constraints,
    styles,
    isInPopover,
    height,
  }) => {
    const popoverPadding = isInPopover ? POPOVER_PADDING * 2 : 0;
    return {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      border: '1px solid #d9d9d9',
      borderRadius: '3px',
      height,
      overflow: 'hidden',
      cursor: constraints?.active ? 'default' : 'pointer',
      ':hover': !constraints?.active && {
        border: '1px solid #595959',
      },
      ...styles?.listbox.background,
      color: styles?.listbox.color,
      width: isInPopover ? `calc(100% - ${2 * popoverPadding}px` : '100%',
      '&:focus:not(:hover)': {
        boxShadow: 'inset 0 0 0 2px #3F8AB3 !important',
      },
      '&:focus-visible': {
        outline: 'none',
      },
    };
  },
);

const Title = styled(Typography, { shouldForwardProp: (p) => !['styles'].includes(p as string) })<{ styles?: IStyles }>(
  ({ styles }) => ({
    ...(styles?.header || {}),
    fontSize: '13px', // hard-coded since space is limited in collapsed mode
  }),
);

export const FoldedListbox = ({
  resource, onClick, stores, isInPopover,
}: FoldedListboxProps) => {
  const fieldName = useFieldName(resource.layout);
  const {
    constraints, styles, options, translator: t, containerSize,
  } = stores.store.getState();
  const translator = useTranslations({ translator: t });
  const isRtl = options.direction === 'rtl';
  const { qDimensionInfo } = resource.layout.qListObject;
  const {
    gridHeight, narrowSmall, narrowLarge,
  } = getSizes(containerSize, isInPopover);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      return;
    }
    switch (event.key) {
      case KEYS.ENTER:
      // @ts-ignore
        onClick({ event, resource });
        break;
      default:
        return;
    }

    // Note: We should not stop propagation here since this folded listbox maybe deystroyed
    // and we need to set focus to the listbox container after this.
    event.preventDefault();
  };

  return (
    <StyledDiv className="folded-listbox" onKeyDown={handleKeyDown} isInPopover={isInPopover}>
      <StyledGrid
        constraints={constraints}
        styles={styles}
        container
        direction='column'
        data-testid={`collapsed-title-${fieldName}`}
        isInPopover={!!isInPopover}
        onClick={(event) => onClick({ event, resource })}
        height={gridHeight}
      >
        {!narrowSmall
          && <Grid container flexGrow={1} alignItems="center" sx={{ flexDirection: isRtl ? 'row-reverse' : 'row', flexWrap: 'nowrap' }} padding='0 8px' height={narrowLarge ? '100%' : undefined}>
            <DimensionIcon type={qDimensionInfo.qGrouping} translator={translator} isRtl={isRtl}/>
            <Tooltip title={fieldName} enterDelay={2000}>
              <Title variant="subtitle2" styles={styles} noWrap lineHeight={narrowLarge ? '100%' : 'normal'}>
                {fieldName}
              </Title>
            </Tooltip>
          </Grid>
        }
        {!narrowLarge
          && <Grid item width='100%' height={narrowSmall ? '100%' : undefined}>
            <SelectionSegmentsIndicator
              qDimensionInfo={qDimensionInfo} fullHeight={narrowSmall} styles={styles}
            ></SelectionSegmentsIndicator>
          </Grid>
        }
      </StyledGrid>
    </StyledDiv>
  );
};
