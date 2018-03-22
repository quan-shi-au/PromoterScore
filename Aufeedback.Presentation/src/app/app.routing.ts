import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AuthGuard } from './core/services/auth.guard';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'dashboard/overview',
        pathMatch: 'full'
    },{
        path: '',
        component: AdminLayoutComponent,
        children: [
        {
            path: 'dashboard',
            loadChildren: './dashboard/dashboard.module#DashboardModule',
            canActivate: [AuthGuard],
        }]
    },{
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }],
    }
];
