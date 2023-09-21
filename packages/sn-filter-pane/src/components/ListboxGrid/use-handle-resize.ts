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
} from './distribute-resources';
import { ExpandProps, IColumn, ISize } from './interfaces';
import { IEnv } from '../../types/types';
import { IListboxResource } from '../../hooks/types';
import { IStore } from '../../store';

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

    let columnsTemp;
    let overflowing;
    let expandedItemsCount = 0;

    columnsTemp = calculateColumns(size, [], isSmallDevice, expandProps, resources);
    columnsTemp = balanceColumns(size, columnsTemp, resources, isSmallDevice, expandProps);
    ({ columns: columnsTemp, overflowing } = assignListboxesToColumns(columnsTemp, resources, isSmallDevice));
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
    columnsTemp = balanceColumns(size, columnsTemp, resources, isSmallDevice, expandProps);
    ({ columns: columnsTemp, expandedItemsCount } = calculateExpandPriority(columnsTemp, size, expandProps, isSmallDevice));

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
