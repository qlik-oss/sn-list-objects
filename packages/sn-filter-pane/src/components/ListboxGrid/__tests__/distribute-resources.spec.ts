import { IListboxResource } from '../../../hooks/types';
import {
  mergeColumnsAndResources, balanceColumns, calculateColumns, calculateExpandPriority, setDefaultValues,
} from '../distribute-resources';
import { IColumn, ISize } from '../interfaces';

const generateColumns = ({ collapsed, expanded }: { collapsed?: number[], expanded?: number[] }) => {
  const c: IColumn[] = [];
  if (collapsed) {
    collapsed.forEach((itemCount: number) => {
      c.push({ itemCount, expand: false });
    });
  }
  if (expanded) {
    const e: IColumn[] = [];
    expanded.forEach((itemCount: number) => {
      e.push({ itemCount, expand: true });
    });
    return [...c, ...e];
  }
  return c;
};

describe('Listbox grid layout', () => {
  describe('balance columns', () => {
    it('should balance collpased columns 3-3-3-1 as 3-3-2-2 when last column cant expand one', () => {
      const size: ISize = { height: 100, width: 1000, dimensionCount: 10 };
      const columns = generateColumns({ collapsed: [3, 3, 3, 1] });
      const balancedColumns = balanceColumns(size, columns);
      expect(balancedColumns).toEqual(generateColumns({ collapsed: [3, 3, 2, 2] }));
    });

    it('should balance collapsed columns 4-4-1 as 3-3-3 when last column cant expand one', () => {
      const size: ISize = { height: 100, width: 1000, dimensionCount: 9 };
      const columns = generateColumns({ collapsed: [4, 4, 1] });
      const balancedColumns = balanceColumns(size, columns);
      expect(balancedColumns).toEqual(generateColumns({ collapsed: [3, 3, 3] }));
    });

    it('should expand last collapsed column when possible and all columns are collapsed', () => {
      const size: ISize = { height: 400, width: 1000, dimensionCount: 9 };
      const columns = generateColumns({ collapsed: [4, 4, 1] });
      const balancedColumns = balanceColumns(size, columns);
      expect(balancedColumns).toEqual(generateColumns({ collapsed: [4, 4], expanded: [1] }));
    });

    it('should expand last collapsed column when possible and mix of collapsed and expanded columns', () => {
      const size: ISize = { height: 400, width: 1000, dimensionCount: 9 };
      const columns = generateColumns({ collapsed: [4, 4, 1], expanded: [1, 1] });
      const balancedColumns = balanceColumns(size, columns);
      expect(balancedColumns).toEqual(generateColumns({ collapsed: [4, 4], expanded: [1, 1, 1] }));
    });
  });

  describe('merge resources into columns', () => {
    it('should merge rescources to the columns', () => {
      const columns: IColumn[] = new Array(4).fill({ itemCount: 2 });
      const resources: IListboxResource[] = new Array(8).fill({ id: '123' });
      expect(columns[0].items).toBeNull;
      const { columns: resultColumns } = mergeColumnsAndResources(columns, resources);
      expect(resultColumns[0].items?.length).toBe(2);
      expect(resultColumns[0].items?.[0].id).toBe('123');
    });

    it('should drop dimensions from the end when all wont fit', () => {
      const columns = generateColumns({ collapsed: [2, 3] });
      const resources: IListboxResource[] = new Array(6).fill({ id: '123' });
      const { columns: resultColumns } = mergeColumnsAndResources(columns, resources);
      expect(resultColumns[0].items?.length).toEqual(2);
      expect(resultColumns[1].items?.length).toEqual(3);
    });
  });

  describe('calculate columns', () => {
    it('should handle the case when not all items can be rendered with max one column', () => {
      const size: ISize = {
        height: 400,
        dimensionCount: 10,
        width: 5,
      };
      const result = calculateColumns(size, []);
      expect(result).toEqual([
        {
          expand: false,
          itemCount: 8,
          hiddenItems: true,
        },
      ]);
    });

    it('should handle the case when not all items can be rendered with max two columns', () => {
      const size: ISize = {
        height: 220,
        dimensionCount: 20,
        width: 500,
      };
      const result = calculateColumns(size, []);
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
      const size: ISize = {
        height: 400,
        dimensionCount: 10,
        width: 500,
      };
      const result = calculateColumns(size, []);
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
      const result = calculateColumns(size, []);
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
      const columns = generateColumns({ collapsed: [2], expanded: [1, 1] });
      const size: ISize = {
        height: 400,
        width: 500,
        dimensionCount: 4,
      };

      const result = calculateExpandPriority(columns, size);
      expect(result[0].expand).toBe(false);
      expect(result[1].expand).toBe(true);
      expect(result[2].expand).toBe(true);
    });

    it('should calculate the height of the listbox object for multiple dimensions in the same column', () => {
      const resource = {
        id: '123',
        expand: false,
        cardinal: 26,
        layout: {
          qListObject: {
            qDimensionInfo: {
              qCardinal: 26,
            },
          },
        },
      };
      const resources: IListboxResource[] = [...Array(2)].map(() => ({ ...resource as IListboxResource }));

      const size: ISize = {
        height: 1277,
        width: 5,
        dimensionCount: resources.length,
      };

      const calculatedColumns = calculateColumns(size, []);
      const balancedColumns = balanceColumns(size, calculatedColumns);
      const defaultValuesResources = setDefaultValues(resources);
      const { columns: mergedColumns } = mergeColumnsAndResources(balancedColumns, defaultValuesResources);
      const result = calculateExpandPriority(mergedColumns, size);
      expect(result[0].items?.[0].fullyExpanded).toBe(true);
      expect(result[0].items?.[0].expand).toBe(true);
      expect(result[0].items?.[0].height).toBe('802px');
      expect(result[0].items?.[1].fullyExpanded).toBe(false);
      expect(result[0].items?.[1].expand).toBe(true);
      expect(result[0].items?.[1].height).toBe('465px');
    });
  });
});
