import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    health: String
  }
`);

const root = {
  health: () => {
    return 'Server alive!';
  },
};

const app = express();
const port = 3000;

app
  .use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }),
  )
  .listen(port, () => console.log('Running a GraphQL API server at http://localhost:3000/graphql'));
