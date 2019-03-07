// @flow

import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginFlowEntry from 'rollup-plugin-flow-entry';

export default {
  external: [
    'fs',
    'graphql',
    'graphql-import',
    'path',
    'rollup-pluginutils',
  ],
  input: 'src/index.js',
  output: [
    { file: 'dist/cjs/index.js', format: 'cjs' },
    { file: 'dist/esm/index.js', format: 'esm' },
  ],
  plugins: [
    rollupPluginFlowEntry({ mode: 'strict-local' }),
    rollupPluginBabel({ babelHelpers: 'inline' }),
  ],
};
