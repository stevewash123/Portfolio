import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToBusinessApps(): void {
    this.router.navigate(['/business-applications']);
  }

  navigateToTechDemos(): void {
    this.router.navigate(['/technology-demos']);
  }
}