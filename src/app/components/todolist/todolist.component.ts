import { Component, effect } from '@angular/core';
import { TodomanagerService } from '../../services/todomanager.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, DatePipe } from '@angular/common';
import { Todomodal } from '../../modals';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todolist',
  imports: [MatCardModule,MatIconModule, MatCheckboxModule, DatePipe,CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  notdonetodolist: Todomodal[]|undefined;
  donetodolist: Todomodal[]|undefined;

  prioritycolor={
    'low':'green',
    'med':'yellow',
    'high':'red'
  }

  constructor(public todoservice: TodomanagerService) {

    effect(() => {
      this.notdonetodolist = todoservice
      .todolist()
      .filter((item) => !item.done);
    this.donetodolist = todoservice
      .todolist()
      .filter((item) => item.done);
    });

  }

  checkitem(todo:Todomodal){
     this.todoservice.readitem(todo)
  }

  deletetodo(todo:Todomodal){
       this.todoservice.deletetodo(todo);
  }
}
