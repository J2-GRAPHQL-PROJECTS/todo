import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoInput, UpdateTodoInput, StatusTodos } from './dto';
import { AggregationsType } from './types/aggregations.type';

//! es opcional especificar que el resolver va a devolver todo lo que es relacionado a una Entity en este caso a un Todo.
@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  //Tambien se puede hacer sin Dto pero la desventaja es que no se puede usar las valiaciones de class-validator class-transformer findAll(@Args('status', { type: () => Boolean }) status: boolean): Todo[] {
  findAll(@Args() statusTodos: StatusTodos): Todo[] {
    return this.todosService.findAll(statusTodos);
  }
  @Query(() => Todo, { name: 'findTodo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.findOne(id);
  }
  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    //console.log(createTodoInput);
    return this.todosService.createTodo(createTodoInput);
  }
  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.updateTodo(updateTodoInput);
  }
  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.removeTodo(id);
  }

  //Aggregations
  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todosService.totalTodos;
  }
  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos(): number {
    return this.todosService.pendingTodos;
  }
  @Query(() => Int, { name: 'completedTodos' })
  completedTodos(): number {
    return this.todosService.completedTodos;
  }
  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.completedTodos(),
      pending: this.pendingTodos(),
      total: this.totalTodos(),
      totalCompleted: this.completedTodos(),
    };
  }
}
