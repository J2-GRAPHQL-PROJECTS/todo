import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
//!Decorator that marks a class as a resolver arguments type.
@ArgsType()
export class StatusTodos {
  @Field(() => Boolean, {
    description: 'value of field done',
    nullable: true,
    //name: 'statusTodo',
  })
  //! Lo decoramos con class-validator y class-transformer
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
