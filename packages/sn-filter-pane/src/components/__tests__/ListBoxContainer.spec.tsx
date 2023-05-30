// @ts-nocheck
import React from 'react';
import {
  act, waitFor, render,
} from '@testing-library/react';
import ListboxContainer from '../ListboxContainer';
import * as useDirectQuery from '../../hooks/direct-query/use-direct-query';

let stores;
let layout;
let model;
let borderBottom;
let handleActive;
let closePopover;
let isPopover;
let renderFunc;
let renderResponse;
let listboxInstance;

describe('ListboxContainer', () => {
  beforeAll(() => {
    listboxInstance = {
      mount: jest.fn().mockResolvedValue({}),
      unmount: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn(),
    };
    stores = {
      store: {
        getState: jest.fn(() => ({
          embed: {
            field: jest.fn().mockResolvedValue(listboxInstance),
          },
          constraints: {},
          options: {},
          renderTracker: {
            renderedCallback: jest.fn(),
          },
          env: {
            sense: true,
          },
          stardustTheme: {
            getStyle: () => 'yes',
          },
        })),
      },
    };
    jest.spyOn(useDirectQuery, 'default').mockReturnValue({ __DO_NOT_USE__: { showGray: true } });
  });
  afterEach(() => {
    renderResponse?.unmount?.();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    layout = {
      qInfo: {
        qId: '1234',
      },
      title: 'title',
      qStateName: 'qStateName',
    };
    model = {};
    borderBottom = true;
    handleActive = jest.fn();
    closePopover = jest.fn();
    isPopover = false;
    renderFunc = async () => {
      await act(async () => {
        // @ts-ignore:next-line  // disable lint to prevent having to mock the entire layout object
        renderResponse = render(<ListboxContainer layout={layout} model={model} borderBottom={borderBottom} disableSearch={false} handleActive={handleActive} stores={stores} closePopover={closePopover} isPopover={isPopover} />);
      });
    };
  });

  it('should render without errors', async () => {
    await renderFunc();
    await waitFor(() => {
      expect(listboxInstance.mount).toHaveBeenCalledTimes(1);
    });
    const argOptions = listboxInstance.mount.mock.calls[0][1];
    expect(argOptions).toMatchObject({
      __DO_NOT_USE__: {
        showGray: true,
      },
      direction: undefined,
      isPopover: false,
      search: 'toggle',
    });
    // eslint-disable-next-line no-underscore-dangle
    expect(argOptions.__DO_NOT_USE__.selectDisabled()).toEqual(false);
    expect(listboxInstance.on).toHaveBeenCalledTimes(2);

    expect(handleActive).toHaveBeenCalledTimes(0);
    const handleActivateArg = listboxInstance.on.mock.calls[0][1];
    await act(() => {
      handleActivateArg();
    });
    expect(handleActive).toHaveBeenCalledTimes(1);

    const closePopoverArg = listboxInstance.on.mock.calls[1][1];
    expect(closePopover).toHaveBeenCalledTimes(0);
    await act(async () => {
      await closePopoverArg();
    });
    expect(closePopover).toHaveBeenCalledTimes(1);

    expect(listboxInstance.removeListener).not.toHaveBeenCalled();
    await renderResponse.unmount();
    expect(listboxInstance.removeListener).toHaveBeenCalledTimes(2);
  });
});
