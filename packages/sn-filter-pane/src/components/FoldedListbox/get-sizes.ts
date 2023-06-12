import { COLLAPSED_HEIGHT } from '../ListboxGrid/distribute-resources';
import { ISize } from '../ListboxGrid/interfaces';
import POPOVER_CONTAINER_PADDING from '../FoldedListbox/constants';

const getSizes = (containerSize?: ISize, isInPopover?: boolean) => {
  const isNarrow = containerSize?.height !== undefined && containerSize?.height < COLLAPSED_HEIGHT + POPOVER_CONTAINER_PADDING;
  const gridHeight = isNarrow && !isInPopover
    ? containerSize.height - POPOVER_CONTAINER_PADDING - 1
    : COLLAPSED_HEIGHT;

  let narrowLarge = false;
  let narrowSmall = false;
  if (isNarrow) {
    const narrowLargeLimit = 24;
    const narrowSmallLimit = 20;
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
