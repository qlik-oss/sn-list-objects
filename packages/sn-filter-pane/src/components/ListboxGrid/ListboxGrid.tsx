import React, {
  useCallback, useEffect, useRef, useState, useSyncExternalStore,
} from 'react';
import { Grid } from '@mui/material';
import debounce from 'lodash/debounce';
import { stardust } from '@nebula.js/stardust';
import getWidthHeight from './get-size';
import { IListboxResource } from '../../hooks/types';
import ListboxContainer from '../ListboxContainer';
import 'react-resizable/css/styles.css';
import ElementResizeListener from '../ElementResizeListener';
import {
  setDefaultValues, balanceColumns, calculateColumns, calculateExpandPriority, mergeColumnsAndResources, hasHeader,
} from './distribute-resources';
import { ExpandProps, IColumn, ISize } from './interfaces';
import { ColumnGrid } from './grid-components/ColumnGrid';
import { Column } from './grid-components/Column';
import { ColumnItem } from './grid-components/ColumnItem';
import type { IStores } from '../../store';
import { ListboxPopoverContainer } from '../ListboxPopoverContainer';
import useHandleActive, { ActiveOnly } from './use-handle-active';
import KEYS from '../keys';
import { RenderTrackerService } from '../../services/render-tracker';
import useFocusListener from '../../hooks/use-focus-listener';
import findNextIndex from './find-next-index';
import { IEnv } from '../../types/types';

const prepareRenderTracker = (listboxCount: number, renderTracker?: RenderTrackerService) => {
  renderTracker?.setNumberOfListboxes(listboxCount);
  if (listboxCount === 0) {
    renderTracker?.renderedCallback();
  }
};

function ListboxGrid({ stores }: { stores: IStores }) {
  const { store, resourceStore } = stores;
  const {
    env = {}, selections, keyboard, renderTracker,
  } = store.getState();

  const { sense } = env as IEnv;

  // Subscribe to the resourceStore outside of react and re-render on store change.
  const { resources = [] } = useSyncExternalStore(resourceStore.subscribe, resourceStore.getState);

  const gridRef = useRef<HTMLDivElement>();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [overflowingResources, setOverflowingResources] = useState<IListboxResource[]>([]);
  const isInSense = typeof (sense?.isSmallDevice) === 'function';
  const { options } = stores.store.getState();

  const handleResize = useCallback(() => {
    if (!resources?.length) {
      return;
    }
    const { width, height } = getWidthHeight(gridRef);
    const size: ISize = { width, height, dimensionCount: resources.length };
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
  }, [resources]);

  const dHandleResize = useRef(debounce(handleResize, isInSense ? 0 : 10));

  const preventDefaultBehavior = (event: React.KeyboardEvent | MouseEvent | React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const findIndex = (element: EventTarget, nodeList: NodeList): number => {
    for (let i = 0; i < nodeList.length; i++) {
      if (element === nodeList.item(i)) return i;
    }
    return -1;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      return;
    }
    if (event.key === KEYS.ESC && keyboard?.enabled) {
      // @ts-ignore
      if (target.classList.contains('listbox-container') || target.classList.contains('listbox-popover-container')) {
        // Focus currently on a listbox
        // @ts-ignore
        keyboard.blur?.(true);
      }
    } else if ([KEYS.LEFT, KEYS.RIGHT, KEYS.UP, KEYS.DOWN].includes(event.key)) {
      let elementToFocus;
      const listboxList = gridRef?.current?.querySelectorAll && gridRef?.current?.querySelectorAll<HTMLElement>('.listbox-container,.listbox-popover-container');
      if (listboxList?.length) {
        const activeIndex: number = findIndex(event.target, listboxList);
        const nextIndex = findNextIndex({ activeIndex, key: event.key, columns }) as number;
        if (nextIndex > -1) {
          elementToFocus = listboxList.item(nextIndex);
        }
        if (elementToFocus) {
          (event.target as HTMLElement)?.setAttribute('tabIndex', '-1');
          elementToFocus.setAttribute('tabIndex', '-1');
          elementToFocus.focus();
        }
      }
    }
    preventDefaultBehavior(event);
  };

  useFocusListener(gridRef, keyboard);

  const isRtl = options.direction === 'rtl';

  useEffect(() => {
    if (gridRef.current) {
      handleResize();
    }
  }, [resources]);

  useEffect(() => {
    const firstChild = gridRef?.current?.querySelector?.('.listbox-container,.listbox-popover-container') as HTMLDivElement;
    if (keyboard?.active) {
      firstChild?.setAttribute('tabIndex', '-1');
      firstChild?.focus();
    } else {
      firstChild?.setAttribute('tabIndex', '-1');
    }
  }, [keyboard]);

  const handleActive = useHandleActive(isInSense, selections as stardust.ObjectSelections & ActiveOnly);

  return (
    <>
      <ElementResizeListener onResize={dHandleResize.current} />
      <Grid className="filter-pane-container" container onKeyDown={handleKeyDown} sx={{ flexDirection: isRtl ? 'row-reverse' : 'row' }} columns={columns?.length} ref={gridRef as unknown as () => HTMLDivElement} spacing={0} height='100%' overflow="hidden">

        {!!columns?.length && columns?.map((column: IColumn, i: number) => (
          <ColumnGrid key={i} widthPercent={100 / columns.length}>
            <Column lastColumn={!isRtl ? columns.length === i + 1 : i === 0}>

              {!!column?.items?.length && column.items.map((item: IListboxResource, j: number) => (
                <ColumnItem
                  key={item.id}
                  lastItem={column.items?.length === j + 1}
                  listItem={item}
                >
                  {item.expand
                    ? <ListboxContainer
                      layout={item.layout}
                      model={item.model}
                      borderBottom={(column.items?.length === j + 1) || !item.fullyExpanded}
                      handleActive={handleActive}
                      stores={stores}
                    ></ListboxContainer>
                    : <ListboxPopoverContainer resources={[item]} stores={stores} />
                  }
                </ColumnItem>
              ))}

              {column.hiddenItems && overflowingResources.length
                && <ColumnItem height='100%'>
                  <ListboxPopoverContainer resources={overflowingResources} stores={stores} />
                </ColumnItem>}
            </Column>

          </ColumnGrid>
        ))}
      </Grid>
    </>
  );
}

export default ListboxGrid;
