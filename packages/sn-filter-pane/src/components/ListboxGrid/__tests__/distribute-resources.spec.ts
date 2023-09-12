import { IListboxResource } from '../../../hooks/types';
import {
  assignListboxesToColumns, balanceColumns, calculateColumns, calculateExpandPriority, setDefaultValues, hasHeader,
} from '../distribute-resources';
import { ExpandProps, IColumn, ISize } from '../interfaces';

const createItem = (overrides = {}) => ({
  expand: false,
  fullyExpanded: false,
  alwaysExpanded: false,
  fits: false,
  dense: false,
  layout: {
    layoutOptions: {},
    qListObject: { qDimensionInfo: { qCardinal: 5 } },
  },
  ...overrides,
});

const generateColumns = ({ collapsed, expanded }: { collapsed?: number[], expanded?: number[] }) => {
  const c: IColumn[] = [];
  const e: IColumn[] = [];
  if (collapsed) {
    collapsed.forEach((itemCount: number) => {
      c.push({ itemCount, expand: false, items: Array(itemCount).fill(createItem({ expand: false })) });
    });
  }
  if (expanded) {
    expanded.forEach((itemCount: number) => {
      e.push({ itemCount, expand: true, items: Array(itemCount).fill(createItem({ expand: true })) });
    });
  }
  return [...c, ...e];
};
const isSmallDevice = false;
const expandProps: ExpandProps = {
  hasHeader: true,
  isSingleGridLayout: false,
  alwaysExpanded: false,
};

const getColumns = (cols: IColumn[]) => cols.map((col) => {
  const { expand, itemCount } = col;
  return { expand, itemCount };
});

describe('distribute resources', () => {
  describe('balance columns', () => {
    it('should balance collpased columns 3-3-3-1 as 3-3-2-2 when last column cant expand one, which should only happen when the item is smaller than the available height.', () => {
      const size: ISize = { height: 30, width: 1000, dimensionCount: 10 };
      const columns = generateColumns({ collapsed: [3, 3, 3, 1] });
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandProps);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ collapsed: [3, 3, 2, 2] })));
    });

    it('should balance collapsed columns 4-4-1 as 3-3-3 when last column cant expand one', () => {
      const size: ISize = { height: 30, width: 1000, dimensionCount: 9 };
      const columns = generateColumns({ collapsed: [4, 4, 1] });
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandProps);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ collapsed: [3, 3, 3] })));
    });

    it('should expand last collapsed column when possible and all columns are collapsed', () => {
      const size: ISize = { height: 400, width: 1000, dimensionCount: 9 };
      const columns = generateColumns({ collapsed: [4, 4, 1] });
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandProps);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ collapsed: [4, 4], expanded: [1] })));
    });

    it('should expand last collapsed column when possible and mix of collapsed and expanded columns', () => {
      const size: ISize = { height: 400, width: 1000, dimensionCount: 9 };
      const columns = generateColumns({ collapsed: [4, 4, 1], expanded: [1, 1] });
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandProps);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ collapsed: [4, 4], expanded: [1, 1, 1] })));
    });
  });

  describe('merge resources into columns', () => {
    it('should merge rescources to the columns', () => {
      const columns: IColumn[] = new Array(4).fill({ itemCount: 2 });
      const resources: IListboxResource[] = new Array(8).fill({ id: '123' });
      expect(columns[0].items).toBeNull;
      const { columns: resultColumns } = assignListboxesToColumns(columns, resources, isSmallDevice);
      expect(resultColumns[0].items?.length).toBe(2);
      expect(resultColumns[0].items?.[0].id).toBe('123');
    });

    it('should drop dimensions from the end when all wont fit', () => {
      const columns = generateColumns({ collapsed: [2, 3] });
      const resources: IListboxResource[] = new Array(6).fill({ id: '123' });
      const { columns: resultColumns } = assignListboxesToColumns(columns, resources, isSmallDevice);
      expect(resultColumns[0].items?.length).toEqual(2);
      expect(resultColumns[1].items?.length).toEqual(3);
    });
  });

  describe('calculate columns', () => {
    it('should handle the case when not all items can be rendered with max one column', () => {
      const dimensionCount = 10;

      const size: ISize = {
        height: 400,
        dimensionCount,
        width: 5,
      };
      const resources = Array(dimensionCount).fill(createItem({
        itemCount: dimensionCount,
        expand: false,
      }));

      const result = calculateColumns(size, [], isSmallDevice, expandProps, resources);
      expect(result).toEqual([
        {
          expand: false,
          itemCount: 8,
          hiddenItems: true,
        },
      ]);
    });

    it('should handle the case when not all items can be rendered with max two columns', () => {
      const dimensionCount = 20;
      const size: ISize = {
        height: 220,
        dimensionCount,
        width: 500,
      };
      const resources = Array(dimensionCount).fill(createItem({
        dense: false,
        alwaysExpanded: false,
        expand: false,
        fits: false,
        fullyExpanded: false,
      }));
      const result = calculateColumns(size, [], isSmallDevice, expandProps, resources);
      expect(result).toEqual([
        {
          expand: false,
          itemCount: 5,
        },
        {
          expand: false,
          hiddenItems: true,
          itemCount: 4,
        },
      ]);
    });

    it('should handle the case when all items will fit and the second column can be expanded', () => {
      const dimensionCount = 10;
      const size: ISize = {
        height: 400,
        dimensionCount,
        width: 500,
      };

      const resources = Array(dimensionCount).fill(createItem({
        dense: false,
        alwaysExpanded: false,
        expand: false,
        fits: false,
        fullyExpanded: false,
      }));
      const result = calculateColumns(size, [], isSmallDevice, expandProps, resources);
      expect(result).toEqual([
        {
          expand: true,
          itemCount: 1,
        },
        {
          expand: false,
          itemCount: 9,
        },
      ]);
    });

    it('should handle the case when all items can be expanded', () => {
      const size: ISize = {
        height: 400,
        dimensionCount: 2,
        width: 500,
      };
      const result = calculateColumns(size, [], isSmallDevice, expandProps, []);
      expect(result).toEqual([
        {
          expand: true,
          itemCount: 1,
        },
        {
          expand: true,
          itemCount: 1,
        },
      ]);
    });
  });

  describe('expand priority', () => {
    it('should set the expand', () => {
      const dimensionCount = 4;
      const columns = generateColumns({ collapsed: [2], expanded: [1, 1] });
      const size: ISize = {
        height: 400,
        width: 500,
        dimensionCount,
      };

      const { columns: result } = calculateExpandPriority(columns, size, expandProps, isSmallDevice);
      expect(result[0].expand).toBe(false);
      expect(result[1].expand).toBe(true);
      expect(result[2].expand).toBe(true);
    });

    it('should calculate the height of the listbox object for multiple dimensions in the same column', () => {
      const resource = {
        id: '123',
        expand: false,
        fits: false,
        fullyExpanded: false,
        cardinal: 26,
        layout: {
          qListObject: {
            qDimensionInfo: {
              qCardinal: 26,
            },
          },
        },
      };
      const resources: IListboxResource[] = [{
        ...resource,
      } as IListboxResource, {
        ...resource,
      } as IListboxResource];

      const size: ISize = {
        height: 1277,
        width: 5,
        dimensionCount: resources.length,
      };

      const calculatedColumns = calculateColumns(size, [], isSmallDevice, expandProps, resources);
      const balancedColumns = balanceColumns(size, calculatedColumns, resources, isSmallDevice, expandProps);
      const defaultValuesResources = setDefaultValues(resources);
      const { columns: mergedColumns } = assignListboxesToColumns(balancedColumns, defaultValuesResources, isSmallDevice);
      const { columns: result } = calculateExpandPriority(mergedColumns, size, expandProps, isSmallDevice);
      expect(result[0].items?.[1].fullyExpanded).toBe(false);
      expect(result[0].items?.[0].expand).toBe(true);
      expect(result[0].items?.[1].height).toBe('465px');
      expect(result[0].items?.[0].fullyExpanded).toBe(true);
      expect(result[0].items?.[1].expand).toBe(true);
      expect(result[0].items?.[0].height).toBe('802px');
    });
  });

  describe('expand with one grid item', () => {
    it('should expand when title is present at height 87px', () => {
      const size: ISize = { height: 87, width: 1000, dimensionCount: 10 };
      const columns = generateColumns({ collapsed: [1] });
      const expandPropsGrid: ExpandProps = {
        hasHeader: true,
        isSingleGridLayout: true,
        alwaysExpanded: false,
      };
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandPropsGrid);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ expanded: [1] })));
    });

    it('should expand when title is hidden at height 39px', () => {
      const size: ISize = { height: 49, width: 1000, dimensionCount: 10 };
      const columns = generateColumns({ collapsed: [1] });
      const expandPropsGrid: ExpandProps = {
        hasHeader: false,
        isSingleGridLayout: true,
        alwaysExpanded: false,
      };
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandPropsGrid);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ expanded: [1] })));
    });

    it('should not expand when not single item in grid', () => {
      const dimensionCount = 10;
      const size: ISize = { height: 87, width: 1000, dimensionCount };
      const columns = generateColumns({ collapsed: [1] });
      columns[0].items = Array(dimensionCount).fill(createItem());
      const expandPropsGrid: ExpandProps = {
        hasHeader: true,
        isSingleGridLayout: false,
        alwaysExpanded: false,
      };
      const resources = [] as IListboxResource[];
      const balancedColumns = balanceColumns(size, columns, resources, isSmallDevice, expandPropsGrid);
      expect(getColumns(balancedColumns)).toEqual(getColumns(generateColumns({ collapsed: [1] })));
    });
  });

  describe('hasHeader', () => {
    it('should not throw if resource is undefined', () => {
      expect(() => hasHeader(undefined)).not.toThrow();
    });

    it('should return true if there is a title and showTitle is turned on', () => {
      const val = hasHeader({
        layout: {
          title: 'hey hey', showTitle: true,
        },
      } as unknown as IListboxResource);
      expect(val).toBeTruthy();
    });

    it('should return false if there is no or empty title', () => {
      const val = hasHeader({
        layout: {
          title: '', showTitle: true,
        },
      } as unknown as IListboxResource);
      expect(val).toBeFalsy();
    });

    it('should return false if there is a title but showTitle is not true', () => {
      const val = hasHeader({
        layout: {
          title: 'asd',
          showTitle: false,
        },
      } as unknown as IListboxResource);
      expect(val).toBeFalsy();
    });
  });
});
