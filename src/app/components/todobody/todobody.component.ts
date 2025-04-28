import { Component } from '@angular/core';
import { TodolistComponent } from "../todolist/todolist.component";
import { TodostatsComponent } from "../todostats/todostats.component";
@Component({
  selector: 'app-todobody',
  imports: [ TodolistComponent, TodostatsComponent],
  templateUrl: './todobody.component.html',
  styleUrl: './todobody.component.scss'
})
export class TodobodyComponent {


  }





