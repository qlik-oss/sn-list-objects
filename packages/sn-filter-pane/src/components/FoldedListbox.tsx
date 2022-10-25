import { Typography } from '@mui/material';
import React from 'react';
import { IListLayout } from '../hooks/types';
import useFieldName from '../hooks/use-field-name';
import { COLLAPSED_HEIGHT } from './ListboxGrid/distribute-resources';

export interface FoldedListboxProps {
  layout: IListLayout;
}

// TODO: Add Listbox in a popover when clicking this component.
export const FoldedListbox = ({ layout }: FoldedListboxProps) => {
  const fieldName = useFieldName(layout);

  return (
    <Typography
      variant="subtitle2"
      border="1px solid lightgrey"
      height={COLLAPSED_HEIGHT - 2}
    >
      {fieldName}
    </Typography>
  );
};
