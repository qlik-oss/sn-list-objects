import { Button, Grid, styled } from '@mui/material';
import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BUTTON_HEIGHT } from './ListboxGrid/distribute-resources';
import type { IStores } from '../store';
import POPOVER_CONTAINER_PADDING from './FoldedListbox/constants';

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
  const { constraints, stardustTheme, containerSize } = stores.store.getState();

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
      backgroundColor: stardustTheme?.getStyle('object', '', 'listBox.backgroundColor') ?? '#FFFFFF',
      width: '100%',
      height,
      border: '1px solid #B3B3B3',
      borderRadius: '3px',
      justifyContent: 'end',
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
