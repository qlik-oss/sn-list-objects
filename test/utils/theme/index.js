import themeGlobal from './theme-global.json';
import themeScoped from './theme-scoped.json';
import themeTarallo from './theme-tarallo.json';

export default [
  {
    id: 'senseish',
    theme: { fontFamily: 'Arial' },
  },
  {
    id: 'terribleTheme',
    theme: {
      object: {
        listBox: {
          backgroundColor: 'gray',
          title: {
            main: {
              color: 'lightGreen',
              fontFamily: '"Source Sans Pro"',
              fontWeight: 100,
              fontSize: '20px',
            }
          }
        },
      },
    },
  },
  {
    id: 'theme-global',
    theme: themeGlobal,
  },
  {
    id: 'theme-scoped',
    theme: themeScoped,
  },
  {
    id: 'theme-tarallo',
    theme: themeTarallo,
  },
];
