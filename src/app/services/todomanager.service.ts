import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodomanagerService {
  public todolist = signal<string[]>([]);
  constructor() {
    if (typeof window !== 'undefined' && localStorage) {
      let oldlist = JSON.parse(localStorage.getItem('todolist') ?? '[]');
      this.todolist.set(oldlist);
    }
  }

  addtodo(todoitem: any) {
    if (typeof window !== 'undefined' && localStorage) {
      this.todolist.set([...this.todolist(), todoitem]);
      localStorage.setItem('todolist', JSON.stringify(this.todolist()));
      console.log(this.todolist());
    }
  }
}
