import { Avatar, Button, styled } from '@mui/material';
import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BUTTON_HEIGHT } from './ListboxGrid/distribute-resources';
import type { IStores } from '../store';

export interface FoldedListboxProps {
  onClick?: (event: { event: React.MouseEvent<HTMLButtonElement> }) => void;
  opened?: boolean;
  avatar: number;
  stores: IStores;
}

export interface IconProps {
  open?: boolean;
}

export const ExpandButton = ({
  onClick, opened, avatar, stores,
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
    justifyContent: 'space-between',
  }));

  const StyledAvatar = styled(Avatar)(() => ({
    width: 16,
    height: 16,
    backgroundColor: '#00873D',
    fontSize: '12px',
  }));

  return (
    <>
      <StyledButton
        onClick={(event) => onClick?.({ event })}
        disableRipple
        disabled={constraints?.active}
      >
        <StyledAvatar>{avatar}</StyledAvatar>
        <ExpandIcon open={opened}></ExpandIcon>
      </StyledButton>
    </>
  );
};
