import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './config/orm';
import { RepoModule } from './modules/repo/repo.module';
import { UserResolver } from './resolvers/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageResolver } from './resolvers/message.resolver';

const graphQLImports = [UserResolver, MessageResolver];
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      subscriptions: {
        keepAlive: Infinity,
      },
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
