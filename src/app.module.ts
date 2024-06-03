import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TodosModule } from './todos/todos.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      //!Para deshabilitar el playground
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      //!process.cwd() es la carpeta donde se esta ejecutando el proyecto
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    HelloWorldModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
