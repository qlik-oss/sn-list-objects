import { IListboxResource, ListboxResourcesArr } from '../../hooks/types';
import { ExpandProps, IColumn, ISize } from './interfaces';

export const COLLAPSED_HEIGHT = 34;
export const BUTTON_HEIGHT = 34;
export const ITEM_SPACING = 8;
const COLUMN_MIN_WIDTH = 160;
const COLUMN_SPACING = 16;
const EXPANDED_HEADER_HEIGHT = 48;
const SINGLE_GRID_ROW_HEIGHT = 32;
const DEFAULT_CSS_HEIGHT = 'calc(100% - 2px)';

const getExpandedRowHeight = (dense: boolean) => (dense ? 20 : 29);

/**
 * The threshold for which to collapse or expand a particular Listbox.
 *
 */
const getExpandedHeightLimit = (expandProps: ExpandProps) => {
// If single grid and no header, don't collapse, by setting the limit to 0.
// const singleGridLimit = expandProps.hasHeader ? EXPANDED_HEADER_HEIGHT + SINGLE_GRID_ROW_HEIGHT : 0;
// return expandProps.isSingleGridLayout ? singleGridLimit : 90;

  let heightLimit = 90;
  if (expandProps.alwaysExpanded) {
    heightLimit = 0; // expandProps.hasHeader ? EXPANDED_HEADER_HEIGHT : 0;
    // heightLimit = expandProps.hasHeader ? EXPANDED_HEADER_HEIGHT + getExpandedRowHeight(false) : getExpandedRowHeight(false);
  } else if (expandProps.isSingleGridLayout) {
    const singleGridLimit = expandProps.hasHeader ? EXPANDED_HEADER_HEIGHT + SINGLE_GRID_ROW_HEIGHT : 0;
    heightLimit = singleGridLimit;
  }
  return heightLimit;
};

/* eslint-disable no-param-reassign */

export const hasHeader = (resource?: IListboxResource) => (!!resource?.layout && resource.layout.title !== '' && resource.layout.showTitle !== false);

const getListBoxMinHeight = (resource: IListboxResource, outerWidth = false) => {
  const { dense = false, collapseMode } = resource.layout.layoutOptions || {};

  let h = 0;
  if (collapseMode === 'never') {
    // If listbox is not allowed to collapse, then the height will be different.
    h += getExpandedRowHeight(dense);
    h += hasHeader(resource) ? EXPANDED_HEADER_HEIGHT : 0;
  } else {
    h += COLLAPSED_HEIGHT;
  }
  if (outerWidth) {
    h += ITEM_SPACING;
  }

  return h;
};

const getMaxColumns = (size: ISize, isSmallDevice: boolean) => (isSmallDevice ? 1 : Math.floor((size.width + COLUMN_SPACING) / (COLUMN_MIN_WIDTH + COLUMN_SPACING)) || 1);

const howManyListBoxesFit = (columnSize: ISize, resourcesSlice: ListboxResourcesArr) => {
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
};

/**
 * Returns the total number of Listboxes (items)
 * that have been added to all the columns.
 */
const countListBoxes = (columns: IColumn[]) => {
  let count = 0;

  columns.forEach((column) => {
    count += (column.itemCount ?? 0);
  });

  return count;
};

// const getHeightOf = (collapsedItemCount: number) => {
//   // Subtract one ITEM_SPACING since the first item wont have a margin-top of ITEM_SPACING
//   const height = (COLLAPSED_HEIGHT + ITEM_SPACING) * collapsedItemCount - ITEM_SPACING;
//   return Math.max(height, 0);
// };

const getDimensionCardinal = (item: IListboxResource) => item.layout.qListObject.qDimensionInfo.qCardinal;

const getListBoxMaxHeight = (item: IListboxResource) => {
  const {
    cardinal, dense, hiddenHeader, neverExpanded,
  } = item || {};

  let maxHeight = 0;
  if (neverExpanded) {
    maxHeight = getListBoxMinHeight(item);
  } else {
    maxHeight = cardinal * getExpandedRowHeight(dense) + (hiddenHeader ? 0 : EXPANDED_HEADER_HEIGHT);
  }
  return maxHeight;
};

const getExpandedHeight = (item: IListboxResource) => getListBoxMaxHeight(item);

/**
 * Iterate through all items in the column and summarise the height of all
 * individual listboxes.
 */
function estimateColumnHeight(column: IColumn) {
  let totHeight = 2;
  column.items?.forEach((item) => {
    const {
      expand = false, fullyExpanded = false, height,
    } = item;

    if (item.neverExpanded) {
      totHeight += getListBoxMinHeight(item);
    } else if (expand || item.alwaysExpanded) {
      if (fullyExpanded) {
        totHeight += getExpandedHeight(item);
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
  // Subtract one ITEM_SPACING since the first item wont have a margin-top of ITEM_SPACING
  // totHeight -= ITEM_SPACING;
  return totHeight;
}

const doAllFit = (
  maxCollapsedPerColumn: number, // max listboxes per column
  columnsCount: number,
  listboxesCount: number,
): boolean => listboxesCount <= maxCollapsedPerColumn * columnsCount;

const haveRoomToExpandOne = (size: ISize, column: IColumn, isSmallDevice: boolean) => {
  if (isSmallDevice) {
    return false;
  }
  const canExpandOne = size.height >= estimateColumnHeight(column);
  return canExpandOne;
};

export const calculateColumns = (size: ISize, columns: IColumn[], isSmallDevice: boolean, expandProps: ExpandProps, resources: ListboxResourcesArr = []) => {
  const canFirstColumnExpand = size.height > (getExpandedHeightLimit(expandProps) + ITEM_SPACING) && !isSmallDevice;
  const maxColumns = getMaxColumns(size, isSmallDevice); // this many columns (maximum) can fit inside a Filter pane of current size
  let usedCount = countListBoxes(columns);
  const collapsedFitCount = howManyListBoxesFit(size, resources.slice(usedCount));
  const maxCollapsedPerColumn = Math.max(1, collapsedFitCount);
  const remainingListboxesCount = size.dimensionCount - usedCount; // this many listboxes are waiting to be distributed in columns
  const remainingColumnsCount = maxColumns - columns.length - 1;

  // const currentFirstResource = resources[usedCount];
  // const singleAlwaysExpandedIsTooBig = currentFirstResource.alwaysExpanded && collapsedFitCount <= 0;

  const heyHeyTheyFit = doAllFit(maxCollapsedPerColumn, remainingColumnsCount, remainingListboxesCount - 1);

  if (canFirstColumnExpand && heyHeyTheyFit) {
    // Add a new column with a single listbox. If needed, this column may be populated with more listboxes later on.
    columns.push({
      expand: true,
      itemCount: 1, // this can change later, when columns are balanced
    });

    const moreThanOneRemaining = remainingListboxesCount > 1;
    if (moreThanOneRemaining) {
      // Add another column, using a recursive call.
      columns = calculateColumns(size, columns, isSmallDevice, expandProps, resources);
    }
  } else {
    let itemCount;

    if (isSmallDevice) {
      // On small device all items is in a single column and overflow scrolled
      itemCount = remainingListboxesCount;
    } else {
      // Default case with zoom enabled, now overflow and (...) to zoom object
      itemCount = Math.min(remainingListboxesCount, maxCollapsedPerColumn);
    }

    columns.push({
      expand: false,
      itemCount,
    });

    usedCount = countListBoxes(columns);
    const stillWorkToDo = usedCount < size.dimensionCount;

    if (stillWorkToDo && columns.length >= maxColumns && maxCollapsedPerColumn > 0) {
      // Last columns and all items wont fit, show the fullscreen "..."-button to view the items that doesn't fit
      const lastColumn = columns[columns.length - 1];
      lastColumn.hiddenItems = true;
      const lastItem = columns[columns.length - 1];
      lastItem.itemCount = Math.max(0, (lastItem?.itemCount ?? 0) - 1);
    }

    const canFitMoreColumns = columns.length < maxColumns;
    if (stillWorkToDo && canFitMoreColumns) {
      columns = calculateColumns(size, columns, isSmallDevice, expandProps, resources);
      // In case there are remaining listboxes, and canFitMoreColumns is false,
      // they will be redistributed among existing columns later on.
    }
  }
  return columns;
};

export const balanceColumns = (size: ISize, columns: IColumn[], isSmallDevice: boolean, expandProps: ExpandProps) => {
  let collapsedItems = 0;
  const expanded = columns.filter((column) => column.expand);
  const collapsed = columns.filter((column) => column.expand === false);

  const canColumnExpand = collapsed.length > 0 && !collapsed[collapsed.length - 1].hiddenItems
    && haveRoomToExpandOne(size, collapsed[collapsed.length - 1], isSmallDevice);
  if (canColumnExpand) {
    collapsed[collapsed.length - 1].expand = true;
  } else {
    collapsedItems = countListBoxes(collapsed);
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

export const assignListboxesToColumns = (columns: IColumn[], resources: IListboxResource[], isSmallDevice: boolean) => {
  let resourcesTail = [...resources];
  if (isSmallDevice) {
    // Small devices should always have collapsed columns and default collapse mode.
    columns.forEach((column) => {
      column.expand = false;
      column.items = resourcesTail;
      column.items.forEach((item) => {
        if (item.layout.layoutOptions) {
          item.layout.layoutOptions.collapseMode = 'auto';
        }
      });
    });
    return { columns, overflowing: [] };
  }

  columns.forEach((column: IColumn) => {
    column.items = resourcesTail.slice(0, column.itemCount);
    resourcesTail = resourcesTail.slice(column.itemCount);
  });
  return { columns, overflowing: resourcesTail };
};

const setFullyExpanded = (item: IListboxResource) => {
  // if (parseFloat(item.height) >= getListBoxMaxHeight(item)) {
  item.fullyExpanded = true;
  item.height = `${getExpandedHeight(item)}px`;
  // }
};

const expandUntilFull = (sortedItems: IListboxResource[] | undefined, initialLeftOverHeight: number, lastItemIndex: number, isSingleGridLayout = false) => {
  if (!sortedItems) return;
  let i;
  let item;
  let itemFits;
  let expandedHeight;
  let leftOverHeight = initialLeftOverHeight;

  for (i = 0; i < sortedItems.length; i++) {
    item = sortedItems[i];
    if (item.cardinal && !item.fullyExpanded) {
      // Calculate column height without the target item, then
      // subtract the target's expanded height to see if it fits.
      leftOverHeight = initialLeftOverHeight - estimateColumnHeight({ items: [...sortedItems.slice(0, i), ...sortedItems.slice(i + 1)] });
      expandedHeight = getExpandedHeight(item) + ITEM_SPACING;
      itemFits = leftOverHeight >= expandedHeight;
      const isLastItem = i === lastItemIndex;
      item.fits = itemFits;
      if (itemFits && !item.neverExpanded) {
        item.expand = true;
        setFullyExpanded(item);
        // item.height = isLastItem ? DEFAULT_CSS_HEIGHT : `${expandedHeight}px`;
      } else if (item.neverExpanded) {
        item.expand = false;
      } else { // if (item.alwaysExpanded) {
        // See if listbox fits as collapsed.
        const collapsedHeight = getListBoxMinHeight(item);
        const expandedHeightLimit = getExpandedHeightLimit({ alwaysExpanded: item.alwaysExpanded, hasHeader: hasHeader(item), isSingleGridLayout });
        const fitsAsCollapsed = leftOverHeight - collapsedHeight >= expandedHeightLimit;
        if (fitsAsCollapsed) {
          item.expand = true;
          item.height = item.alwaysExpanded && isLastItem ? DEFAULT_CSS_HEIGHT : `${leftOverHeight}px`;
        }
      }
    }
  }
};

function setDefaultItemSettings({
  item, column, isSingleColumn, innerHeight, isSmallDevice,
}: { item: IListboxResource, column: IColumn, isSingleColumn: boolean, innerHeight: number, isSmallDevice: boolean }) {
  // Set default value for expand mode, based on circumstances.
  if (item.neverExpanded) {
    item.expand = false;
  } else {
    const expandedHeightLimit = getExpandedHeightLimit({ alwaysExpanded: item.alwaysExpanded, hasHeader: hasHeader(item), isSingleGridLayout: isSingleColumn });
    const canFitSingle = isSingleColumn && innerHeight - getListBoxMinHeight(item) >= expandedHeightLimit;
    const expand = canFitSingle && !isSmallDevice;
    item.expand = expand;
    if (item.alwaysExpanded) {
      item.height = column.expand && canFitSingle ? DEFAULT_CSS_HEIGHT : `${getListBoxMinHeight(item)}px`;
    } else {
      item.expand = expand;
    }
  }
}

export const calculateExpandPriority = (columns: IColumn[], size: ISize, expandProps: ExpandProps, isSmallDevice: boolean) => {
  let allExpandedItems = <IListboxResource[]>[];

  const innerHeight = size.height; // - ITEM_SPACING;
  let leftOverHeight = 0;

  columns.forEach((column: IColumn) => {
    // 1. Make sure we have the cardinal so that they can be expanded in order, starting with the lowest cardinal.
    // 2. Reset expand mode to the default value
    const columnItems = column.items || [];
    const isSingleColumn = column.itemCount === 1 && !column.hiddenItems;

    columnItems.forEach((item) => {
      item.cardinal = getDimensionCardinal(item);

      setDefaultItemSettings({
        item, column, isSingleColumn, innerHeight, isSmallDevice,
      });
    });

    // if (isSingleColumn && column.items?.length) {
    //   const item = column.items[0];
    //   item.height = column.expand ? DEFAULT_CSS_HEIGHT : `${getListBoxMinHeight(item)}px`;
    // }

    // Try to expand listboxes in this order, based on the following criteria and order:
    //  1. alwaysExpanded listboxes
    //  2. listboxes with lowest cardinality
    const sortedItems = columnItems.concat().sort((a, b) => {
      if (a.alwaysExpanded && !b.alwaysExpanded) {
        return -1; // a goes before b
      }
      if (b.alwaysExpanded && !a.alwaysExpanded) {
        return 1; // b goes before a
      }
      return a.cardinal > b.cardinal ? 1 : -1; // lower cardinality goes before higher
    });

    if (column.expand) {
      if ((sortedItems.length ?? 0) > 1) {
        // First, expand all force expands (if any) to their smallest possible size (i.e. 1 row + header, if any).
        // sortedItems.filter((item) => !!item.alwaysExpanded).forEach((item) => {
        //   // const expH = getListBoxMaxHeight(item);
        //   const expH = getExpandedRowHeight(!!item.layout.layoutOptions?.dense) + (hasHeader(item) ? EXPANDED_HEADER_HEIGHT : 0);
        //   item.height = `${expH}px`;
        //   // item.height = isSingleColumn ? DEFAULT_CSS_HEIGHT : `${expH}px`;
        // });
        const lastItemIndex = sortedItems.indexOf(columnItems[columnItems.length - 1]);
        expandUntilFull(sortedItems, innerHeight, lastItemIndex);
      }
      leftOverHeight = estimateColumnHeight(column);

      const collapsedItems = sortedItems?.filter((item) => !item.expand);

      if (leftOverHeight > (getExpandedHeightLimit(expandProps) + ITEM_SPACING) && collapsedItems?.length) {
        const item = collapsedItems[0];

        if (!item.expand && !isSingleColumn) {
          if ((sortedItems?.length ?? 0) > 1) {
            // Should set fixed height only when there are multiple items in columns, otherwise 100% height from default value
            const spacing = 2 + (collapsedItems.length === 1 ? 0 : ITEM_SPACING);
            item.height = `${size.height - estimateColumnHeight({ items: collapsedItems }) - spacing}px`;
          }
        }
        item.expand = item.expand || !!(item.alwaysExpanded && item.fits);
        setFullyExpanded(item);
      }
    }
    const expandedInColumn = columnItems?.filter((item) => item.expand) ?? [];
    allExpandedItems = [...allExpandedItems, ...expandedInColumn];

    // Set the render mode for collapsed LBs
    if (columnItems.length === 1 && size.height < COLLAPSED_HEIGHT - 4) {
      // TODO: This hides the title in the old collapsed listbox, when does this occur?
      columnItems[0].responsiveMode = size.height < COLLAPSED_HEIGHT * 0.5 ? 'spark' : 'small';
      columnItems[0].height = `${size.height}px`;
    }
  });
  return { columns, expandedItemsCount: allExpandedItems.length };
};

export const setDefaultValues = (resources: IListboxResource[]) => resources.map((resource: IListboxResource) => {
  const { collapseMode = 'auto' } = resource.layout.layoutOptions || {};

  resource.expand = collapseMode === 'never';
  resource.height = DEFAULT_CSS_HEIGHT;
  resource.fullyExpanded = false;
  resource.alwaysExpanded = collapseMode === 'never';
  resource.neverExpanded = collapseMode === 'always';
  resource.dense = resource.layout.layoutOptions?.dense ?? false;
  resource.hiddenHeader = !hasHeader(resource);
  return resource;
});
