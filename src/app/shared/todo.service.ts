import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  storageListenSub : Subscription;

  todos: Todo[] = [
  ];

  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe((e:StorageEvent) => {
      console.log(e);
      if (e.key === 'todos') {
        this.loadState();
      }
    });
   }

   createTodo(text: string) {
     return new Todo(text);
   }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id == id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);

    this.saveState();
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updatedTodoFields);

    this.saveState();
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)

    if (index > 0 ) {
      this.todos.splice(index, 1);
      this.saveState();
    }


  }


  saveState(){
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {

    try {
      const notesInLocal = localStorage.getItem('todos');
      if (notesInLocal) {
        const todosInStorage = JSON.parse(notesInLocal!);

        this.todos.length = 0
        this.todos.push(...todosInStorage);
      }
    } catch (error) {
      console.log('Error retreiving todos in localstorage');
      console.log(error);
    }

  }
}
