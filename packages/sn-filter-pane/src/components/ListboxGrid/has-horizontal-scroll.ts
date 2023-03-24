const hasHorizontalScroll = (
  gridRef: React.MutableRefObject<HTMLDivElement | undefined>,
  lastKnownScrollState: boolean,
  setLastKnownScrollState: (newState: boolean) => void,
) => {
  const listboxElement = gridRef?.current?.querySelector?.('.listbox-container');
  if (listboxElement) {
    const scrollElement = listboxElement.querySelector('.ListBox-styledScrollbars') as HTMLElement;
    const clientHeight = scrollElement?.clientHeight ?? 0;
    const offsetHeight = scrollElement?.offsetHeight ?? 0;
    const hasScrollBar = clientHeight < offsetHeight;
    setLastKnownScrollState(hasScrollBar);
    return hasScrollBar;
  }
  // Use last known state when listbox is collapsed
  return lastKnownScrollState;
};

export default hasHorizontalScroll;
