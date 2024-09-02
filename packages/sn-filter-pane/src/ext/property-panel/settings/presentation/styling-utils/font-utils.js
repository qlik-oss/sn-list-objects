const fontSizesToValueLabel = (size) => ({
  value: size,
  label: size,
  groupHeader: false,
  disabled: false,
});

/**
 * Imitating the well-known range() function in Python:
 *  - min value is included, max value is excluded
 *
 *
 * @param {Number} min Starting value (integer) of the range
 * @param {Number} max Ending value (integer) of the range
 * @returns {Number[]} An array containing integers in order, starting with the min value
 *   and iteratively adding step size (=1) until reaching the max value (max is excluded).
 * @example const range = getRange(0, 4); // -> [0, 1, 2, 3]
 */
export function getRange(min, max) {
  const stepSize = 1;
  const delta = Math.round((max - min) / stepSize);
  let oldVal;
  const out = new Array(delta).fill(0).map(() => {
    const newVal = oldVal === undefined ? min : oldVal + stepSize;
    oldVal = newVal;
    return newVal;
  });
  return out;
}

// TODO Move and make generic so that other chart can also use it
export function getFontSizes({ min = 10, max = 24, theme, defaultFontSize }) {
  const standardFontSizes = getRange(min, max + 1).map((v) => `${v}px`);
  const fromTheme = theme?.getStyle('', '', 'fontSizes') || [];
  const customFontSizes = [...new Set([defaultFontSize, ...fromTheme])];

  const fontSizesWithHeaders = [
    {
      value: 'header1',
      label: 'Theme font sizes',
      metaText: 'Theme',
      groupHeader: true,
    },
    ...customFontSizes.map(fontSizesToValueLabel),
    {
      value: 'header2',
      label: 'All font sizes',
      metaText: 'Default',
      groupHeader: true,
    },
    ...standardFontSizes.map(fontSizesToValueLabel),
  ];

  return fontSizesWithHeaders;
}

const isNumber = (n) => typeof n === 'number' && !Number.isNaN(n);

export function parseFontWeight(theValue) {
  const SUPPORTED_FONT_WEIGHT_STRINGS = ['normal', 'bold'];

  const value = theValue?.trim?.() ?? theValue;
  let v;
  try {
    v = Number.parseInt(value, 10);
  } catch (_) {
    // do nothing
  }
  if (isNumber(v)) {
    return v; // let the browser handle the rest of the validation
  }
  if (SUPPORTED_FONT_WEIGHT_STRINGS.includes(value)) {
    return value;
  }
  return undefined;
}
