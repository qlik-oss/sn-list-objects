import React, {
  useEffect, useRef, useSyncExternalStore,
} from 'react';
import { Grid } from '@mui/material';
import debounce from 'lodash/debounce';
import { stardust } from '@nebula.js/stardust';
import { IListboxResource } from '../../hooks/types';
import ListboxContainer from '../ListboxContainer';
import 'react-resizable/css/styles.css';
import ElementResizeListener from '../ElementResizeListener';

import { IColumn } from './interfaces';
import { ColumnGrid } from './grid-components/ColumnGrid';
import { Column } from './grid-components/Column';
import { ColumnItem } from './grid-components/ColumnItem';
import type { IStores } from '../../store';
import { ListboxPopoverContainer } from '../ListboxPopoverContainer';
import useHandleActive, { ActiveOnly } from './use-handle-active';
import useHandleResize from './use-handle-resize';
import KEYS from '../keys';
import useFocusListener from '../../hooks/use-focus-listener';
import findNextIndex from './find-next-index';
import { IEnv } from '../../types/types';

function ListboxGrid({ stores }: { stores: IStores }) {
  const { store, resourceStore } = stores;
  const {
    env = {}, selections, keyboard, renderTracker, options,
  } = store.getState();

  const { sense } = env as IEnv;

  // Subscribe to the resourceStore outside of react and re-render on store change.
  const { resources = [] } = useSyncExternalStore(resourceStore.subscribe, resourceStore.getState);

  const gridRef = useRef<HTMLObjectElement>();

  const isInSense = typeof (sense?.isSmallDevice) === 'function';

  const { handleResize, overflowingResources, columns } = useHandleResize({
    resources,
    gridRef,
    store,
    env,
    renderTracker,
  });
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
    const firstChild = gridRef?.current?.querySelector?.('.listbox-container,.listbox-popover-container') as HTMLObjectElement;
    firstChild?.setAttribute('tabIndex', '-1');
    if (keyboard?.active) {
      firstChild?.focus();
    }
  }, [keyboard]);

  const handleActive = useHandleActive(isInSense, selections as stardust.ObjectSelections & ActiveOnly);

  return (
    <>
      <ElementResizeListener onResize={dHandleResize.current} />
      <Grid
        className="filter-pane-container"
        container
        onKeyDown={handleKeyDown}
        sx={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
        columns={columns?.length}
        ref={gridRef as unknown as () => HTMLObjectElement}
        spacing={0}
        height='100%'
        overflow="hidden"
      >

        {!!columns?.length && columns?.map((column: IColumn, columnIndex: number) => (
          <ColumnGrid key={columnIndex} widthPercent={100 / columns.length}>
            <Column lastColumn={!isRtl ? columns.length === columnIndex + 1 : columnIndex === 0}>
              {!!column?.items?.length && column.items.map((item: IListboxResource, itemIndex: number) => (
                <ColumnItem
                  key={item.id}
                  lastItem={column.items?.length === itemIndex + 1 && !column.hiddenItems}
                  listItem={item}
                >
                  {item.expand
                    ? <ListboxContainer
                      layout={item.layout}
                      model={item.model}
                      borderBottom={(column.items?.length === itemIndex + 1) || !item.fullyExpanded}
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
