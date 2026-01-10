import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent : () => import('./main/dashboard/dashboard.component').then(e => e.DashboardComponent)
    },
    {
        path : 'add-ride',
        loadComponent : () => import('./main/add-ride/add-ride-form.component').then(e => e.AddRideFormComponent)
    },
      {
        path : 'join-ride',
        loadComponent : () => import('./main/join-ride/join-ride-form.component').then(e => e.JoinRideFormComponent)
    },{
        path : 'view-rides',
        loadComponent : ()=> import('./main/view-rides/rides-listing.component').then((e)=> e.RidesListingComponent)
    }
];
