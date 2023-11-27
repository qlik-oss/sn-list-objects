import { IListLayout, IListboxResource } from '../../../hooks/types';
import {
  countListBoxes, doAllFit, estimateColumnHeight, getColumnWidth, getExpandedHeightLimit, getItemWidth, getListBoxMaxHeight, getListBoxMinHeight, getMaxColumns, howManyListBoxesFit,
} from '../distribute-resources-counting';
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
      expect(getListBoxMinHeight(resource)).toEqual(29);
    });
    it('hasHeader: false, collapse: never, dense: true', () => {
      const resource = { hasHeader: false, layout: { layoutOptions: { collapseMode: 'never', dense: true } } } as IListboxResource;
      expect(getListBoxMinHeight(resource)).toEqual(20);
    });

    describe('asCollapsed == true should always return collapsed height', () => {
      it('hasHeader: true, collapse: never, dense: false', () => {
        const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'never', dense: false } } } as IListboxResource;
        expect(getListBoxMinHeight(resource, false, true)).toEqual(34);
      });
      it('hasHeader: true, collapse: never, dense: true', () => {
        const resource = { hasHeader: true, layout: { layoutOptions: { collapseMode: 'never', dense: true } } } as IListboxResource;
        expect(getListBoxMinHeight(resource, false, true)).toEqual(34);
      });
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
      columnSize.height = 34;
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
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(3);
      columnSize.height = 77;
      expect(howManyListBoxesFit(columnSize, resourcesSlice)).toEqual(2);
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

  describe('getColumnWidth', () => {
    it('should calculate column width like a pro', () => {
      expect(getColumnWidth(100, 2)).toEqual(46);
      expect(getColumnWidth(100, 12)).toEqual(1);
      expect(getColumnWidth(100, 100)).toEqual(0);
      expect(getColumnWidth(100, 0)).toEqual(100);
      expect(getColumnWidth(NaN, NaN)).toEqual(NaN);
    });
  });

  describe('getItemWidth', () => {
    let layout = {} as IListLayout;

    beforeEach(() => {
      layout = {
        checkboxes: false,
        qListObject: {
          frequencyEnabled: false,
          qDimensionInfo: {
            qApprMaxGlyphCount: 7,
          },
        },
      } as IListLayout;
    });

    it('with frequencyEnabled', () => {
      layout.qListObject.frequencyEnabled = true;
      expect(getItemWidth(layout)).toEqual(108);
    });
    it('no frequencyEnabled', () => {
      expect(getItemWidth(layout)).toEqual(63);
    });
    it('with checkboxes', () => {
      layout.checkboxes = true;
      expect(getItemWidth(layout)).toEqual(83);
    });
    it('should be limited to min width', () => {
      layout.qListObject.qDimensionInfo.qApprMaxGlyphCount = 0;
      expect(getItemWidth(layout)).toEqual(56);
    });
    it('should be limited to max width', () => {
      layout.qListObject.qDimensionInfo.qApprMaxGlyphCount = 100;
      expect(getItemWidth(layout)).toEqual(150);
    });
  });

  describe('getListBoxMaxHeight', () => {
    const width = 300;
    it('should calculate like a pro', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: false,
      } as IListboxResource, width)).toEqual(135);
    });
    it('should calculate like a pro with dense', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: true,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: false,
      } as IListboxResource, width)).toEqual(108);
    });
    it('should account for no header', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: false,
        neverExpanded: false,
        alwaysExpanded: false,
      } as IListboxResource, width)).toEqual(87);
    });
    it('should account for alwaysExpanded', () => {
      expect(getListBoxMaxHeight({
        cardinal: 3,
        dense: false,
        hasHeader: true,
        neverExpanded: false,
        alwaysExpanded: true,
      } as IListboxResource, width)).toEqual(135);
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
      } as IListboxResource, width)).toEqual(34);
    });
    it('cardinal is 0 and no header should still estimate based on 1 row', () => {
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
      } as IListboxResource, width)).toEqual(29);
    });
    it('should account for header and one row although cardinal is 0', () => {
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
      } as IListboxResource, width)).toEqual(77);
    });
  });

  describe('estimateColumnHeight', () => {
    const width = 300;
    it('should estimate like a wizard', () => {
      expect(estimateColumnHeight({
        items: [
          getResource('auto'),
          getResource('always'),
          getResource('never'),
        ],
      }, width)).toEqual(171);
    });

    it('should only count the padding', () => {
      expect(estimateColumnHeight({
        items: [],
      }, width)).toEqual(2);
    });
  });
});
