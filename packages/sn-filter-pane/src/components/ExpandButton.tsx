import { Button, styled } from '@mui/material';
import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { IStores } from '../store';
import POPOVER_CONTAINER_PADDING from './FoldedListbox/constants';
import { BUTTON_HEIGHT } from './ListboxGrid/grid-constants';

export interface FoldedListboxProps {
  onClick?: (event: { event: React.MouseEvent<HTMLButtonElement> }) => void;
  opened?: boolean;
  stores: IStores;
}

export interface IconProps {
  open?: boolean;
}

export const ExpandButton = ({
  onClick, opened, stores,
}: FoldedListboxProps) => {
  const { constraints, styles, containerSize } = stores.store.getState();

  const ExpandIcon = styled(ExpandMore)<IconProps>(({ open }) => ({
    color: '#555555',
    fontSize: '1em',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  }));

  const StyledButton = styled(Button)(() => {
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

  const StyledDiv = styled('div')(() => ({
    display: 'flex',
  }));

  return (
    <StyledDiv>
      <StyledButton
        onClick={(event) => onClick?.({ event })}
        disableRipple
        disabled={constraints?.active}
        data-testid="filterpane-expand-button"
      >
        <ExpandIcon open={opened}></ExpandIcon>
      </StyledButton>
    </StyledDiv>
  );
};
