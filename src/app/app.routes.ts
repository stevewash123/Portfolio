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
  {
    path: 'guide',
    loadComponent: () => import('./pages/guide-overview/guide-overview.component').then(m => m.GuideOverviewComponent)
  },
  {
    path: 'guide-full',
    loadComponent: () => import('./pages/decision-guide/decision-guide.component').then(m => m.DecisionGuideComponent)
  },
  {
    path: 'worksheet',
    loadComponent: () => import('./pages/worksheet/worksheet.component').then(m => m.WorksheetComponent)
  },
  { path: '**', redirectTo: '/home' }
];