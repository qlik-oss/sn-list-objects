import { IListLayout, IPage } from '../types';

export function canSetProperties(layout: IListLayout) {
  const yesICan = !!(
    layout
    && !layout.qHasSoftPatches
    && !layout.qExtendsId
    && (layout.qMeta?.privileges || []).indexOf('update') > -1
  );
  return yesICan;
}

/**
 * Set qHeight of each page corresponding to the number of items of that page,
 * since this is not done correctly in the backend in DQ mode (to be fixed in Engine).
 *
 */
function postProcessPages(pages: IPage[]) {
  const newPages = pages.map((page: IPage) => {
    const qArea = {
      ...page.qArea,
      qHeight: page.qMatrix.length,
    };
    return {
      ...page,
      qArea,
    };
  });
  return newPages;
}

export function getDirectQueryOptions() {
  return {
    __DO_NOT_USE__: {
      focusSearch: true,
      showGray: false,
      postProcessPages,
      calculatePagesHeight: true,
    },
  };
}
