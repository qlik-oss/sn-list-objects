import { IListboxResource } from '../../../hooks/types';
import {
  countListBoxes, doAllFit, estimateColumnHeight, getExpandedHeightLimit, getListBoxMaxHeight, getListBoxMinHeight, getMaxColumns, howManyListBoxesFit,
} from '../distribute-resources-counting';
import { LIST_DENSE_ROW_HEIGHT, LIST_ROW_HEIGHT } from '../grid-constants';
import { ExpandProps, ISize } from '../interfaces';

const getResource = (collapseMode = 'auto') => ({
  dense: false,
  collapseMode: 'auto',
  hasHeader: true,
  neverExpanded: collapseMode === 'always',
  alwaysExpanded: collapseMode === 'never',
  layout: { layoutOptions: { collapseMode, dense: false } },
} as unknown as IListboxResource);

describe('distribute resources countng functions', () => {
  describe('getListBoxMinHeight should return correct height for different settings', () => {
    it('hasHeader: true, collapse: never, dense: false', () => {
      const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'never', dense: false } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(77);
    });
    it('hasHeader: true, collapse: never, dense: true', () => {
      const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'never', dense: true } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(68);
    });
    it('hasHeader: false, collapse: never, dense: false', () => {
      const resource = { hasHeader: false, layout: { layoutOptions: { collapseMode: 'never', dense: false } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(LIST_ROW_HEIGHT);
    });
    it('hasHeader: false, collapse: never, dense: true', () => {
      const resource = { hasHeader: false, layout: { layoutOptions: { collapseMode: 'never', dense: true } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(LIST_DENSE_ROW_HEIGHT);
    });

    it('hasHeader: false, collapse: auto, dense: false', () => {
      const resource = { hasHeader: false, layout: { layoutOptions: { collapseMode: 'auto', dense: false } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(34);
    });
    it('hasHeader: true, collapse: auto, dense: false', () => {
      const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'auto', dense: false } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(34);
    });
    it('hasHeader: true, collapse: always, dense: false', () => {
      const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'auto', dense: false } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(34);
    });
    it('hasHeader: true, collapse: always, dense: true', () => {
      const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'auto', dense: true } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(34);
    });
  });

  describe('getMaxColumns should behave', () => {
    it('getMaxColumns -> 1', () => {
      const size = {
        width: 100,
        height: 200,
        dimensionCount: 4,
      };
      expect(getMaxColumns(size, false)).toEqual(1);
    });
    it('getMaxColumns -> 2', () => {
      const size = {
        width: 336,
        height: 200,
        dimensionCount: 4,
      };
      expect(getMaxColumns(size, false)).toEqual(2);
    });
    it('getMaxColumns with dense -> 1', () => {
      const size = {
        width: 336,
        height: 200,
        dimensionCount: 4,
      };
      expect(getMaxColumns(size, true)).toEqual(1);
    });
    it('getMaxColumns -> 2 desoute dimensionCount and height being high', () => {
      const size = {
        width: 336,
        height: 10200,
        dimensionCount: 100,
      };
      expect(getMaxColumns(size, false)).toEqual(2);
    });
    it('getMaxColumns -> 1 although size is 0', () => {
      const size = {
        width: 0,
        height: 0,
        dimensionCount: 100,
      };
      expect(getMaxColumns(size, false)).toEqual(1);
    });
    it('getMaxColumns -> 1 although size is 0', () => {
      const size = {
        width: 0,
        height: 0,
        dimensionCount: 100,
      };
      expect(getMaxColumns(size, true)).toEqual(1);
    });
  });

  describe('howManyListBoxesFit should behave', () => {
    it('howManyListBoxesFit - always expanded', () => {
      const columnSize = {
        width: 0,
        height: 78,
      } as ISize;
      const resourcesSlice: IListboxResource[] = [getResource('never')];
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(1);
      columnSize.height = 77;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(0);
    });

    it('howManyListBoxesFit - always collapsed', () => {
      const columnSize = {
        width: 0,
        height: 35,
      } as ISize;
      const resourcesSlice: IListboxResource[] = [getResource('always')];
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(1);
      columnSize.height = 34;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(0);
    });
    it('howManyListBoxesFit - auto', () => {
      const columnSize = {
        width: 0,
        height: 35,
      } as ISize;
      const resourcesSlice: IListboxResource[] = [getResource('auto')];
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(1);
      columnSize.height = 34;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(0);
    });
    it('howManyListBoxesFit - combination', () => {
      const columnSize = {
        width: 0,
        height: 162,
      } as ISize;
      const resourcesSlice: IListboxResource[] = [getResource('never'), getResource('always'), getResource('auto')];
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(3);
      columnSize.height = 161;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(2);
      columnSize.height = 119;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(1);
      columnSize.height = 120;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(2);
      columnSize.height = 77;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(0);
    });
  });

  describe('countListBoxes should count like a pro', () => {
    it('should count', () => {
      expect(countListBoxes([{ itemCount: 3 }, { itemCount: 2 }, { itemCount: 3 }, { itemCount: 0 }])).toEqual(8);
    });
    it('should not count', () => {
      expect(countListBoxes([])).toEqual(0);
    });
    it('should not throw', () => {
      expect(countListBoxes([{}])).toEqual(0);
    });
  });

  describe('doAllFit', () => {
    it('should count like a pro', () => {
      expect(doAllFit(2, 2, 4)).toEqual(true);
      expect(doAllFit(2, 2, 5)).toEqual(false);
      expect(doAllFit(0, 2, 0)).toEqual(true);
    });
  });

  describe('getExpandedHeightLimit', () => {
    it('should be 0 when alwaysExpanded', () => {
      expect(getExpandedHeightLimit({ alwaysExpanded: true } as ExpandProps)).toEqual(0);
      expect(getExpandedHeightLimit({ alwaysExpanded: true, hasHeader: true } as ExpandProps)).toEqual(0);
    });
    it('should be 0 when isSingleGridLayout', () => {
      expect(getExpandedHeightLimit({ isSingleGridLayout: true } as ExpandProps)).toEqual(0);
    });
    it('should account for header in isSingleGridLayout', () => {
      expect(getExpandedHeightLimit({ isSingleGridLayout: true, hasHeader: true } as ExpandProps)).toEqual(80);
    });
    it('should return default value', () => {
      expect(getExpandedHeightLimit({} as ExpandProps)).toEqual(90);
    });
  });

  describe('getListBoxMaxHeight', () => {
    it('should calculate like a pro', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: false,
      } as IListboxResource)).toEqual(135);
    });
    it('should calculate like a pro with dense', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: true,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: false,
      } as IListboxResource)).toEqual(108);
    });
    it('should account for no header', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: false,
        neverExpanded: false,
        alwaysExpanded: false,
      } as IListboxResource)).toEqual(87);
    });
    it('should account for alwaysExpanded', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: true,
      } as IListboxResource)).toEqual(135);
    });
    it('should account for neverExpanded', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: true,
        neverExpanded: true,
        alwaysExpanded: false,
        layout: {
          layoutOptions: {
            collapseMode: 'always',
          },
        },
      } as IListboxResource)).toEqual(34);
    });
    it('should return 0 when cardinal is 0 and no header', () => {
      expect(getListBoxMaxHeight({
        cardinal: 0,
        dense: false,
        hasHeader: false,
        neverExpanded: false,
        alwaysExpanded: false,
        layout: {
          layoutOptions: {
            collapseMode: 'auto',
          },
        },
      } as IListboxResource)).toEqual(0);
    });
    it('should account for header when cardinal is 0', () => {
      expect(getListBoxMaxHeight({
        cardinal: 0,
        dense: false,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: false,
        layout: {
          layoutOptions: {
            collapseMode: 'auto',
          },
        },
      } as IListboxResource)).toEqual(48);
    });
  });

  describe('estimateColumnHeight', () => {
    it('should estimate like a wizard', () => {
      expect(estimateColumnHeight({
        items: [
          getResource('auto'),
          getResource('always'),
          getResource('never'),
        ],
      })).toEqual(171);
    });

    it('should only count the padding', () => {
      expect(estimateColumnHeight({
        items: [],
      })).toEqual(2);
    });
  });
});
