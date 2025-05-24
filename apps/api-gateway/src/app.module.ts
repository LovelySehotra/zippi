import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        // IMPORTANT: Playground is deprecated in Apollo Server 4.
        // Instead use the new Apollo Sandbox explorer:
        // Enable it by default in playground mode, or explicitly enable via "plugins"
  
        // To enable the new Apollo Sandbox UI:
        // See https://www.apollographql.com/docs/apollo-server/api/plugin/landing-page/
        playground: false,  // disable old playground
        autoSchemaFile: join(process.cwd(), 'apps/gateway/src/schema.gql'),
        // Optionally expose the new Apollo Sandbox landing page:
        plugins: [
          require('apollo-server-core').ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
        // You can set the graphql path explicitly, default is /graphql
        path: '/graphql',
      }),
    // TODO: Import any shared GraphQL modules or resolvers from libs/common or user proxy
  ],
})
export class AppModule {}
