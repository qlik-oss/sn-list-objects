import * as stars from '@nebula.js/stardust';
import { IComponent, IGeneralComponent, IThemeComponent } from '../types/components';
import useStyling from '../use-styling';

jest.mock('@nebula.js/stardust');

describe('use styling', () => {
  beforeAll(() => {
    jest.spyOn(stars, 'useTheme').mockImplementation(() => ({
      getStyle: (ns, path, prop) => `${ns}/${path}/${prop}`,
    }) as stars.stardust.Theme);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should behave without components', () => {
    const components: IComponent[] = [];
    const styles = useStyling({ components });
    expect(styles).toMatchObject({
      listbox: {
        background: {
          backgroundColor: 'object.listBox//backgroundColor',
          color: 'object.listBox//backgroundColor',
        },
      },
      popover: {
        backgroundColor: 'object.listBox//backgroundColor',
      },
      header: {
        color: 'object.listBox/title.main/color',
        fontSize: 'object.listBox/title.main/fontSize',
        fontFamily: 'object.listBox/title.main/fontFamily',
        fontWeight: 'object.listBox/title.main/fontWeight',
      },
    });
  });

  it('components should override properties', () => {
    const components: IThemeComponent[] = [
      {
        key: 'theme',
        header: {
          fontColor: {
            color: 'ComponentHeader',
          },
          fontSize: 'ComponentPx',
          fontFamily: 'ComponentFontFamily',
          fontWeight: 'ComponentFontWeight',
          fontStyle: { bold: true },
        },
      },
    ];
    const styles = useStyling({ components });
    expect(styles).toMatchObject({
      showBorder: false,
      listbox: {
        background: {
          color: 'object.listBox//backgroundColor',
          backgroundColor: 'object.listBox//backgroundColor',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
        },
        color: 'ComponentHeader',
      },
      popover: {
        backgroundColor: 'object.listBox//backgroundColor',
      },
      header: {
        color: 'ComponentHeader',
        fontSize: 'ComponentPx',
        fontFamily: 'ComponentFontFamily',
        fontWeight: 'bold',
      },
    });
  });

  it('show border if width and color exist', () => {
    const components: IGeneralComponent[] = [
      {
        key: 'general',
        borderColor: 'green',
        borderWidth: 2,
      },
    ];
    const styles = useStyling({ components });
    expect(styles.showBorder).toEqual(true);
  });

  it('always hide border if general component exists but 0 width provided', () => {
    const components: IGeneralComponent[] = [
      {
        key: 'general',
        borderColor: 'green',
        borderWidth: 0,
      },
    ];
    const styles = useStyling({ components });
    expect(styles.showBorder).toEqual(false);
  });
});
