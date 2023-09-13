import { IListboxResource, ListboxResourcesArr } from '../../hooks/types';
import {
  countListBoxes,
  doAllFit,
  estimateColumnHeight,
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

  const canColumnExpand = collapsed.length > 0 && !collapsed[collapsed.length - 1].hiddenItems
    && haveRoomToExpandOne(size, collapsed[collapsed.length - 1], isSmallDevice, expandProps);
  if (canColumnExpand) {
    collapsed[collapsed.length - 1].expand = true;
  } else {
    collapsedItems = countListBoxes(collapsed);
    collapsed.forEach((column, index) => {
      // If the dimensions can't be evenly distributed among the
      // columns the extra dimensions should be given to the first columns
      const extraItems = index < collapsedItems % collapsed.length ? 1 : 0;
      const itemCount = Math.floor(collapsedItems / collapsed.length) + extraItems;

      const lastColumn = columns[columns.length - 1];

      const isLastColumn = column === lastColumn;

      // However, we should only push items to first column if it can fit more listboxes…
      if (!(isLastColumn && column.hiddenItems && columns.length > 1) && size.height >= estimateColumnHeight({ ...column, itemCount, items: resources.slice(index, index + itemCount) })) {
        column.itemCount = itemCount;
      } else {
        // …and if it does not fit, we can move it to the last column and make items hidden.
        lastColumn.itemCount = 0;
        lastColumn.hiddenItems = true;
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
  return { columns, overflowing: resourcesTail };
}

const setFullyExpanded = (item: IListboxResource) => {
  item.fullyExpanded = true;
  item.height = `${getListBoxMaxHeight(item)}px`;
};

function expandUntilFull(sortedItems: IListboxResource[] | undefined, initialLeftOverHeight: number, isSingleGridLayout = false) {
  if (!sortedItems) return;
  let i;
  let item;
  let itemFits;
  let expandedHeight;
  let leftOverHeight = initialLeftOverHeight;

  for (i = 0; i < sortedItems.length; i++) {
    item = sortedItems[i];
    if (item.cardinal && !item.fullyExpanded) {
      // 1. Calculate column height without the target item, then
      // 2. Subtract the target's expanded height to see if it fits.
      leftOverHeight = initialLeftOverHeight - estimateColumnHeight({ items: [...sortedItems.slice(0, i), ...sortedItems.slice(i + 1)] });
      expandedHeight = getListBoxMaxHeight(item) + ITEM_SPACING;
      itemFits = leftOverHeight >= expandedHeight;
      item.fits = itemFits;
      if (itemFits && !item.neverExpanded) {
        item.expand = true;
        setFullyExpanded(item);
      } else if (item.neverExpanded) {
        item.expand = false;
      } else {
        // See if listbox fits as expanded and if not – as collapsed.
        const expandedMinHeight = getListBoxMinHeight(item, false, false);
        const collapsedMinHeight = getListBoxMinHeight(item, false, true);
        const expandedHeightLimit = getExpandedHeightLimit({ alwaysExpanded: item.alwaysExpanded, hasHeader: item.hasHeader, isSingleGridLayout });
        const fitsAsExpanded = leftOverHeight - expandedMinHeight >= expandedHeightLimit;
        const fitsAsCollapsed = leftOverHeight >= collapsedMinHeight;
        if (fitsAsExpanded) {
          item.expand = true;
          item.height = item.alwaysExpanded && isSingleGridLayout ? DEFAULT_CSS_HEIGHT : `${leftOverHeight}px`;
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
  if (item.neverExpanded) {
    item.expand = false;
  } else {
    const expandedHeightLimit = getExpandedHeightLimit({ alwaysExpanded: item.alwaysExpanded, hasHeader: item.hasHeader, isSingleGridLayout });
    const canFitSingleExpanded = !isSmallDevice && isSingleColumn && innerHeight - getListBoxMinHeight(item) >= expandedHeightLimit;
    item.expand = canFitSingleExpanded;
    if (item.alwaysExpanded) {
      item.height = canFitSingleExpanded ? DEFAULT_CSS_HEIGHT : `${getListBoxMinHeight(item)}px`;
    }
  }
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
        item, isSingleColumn, isSingleGridLayout: expandProps.isSingleGridLayout, innerHeight, isSmallDevice,
      });
    });

    const sortedItems = sortColumnItems(columnItems);

    if (column.expand) {
      if ((sortedItems.length ?? 0) > 1) {
        expandUntilFull(sortedItems, innerHeight);
      } else if (expandProps.isSingleGridLayout) {
        // Ensure we set expand to true in this corner case (product designer request).
        const hasRoom = haveRoomToExpandOne(size, sortedItems[0], isSmallDevice, expandProps);
        if (hasRoom && column.items?.[0]) {
          column.items[0].expand = true;
        }
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
      columnItems[0].height = DEFAULT_CSS_HEIGHT; // `${size.height}px`;
    }
  });
  return { columns, expandedItemsCount: allExpandedItems.length };
};

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
