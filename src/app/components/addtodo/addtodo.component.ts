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
  todoendDate=Date.now().toLocaleString;
  todopriority ='low';
   constructor(private todoservice: TodomanagerService){

  }


  addtodo(){
    console.log("adding todo", this.todoText, this.todoendDate, this.todopriority)
    let newtodo = {
      val: this.todoText,
      date: Date.now().toString(),
      enddate:this.todoendDate,
      done:false,
      priority:this.todopriority
    }
    console.log(newtodo);
    this.todoservice.addtodo(newtodo);
  }
}
