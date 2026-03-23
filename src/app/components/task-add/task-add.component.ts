import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.services';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-add.component.html'
})
export class TaskAddComponent {
  showSuccess = false;
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium'
  };

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(): void {
    this.taskService.addTask({ ...this.newTask });
    
    this.showSuccess = true;
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 1500);
  }
}