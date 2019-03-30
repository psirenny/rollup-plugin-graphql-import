// @flow strict-local

import fs from 'fs';
import { parse as parseGraphql, print as stringifyGraphql } from 'graphql';
import { importSchema, parseSDL as parseGraphqlSdl } from 'graphql-import';
import { dirname as pathDirname, join as pathJoin } from 'path';
import { createFilter as createFileFilter } from 'rollup-pluginutils';
import invariant from 'tiny-invariant';

export type Options = {|
  exclude?: ?(RegExp | RegExp[] | string | string[]),
  include?: ?(RegExp | RegExp[] | string | string[]),
|};

type RollupPluginContext = {|
  addWatchFile: (filePath: string) => void,
|};

const getGraphqlSdl = async (filePath: string) => {
  const file = await fs.promises.readFile(filePath, 'utf8');
  const root = parseGraphql(file, { noLocation: true });
  const schemaDef = root.definitions.find(def => def.kind === 'SchemaDefinition');
  invariant(schemaDef, 'Schema definition was not found');
  const schemaSdl = stringifyGraphql(schemaDef);
  const documentSdl = importSchema(filePath);
  return `${documentSdl}\n${schemaSdl}`;
};

const watchGraphqlImports = async (ctx: RollupPluginContext, filePath: string) => {
  const fileDir = pathDirname(filePath);
  const file = await fs.promises.readFile(filePath, 'utf8');
  const deps = parseGraphqlSdl(file);

  return Promise.all(deps.map((dep) => {
    const depFilePath = pathJoin(fileDir, dep.from);
    ctx.addWatchFile(depFilePath);
    return watchGraphqlImports(ctx, depFilePath);
  }));
};

function graphqlImport(opts?: ?Options) {
  const fileFilterInclude = opts?.include ?? '**/*.graphql';
  const fileFilter = createFileFilter(fileFilterInclude, opts?.exclude);

  return {
    load(id: string) {
      if (fileFilter(id)) {
        return watchGraphqlImports(this, id)
          .then(() => getGraphqlSdl(id))
          .then(sdl => ({
            code: `export default ${JSON.stringify(sdl)};`,
            map: { mappings: '' },
          }));
      }

      return null;
    },
    name: 'graphql-import',
  };
}

export default graphqlImport;
