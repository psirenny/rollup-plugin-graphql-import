// @flow strict

const sdl = `type Mutation {
  setBar(id: ID!): Bar
  setFoo(id: ID!): Foo
}

type Query {
  getBar(id: ID!): Bar
  getFoo(id: ID!): Foo
}

type Bar {
  baz: Baz!
}

type Foo {
  baz: Baz!
}

type Baz {
  id: ID!
}

schema {
  mutation: Mutation
  query: Query
}`;

export default `var Schema = ${JSON.stringify(sdl)};

// @flow strict

export default Schema;
`;
