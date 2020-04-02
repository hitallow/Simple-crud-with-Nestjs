import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './config/orm';
import { MessageGraphQLModule } from './modules/messageGraphQL/message-graphQL.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageRestModule } from './modules/messageRest/message-rest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MessageGraphQLModule,
    MessageRestModule,
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
