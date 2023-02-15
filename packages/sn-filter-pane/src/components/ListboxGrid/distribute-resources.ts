import { IListboxResource } from '../../hooks/types';
import { store } from '../../store';
import { IColumn, ISize } from './interfaces';

export const COLLAPSED_HEIGHT = 34;
export const BUTTON_HEIGHT = 34;
const BUTTON_SPACING = 8;
export const ITEM_SPACING = 8;
const EXPANDED_HEIGHT_LIMIT = 181;
const COLUMN_MIN_WIDTH = 160;
const COLUMN_SPACING = 16;
const EXPANDED_HEADER_HEIGHT = 48;

const getExpandedRowHeight = (dense: boolean) => (dense ? 20 : 29);

const sm = () => {
  const { isSmallDevice } = store.getState();
  return isSmallDevice?.();
};

/* eslint-disable no-param-reassign */

const getMaxColumns = (size: ISize) => (sm() ? 1 : Math.floor((size.width + COLUMN_SPACING) / (COLUMN_MIN_WIDTH + COLUMN_SPACING)) || 1);

const getMaxCollapsedItemsPerColumn = (size: ISize) => Math.max(1, Math.floor((size.height + ITEM_SPACING) / (COLLAPSED_HEIGHT + ITEM_SPACING)));

const getColumnItemsCount = (columns: IColumn[]) => {
  let count = 0;

  columns.forEach((column) => {
    count += (column.itemCount ?? 0);
  });

  return count;
};

const getHeightOf = (collapsedItemCount: number) => {
  // Subtract one ITEM_SPACING since the first item wont have a margin-top of ITEM_SPACING
  const height = (COLLAPSED_HEIGHT + ITEM_SPACING) * collapsedItemCount - ITEM_SPACING;
  return Math.max(height, 0);
};

const getDimensionCardinal = (item: IListboxResource) => item.layout.qListObject.qDimensionInfo.qCardinal;

const getHeightOfExpanded = (
  dimensionCardinal: number,
  dense: boolean,
  hiddenHeader: boolean,
) => dimensionCardinal * getExpandedRowHeight(dense) + (hiddenHeader ? 0 : EXPANDED_HEADER_HEIGHT);

const doesAllFit = (
  itemsPerColumn: number,
  columnCount: number,
  itemCount: number,
) => itemCount <= itemsPerColumn * columnCount;

const haveRoomToExpandOne = (size: ISize, column: IColumn) => {
  if (sm()) {
    return false;
  }
  const spacing = (column.itemCount ?? 0) > 1 ? ITEM_SPACING : 0;
  return size.height > getHeightOf((column.itemCount ?? 0) - 1) + EXPANDED_HEIGHT_LIMIT + spacing;
};

export const calculateColumns = (size: ISize, columns: IColumn[]) => {
  const canExpand = size.height > EXPANDED_HEIGHT_LIMIT && !sm();
  const maxColumns = getMaxColumns(size);
  const maxPerColumn = getMaxCollapsedItemsPerColumn(size);
  const usedCount = getColumnItemsCount(columns);

  if (canExpand && doesAllFit(maxPerColumn, maxColumns - columns.length - 1, size.dimensionCount - usedCount - 1)) {
    columns.push({
      expand: true,
      itemCount: 1,
    });
    if (usedCount + 1 < size.dimensionCount) {
      columns = calculateColumns(size, columns);
    }
  } else {
    let itemCount;

    // Default case with zoom enabled, now overflow and (...) to zoom object
    itemCount = Math.min(size.dimensionCount - usedCount, maxPerColumn);

    if (sm()) {
      // On small device all items is in a single column and overflow scrolled
      itemCount = size.dimensionCount - usedCount;
    }

    columns.push({
      expand: false,
      itemCount,
    });

    // Last columns and all items wont fit, show the fullscreen "..."-button to view the items that doesn't fit
    const columnsItemsCount = getColumnItemsCount(columns);
    if (columns.length >= maxColumns && maxPerColumn > 0 && columnsItemsCount < size.dimensionCount) {
      columns[columns.length - 1].hiddenItems = true;
      if (BUTTON_HEIGHT + BUTTON_SPACING + ITEM_SPACING > size.height - getHeightOf(maxPerColumn)) {
        const lastItem = columns[columns.length - 1];
        columns[columns.length - 1].itemCount = Math.max((lastItem?.itemCount ?? 0) - 1, 0);
      }
    }

    if (getColumnItemsCount(columns) < size.dimensionCount && columns.length < maxColumns) {
      columns = calculateColumns(size, columns);
    }
  }
  return columns;
};

export const balanceColumns = (size: ISize, columns: IColumn[]) => {
  let collapsedItems = 0;
  const expanded = columns.filter((column) => column.expand);
  const collapsed = columns.filter((column) => column.expand === false);

  const canExpand = collapsed.length > 0 && !collapsed[collapsed.length - 1].hiddenItems && haveRoomToExpandOne(size, collapsed[collapsed.length - 1]);
  if (canExpand) {
    collapsed[collapsed.length - 1].expand = true;
  } else {
    collapsedItems = getColumnItemsCount(collapsed);
    collapsed.forEach((column, index) => {
      // If the dimensions can't be evenly distributed among the
      // columns the extra dimensions should be given to the first columns
      const extraItems = index < collapsedItems % collapsed.length ? 1 : 0;
      const itemCount = Math.floor(collapsedItems / collapsed.length) + extraItems;

      column.itemCount = itemCount;
    });
  }

  return collapsed.concat(expanded);
};

export const mergeColumnsAndResources = (columns: IColumn[], resources: IListboxResource[]) => {
  columns.forEach((column: IColumn) => {
    column.items = resources.slice(0, column.itemCount);
    resources = resources.slice(column.itemCount);
  });
  return { columns, overflowing: resources };
};

const setFullyExpanded = (item: IListboxResource) => {
  if (parseFloat(item.height) >= getHeightOfExpanded(item.cardinal, item.dense, item.hiddenHeader)) {
    item.height = `${getHeightOfExpanded(item.cardinal, item.dense, item.hiddenHeader)}px`;
    item.fullyExpanded = true;
  }
};

const expandOne = (sortedItems: IListboxResource[] | undefined, leftOverHeight: number) => {
  if (!sortedItems) return false;
  let i;
  let item;
  let expandedHeight;

  for (i = 0; i < sortedItems.length; i++) {
    item = sortedItems[i];
    if (item.cardinal && !item.expand) {
      expandedHeight = getHeightOfExpanded(item.cardinal, item.dense, item.hiddenHeader);
      if (leftOverHeight > expandedHeight) {
        item.expand = true;
        item.height = `${expandedHeight}px`;
        setFullyExpanded(item);
        return expandedHeight;
      }
    }
  }

  return false;
};

export const calculateExpandPriority = (columns: IColumn[], size: ISize) => {
  columns.forEach((column: IColumn) => {
    if (column.expand) {
      let expandedCount = 0;
      let leftOverHeight = size.height - getHeightOf((column.itemCount ?? 0) - 1) - ITEM_SPACING;
      let totalExpandedHeight = 0;

      // Make sure we have the cardinal so that they can be expanded in the best order
      column?.items?.forEach((item) => {
        item.cardinal = getDimensionCardinal(item);
      });

      const sortedItems = column?.items?.concat().sort((a, b) => a.cardinal - b.cardinal);

      if ((sortedItems?.length ?? 0) > 1) {
        while (leftOverHeight > EXPANDED_HEIGHT_LIMIT) {
          const expHeight = expandOne(sortedItems, leftOverHeight);
          if (expHeight) {
            expandedCount++;
            totalExpandedHeight += expHeight;
            leftOverHeight = size.height - getHeightOf((column?.itemCount ?? 0) - expandedCount) - totalExpandedHeight;
          } else {
            break;
          }
        }
        const expandedItems = sortedItems?.filter((item) => item.expand);
        // Calculate total expanded height again as items might have been expanded before calculateExpandPriority
        totalExpandedHeight = 0;
        expandedItems?.forEach((item) => {
          totalExpandedHeight += getHeightOfExpanded(item.cardinal, item.dense, item.hiddenHeader) + ITEM_SPACING;
        });
        leftOverHeight = size.height - getHeightOf((column?.itemCount ?? 0) - (expandedItems?.length ?? 0)) - totalExpandedHeight;
      }

      const collapsedItems = sortedItems?.filter((item) => !item.expand);

      if (leftOverHeight > EXPANDED_HEIGHT_LIMIT && collapsedItems?.length) {
        const item = collapsedItems[0];

        if (!item.expand) {
          if ((sortedItems?.length ?? 0) > 1) {
            // Should only set specific height when multiple items in columns, otherwise 100% height from default value
            const spacing = 2 + (collapsedItems.length === 1 ? 0 : ITEM_SPACING);
            item.height = `${size.height - getHeightOf(collapsedItems.length - 1) - totalExpandedHeight - spacing}px`;
          }
          item.expand = true;
        }
        setFullyExpanded(item);
      }
    }

    // Set the render mode for collapsed LBs
    if (column?.items?.length === 1 && size.height < COLLAPSED_HEIGHT - 4) {
      // TODO: This hides the title in the old collapsed listbox, when does this occur?
      column.items[0].responsiveMode = size.height < COLLAPSED_HEIGHT * 0.5 ? 'spark' : 'small';
      column.items[0].height = `${size.height}px`;
    }
  });
  return columns;
};

export const setDefaultValues = (resources: IListboxResource[]) => resources.map((resource: IListboxResource) => {
  resource.expand = false;
  resource.height = 'calc(100% - 2px)';
  resource.fullyExpanded = false;
  resource.dense = resource.layout.layoutOptions?.dense ?? false;
  resource.hiddenHeader = resource.layout.toolbar !== undefined ? !resource.layout.toolbar : false;
  return resource;
});
