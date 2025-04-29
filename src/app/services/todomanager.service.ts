import {  Injectable, signal, effect } from '@angular/core';
import { Todomodal } from '../modals';

@Injectable({
  providedIn: 'root',
})
export class TodomanagerService {
  public todolist = signal<Todomodal[]>([]);


  readitem(todo: Todomodal) {
    const updatedList = this.todolist().map(item =>
      item.id === todo.id ? { ...item, done: item.done?false:true } : item
    );
    this.todolist.set(updatedList);
  }


  addtodo(todoitem: Todomodal) {
    if (typeof window !== 'undefined' && localStorage) {
      this.todolist.set([...this.todolist(), todoitem]);
    }
  }

  deletetodo(todoitem:Todomodal){
    const updatedList = this.todolist().filter(item =>item.id!=todoitem.id);
    this.todolist.set(updatedList);
  }

  constructor() {
    if (typeof window !== 'undefined' && localStorage) {
      let oldlist: Todomodal[] = JSON.parse(localStorage.getItem('todolist') ?? '[]');
      this.todolist.set(oldlist);
    }

    effect(() => {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('todolist', JSON.stringify(this.todolist()));
      }
    });
  }
}
