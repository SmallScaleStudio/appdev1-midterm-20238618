import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.services';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.tasks = this.taskService.getTasks();
    }
  }

  onToggle(id: number): void {
    this.taskService.toggleStatus(id);
  }

taskIdToDelete: number | null = null;


prepareDelete(id: number): void {
  this.taskIdToDelete = id;
}


confirmDelete(): void {
  if (this.taskIdToDelete !== null) {
    this.taskService.deleteTask(this.taskIdToDelete);
    this.tasks = this.taskService.getTasks(); 
    this.taskIdToDelete = null;
  }
}
}