import { Component,ChangeDetectionStrategy, effect } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { TodomanagerService } from '../../services/todomanager.service';
import { Todomodal } from '../../modals';
import { AppservicesService } from '../../services/appservices.service';

@Component({
  selector: 'app-addtodo',
  providers: [provideNativeDateAdapter()],
  imports: [ MatDatepickerModule, MatFormFieldModule,MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './addtodo.component.html',
  styleUrl: './addtodo.component.scss',
})
export class AddtodoComponent {
  todoText = '';
  todoendDate=new Date();
  todopriority:'low'|'med'|'high' ='low';
  isaddtodoshown=false;

   constructor(private todoservice: TodomanagerService, private appservices:AppservicesService){

     effect(()=>{
      this.isaddtodoshown=appservices.isaddtodoshown();
    })
  }

  addtodo(){
    let newtodo:Todomodal = {
      id: new Date(),
      val: this.todoText,
      date: new Date(),
      enddate: this.todoendDate,
      done: false,
      priority: this.todopriority,
      createdAt: new Date(),
      completedAt: undefined
    }
    this.todoservice.addtodo(newtodo);
  }
}
