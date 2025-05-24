import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user.module';


@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      typePaths: [join(__dirname, '**/*.graphql')],
      installSubscriptionHandlers: true,
      playground: true,
      // playground and other config here
      // e.g. context for auth, cors, etc
    }),
  ],
})
export class AppModule {}
