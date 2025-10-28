import { Routes } from '@angular/router';
import { PortfolioHomeComponent } from './components/portfolio-home/portfolio-home.component';

export const routes: Routes = [
  { path: '', component: PortfolioHomeComponent },
  { path: '**', redirectTo: '' }
];
