import { MutableRefObject } from 'react';
import { act, waitFor, renderHook } from '@testing-library/react';
import useHandleResize from '../use-handle-resize';
import { IStore } from '../../../store';
import { IListboxResource } from '../../../hooks/types';
import { RenderTrackerService } from '../../../services/render-tracker';
import * as distResourcesMod from '../distribute-resources';
import { COLLAPSED_HEIGHT, ITEM_SPACING } from '../grid-constants';

describe('use-handle-resize', () => {
  beforeAll(() => {
    jest.spyOn(distResourcesMod, 'calculateExpandPriority').mockReturnValue({ columns: [{}, {}, {}], expandedItemsCount: 3 });
  });

  it('should return a resize handler which, upon call, returns columns and overflowingResources, calculated by other funcs', async () => {
    const resources = [{ layout: {} }, { layout: {} }, { layout: {} }] as unknown as IListboxResource[];

    const MIN_HEIGHT_TO_FIT_3_LISTBOXES = 3 * COLLAPSED_HEIGHT + 2 * ITEM_SPACING + 2;

    const gridRef = {
      current: {
        offsetWidth: 0,
        offsetHeight: MIN_HEIGHT_TO_FIT_3_LISTBOXES,
      },
    } as unknown as MutableRefObject<HTMLObjectElement>;

    const store = {
      getState: jest.fn().mockReturnValue({ heyHey: 1 }),
      setState: jest.fn(),
    } as unknown as IStore;

    const env = {
      sense: {
        isSmallDevice: () => false,
      },
    };

    const renderTracker = {
      setNumberOfListboxes: jest.fn(),
      renderedCallback: jest.fn(),
    } as unknown as RenderTrackerService;

    const { result, unmount } = renderHook(() => useHandleResize({
      resources,
      gridRef,
      store,
      env,
      renderTracker,
    }));

    const { handleResize } = result.current;

    expect(result.current.columns).toEqual([]);
    expect(result.current.overflowingResources).toEqual([]);

    await act(() => {
      handleResize();
    });

    await waitFor(() => {
      expect(result.current.columns).toHaveLength(3);
      expect(result.current.overflowingResources).toHaveLength(0);
    });

    unmount();
  });
});
