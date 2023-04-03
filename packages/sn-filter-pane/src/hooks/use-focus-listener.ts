import { stardust } from '@nebula.js/stardust';
import { useEffect } from 'react';

const isFocusInsideFilterpane = (evt: FocusEvent) => (evt.currentTarget as HTMLElement)?.querySelector('.listbox-container,.listbox-popover-container');

const handleFocusoutEvent = (
  evt: FocusEvent,
  keyboard: stardust.Keyboard | undefined,
) => {
  // TODO: check for detached toolbar
  if (keyboard?.enabled && !isFocusInsideFilterpane(evt)) {
    // @ts-ignore
    keyboard.blur?.(false);
  }
};

const useFocusListener = (
  filterpaneWrapperRef: React.MutableRefObject<HTMLDivElement | undefined>,
  keyboard: stardust.Keyboard | undefined,
) => {
  useEffect(() => {
    const memoedWrapper = filterpaneWrapperRef.current;
    if (!memoedWrapper) return undefined;

    const focusOutCallback = (evt: FocusEvent) => handleFocusoutEvent(evt, keyboard);
    memoedWrapper.addEventListener('focusout', focusOutCallback);

    return () => {
      memoedWrapper.removeEventListener('focusout', focusOutCallback);
    };
  }, [filterpaneWrapperRef, keyboard]);
};

export default useFocusListener;
