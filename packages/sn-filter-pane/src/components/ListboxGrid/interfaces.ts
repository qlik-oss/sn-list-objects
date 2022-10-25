import { IListboxResource } from '../../hooks/types';

export interface IColumn {
  expand?: boolean;
  itemCount?: number;
  showAll?: boolean;
  items?: IListboxResource[];
}

export interface ISize {
  width: number;
  height: number;
  dimensionCount: number;
}
