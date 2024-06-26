import { ISize } from '../ListboxGrid/interfaces';
import POPOVER_CONTAINER_PADDING from '../FoldedListbox/constants';
import { COLLAPSED_HEIGHT } from '../ListboxGrid/grid-constants';

const getSizes = (containerSize?: ISize, isInPopover?: boolean) => {
  const isNarrow = containerSize?.height !== undefined
  && !isInPopover
  && containerSize?.height < COLLAPSED_HEIGHT + POPOVER_CONTAINER_PADDING;
  const gridHeight = isNarrow
    ? containerSize.height - POPOVER_CONTAINER_PADDING - 1
    : COLLAPSED_HEIGHT;

  let narrowLarge = false;
  let narrowSmall = false;
  if (isNarrow) {
    const narrowLargeLimit = 24;
    const narrowSmallLimit = 16;
    const { height } = containerSize;
    narrowLarge = height <= narrowLargeLimit && height > narrowSmallLimit;
    narrowSmall = height <= narrowSmallLimit;
  }
  return {
    gridHeight,
    narrowSmall,
    narrowLarge,
  };
};

export default getSizes;
