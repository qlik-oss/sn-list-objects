import { act, renderHook } from '@testing-library/react';
import useDelayedHover from '../use-delayed-hover';

let elementsFromPointMock: (x: number, y: number) => Element[];
let onMouseMoveListener: (e: { clientX: number, clientY: number }) => void;
const globalAddEventListener = global.document.addEventListener;

describe('useDelayedHover', () => {
  const containerRef = {
    current: global.document.createElement('div'),
  };

  elementsFromPointMock = jest.fn().mockReturnValue([
    containerRef.current,
  ]);

  const mockedAddEventListener = ((type: string, listener: (e: { clientX: number, clientY: number }) => void) => {
    type;
    onMouseMoveListener = listener;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    global.document.elementsFromPoint = elementsFromPointMock;
    global.document.addEventListener = mockedAddEventListener as any;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    global.document.addEventListener = globalAddEventListener;
  });

  it('should delay hover when mouse is positioned over element', async () => {
    const { result } = renderHook(() => useDelayedHover({ containerRef }));
    const { onMouseEnter, onMouseLeave } = result.current;

    expect(typeof onMouseEnter).toBe('function');
    expect(typeof onMouseLeave).toBe('function');
    expect(result.current.delayedIsHovering).toBe(false);
    act(() => onMouseMoveListener({ clientX: 0, clientY: 0 }));
    act(() => onMouseEnter());
    act(() => onMouseLeave());
    act(() => jest.advanceTimersByTime(100));
    expect(result.current.delayedIsHovering).toBe(true);
    act(() => jest.advanceTimersByTime(300));
    expect(result.current.delayedIsHovering).toBe(false);
  });
});
