import { IListboxResource, ListboxResourcesArr } from '../../hooks/types';
import { getSadItem, moveOverflowItemToColumn, moveItemToOverflow } from './distribute-always-expanded';
import {
  countListBoxes,
  doAllFit,
  estimateColumnHeight,
  getColumnWidth,
  getDimensionCardinal,
  getExpandedHeightLimit,
  getListBoxMaxHeight,
  getListBoxMinHeight,
  getMaxColumns,
  haveRoomToExpandOne,
  howManyListBoxesFit,
} from './distribute-resources-counting';
import {
  COLLAPSED_HEIGHT, DEFAULT_CSS_HEIGHT, ITEM_SPACING,
} from './grid-constants';
import { ExpandProps, IColumn, ISize } from './interfaces';

/* eslint-disable no-param-reassign */

export function sortColumnItemsByFieldOrder(columns: IColumn[], resources: IListboxResource[]) {
  const dataOrder = resources.map((item) => item?.id);
  columns.forEach((column) => {
    column.items?.sort((a, b) => {
      const aIx = dataOrder.indexOf(a.id);
      const bIx = dataOrder.indexOf(b.id);
      return aIx - bIx;
    });
  });
}

export const hasHeader = (resource?: IListboxResource) => (!!resource?.layout && resource.layout.title !== '' && resource.layout.showTitle !== false);

export function calculateColumns(size: ISize, columns: IColumn[], isSmallDevice: boolean, expandProps: ExpandProps, resources: ListboxResourcesArr = []) {
  const canFirstColumnExpand = size.height > (getExpandedHeightLimit(expandProps) + ITEM_SPACING) && !isSmallDevice;
  const maxColumns = getMaxColumns(size, isSmallDevice); // this many columns (maximum) can fit inside a Filter pane of current size
  let usedCount = countListBoxes(columns);
  const collapsedFitCount = howManyListBoxesFit(size, resources.slice(usedCount));
  const maxCollapsedPerColumn = Math.max(1, collapsedFitCount);
  const remainingListboxesCount = size.dimensionCount - usedCount; // this many listboxes are waiting to be distributed in columns
  const remainingColumnsCount = maxColumns - columns.length - 1;

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
      // In case there are remaining listboxes, and we can't fit anymore listboxes,
      // they will be redistributed among existing columns in the balanceColumns func.
    }
  }
  return columns;
}

export function balanceColumns(size: ISize, columns: IColumn[], resources: IListboxResource[], isSmallDevice: boolean, expandProps: ExpandProps) {
  let collapsedItems = 0;
  const expanded = columns.filter((column) => column.expand);
  const collapsed = columns.filter((column) => column.expand === false);
  const columnWidth = getColumnWidth(size.width, columns.length);

  const canColumnExpand = collapsed.length > 0 && !collapsed[collapsed.length - 1].hiddenItems
    && haveRoomToExpandOne(size, columnWidth, collapsed[collapsed.length - 1], isSmallDevice, expandProps);
  if (canColumnExpand) {
    collapsed[collapsed.length - 1].expand = true;
  } else {
    collapsedItems = countListBoxes(collapsed);
    collapsed.forEach((column, index) => {
      // If the dimensions can't be evenly distributed among the
      // columns the extra dimensions should be given to the first columns
      const extraItems = index < collapsedItems % collapsed.length ? 1 : 0;
      const itemCount = Math.floor(collapsedItems / collapsed.length) + extraItems;

      // However, we should only push items to first column if it can fit more listboxes…
      if (size.height >= estimateColumnHeight({ ...column, itemCount, items: resources.slice(index, index + itemCount) }, columnWidth)) {
        column.itemCount = itemCount;
      }
    });
  }

  return collapsed.concat(expanded);
}

export function assignListboxesToColumns(columns: IColumn[], resources: IListboxResource[], isSmallDevice: boolean) {
  let resourcesTail = [...resources];
  if (isSmallDevice) {
    // Small devices should always have collapsed columns and default collapse mode.
    columns[0].items = resourcesTail; // small devices always have one column only
    return { columns, overflowing: [] };
  }

  columns.forEach((column: IColumn) => {
    column.items = resourcesTail.slice(0, column.itemCount);
    resourcesTail = resourcesTail.slice(column.itemCount);
  });

  sortColumnItemsByFieldOrder(columns, resources);
  return { columns, overflowing: resourcesTail };
}

const setFullyExpanded = (item: IListboxResource, columnWidth: number) => {
  if (!item.expand) {
    return;
  }
  item.fullyExpanded = true;
  item.height = `${getListBoxMaxHeight(item, columnWidth)}px`;
};

function expandUntilFull(sortedItems: IListboxResource[] | undefined, initialLeftOverHeight: number, columnWidth: number, hiddenItems = false) {
  if (!sortedItems) return;
  let i;
  let item;
  let fitsExpanded;
  let expandedHeight;
  let leftOverHeight = initialLeftOverHeight;

  for (i = 0; i < sortedItems.length; i++) {
    item = sortedItems[i];
    if (item.cardinal && !item.fullyExpanded) {
      // 1. Calculate column height without the target item, then
      // 2. Subtract the target's expanded height to see if it fits.
      const itemsSliced = [...sortedItems.slice(0, i), ...sortedItems.slice(i + 1)];
      leftOverHeight = initialLeftOverHeight - estimateColumnHeight({ items: itemsSliced, hiddenItems }, columnWidth);
      expandedHeight = getListBoxMaxHeight(item, columnWidth) + ITEM_SPACING;
      fitsExpanded = leftOverHeight >= expandedHeight;
      item.fitsExpanded = fitsExpanded; // fits fully expanded (or collapsed, if neverExpanded is true)
      if (fitsExpanded && !item.neverExpanded) {
        item.expand = true;
        setFullyExpanded(item, columnWidth);
      } else if (item.neverExpanded) {
        item.expand = false;
      } else {
        // See if listbox fits as expanded and if not – as collapsed.
        const expandedMinHeight = getListBoxMinHeight(item, false, false);
        const collapsedMinHeight = getListBoxMinHeight(item, false, true);
        const expandedHeightLimit = getExpandedHeightLimit({ alwaysExpanded: item.alwaysExpanded, hasHeader: item.hasHeader, isSingleGridLayout: false });
        const fitsAsExpanded = leftOverHeight - expandedMinHeight >= expandedHeightLimit;
        const fitsAsCollapsed = leftOverHeight >= collapsedMinHeight;
        if (fitsAsExpanded || (item.alwaysExpanded && leftOverHeight >= expandedMinHeight)) {
          item.expand = true;
          item.height = `${leftOverHeight}px`;
        } else if (fitsAsCollapsed) {
          item.expand = false;
        }
      }
    }
  }
}

function setDefaultItemSettings({
  item, isSingleColumn, isSingleGridLayout, innerHeight, isSmallDevice,
}: { item: IListboxResource, isSingleColumn: boolean, isSingleGridLayout: boolean, innerHeight: number, isSmallDevice: boolean }) {
  // Set default value for expand mode, based on circumstances.
  let expand = false;
  item.fullyExpanded = false;
  if (item.neverExpanded) {
    expand = false;
  } else {
    const expandedHeightLimit = getExpandedHeightLimit({ alwaysExpanded: item.alwaysExpanded, hasHeader: item.hasHeader, isSingleGridLayout });
    if (!isSmallDevice && isSingleColumn) {
      if (item.alwaysExpanded) {
        expand = innerHeight - getListBoxMinHeight(item) >= expandedHeightLimit;
      } else {
        expand = innerHeight >= expandedHeightLimit;
      }
    }
    if (item.alwaysExpanded) {
      item.height = expand ? DEFAULT_CSS_HEIGHT : `${getListBoxMinHeight(item)}px`;
    }
  }
  item.expand = expand;
}

function sortColumnItems(columnItems: IListboxResource[]) {
  // Try to expand listboxes based on the following prio order:
  //  1. alwaysExpanded listboxes goes before everything else, then
  //  2. listboxes with lowest cardinality
  const sortedItems = columnItems.concat().sort((a, b) => {
    if (a.alwaysExpanded && !b.alwaysExpanded) {
      return -1; // a goes before b
    }
    if (b.alwaysExpanded && !a.alwaysExpanded) {
      return 1; // b goes before a
    }
    return a.cardinal >= b.cardinal ? 1 : -1; // lower cardinality goes before higher
  });

  return sortedItems;
}

export const calculateExpandPriority = (columns: IColumn[], size: ISize, expandProps: ExpandProps, isSmallDevice: boolean) => {
  let allExpandedItems = <IListboxResource[]>[];

  const innerHeight = size.height;
  let leftOverHeight = 0;

  const columnWidth = getColumnWidth(size.width, columns.length);

  columns.forEach((column: IColumn) => {
    // 1. Make sure we have the cardinal so that they can be expanded in order, starting with the lowest cardinal.
    // 2. Reset expand mode to the default value
    const columnItems = column.items || [];
    const isSingleColumn = column.itemCount === 1 && !column.hiddenItems;

    columnItems.forEach((item) => {
      item.cardinal = getDimensionCardinal(item) ?? 0;

      setDefaultItemSettings({
        item, isSingleColumn, isSingleGridLayout: expandProps.isSingleGridLayout, innerHeight, isSmallDevice,
      });
    });

    const sortedItems = sortColumnItems(columnItems);

    if (column.expand) {
      if ((sortedItems.length ?? 0) > 1) {
        expandUntilFull(sortedItems, innerHeight, columnWidth, column.hiddenItems);
      } else if (expandProps.isSingleGridLayout && !sortedItems[0]?.neverExpanded) {
        // Ensure we set expand to true in this corner case (product designer request).
        const hasRoom = haveRoomToExpandOne(size, columnWidth, sortedItems[0], isSmallDevice, expandProps);
        if (hasRoom && column.items?.[0]) {
          column.items[0].expand = true;
        }
      }
      leftOverHeight = estimateColumnHeight(column, columnWidth);

      const collapsedItems = sortedItems?.filter((item) => !item.expand);

      if (leftOverHeight > (getExpandedHeightLimit(expandProps) + ITEM_SPACING) && collapsedItems?.length) {
        const item = collapsedItems[0];

        if (!item.expand && !isSingleColumn) {
          if ((sortedItems?.length ?? 0) > 1) {
            // Should set fixed height only when there are multiple items in columns, otherwise 100% height from default value
            const spacing = 2 + (collapsedItems.length === 1 ? 0 : ITEM_SPACING);
            item.height = `${size.height - estimateColumnHeight({ items: collapsedItems }, columnWidth) - spacing}px`;
          }
        }
        item.expand = item.expand || !!(item.alwaysExpanded && item.fitsExpanded);
        setFullyExpanded(item, columnWidth);
      }
    }
    const expandedInColumn = columnItems?.filter((item) => item.expand) ?? [];
    allExpandedItems = [...allExpandedItems, ...expandedInColumn];

    // Set the render mode for collapsed LBs
    if (columnItems.length === 1 && size.height < COLLAPSED_HEIGHT - 4) {
      // TODO: This hides the title in the old collapsed listbox, when does this occur?
      columnItems[0].responsiveMode = size.height < COLLAPSED_HEIGHT * 0.5 ? 'spark' : 'small';
      columnItems[0].height = DEFAULT_CSS_HEIGHT; // `${size.height}px`;
    }
  });
  return { columns, expandedItemsCount: allExpandedItems.length };
};

export function adjustOverflowColumn(overflowColumn: IColumn, size: ISize, columnWidth: number, overflowing: IListboxResource[] = []) {
  // Is there enough room for the newly added overflow dropdown?
  // If not, move one item in the overflow column into the dropdown.
  // const newOverflowing = [...overflowing];
  const tooBig = (size.height < estimateColumnHeight(overflowColumn, columnWidth)) && overflowColumn.items?.length;
  const itemToMove = overflowColumn.items?.[overflowColumn.items.length - 1];
  if (tooBig && itemToMove) {
    const movedItemsObj = moveItemToOverflow(itemToMove, overflowColumn, overflowing);
    overflowing.length = 0;
    overflowing.push(...movedItemsObj.overflowing);
    overflowColumn.items = movedItemsObj.columnItems;
    overflowColumn.itemCount = overflowColumn.items?.length ?? 0;
  }
}

export function moveAlwaysExpandedToOverflow(columns: IColumn[], overflowing: IListboxResource[], size: ISize) {
  const newColumns = [...columns];
  const newOverflowing = [...overflowing];
  const overflowColumn = newColumns[newColumns.length - 1];

  const sadBecameHappy = newColumns.some((column) => {
    const sadItem = getSadItem(column);
    if (sadItem) {
      let changedItemsObj = moveItemToOverflow(sadItem, column, newOverflowing);
      // Move one overflow item which is not alwaysExpanded (if any) to the
      // column where we previously found the sad item.
      changedItemsObj = moveOverflowItemToColumn(changedItemsObj.columnItems || [], changedItemsObj.overflowing);
      column.items = changedItemsObj.columnItems;
      newOverflowing.length = 0;
      newOverflowing.push(...changedItemsObj.overflowing);
      column.itemCount = column.items?.length ?? 0;
      return true; // this breaks the loop
    }
    return false;
  });

  if (sadBecameHappy) {
    const columnWidth = getColumnWidth(size.width, columns.length);
    overflowColumn.hiddenItems = true;
    adjustOverflowColumn(overflowColumn, size, columnWidth, newOverflowing);
  }

  return {
    overflowing: newOverflowing,
    columns: newColumns,
    wasMoved: sadBecameHappy,
  };
}

export const setDefaultValues = (resources: IListboxResource[], isSmallDevice = false) => resources.map((resource: IListboxResource) => {
  const { collapseMode = 'auto' } = resource.layout.layoutOptions || {};

  if (isSmallDevice && resource.layout.layoutOptions) {
    resource.layout.layoutOptions.collapseMode = 'auto';
  }
  resource.hasHeader = hasHeader(resource);
  resource.expand = !isSmallDevice && collapseMode === 'never';
  resource.height = DEFAULT_CSS_HEIGHT;
  resource.fullyExpanded = false;
  resource.alwaysExpanded = !isSmallDevice && collapseMode === 'never';
  resource.neverExpanded = !isSmallDevice && collapseMode === 'always';
  resource.dense = resource.layout.layoutOptions?.dense ?? false;
  return resource;
});
