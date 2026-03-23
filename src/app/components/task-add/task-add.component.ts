import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.services';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-add.component.html'
})
export class TaskAddComponent {
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium'
  };

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit() {
    if (this.newTask.title && this.newTask.dueDate) {
      this.taskService.addTask(this.newTask);
      alert('Task added successfully!');
      this.router.navigate(['/tasks']); // Navigate back to list
    } else {
      alert('Please fill in the required fields (Title and Due Date).');
    }
  }
}