import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Seed Data: 3+ tasks with varied values
  private tasks: Task[] = [
    { id: 1, title: 'Fix Layout Issues', description: 'Fix the navbar on mobile', dueDate: '2026-03-25', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Update Documentation', description: 'Write the README.md', dueDate: '2026-03-26', status: 'Pending', priority: 'Medium' },
    { id: 3, title: 'Project Research', description: 'Look for UI inspiration', dueDate: '2026-03-20', status: 'Completed', priority: 'Low' }
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Task): void {
    const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    this.tasks.push({ ...task, id: newId });
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleStatus(id: number): void {
    const task = this.getTaskById(id);
    if (task) {
      task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    }
  }
}