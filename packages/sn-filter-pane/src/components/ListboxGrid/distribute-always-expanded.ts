// const flatten = (arr = []) => arr.reduce((prev, cur) => prev.concat(cur));

import { IListboxResource } from '../../hooks/types';
import { IColumn } from './interfaces';

export function getSadItem(column: IColumn) {
  const sadItem = column.items?.filter((item) => item.alwaysExpanded && !item.expand)[0];
  return sadItem;
}

export function moveOverflowItemToColumn(columnItems: IListboxResource[], overflowing: IListboxResource[]) {
  const newOverflowing = [...overflowing];
  const newColumnItems = [...columnItems];
  const overflowIndex = newOverflowing.findIndex((itm: IListboxResource) => !itm.alwaysExpanded);
  if (overflowIndex > -1) {
    const itemToColumn = newOverflowing.splice(overflowIndex, 1)[0];
    newColumnItems.splice(0, 0, itemToColumn);
  }
  return {
    columnItems: newColumnItems as IListboxResource[],
    overflowing: newOverflowing as IListboxResource[],
  };
}

export function moveSadItemToOverflow(sadItem: IListboxResource, parentColumn: IColumn, overflowing: IListboxResource[]) {
  const sadItemIndex = parentColumn.items?.indexOf(sadItem) as number;
  if (sadItemIndex === -1) {
    return {
      parentColumnItems: parentColumn.items as IListboxResource[],
      overflowing: overflowing as IListboxResource[],
    };
  }
  parentColumn.items?.splice(sadItemIndex, 1); // remove from parent column
  return {
    columnItems: parentColumn.items as IListboxResource[],
    overflowing: [...overflowing, { ...sadItem, expand: false }] as IListboxResource[],
  };
}
