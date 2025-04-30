import {  MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
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
})
export class AddtodoComponent {
  todoText = '';
  todoendDate=new Date();
  todopriority:'low'|'med'|'high' ='low';
  isaddtodoshown=false;

   constructor(private todoservice: TodomanagerService, private MatDialogref: MatDialogRef<AddtodoComponent>){
  }

  addtodo(){
    if(this.todoText.trim()==''){
      alert('Add Some Todo');
      return
    }
    else if (this.todoendDate< new Date()){
      alert(' Choose a future Date');
      return;
    }
    const newtodo:Todomodal = {
      id: new Date(),
      val: this.todoText,
      date: new Date(),
      enddate: this.todoendDate,
      done: false,
      priority: this.todopriority,
      createdAt: new Date(),
      completedAt: undefined
    }
    this.todoText=''
    this.todoendDate=new Date();
    this.todopriority='low'
    this.todoservice.addtodo(newtodo);

  }

  cancel(){
    //close the dialog
    this.MatDialogref.close();
  }
}
