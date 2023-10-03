import { ISize } from '../../ListboxGrid/interfaces';
import POPOVER_CONTAINER_PADDING from '../../FoldedListbox/constants';
import getSizes from '../get-sizes';
import { COLLAPSED_HEIGHT } from '../../ListboxGrid/grid-constants';

describe('getSizes', () => {
  it.only('should return correct sizes for narrow-small container', () => {
    const containerSize = {
      height: 16,
    };

    const sizes = getSizes(containerSize as ISize, false);

    expect(sizes.gridHeight).toBe(containerSize.height - POPOVER_CONTAINER_PADDING - 1);
    expect(sizes.narrowSmall).toBe(true);
    expect(sizes.narrowLarge).toBe(false);
  });

  it('should return correct sizes for narrow-large container', () => {
    const containerSize = {
      height: 24,
    };

    const sizes = getSizes(containerSize as ISize, false);

    expect(sizes.gridHeight).toBe(containerSize.height - POPOVER_CONTAINER_PADDING - 1);
    expect(sizes.narrowSmall).toBe(false);
    expect(sizes.narrowLarge).toBe(true);
  });

  it('should return false for non-narrow container', () => {
    const containerSize = {
      height: 25,
    };

    const sizes = getSizes(containerSize as ISize, false);

    expect(sizes.narrowSmall).toBe(false);
    expect(sizes.narrowLarge).toBe(false);
  });

  it.only('should return collapsed height when isInPopover is true, even in narrow container', () => {
    const containerSize = {
      height: 20,
    };

    const sizes = getSizes(containerSize as ISize, true);

    expect(sizes.gridHeight).toBe(COLLAPSED_HEIGHT);
    expect(sizes.narrowSmall).toBe(false);
    expect(sizes.narrowLarge).toBe(false);
  });
});
