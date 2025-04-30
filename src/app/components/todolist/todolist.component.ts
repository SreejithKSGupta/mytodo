import { Component, effect } from '@angular/core';
import { TodomanagerService } from '../../services/todomanager.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, DatePipe } from '@angular/common';
import { Todomodal } from '../../modals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    DatePipe,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],

})
export class TodolistComponent {
  notdonetodolist: Todomodal[] = [];
  donetodolist: Todomodal[] = [];
  filteredPendingTodos: Todomodal[] = [];
  selectedPriority = 'all';

  prioritycolor = {
    'low': '#4caf50',  // Green
    'med': '#ff9800',  // Yellow/Orange
    'high': '#f44336' // Red
  };

  priorityLabels = {
    'low': 'Low Priority',
    'med': 'Medium Priority',
    'high': 'High Priority'
  };


  constructor(
    public todoservice: TodomanagerService,
    private snackBar: MatSnackBar
  ) {


    effect(() => {
      const allTodos = todoservice.todolist();

      this.notdonetodolist = allTodos.filter((item) => !item.done);
      this.donetodolist = allTodos.filter((item) => item.done);
      this.applyFilters();

    });
  }



  applyFilters() {
    this.filteredPendingTodos = this.notdonetodolist.filter(todo => {
      const priorityMatch = this.selectedPriority === 'all' || todo.priority === this.selectedPriority;
      return priorityMatch ;
    });
  }

  checkitem(todo: Todomodal) {
    this.todoservice.readitem(todo);

    // Show notification
    const action = todo.done ? 'completed' : 'marked as pending';
    this.snackBar.open(`Task ${action}`, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  deletetodo(todo: Todomodal) {
    this.todoservice.deletetodo(todo);

    this.snackBar.open('Task deleted', 'Undo', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    }).onAction().subscribe(() => {
      this.todoservice.addtodo(todo);
    });
  }





  getTaskDueStatus(date: Date | string): string {
    const dueDate = new Date(date);
    const today = new Date();

    // Set time to midnight for accurate day comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'overdue';
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'tomorrow';
    if (diffDays <= 7) return 'upcoming';
    return 'future';
  }
}
