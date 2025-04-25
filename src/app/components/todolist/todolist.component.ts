import { Component, effect, signal } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

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
    FormsModule,
    ReactiveFormsModule,
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
  searchTerm = '';
  todoForm: FormGroup;

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

  // Track statistics
  stats = signal({
    totalTasks: 0,
    completedTasks: 0,
    highPriorityTasks: 0,
    upcomingDeadlines: 0,
    completionRate: 0
  });

  constructor(
    public todoservice: TodomanagerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Initialize form
    this.todoForm = this.fb.group({
      val: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['med', Validators.required],
      enddate: [new Date(), Validators.required]
    });

    // Set up reactive effect for todo lists and statistics
    effect(() => {
      const allTodos = todoservice.todolist();

      this.notdonetodolist = allTodos.filter((item) => !item.done);
      this.donetodolist = allTodos.filter((item) => item.done);
      this.applyFilters();

      // Update statistics
      this.updateStats(allTodos);
    });
  }

  updateStats(todos: Todomodal[]) {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    const totalTasks = todos.length;
    const completedTasks = todos.filter(t => t.done).length;
    const highPriorityTasks = todos.filter(t => t.priority === 'high' && !t.done).length;

    // Count tasks due in the next 7 days
    const upcomingDeadlines = todos.filter(t => {
      const taskDate = new Date(t.enddate);
      return !t.done && taskDate >= now && taskDate <= nextWeek;
    }).length;

    // Calculate completion rate as percentage
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    this.stats.set({
      totalTasks,
      completedTasks,
      highPriorityTasks,
      upcomingDeadlines,
      completionRate
    });
  }

  applyFilters() {
    this.filteredPendingTodos = this.notdonetodolist.filter(todo => {
      // Apply priority filter
      const priorityMatch = this.selectedPriority === 'all' || todo.priority === this.selectedPriority;

      // Apply search filter (case insensitive)
      const searchMatch = this.searchTerm === '' ||
        todo.val.toLowerCase().includes(this.searchTerm.toLowerCase());

      return priorityMatch && searchMatch;
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
      // Add back the deleted todo if possible
      // This assumes todoservice has a method to add a todo
      this.todoservice.addtodo(todo);
    });
  }



  clearCompleted() {
    if (this.donetodolist.length === 0) return;

    const count = this.donetodolist.length;
    this.donetodolist.forEach(todo => this.todoservice.deletetodo(todo));

    this.snackBar.open(`Cleared ${count} completed tasks`, 'Close', {
      duration: 2000
    });
  }

  filterByPriority(priority: string) {
    this.selectedPriority = priority;
    this.applyFilters();
  }

  search(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
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
