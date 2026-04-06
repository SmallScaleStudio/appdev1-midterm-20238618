import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'tasks', 
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'tasks/new', 
    component: TaskAddComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'tasks/:id', 
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' }, 
      { path: 'info', component: TaskInfoComponent },
      { path: 'edit', component: TaskEditComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];