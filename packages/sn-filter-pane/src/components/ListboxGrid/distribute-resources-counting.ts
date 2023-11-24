import { IListLayout, IListboxResource } from '../../hooks/types';
import {
  COLLAPSED_HEIGHT, COLUMN_MIN_WIDTH, COLUMN_SPACING, EXPANDED_HEADER_HEIGHT, ITEM_SPACING, LIST_ROW_HEIGHT, DENSE_ROW_HEIGHT, GRID_ROW_HEIGHT, ITEM_MIN_WIDTH, REMOVE_TICK_LIMIT,
} from './grid-constants';
import { ExpandProps, IColumn, ISize } from './interfaces';

const getExpandedRowHeight = (dense: boolean, isGridMode = false) => {
  const rowHeight = isGridMode ? GRID_ROW_HEIGHT : LIST_ROW_HEIGHT;
  const innerHeight = dense ? DENSE_ROW_HEIGHT : rowHeight;
  // We subtract this padding later, if single row and grid mode,
  // to get a filled height in this case, without padding,
  let paddingY = 0;
  if (isGridMode) {
    // Only grid mode has a padding between the items.
    paddingY = 4;
  }
  return innerHeight + paddingY;
};

const getItemMinWidth = (layout: IListLayout) => {
  const { checkboxes, qListObject } = layout;
  const { frequencyEnabled = false } = qListObject;

  const FREQUENCY_ADD_WIDTH = 20; // to be precise, this should depend on freq text length but wth
  const CHECKBOX_ADD_WIDTH = 20;
  const TICK_WIDTH = 20;
  let itemMinWidth = ITEM_MIN_WIDTH + (frequencyEnabled ? FREQUENCY_ADD_WIDTH : 0) + (checkboxes ? CHECKBOX_ADD_WIDTH : 0);
  if (!checkboxes && itemMinWidth >= REMOVE_TICK_LIMIT) {
    itemMinWidth += TICK_WIDTH;
  }
  return itemMinWidth;
};

export function getListBoxMinHeight(resource: IListboxResource, outerWidth = false, asCollapsed = false) {
  const { dense = false, collapseMode, dataLayout } = resource?.layout?.layoutOptions || {};

  let h = 0;
  if (collapseMode === 'never' && !asCollapsed) {
    // Calculate min expanded height.
    h += getExpandedRowHeight(dense, dataLayout === 'grid');
    h += resource.hasHeader ? EXPANDED_HEADER_HEIGHT : 0;
  } else {
    // Calculate collapsed height.
    h += COLLAPSED_HEIGHT;
  }
  if (outerWidth) {
    h += ITEM_SPACING;
  }

  return h;
}

export function getGridModeRowCount({ layout, cardinal, width }: { layout: IListLayout, cardinal: number, width: number }) {
  let rowCount = 1;
  const {
    maxVisibleRows = {}, layoutOrder, maxVisibleColumns,
  } = layout?.layoutOptions || {};

  if (layoutOrder === 'row') {
    const itemWidth = getItemMinWidth(layout || {});
    const estimatedColumnCount = Math.floor(width / itemWidth);
    const explicitColumnCount = maxVisibleColumns?.auto ? undefined : maxVisibleColumns?.maxColumns;
    const columnCount = Math.max(1, Math.min(explicitColumnCount || Infinity, estimatedColumnCount));
    rowCount = Math.ceil(cardinal / columnCount);
  } else if (layoutOrder === 'column') {
    rowCount = maxVisibleRows.maxRows || 3;
  }
  return Math.max(1, rowCount);
}

export const getMaxColumns = (size: ISize, isSmallDevice: boolean) => (isSmallDevice ? 1 : Math.floor((size.width + COLUMN_SPACING) / (COLUMN_MIN_WIDTH + COLUMN_SPACING)) || 1);

export function howManyListBoxesFit(columnSize: ISize, resourcesSlice: IListboxResource[]) {
  const columnOuterHeight = columnSize.height + ITEM_SPACING;
  let count = 0;
  let accHeight = 0;
  let resource;

  for (let i = 0, len = resourcesSlice.length; i < len; i++) {
    resource = resourcesSlice[i];
    accHeight += getListBoxMinHeight(resource, true, true);
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
    const singleGridLimit = expandProps.hasHeader ? EXPANDED_HEADER_HEIGHT + GRID_ROW_HEIGHT : 0;
    heightLimit = singleGridLimit;
  }
  return heightLimit;
}

export const getListBoxMaxHeight = (item: IListboxResource, width: number) => {
  const {
    cardinal, dense, hasHeader, neverExpanded, layout,
  } = item || {};

  const { dataLayout } = layout?.layoutOptions || {};

  let maxHeight = 0;
  if (neverExpanded) {
    maxHeight = getListBoxMinHeight(item);
  } else {
    const isGridMode = dataLayout === 'grid';
    const rowCount = Math.max(1, isGridMode ? getGridModeRowCount({ cardinal, layout: item.layout, width }) : cardinal);
    maxHeight = rowCount * getExpandedRowHeight(dense, isGridMode) + (hasHeader ? EXPANDED_HEADER_HEIGHT : 0);
    if (isGridMode && rowCount === 1) {
      maxHeight -= 4; // remove padding to fill height
    }
  }
  maxHeight += ITEM_SPACING;
  return maxHeight;
};

/**
 * Iterate through all items in the column and summarise the height of all
 * individual listboxes.
 */
export function estimateColumnHeight(column: IColumn, width: number, atMinSize = false) {
  let totHeight = 2;
  column.items?.forEach((item) => {
    const {
      expand = false, fullyExpanded = false, height,
    } = item;

    if (item.neverExpanded || atMinSize) {
      totHeight += getListBoxMinHeight(item, false, atMinSize);
    } else if (expand || item.alwaysExpanded) {
      if (fullyExpanded) {
        totHeight += getListBoxMaxHeight(item, width);
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
  if (column.hiddenItems) {
    const AS_COLLAPSED = true;
    totHeight += getListBoxMinHeight({} as IListboxResource, true, AS_COLLAPSED);
  }
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
    const spaceLeft = size.height - estimateColumnHeight(column, size.width);
    hasRoom = spaceLeft >= expandLimit;
  }
  return hasRoom;
};
