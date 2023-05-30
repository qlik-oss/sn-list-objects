import { stardust } from '@nebula.js/stardust';
import { useEffect } from 'react';

const isRelatedTargetListBoxPopover = (relatedTarget: HTMLElement) => (relatedTarget.closest('.listbox-popover'));

const isFocusInsideFilterpane = (evt: FocusEvent) => {
  const { currentTarget, relatedTarget } = evt;
  if (!relatedTarget) return false;
  if (!(relatedTarget instanceof HTMLElement)) return false;
  const filterPaneContainer = relatedTarget.closest('.filter-pane-container');
  if (filterPaneContainer === currentTarget) return true;
  if (isRelatedTargetListBoxPopover(relatedTarget)) return true;
  return false;
};

const handleFocusoutEvent = (
  evt: FocusEvent,
  keyboard: stardust.Keyboard | undefined,
) => {
  // TODO: check for detached toolbar
  const isFocusOut = !isFocusInsideFilterpane(evt);
  if (keyboard?.enabled && isFocusOut) {
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
