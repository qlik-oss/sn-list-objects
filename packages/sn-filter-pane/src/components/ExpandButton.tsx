import { Button } from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { BUTTON_HEIGHT } from './ListboxGrid/distribute-resources';

export interface FoldedListboxProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const ExpandButton = ({ onClick, disabled }: FoldedListboxProps) => (
  <>
    <Button
      onClick={() => onClick?.()}
      disableRipple
      disabled={disabled}
      sx={{
        backgroundColor: '#F0F0F0',
        width: '100%',
        height: BUTTON_HEIGHT,
      }}
    >
      <MoreHorizIcon sx={{ color: '#555555' }} />
    </Button>
  </>
);
