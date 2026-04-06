import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.services';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {
  task!: Task; 

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const existingTask = this.taskService.getTaskById(id);

    if (existingTask) {

      this.task = { ...existingTask };
    } else {
      alert('Task not found');
      this.router.navigate(['/tasks']);
    }
  }

  onUpdate(): void {
    this.taskService.updateTask(this.task);
    alert('Task updated successfully!');
  
    this.router.navigate(['/tasks', this.task.id, 'info']);
  }
}