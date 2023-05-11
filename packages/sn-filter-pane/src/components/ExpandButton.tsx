import { Button, styled } from '@mui/material';
import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BUTTON_HEIGHT } from './ListboxGrid/distribute-resources';
import type { IStores } from '../store';

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
  const { constraints, stardustTheme } = stores.store.getState();

  const ExpandIcon = styled(ExpandMore)<IconProps>(({ open }) => ({
    color: '#555555',
    fontSize: '1em',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  }));

  const StyledButton = styled(Button)(() => ({
    backgroundColor: stardustTheme?.getStyle('object', '', 'listBox.backgroundColor') ?? '#FFFFFF',
    width: '100%',
    height: BUTTON_HEIGHT,
    border: '1px solid #B3B3B3',
    borderRadius: '3px',
  }));

  return (
    <>
      <StyledButton
        onClick={(event) => onClick?.({ event })}
        disableRipple
        disabled={constraints?.active}
        data-testid="filterpane-expand-button"
      >
        <ExpandIcon open={opened}></ExpandIcon>
      </StyledButton>
    </>
  );
};
