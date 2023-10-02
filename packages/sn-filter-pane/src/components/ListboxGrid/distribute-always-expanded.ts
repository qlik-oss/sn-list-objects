import { IListboxResource } from '../../hooks/types';
import { IColumn } from './interfaces';

export const isSadItem = (item: IListboxResource) => !!(item?.alwaysExpanded && !item?.expand);

export const getSadItems = (items: IListboxResource[]) => items.filter((item) => isSadItem(item));

export function getSadItem(column: IColumn) {
  const sadItem = getSadItems(column?.items || []).pop(); // return the last item, if many
  return sadItem;
}

export function moveOverflowItemToColumn(columnItems: IListboxResource[], overflowing: IListboxResource[]) {
  const newOverflowing = [...overflowing];
  const newColumnItems = [...columnItems];
  const overflowIndex = newOverflowing.findIndex((itm: IListboxResource) => !itm.alwaysExpanded);
  if (overflowIndex > -1) {
    const itemToColumn = newOverflowing.splice(overflowIndex, 1)[0];
    newColumnItems.push(itemToColumn);
  }
  return {
    columnItems: newColumnItems as IListboxResource[],
    overflowing: newOverflowing as IListboxResource[],
  };
}

export function moveItemToOverflow(itemToMove: IListboxResource, parentColumn: IColumn, overflowing: IListboxResource[]) {
  const itemToMoveIndex = parentColumn.items?.indexOf(itemToMove) as number;
  if (itemToMoveIndex === -1) {
    return {
      columnItems: parentColumn.items as IListboxResource[],
      overflowing: overflowing as IListboxResource[],
    };
  }
  parentColumn.items?.splice(itemToMoveIndex, 1); // remove from parent column
  return {
    columnItems: parentColumn.items as IListboxResource[],
    overflowing: [{ ...itemToMove, expand: false }, ...overflowing] as IListboxResource[],
  };
}
