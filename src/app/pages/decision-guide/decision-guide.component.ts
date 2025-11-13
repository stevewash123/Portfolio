import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-decision-guide',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './decision-guide.component.html',
  styleUrls: ['./decision-guide.component.css']
})
export class DecisionGuideComponent {

  constructor(private ga: GoogleAnalyticsService) {}

  ngOnInit() {
    this.ga.trackNavigation('/guide');
  }

  trackPdfDownload() {
    this.ga.trackEvent('pdf_download', {
      file_name: 'System-Chaos-to-Clarity-Decision-Guide.pdf',
      source: 'decision_guide_page'
    });
  }

  trackWorksheetNavigation() {
    this.ga.trackEvent('navigation', {
      destination: 'worksheet',
      source: 'decision_guide_page'
    });
  }
}