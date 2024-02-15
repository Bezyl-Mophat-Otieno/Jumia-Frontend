import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AdminDashboardComponent } from './feature/dashboards/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './feature/dashboards/customer-dashboard/customer-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component:LayoutComponent,
        canActivate:[authGuard],
        children:[
            {
                path:'admin',
                component:AdminDashboardComponent
            },
            {
                path:'market',
                component:CustomerDashboardComponent
            }
        ],
        
    },
    {
        path: 'register',
        component:RegisterComponent
    },
   
];
