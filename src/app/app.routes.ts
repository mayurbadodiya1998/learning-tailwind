import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

export const routes: Routes = [
    
    {
        path:"auth",
        loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)
    },
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"home",
        loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)
    }
];
