import { Component } from '@angular/core';
import { TodomanagerService } from '../../services/todomanager.service';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-todolist',
  imports: [MatCardModule,MatCheckboxModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent {
  notdonetodolist:any;
  donetodolist:any;
  constructor(public todoservice: TodomanagerService){
    // console.log(this.todoservice.todolist())
    this.notdonetodolist = todoservice.todolist();
  }
}
