import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { IResolvers } from 'graphql-tools';
import { join } from 'path';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), { 
  loaders: [
    new GraphQLFileLoader()
  ] 
});
const mockUser = {
  id: 1,
  username: 'test_user',
  email_address: 'test@email.com'
};
const resolvers: IResolvers = {
  Query: {
    user: (_, username: string) => {
      if (!username) {
        return null;
      }
  
      return mockUser;
    }
  }
};
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const app = express();
const port = 3000;

app
  .use(
    '/graphql',
    graphqlHTTP({
      schema: schemaWithResolvers,
      graphiql: true,
    }),
  )
  .listen(port, () => console.log('Running a GraphQL API server at http://localhost:3000/graphql'));
