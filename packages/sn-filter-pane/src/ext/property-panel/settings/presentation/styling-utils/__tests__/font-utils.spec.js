import { getFontSizes, getRange } from '../font-utils';

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
});
