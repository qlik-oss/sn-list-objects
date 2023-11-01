import * as stars from '@nebula.js/stardust';
import { IComponent, IThemeComponent } from '../types/components';
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
      backgroundColor: 'object//filterpane.backgroundColor',
      listbox: {
        backgroundColor: 'object.listBox//backgroundColor',
        color: 'object.listBox/title.main/color',
      },
      popover: {
        backgroundColor: 'object//filterpane.backgroundColor',
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
        },
      },
    ];
    const styles = useStyling({ components });
    expect(styles).toMatchObject({
      backgroundColor: 'object//filterpane.backgroundColor',
      listbox: {
        backgroundColor: 'object.listBox//backgroundColor',
        color: 'ComponentHeader',
      },
      popover: {
        backgroundColor: 'object//filterpane.backgroundColor',
      },
      header: {
        color: 'ComponentHeader',
        fontSize: 'ComponentPx',
        fontFamily: 'object.listBox/title.main/fontFamily',
        fontWeight: 'object.listBox/title.main/fontWeight',
      },
    });
  });
});
