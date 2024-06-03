import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
//!Decorator that marks a class as a GraphQL input type.
@InputType()
//!No hacemos un partial type de CreateTodoInput lo que quiere decir que no heredamos los campos que vienen en CreateTodoInput
export class UpdateTodoInput {
  //! Decorator is used to mark a specific class property as a GraphQL field. Only properties decorated with this decorator will be defined in the schema.

  //*El Id en GraphQl vendra en el body
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;
  //! Para graphql es opcional
  @Field(() => String, { description: 'What needs to be done', nullable: true })
  //! Lo decoramos con class-validator y class-transformer
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  //! Para typescript es opcional
  description?: string;
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
