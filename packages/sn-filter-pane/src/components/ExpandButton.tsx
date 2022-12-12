import { Avatar, Button, styled } from '@mui/material';
import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BUTTON_HEIGHT } from './ListboxGrid/distribute-resources';
import { store } from '../store';

export interface FoldedListboxProps {
  onClick?: (event: { event: React.MouseEvent<HTMLButtonElement> }) => void;
  opened?: boolean;
  avatar: number;
}

export interface IconProps {
  open?: boolean;
}

export const ExpandButton = ({
  onClick, opened, avatar,
}: FoldedListboxProps) => {
  const ExpandIcon = styled(ExpandMore)<IconProps>(({ open }) => ({
    color: '#555555',
    fontSize: '1em',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  }));

  const StyledButton = styled(Button)(() => ({
    backgroundColor: '#FFFFFF',
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

  const { constraints } = store.getState();

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
