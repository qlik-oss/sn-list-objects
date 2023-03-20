import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// @ts-ignore
import { ResizableBox } from 'react-resizable';
import debounce from 'lodash/debounce';
import { stardust } from '@nebula.js/stardust';
import getWidthHeight from './get-size';
import { IListboxResource } from '../../hooks/types';
import ListboxContainer from '../ListboxContainer';
import 'react-resizable/css/styles.css';
import ElementResizeListener from '../ElementResizeListener';
import {
  setDefaultValues, balanceColumns, calculateColumns, calculateExpandPriority, mergeColumnsAndResources,
} from './distribute-resources';
import { IColumn, ISize } from './interfaces';
import { ColumnGrid } from './grid-components/ColumnGrid';
import { Column } from './grid-components/Column';
import { ColumnItem } from './grid-components/ColumnItem';
import ConditionalWrapper from './ConditionalWrapper';
import type { IStores } from '../../store';
import { ListboxPopoverContainer } from '../ListboxPopoverContainer';
import useHandleActive, { ActiveOnly } from './use-handle-active';
import KEYS from './keys';
import { RenderTrackerService } from '../../services/render-tracker';

// TODO: Remove
const Resizable = styled(ResizableBox)(() => ({
  position: 'absolute',
}));

const prepareRenderTracker = (columns: IColumn[], renderTracker: RenderTrackerService) => {
  let visibleListboxCount = 0;
  columns.forEach((column: IColumn) => {
    column.items?.forEach((item: IListboxResource) => {
      if (item.expand) {
        visibleListboxCount++;
      }
    });
  });
  renderTracker.setNumberOfListboxes(visibleListboxCount);
};

function ListboxGrid({ stores }: { stores: IStores }) {
  const { store, useResourceStore, useServices } = stores;
  const {
    sense, selections, keyboard,
  } = store.getState();
  const resources = useResourceStore((state) => state.resources);
  const renderTracker = useServices((state) => state.renderTracker);

  const gridRef = useRef<HTMLDivElement>();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [overflowingResources, setOverflowingResources] = useState<IListboxResource[]>([]);
  const isInSense = typeof (sense?.isSmallDevice) === 'function';
  const { options } = stores.store.getState();

  const handleResize = useCallback(() => {
    const { width, height } = getWidthHeight(gridRef);
    const size: ISize = { width, height, dimensionCount: resources.length };
    const isSmallDevice = sense?.isSmallDevice?.() ?? false;
    const calculatedColumns = calculateColumns(size, [], isSmallDevice);
    const balancedColumns = balanceColumns(size, calculatedColumns, isSmallDevice);
    const resourcesWithDefaultValues = setDefaultValues(resources);
    const { columns: mergedColumnsAndResources, overflowing } = mergeColumnsAndResources(balancedColumns, resourcesWithDefaultValues);
    setOverflowingResources(overflowing);
    const expandedAndCollapsedColumns = calculateExpandPriority(mergedColumnsAndResources, size);
    setColumns(expandedAndCollapsedColumns);
    prepareRenderTracker(expandedAndCollapsedColumns, renderTracker);
  }, [resources]);

  const preventDefaultBehavior = (event: React.KeyboardEvent | MouseEvent | React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const findIndex = (element: EventTarget, nodeList: NodeList) => {
    for (let i = 0; i < nodeList.length; i++) {
      if (element === nodeList.item(i)) return i;
    }
    return -1;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === KEYS.ESC && keyboard?.enabled) {
      // @ts-ignore
      if (event.target.classList.contains('listbox-container')) {
        // Focus currently on a listbox
        preventDefaultBehavior(event);
        // @ts-ignore
        keyboard.blur?.(true);
      }
    } else if (event.key === KEYS.LEFT || event.key === KEYS.RIGHT) {
      let elementToFocus;
      const listboxList = gridRef?.current?.querySelectorAll && gridRef?.current?.querySelectorAll('.listbox-container');
      if (listboxList?.length) {
        const activeIndex = findIndex(event.target, listboxList);
        if (activeIndex < 0) {
          elementToFocus = listboxList.item(0);
        } else if (!(listboxList.length === 1 || (activeIndex === 0 && event.key === KEYS.LEFT) || (activeIndex === listboxList.length - 1 && event.key === KEYS.RIGHT))) {
          const nextIndex = event.key === KEYS.LEFT ? activeIndex - 1 : activeIndex + 1;
          elementToFocus = listboxList.item(nextIndex);
        }
        if (elementToFocus) {
          (elementToFocus as HTMLElement).focus();
        }
      }
      preventDefaultBehavior(event);
    }
  };

  const isRtl = options.direction === 'rtl';

  useEffect(() => {
    if (gridRef.current) {
      handleResize();
    }
  }, [resources]);

  useEffect(() => {
    const firstChild = gridRef?.current?.querySelector && gridRef?.current?.querySelector('.listbox-container') as HTMLDivElement;
    if (keyboard?.active) {
      firstChild?.setAttribute('tabIndex', '0');
      firstChild?.focus();
    } else {
      firstChild?.setAttribute('tabIndex', '-1');
      firstChild?.blur();
    }
  }, [keyboard]);

  const handleActive = useHandleActive(isInSense, selections as stardust.ObjectSelections & ActiveOnly);
  const dHandleResize = debounce(handleResize, isInSense ? 0 : 50);

  // TODO: Remove Resizable, only for developing purposes
  return (
    <>
      <ConditionalWrapper condition={process.env.NODE_ENV === 'development'}
        wrapper={(children: JSX.Element[]) => <Resizable width={1080} height={1000} minConstraints={[10, 10]} maxConstraints={[1220, 1820]}>{children}</Resizable>}
      >
        <>
          <ElementResizeListener onResize={dHandleResize} />
          <Grid container onKeyDown={handleKeyDown} sx={{ flexDirection: isRtl ? 'row-reverse' : 'row' }} columns={columns?.length} ref={gridRef as unknown as () => HTMLDivElement} spacing={0} height='100%'>

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
                          borderBottom={(column.items?.length === j + 1) || !item.fullyExpanded}
                              disableSearch={item.cardinal <= 3}
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
      </ConditionalWrapper>
    </>
  );
}

export default ListboxGrid;
