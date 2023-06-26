/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const pkg = require(path.resolve(__dirname, '../package.json')); // eslint-disable-line

module.exports = {
  fromJsdoc: {
    glob: ['./src/qae/object-definition.js'],
    package: path.resolve(__dirname, '../package.json'),
    api: {
      stability: 'stable',
      properties: {
        'x-qlik-visibility': 'public',
      },
      visibility: 'public',
      name: `${pkg.name}:properties`,
      version: pkg.version,
      description: 'Filter pane generic object definition',
    },
    output: {
      sort: {
        alpha: true,
      },
      file: './api-spec/spec.json',
    },
    parse: {
      types: {
        StringExpression: {},
        'EngineAPI.IGenericListProperties': {},
        'EngineAPI.IListObjectDef': {},
      },
    },
  },
};
