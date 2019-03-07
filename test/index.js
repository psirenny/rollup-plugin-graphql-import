// @flow

import test from 'ava';
import { basename as pathBasename } from 'path';
import { rollup } from 'rollup';
import expectedCode from './fixtures/output/code';
import expectedMap from './fixtures/output/map';
import expectedWatchFileNames from './fixtures/output/watch-file-names';
import plugin from '../src';

const graphqlFilePath = require.resolve('./fixtures/input');

test('default options', async (t) => {
  const { generate, watchFiles } = await rollup({
    input: graphqlFilePath,
    plugins: [plugin()],
  });

  const watchFileNames = watchFiles.sort().map(
    path => pathBasename(path),
  );

  const { output } = await generate({
    format: 'esm',
    sourceMap: true,
  });

  const { code, map } = output[0];

  t.deepEqual(watchFileNames, expectedWatchFileNames);
  t.is(code, expectedCode);
  t.is(map, expectedMap);
});

test('with includes option', async (t) => {
  const build = await rollup({
    input: graphqlFilePath,
    plugins: [plugin({ include: '**/*.graphql' })],
  });

  const { output } = await build.generate({
    format: 'esm',
    sourceMap: true,
  });

  const { code, map } = output[0];

  t.is(code, expectedCode);
  t.is(map, expectedMap);
});
