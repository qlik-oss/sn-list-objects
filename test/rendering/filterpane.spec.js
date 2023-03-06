import path from 'path';
import { TestGenerator } from '../utils';

TestGenerator.fromFixtures({
  suiteName: 'Filterpane',
  serveConfig: {
    type: 'sn-filter-pane',
    entry: path.resolve(__dirname, '../../packages/sn-filter-pane/dist/sn-filter-pane.js'),
    port: 8017,
  },
  fixturePath: path.join(__dirname, '__fixtures__'),
  styles: [
    { fixture: 'theming_global', styles: [['.njs-viz', 'background', '#272822']] },
    { fixture: 'theming_scoped', styles: [['.njs-viz', 'background', '#272822']] },
  ],
});
