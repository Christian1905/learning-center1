import {Routes} from '@angular/router';
import {HomeComponent} from './features/learning/pages/home/home.component';

const AboutComponent = () => import('./features/learning/pages/about/about.component').then(m => m.AboutComponent);
const CourseManagementComponent = () => import('./features/learning/pages/course-management/course-management.component').then(m => m.CourseManagementComponent);
const PageNotFoundComponent = () => import('./features/learning/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const LoginComponent = () => import('./features/authentication/pages/login/login.component').then(m => m.LoginComponent);

export const routes: Routes = [
  { path: 'home',             component:      HomeComponent },
  { path: 'about',            loadComponent:  AboutComponent },
  { path: 'learning/courses', loadComponent:  CourseManagementComponent },
  { path: 'login',            loadComponent:  LoginComponent },
  { path: '',                 redirectTo:     '/home', pathMatch: 'full' },
  { path: '**',               loadComponent:  PageNotFoundComponent },
];
