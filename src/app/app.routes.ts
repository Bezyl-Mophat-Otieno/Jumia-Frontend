import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AdminDashboardComponent } from './feature/dashboards/admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './feature/dashboards/customer/customer-dashboard/customer-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { CartComponent } from './feature/dashboards/customer/cart/cart.component';
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
        
        children:[
            {
                path:'admin',
                data: { roles: ['admin']},
                canActivate:[authGuard],

                component:AdminDashboardComponent
            },
            {
                path:'market',
                data: { roles: ['customer']},
                canActivate:[authGuard],
                component:CustomerDashboardComponent,
            },
            {
            path:"cart",
            component:CartComponent
            }
        ],
        
    },
    {
        path: 'register',
        component:RegisterComponent
    },

   
];
