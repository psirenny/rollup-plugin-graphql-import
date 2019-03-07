# `rollup-plugin-graphql-import`

[![CircleCI](https://circleci.com/gh/psirenny/rollup-plugin-graphql-import/tree/master.svg?style=shield)](https://circleci.com/gh/psirenny/rollup-plugin-graphql-import/tree/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/psirenny/rollup-plugin-graphql-import.svg)](https://greenkeeper.io/)

Rollup plugin to import `*.graphql` schema definitions as `sdl` strings.
See: [`graphql-import`](https://github.com/prisma/graphql-import).

## Installation

`yarn add --dev rollup-plugin-graphql-import`

## Usage

`rollup.config.js`:

```js
// @flow

import graphqlImport from 'rollup-plugin-graphql-import';

export default {
  input: 'src/Schema.graphql',
  output: [{ file: 'dist/index.js', format: 'esm' }],
  plugins: [graphqlImport()],
};
```

## Options

### exclude

Files to exclude from the plugin.

-   Default: `undefined`
-   Type: `?(RegExp | RegExp[] | string | string[])`

### include

Files to include with the plugin.

-   Default: `'**/*.graphql'`
-   Type: `?(RegExp | RegExp[] | string | string[])`
