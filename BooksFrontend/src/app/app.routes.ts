import { Routes } from '@angular/router';
import { AuthDashboard } from './auth/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { BookDashboardComponent } from './book/dashboard/dashboard';

export const routes: Routes = [

    {
    path: '',
    component: AuthDashboard,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      
    ]
  },

   {
    path: 'books',
    component: BookDashboardComponent
  }
];
