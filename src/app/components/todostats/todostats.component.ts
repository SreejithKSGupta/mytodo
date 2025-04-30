import { Component, effect, signal } from '@angular/core';
import { TodomanagerService } from '../../services/todomanager.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Todomodal } from '../../modals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-todostats',
  imports: [
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
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
  ],
  templateUrl: './todostats.component.html',
  styleUrl: './todostats.component.scss'
})
export class TodostatsComponent {
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
  ) {


    effect(() => {
      const allTodos = todoservice.todolist();

      this.notdonetodolist = allTodos.filter((item) => !item.done);
      this.donetodolist = allTodos.filter((item) => item.done);
      // this.applyFilters();

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

  // applyFilters() {
  //   this.filteredPendingTodos = this.notdonetodolist.filter(todo => {
  //     // Apply priority filter
  //     const priorityMatch = this.selectedPriority === 'all' || todo.priority === this.selectedPriority;

  //   });
  // }





  // filterByPriority(priority: string) {
  //   this.selectedPriority = priority;
  //   // this.applyFilters();
  // }


}
