import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// @ts-ignore
import { ResizableBox } from 'react-resizable';
import debounce from 'lodash/debounce';
import getWidthHeight from './get-size';
import { IListBoxOptions, IListboxResource } from '../../hooks/types';
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
import { store } from '../../store';
import { ListboxPopoverContainer } from '../ListboxPopoverContainer';

export interface ListboxGridProps {
  listboxOptions: IListBoxOptions;
  resources: IListboxResource[];
}

// TODO: Remove
const Resizable = styled(ResizableBox)(() => ({
  position: 'absolute',
}));

export default function ListboxGrid(props: ListboxGridProps) {
  const { resources } = props;
  const { sense } = store.getState();

  const gridRef = useRef<HTMLDivElement>();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [overflowingResources, setOverflowingResources] = useState<IListboxResource[]>([]);
  const isInSense = typeof (sense?.isSmallDevice) === 'function';

  const handleResize = useCallback(() => {
    const { width, height } = getWidthHeight(gridRef);
    const size: ISize = { width, height, dimensionCount: resources.length };
    const calculatedColumns = calculateColumns(size, []);
    const balancedColumns = balanceColumns(size, calculatedColumns);
    const resourcesWithDefaultValues = setDefaultValues(resources);
    const { columns: mergedColumnsAndResources, overflowing } = mergeColumnsAndResources(balancedColumns, resourcesWithDefaultValues);
    setOverflowingResources(overflowing);
    const expandedAndCollapsedColumns = calculateExpandPriority(mergedColumnsAndResources, size);
    setColumns(expandedAndCollapsedColumns);
  }, [resources]);

  useEffect(() => {
    if (gridRef.current) {
      handleResize();
    }
  }, []);

  const dHandleResize = debounce(handleResize, isInSense ? 0 : 50);

  // TODO: Remove Resizable, only for developing purposes
  return (
    <>
      <ConditionalWrapper condition={!isInSense}
        wrapper={(children: JSX.Element[]) => <Resizable width={1080} height={1000} minConstraints={[10, 10]} maxConstraints={[1220, 1820]}>{children}</Resizable>}
      >
        <>
          <ElementResizeListener onResize={dHandleResize} />
          <Grid container columns={columns?.length} ref={gridRef as any} spacing={0} height='100%'>

            {!!columns?.length && columns?.map((column: IColumn, i: number) => (
              <ColumnGrid key={i} widthPercent={100 / columns.length}>
                <Column lastColumn={columns.length === i + 1}>

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
                        ></ListboxContainer>
                        : <ListboxPopoverContainer resources={[item]} />
                      }
                    </ColumnItem>
                  ))}

                  {column.hiddenItems && overflowingResources.length
                    && <ColumnItem height='100%'>
                      <ListboxPopoverContainer resources={overflowingResources} />
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
