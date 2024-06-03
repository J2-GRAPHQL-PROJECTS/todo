import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto';
import { StatusTodos } from './dto/args/status-todos.args';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'todo 1',
      done: false,
    },
    {
      id: 2,
      description: 'todo 2',
      done: false,
    },
    {
      id: 3,
      description: 'todo 2',
      done: false,
    },
    {
      id: 4,
      description: 'todo 4',
      done: true,
    },
    {
      id: 5,
      description: 'todo 5',
      done: true,
    },
    {
      id: 6,
      description: 'todo 6',
      done: true,
    },
  ];
  get totalTodos() {
    return this.todos.length;
  }
  get completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }
  get pendingTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }
  findAll(statusTodos: StatusTodos): Todo[] {
    if (statusTodos.status !== undefined) {
      return this.todos.filter((todo) => todo.done === statusTodos.status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with ${id} not found`);
    return todo;
  }
  createTodo(createTodoInput: CreateTodoInput): Todo {
    const id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    const todo = new Todo();
    todo.id = id;
    todo.description = createTodoInput.description;
    todo.done = false;

    // this.todos.push({
    //   id,
    //   description: createTodoInput.description,
    //   done: false,
    // });

    //return this.todos[this.todos.length - 1];
    this.todos.push(todo);
    return todo;
  }
  updateTodo(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    //Si no se encuentra el findOne Lanza la excepcion
    const todoToUpdate = this.findOne(id);
    //Si viene description
    //Si no vienen datos en el DTo la info en el todo se mantiene
    if (description) todoToUpdate.description = description;
    //EL done lo tenemos que evaluar contra undefined porque es un valor opcional y si viene el dato puede venir true o false
    if (done !== undefined) todoToUpdate.done = done;
    this.todos = this.todos.map((todo) => {
      if (todo.id === updateTodoInput.id) {
        return todoToUpdate;
      } else {
        return todo;
      }
    });
    return todoToUpdate;
  }
  removeTodo(id: number): boolean {
    //Si no se encuentra el findOne Lanza la excepcion
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
