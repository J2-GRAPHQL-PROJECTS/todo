import { Field, Int, ObjectType } from '@nestjs/graphql';

//! Con este decorador especificamos que Todo es un tipo de dato en graphql;
@ObjectType()
export class Todo {
  //! especificamos el tipo de dato que es reconocido por graphql.
  //! Decorator is used to mark a specific class property as a GraphQL field. Only properties decorated with this decorator will be defined in the schema.

  @Field(() => Int)
  id: number;
  @Field(() => String)
  description: string;
  @Field(() => Boolean)
  done: boolean;
}
