import { resolveBgColor, resolveBgImage } from '../../../../../../hooks/styling-utils';
import { getFontSizes, getRange, parseFontWeight } from '../font-utils';

describe('font-utils', () => {
  describe('getRange', () => {
    it('should return a range from 0 to 2', () => {
      expect(getRange(0, 3)).toEqual([0, 1, 2]);
    });
    it('should return a range from -2 to 2', () => {
      expect(getRange(-2, 3)).toEqual([-2, -1, 0, 1, 2]);
    });

    it('should return a range from -5 to -3', () => {
      expect(getRange(-5, -2)).toEqual([-5, -4, -3]);
    });
  });

  describe('getFontSizes', () => {
    let theme;

    beforeEach(() => {
      theme = {
        getStyle: () => undefined,
      };
    });

    it('should return font sizes between 10px-12px and defaultFontSize inserted', () => {
      const fontSizes = getFontSizes({
        min: 10, max: 12, theme, defaultFontSize: '14px',
      });
      expect(fontSizes).toEqual([
        {
          value: 'header1', label: 'Theme font sizes', metaText: 'Theme', groupHeader: true,
        },
        {
          value: '14px', label: '14px', groupHeader: false, disabled: false,
        },
        {
          value: 'header2', label: 'All font sizes', metaText: 'Default', groupHeader: true,
        },
        {
          value: '10px', label: '10px', groupHeader: false, disabled: false,
        },
        {
          value: '11px', label: '11px', groupHeader: false, disabled: false,
        },
        {
          value: '12px', label: '12px', groupHeader: false, disabled: false,
        }]);
    });
  });

  describe('parseFontWeight', () => {
    it('should parse like pro', () => {
      expect(parseFontWeight('')).toEqual(undefined);
      expect(parseFontWeight('700')).toEqual(700);
      expect(parseFontWeight(700)).toEqual(700);
      expect(parseFontWeight(' bold ')).toEqual('bold');
      expect(parseFontWeight('bold')).toEqual('bold');
      expect(parseFontWeight(' normal ')).toEqual('normal');
      expect(parseFontWeight('normal')).toEqual('normal');
      expect(parseFontWeight('0')).toEqual(0);
      expect(parseFontWeight(0)).toEqual(0);
      const s = Symbol('s');
      expect(parseFontWeight(s)).toEqual(undefined, 'and should not throw');
    });
  });

  describe('resolveBgImage', () => {
    let bgComp;
    let app;

    beforeEach(() => {
      bgComp = {
        bgImage: {
          mode: 'media',
          position: 'bottom-left',
          sizing: 'stretchFit',
          mediaUrl: {
            qStaticContentUrl: {
              qUrl: '../some-pic.png',
            },
          },
        },
      };
      app = {
        session: {
          config: {
            url: 'wss://heyhey.com',
          },
        },
      };
    });

    it('should resolve bg image like a pro', () => {
      expect(resolveBgImage(bgComp, app)).toEqual({ pos: 'bottom left', size: '100% 100%', url: 'https://heyhey.com../some-pic.png' });
    });
    it('should use fallbacks for pos and size', () => {
      delete bgComp.bgImage.position;
      delete bgComp.bgImage.sizing;
      expect(resolveBgImage(bgComp, app)).toEqual({ pos: 'center center', size: 'auto auto', url: 'https://heyhey.com../some-pic.png' });
    });
  });

  describe('resolveBgColor', () => {
    let stardustTheme;
    let themeOverrides;

    beforeEach(() => {
      stardustTheme = {
        validateColor: (expr) => `validated-${expr}`,
        getColorPickerColor: (colorObj) => `resolved-${colorObj?.color}`,
      };
      themeOverrides = {
        background: {
          useExpression: false,
          colorExpression: 'argb(255, 255, 100, 100)',
          color: {
            index: -1,
            color: 'rgb(255, 100, 100)',
          },
        },
      };
    });

    it('should resolve background color like a pro when using an expression', () => {
      themeOverrides.background.useExpression = true;
      expect(resolveBgColor({ stardustTheme, themeOverrides })).toEqual('validated-argb(255, 255, 100, 100)');
    });
    it('should resolve background color like a pro when using a color picker color', () => {
      themeOverrides.background.useExpression = false;
      expect(resolveBgColor({ stardustTheme, themeOverrides })).toEqual('resolved-rgb(255, 100, 100)');
    });
    it('should return undefined when there is no valid component color provided', () => {
      themeOverrides.background.useExpression = true;
      delete themeOverrides.background.colorExpression;
      delete themeOverrides.background.color;
      expect(resolveBgColor({ stardustTheme, themeOverrides })).toEqual(undefined);

      themeOverrides.background.useExpression = false;
      expect(resolveBgColor({ stardustTheme, themeOverrides })).toEqual(undefined);
    });
  });
});
