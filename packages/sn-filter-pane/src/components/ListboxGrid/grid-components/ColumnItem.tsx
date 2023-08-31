import { Grid } from '@mui/material';
import React from 'react';
import { IListboxResource } from '../../../hooks/types';
import { COLLAPSED_HEIGHT, ITEM_SPACING } from '../distribute-resources';

export type ColumnItemProps = {
  height?: string | number,
  children: React.ReactNode,
  listItem?: IListboxResource,
  lastItem?: boolean,
}

export const ColumnItem = ({
  height,
  children,
  listItem,
  lastItem,
  ...rest
}: ColumnItemProps) => {
  const getPaddingBottom = () => {
    if (listItem?.expand && (listItem.alwaysExpanded || !lastItem)) {
      return '8px';
    }
    return '0px';
  };

  const getHeight = () => {
    if (height) {
      return height;
    }
    return listItem?.expand ? listItem?.height : COLLAPSED_HEIGHT + ITEM_SPACING;
  };

  return (
    <Grid
      item
      height={getHeight()}
      paddingTop='0px'
      width='100%'
      paddingBottom={getPaddingBottom()}
      boxSizing='content-box'
      {...rest}>
      {children}
    </Grid>
  );
};
