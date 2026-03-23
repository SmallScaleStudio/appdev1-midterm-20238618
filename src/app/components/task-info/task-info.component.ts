import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.services';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="task" class="mt-3">
      <p><strong>Description:</strong> {{ task.description }}</p>
      <p><strong>Due Date:</strong> {{ task.dueDate | date:'fullDate' }}</p>
      <p><strong>Priority:</strong> {{ task.priority }}</p>
      <p><strong>Status:</strong> {{ task.status }}</p>
    </div>
  `
})
export class TaskInfoComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
  }
}