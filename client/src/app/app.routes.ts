import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { authGuard, loggedGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: HomePageComponent, title: 'Home Page'},
    {path: 'login', component:LoginPageComponent, title: 'Login Page', canActivate:[loggedGuard]},
    {path: 'signup', component:SignupPageComponent, title: 'Signup Page', canActivate:[loggedGuard]},
    {path: 'all-tasks', component:AllTasksComponent, title: 'Signup Page', canActivate: [authGuard]},
    {path: 'profile', component:ProfilePageComponent, title: 'Profile Page', canActivate: [authGuard]},
    {path: 'newTask', component:DialogBoxComponent, title: 'DialogBox Page', canActivate: [authGuard]},
    // {path: 'taskDetail', component:TaskDetailPageComponent, title: 'Task Detail Page'},
    
];
