import { Button, styled } from '@mui/material';
import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { IStores } from '../store';
import POPOVER_CONTAINER_PADDING from './FoldedListbox/constants';
import { BUTTON_HEIGHT } from './ListboxGrid/grid-constants';
import { IStyles } from '../hooks/types/components';

export interface FoldedListboxProps {
  onClick?: (event: { event: React.MouseEvent<HTMLButtonElement> }) => void;
  opened?: boolean;
  stores: IStores;
}

export interface IconProps {
  open?: boolean;
  styles?: IStyles;
}

const ExpandIcon = styled(ExpandMore, { shouldForwardProp: (p: string) => !['styles'].includes(p) })<IconProps>(({ open, styles }) => ({
  color: styles?.header.color,
  fontSize: '1em',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
}));

interface IStyledButtonArgs {
  containerSize?: { height: number };
  styles?: IStyles;
}

const StyledButton = styled(Button, { shouldForwardProp: (p: string) => !['containerSize', 'styles'].includes(p) })(({ containerSize, styles }: IStyledButtonArgs) => {
  let height = BUTTON_HEIGHT;
  if (containerSize?.height && containerSize?.height < BUTTON_HEIGHT + POPOVER_CONTAINER_PADDING) {
    height = containerSize.height - POPOVER_CONTAINER_PADDING - 1;
  }
  return {
    '&.MuiButton-root': {
      justifyContent: 'end',
      width: '100%',
      height,
      borderRadius: '3px',
      border: '1px solid #B3B3B3',
      ...styles?.listbox.background,
    },
  };
});

export const ExpandButton = ({
  onClick, opened, stores,
}: FoldedListboxProps) => {
  const { constraints, styles, containerSize } = stores.store.getState();

  const StyledDiv = styled('div')(() => ({
    display: 'flex',
  }));

  return (
    <StyledDiv>
      <StyledButton
        styles={styles}
        containerSize={containerSize}
        onClick={(event) => onClick?.({ event })}
        disableRipple
        disabled={constraints?.active}
        data-testid="filterpane-expand-button"
      >
        <ExpandIcon open={opened} styles={styles}></ExpandIcon>
      </StyledButton>
    </StyledDiv>
  );
};
