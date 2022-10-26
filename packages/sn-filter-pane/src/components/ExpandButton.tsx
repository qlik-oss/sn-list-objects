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
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: BUTTON_HEIGHT,
        border: '1px solid #B3B3B3',
        borderRadius: '3px',
      }}
    >
      <MoreHorizIcon sx={{ color: '#555555' }} />
    </Button>
  </>
);
