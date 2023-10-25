const DEFAULT_FONT_FAMILIES = [
  'American Typewriter, serif',
  'Andalé Mono, monospace',
  'Arial Black, sans-serif',
  'Arial, sans-serif',
  'Bradley Hand, cursive',
  'Brush Script MT, cursive',
  'Comic Sans MS, cursive',
  'Courier, monospace',
  'Didot, serif',
  'Georgia, serif',
  'Impact, sans-serif',
  'Lucida Console, monospace',
  'Luminari, fantasy',
  'Monaco, monospace',
  'QlikView Sans, sans-serif',
  'Source Sans Pro, sans-serif',
  'Tahoma, sans-serif',
  'Times New Roman, serif',
  'Trebuchet MS, sans-serif',
  'Verdana, sans-serif',
];

const makeFirstLetterUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const fontFamiliesToValueLabel = (font) => ({
  value: font,
  label: makeFirstLetterUpperCase(font),
  groupHeader: false,
  disabled: false,
});

const fontSizesToValueLabel = (size) => ({
  value: size,
  label: size,
  groupHeader: false,
  disabled: false,
});

const trimAllSpaces = (str) => str
  .split(',')
  .map((item) => item.trim())
  .map((elem) => elem.replace(/\s+/g, ' ').trim())
  .filter(Boolean)
  .join(', ');

// TODO Move and make generic so that other chart can also use it
export const getFontFamilies = (theme, path) => {
  const defaultThemeFont = [theme.getStyle('object.listBox', path, 'fontFamily')];
  const themeFontFamilies = theme.getStyle('', '', 'fontFamilies');
  const fromTheme = Array.isArray(themeFontFamilies) && themeFontFamilies.length
    ? themeFontFamilies.map((element) => trimAllSpaces(element))
    : defaultThemeFont;

  const uniqueThemeFontFamilies = [...new Set([...defaultThemeFont, ...fromTheme])];
  const allFontsWithHeader = [
    {
      value: 'Header1',
      label: 'All fonts',
      metaText: 'Default',
      groupHeader: true,
    },
    ...DEFAULT_FONT_FAMILIES.map((font) => fontFamiliesToValueLabel(font)),
  ];

  const fontFamiliesWithHeader = [
    {
      value: 'header2',
      label: 'Theme fonts',
      metaText: 'Theme',
      groupHeader: true,
    },
    ...uniqueThemeFontFamilies.map((font) => fontFamiliesToValueLabel(font)),
    ...allFontsWithHeader,
  ];

  return fontFamiliesWithHeader;
};

export const getAssignedFontFamily = (theme, path, property) => {
  const assignedFontFamily = fontFamiliesToValueLabel(theme.getStyle('object.barChart', path, property)) ?? theme.getStyle('', '', property);
  return assignedFontFamily.value;
};

/**
 *
 * @param {Number} min Starting value (integer) of the range
 * @param {Number} max Ending value (integer) of the range
 * @returns {Number[]} An array containing integers in order, starting with the min value
 *   and iteratively adding step size (=1) until reaching the max value.
 */
function getRange(min, max) {
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
export function getFontSizes({
  min = 10, max = 24, theme, defaultFontSize,
}) {
  const standardFontSizes = getRange(min, max).map((v) => `${v}px`);
  const fromTheme = theme.getStyle('', '', 'fontSizes') || [];
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
