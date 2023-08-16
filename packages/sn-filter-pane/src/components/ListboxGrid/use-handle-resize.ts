import {
  MutableRefObject, useCallback, useState,
} from 'react';
import { RenderTrackerService } from '../../services/render-tracker';
import getWidthHeight from './get-size';
import {
  setDefaultValues, balanceColumns, calculateColumns, calculateExpandPriority, mergeColumnsAndResources, hasHeader,
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
    const { width, height } = getWidthHeight(gridRef);
    const size: ISize = { width, height, dimensionCount: resources.length };
    store.setState({ ...store.getState(), containerSize: size });
    const isSmallDevice = sense?.isSmallDevice?.() ?? false;
    const isSingleItem = resources.length === 1;
    const expandProps: ExpandProps = {
      isSingleGridLayout: isSingleItem && resources[0].layout?.layoutOptions?.dataLayout === 'grid',
      hasHeader: hasHeader(resources[0]),
    };
    const calculatedColumns = calculateColumns(size, [], isSmallDevice, expandProps);
    const balancedColumns = balanceColumns(size, calculatedColumns, isSmallDevice, expandProps);
    const resourcesWithDefaultValues = setDefaultValues(resources);
    const { columns: mergedColumnsAndResources, overflowing } = mergeColumnsAndResources(balancedColumns, resourcesWithDefaultValues);
    setOverflowingResources(overflowing);
    const { columns: expandedAndCollapsedColumns, expandedItemsCount } = calculateExpandPriority(mergedColumnsAndResources, size, expandProps);
    setColumns(expandedAndCollapsedColumns);
    prepareRenderTracker(expandedItemsCount, renderTracker);
  };

  const handleResizeMemo = useCallback(() => handleResize(), [resources]);

  return {
    handleResize: handleResizeMemo,
    overflowingResources,
    columns,
  };
}
