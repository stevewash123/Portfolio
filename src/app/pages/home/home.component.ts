import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

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
  constructor(
    private router: Router,
    private analytics: GoogleAnalyticsService
  ) {}

  navigateToBusinessApps(): void {
    this.analytics.trackNavigation('business-applications');
    this.router.navigate(['/business-applications']);
  }

  navigateToTechDemos(): void {
    this.analytics.trackNavigation('technology-demos');
    this.router.navigate(['/technology-demos']);
  }

  trackTechGuideDownload(): void {
    this.analytics.trackPdfDownload('Technical-Decision-Guide-for-Growing-Businesses.pdf', 'homepage-hero');
  }

  trackProjectSpecDownload(): void {
    this.analytics.trackPdfDownload('Project-Specification-Worksheet.pdf', 'homepage-hero');
  }
}