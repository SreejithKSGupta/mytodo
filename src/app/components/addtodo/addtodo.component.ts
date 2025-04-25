import { Component,ChangeDetectionStrategy } from '@angular/core';
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

@Component({
  selector: 'app-addtodo',
  providers: [provideNativeDateAdapter()],
  imports: [ MatDatepickerModule, MatFormFieldModule,MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './addtodo.component.html',
  styleUrl: './addtodo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddtodoComponent {
  todoText = '';
  todoendDate=new Date();
  todopriority:'low'|'med'|'high' ='low';
   constructor(private todoservice: TodomanagerService){

  }


  addtodo(){
    let newtodo:Todomodal = {
      id:new Date(),
      val: this.todoText,
      date: new Date(),
      enddate:this.todoendDate,
      done:false,
      priority:this.todopriority
    }
    this.todoservice.addtodo(newtodo);
  }
}
