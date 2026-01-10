import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent : () => import('./main/dashboard/dashboard.component').then(e => e.DashboardComponent)
    },
    {
        path : 'add-ride',
        loadComponent : () => import('./main/add-ride/add-ride-form.component').then(e => e.AddRideFormComponent)
    }
];
