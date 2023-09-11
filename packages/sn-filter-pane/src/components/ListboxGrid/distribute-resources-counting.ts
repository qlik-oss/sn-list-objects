import { IListboxResource } from '../../hooks/types';
import {
  COLLAPSED_HEIGHT, COLUMN_MIN_WIDTH, COLUMN_SPACING, EXPANDED_HEADER_HEIGHT, ITEM_SPACING, LIST_ROW_HEIGHT, LIST_DENSE_ROW_HEIGHT, SINGLE_GRID_ROW_HEIGHT,
} from './grid-constants';
import { ExpandProps, IColumn, ISize } from './interfaces';

const getExpandedRowHeight = (dense: boolean) => (dense ? LIST_DENSE_ROW_HEIGHT : LIST_ROW_HEIGHT);

export function getListBoxMinHeight(resource: IListboxResource, outerWidth = false) {
  const { dense = false, collapseMode } = resource.layout.layoutOptions || {};

  let h = 0;
  if (collapseMode === 'never') {
    // If listbox is not allowed to collapse, then the height will be different.
    h += getExpandedRowHeight(dense);
    h += resource.hasHeader ? EXPANDED_HEADER_HEIGHT : 0;
  } else {
    h += COLLAPSED_HEIGHT;
  }
  if (outerWidth) {
    h += ITEM_SPACING;
  }

  return h;
}

export const getMaxColumns = (size: ISize, isSmallDevice: boolean) => (isSmallDevice ? 1 : Math.floor((size.width + COLUMN_SPACING) / (COLUMN_MIN_WIDTH + COLUMN_SPACING)) || 1);

export function howManyListBoxesFit(columnSize: ISize, resourcesSlice: IListboxResource[]) {
  const columnOuterHeight = columnSize.height + ITEM_SPACING;
  let count = 0;
  let accHeight = 0;
  let resource;

  for (let i = 0, len = resourcesSlice.length; i < len; i++) {
    resource = resourcesSlice[i];
    accHeight += getListBoxMinHeight(resource, true);
    if (accHeight >= columnOuterHeight) {
      break; // we cannot fit any more listboxes inside this column
    }
    count += 1;
  }
  return count;
}

/**
 * Returns the total number of Listboxes (items)
 * that have been added to all the columns.
 */
export function countListBoxes(columns: IColumn[]) {
  let count = 0;

  columns.forEach((column) => {
    count += (column.itemCount ?? 0);
  });

  return count;
}

export const getDimensionCardinal = (item: IListboxResource) => item.layout.qListObject.qDimensionInfo.qCardinal;

export const doAllFit = (
  maxCollapsedPerColumn: number, // max listboxes per column
  columnsCount: number,
  listboxesCount: number,
): boolean => listboxesCount <= maxCollapsedPerColumn * columnsCount;

/**
 * The threshold for which to collapse or expand a particular Listbox.
 *
 */
export function getExpandedHeightLimit(expandProps: ExpandProps) {
  let heightLimit = 90;
  if (expandProps.alwaysExpanded) {
    heightLimit = 0;
  } else if (expandProps.isSingleGridLayout) {
    // If single grid and no header, don't collapse, by setting the limit to 0.
    const singleGridLimit = expandProps.hasHeader ? EXPANDED_HEADER_HEIGHT + SINGLE_GRID_ROW_HEIGHT : 0;
    heightLimit = singleGridLimit;
  }
  return heightLimit;
}

export const getListBoxMaxHeight = (item: IListboxResource) => {
  const {
    cardinal, dense, hasHeader, neverExpanded,
  } = item || {};

  let maxHeight = 0;
  if (neverExpanded) {
    maxHeight = getListBoxMinHeight(item);
  } else {
    maxHeight = cardinal * getExpandedRowHeight(dense) + (hasHeader ? EXPANDED_HEADER_HEIGHT : 0);
  }
  return maxHeight;
};

/**
 * Iterate through all items in the column and summarise the height of all
 * individual listboxes.
 */
export function estimateColumnHeight(column: IColumn) {
  let totHeight = 2;
  column.items?.forEach((item) => {
    const {
      expand = false, fullyExpanded = false, height,
    } = item;

    if (item.neverExpanded) {
      totHeight += getListBoxMinHeight(item);
    } else if (expand || item.alwaysExpanded) {
      if (fullyExpanded) {
        totHeight += getListBoxMaxHeight(item);
      } else if (height) {
        const h = Number.parseFloat(height);
        totHeight += (h || getListBoxMinHeight(item));
      } else {
        totHeight += getListBoxMinHeight(item);
      }
    } else {
      totHeight += getListBoxMinHeight(item);
    }
    totHeight += ITEM_SPACING;
  });
  return totHeight;
}

export const haveRoomToExpandOne = (size: ISize, column: IColumn, isSmallDevice: boolean, expandProps: ExpandProps) => {
  if (isSmallDevice) {
    return false;
  }
  let hasRoom;
  const expandLimit = getExpandedHeightLimit(expandProps);
  if (expandProps.isSingleGridLayout && column.items?.[0]) {
    // Since we only have one item and we want to know if it can be expanded, ensure it's set to expand: true.
    hasRoom = size.height > expandLimit;
    // eslint-disable-next-line no-param-reassign
    column.items[0].expand = column.items[0].expand ?? hasRoom;
  } else {
    const spaceLeft = size.height - estimateColumnHeight(column);
    hasRoom = spaceLeft >= expandLimit;
  }
  return hasRoom;
};
