import { embed } from '@nebula.js/stardust';
// @ts-ignore
import filterpane from '@nebula.js/sn-filter-pane';

const n = embed.createConfiguration({
  context: {
    theme: 'light',
    language: 'en-US',
    constraints: {
      active: false, // do not allow interactions
    },
  },
  types: [
    {
      name: 'filterpane',
      load: () => Promise.resolve(filterpane),
    },
  ],
});

export default n;
