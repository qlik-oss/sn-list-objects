/* eslint-disable no-param-reassign */
import {
  MutableRefObject, useCallback, useState,
} from 'react';
import { RenderTrackerService } from '../../services/render-tracker';
import getWidthHeight from './get-size';
import {
  setDefaultValues, balanceColumns, calculateColumns, calculateExpandPriority, assignListboxesToColumns,
  hasHeader,
  moveAlwaysExpandedToOverflow,
  adjustOverflowColumn,
  sortColumnItemsByFieldOrder,
} from './distribute-resources';
import { ExpandProps, IColumn, ISize } from './interfaces';
import { IEnv } from '../../types/types';
import { IListboxResource } from '../../hooks/types';
import { IStore } from '../../store';
import { getSadItems, moveItemToOverflow } from './distribute-always-expanded';
import { estimateColumnHeight } from './distribute-resources-counting';

const prepareRenderTracker = (listboxCount: number, renderTracker?: RenderTrackerService) => {
  renderTracker?.setNumberOfListboxes(listboxCount);
  if (listboxCount === 0) {
    renderTracker?.renderedCallback();
  }
};

interface IUseHandleResize {
  resources: IListboxResource[];
  gridRef: MutableRefObject<HTMLObjectElement | undefined>;
  store: IStore;
  env: IEnv;
  renderTracker?: RenderTrackerService;
}

export default function useHandleResize({
  resources,
  gridRef,
  store,
  env,
  renderTracker,
}: IUseHandleResize) {
  const { sense } = env as IEnv;

  const [overflowingResources, setOverflowingResources] = useState<IListboxResource[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const handleResize = () => {
    if (!resources?.length) {
      return;
    }
    resources = setDefaultValues(resources);
    const { width, height } = getWidthHeight(gridRef);
    const size: ISize = { width, height, dimensionCount: resources.length };
    store.setState({ ...store.getState(), containerSize: size });
    const isSmallDevice = sense?.isSmallDevice?.() ?? false;
    const isSingleItem = resources.length === 1;
    const expandProps: ExpandProps = {
      isSingleGridLayout: isSingleItem && resources[0].layout?.layoutOptions?.dataLayout === 'grid',
      hasHeader: hasHeader(resources[0]),
      alwaysExpanded: resources[0].layout?.layoutOptions?.collapseMode === 'never',
    };

    let columnsTemp: IColumn[];
    let overflowing: IListboxResource[];
    let expandedItemsCount = 0;

    columnsTemp = calculateColumns(size, [], isSmallDevice, expandProps, resources);
    columnsTemp = balanceColumns(size, columnsTemp, resources, isSmallDevice, expandProps);

    ({ columns: columnsTemp, overflowing } = assignListboxesToColumns(columnsTemp, resources, isSmallDevice));
    ({ columns: columnsTemp, expandedItemsCount } = calculateExpandPriority(columnsTemp, size, expandProps, isSmallDevice));

    // If there is one or more always expanded listboxes which cannot expand (i.e. a "sad" item), move the last
    // collapsable listbox to the overflow menu until either a) all sad items are happy, or b) all collapsable
    // items have been moved. Only after that, we will start moving always expanded listboxes to overflow.
    const overflowColumn = columnsTemp[columnsTemp.length - 1];
    const isSingleColumn = columnsTemp.length === 1;
    if (isSingleColumn) {
      columnsTemp[0].expand = true;
    }

    [...columnsTemp].reverse().slice(0).forEach((column: IColumn) => {
      const { items = [] } = column;
      [...items].some(() => {
        const sadItems = getSadItems(column.items || []);
        const columnHasSadItems = sadItems.length > 0;
        const lastCollapsable = [...items].reverse().find((itm: IListboxResource) => !itm.alwaysExpanded && !overflowing.includes(itm));
        if (!columnHasSadItems || !lastCollapsable) {
          return true; // nothing more we can do, break loop
        }
        const movedItemsObj = moveItemToOverflow(lastCollapsable, column, overflowing);
        overflowing = [...movedItemsObj.overflowing];
        const columnIndex = columnsTemp.indexOf(column);
        columnsTemp[columnIndex].items = movedItemsObj.columnItems;
        columnsTemp[columnIndex].itemCount = movedItemsObj.columnItems.length;
        overflowColumn.hiddenItems = true;

        sadItems[0].expand = true;
        const tooBig = estimateColumnHeight(column) > size.height;
        if (tooBig) {
          sadItems[0].expand = false;
        }

        columnsTemp = balanceColumns(size, columnsTemp, resources, isSmallDevice, expandProps);
        ({ columns: columnsTemp, expandedItemsCount } = calculateExpandPriority(columnsTemp, size, expandProps, isSmallDevice));
        return false;
      });
    });

    columnsTemp = balanceColumns(size, columnsTemp, resources, isSmallDevice, expandProps);
    ({ columns: columnsTemp, expandedItemsCount } = calculateExpandPriority(columnsTemp, size, expandProps, isSmallDevice));

    // Move listboxes which should always be expanded, but do not have room to expand; into the overflow dropdown.
    // This is done iteratively by:
    //  1. Moving one listbox to overflow
    //  2. Re-evaluating the expand capabilities of remaining listboxes and expand if possible
    //  3. If nothing can be moved, break the loop (all always expanded listboxes have either moved or expanded).
    let wasMoved;
    for (let i = 0, len = resources.length; i < len; i++) {
      ({ columns: columnsTemp, overflowing, wasMoved } = moveAlwaysExpandedToOverflow(columnsTemp, overflowing, size));
      columnsTemp = columnsTemp.filter((column) => !(column.itemCount === 0 && !column.hiddenItems)); // remove empty columns resulting from moving listboxes
      ({ columns: columnsTemp, expandedItemsCount } = calculateExpandPriority(columnsTemp, size, expandProps, isSmallDevice));
      if (!wasMoved) {
        break;
      }
    }

    if (!isSingleColumn) {
      // Ensure the overflow column adjusts for the overflow dropdown button, if any.
      adjustOverflowColumn(columnsTemp[columnsTemp.length - 1], size, overflowing);
    }

    columnsTemp = balanceColumns(size, columnsTemp, resources, isSmallDevice, expandProps);
    ({ columns: columnsTemp, expandedItemsCount } = calculateExpandPriority(columnsTemp, size, expandProps, isSmallDevice));

    sortColumnItemsByFieldOrder(columnsTemp, resources);

    setOverflowingResources(overflowing);
    setColumns(columnsTemp);
    prepareRenderTracker(expandedItemsCount, renderTracker);
  };

  const handleResizeMemo = useCallback(() => handleResize(), [resources]);

  return {
    handleResize: handleResizeMemo,
    overflowingResources,
    columns,
  };
}
