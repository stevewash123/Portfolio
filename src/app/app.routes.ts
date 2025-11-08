import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'business-applications',
    loadComponent: () => import('./pages/business-applications/business-applications.component').then(m => m.BusinessApplicationsComponent)
  },
  {
    path: 'technology-demos',
    loadComponent: () => import('./pages/technology-demos/technology-demos.component').then(m => m.TechnologyDemosComponent)
  },
  { path: '**', redirectTo: '/home' }
];