import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
//!Decorator that marks a class as a GraphQL input type.
@InputType()
export class CreateTodoInput {
  //! Decorator is used to mark a specific class property as a GraphQL field. Only properties decorated with this decorator will be defined in the schema.

  @Field(() => String, { description: 'What needs to be done' })
  //! Lo decoramos con class-validator y class-transformer
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description: string;
}
