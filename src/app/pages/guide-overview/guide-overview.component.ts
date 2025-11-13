import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-guide-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './guide-overview.component.html',
  styleUrls: ['./guide-overview.component.css']
})
export class GuideOverviewComponent {

  // Chart configuration
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Small Automation', 'Forms & Data Collection', 'Workflow Systems', 'Full Applications', 'Off-the-Shelf Suite'],
    datasets: [
      {
        label: 'Minimum Cost',
        data: [1, 3, 5, 10, 15],
        backgroundColor: ['#28a745', '#007acc', '#6f42c1', '#fd7e14', '#dc3545'],
        borderWidth: 0,
        barPercentage: 0.6
      },
      {
        label: 'Maximum Cost',
        data: [5, 8, 20, 50, 35],
        backgroundColor: ['#20c997', '#0056b3', '#5a359a', '#e55b0f', '#bd2130'],
        borderWidth: 0,
        barPercentage: 0.6
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.x;
            return `${label}: $${value}K`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function(value) {
            return '$' + value + 'K';
          }
        },
        title: {
          display: true,
          text: 'Cost Range (USD)'
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  constructor(
    private ga: GoogleAnalyticsService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    // Set page title and meta tags
    this.title.setTitle('Custom Software Decision Guide | Stephen Wash');
    this.meta.updateTag({
      name: 'description',
      content: 'A practical guide to deciding when custom software makes sense, what it costs, and how to avoid expensive mistakes. By Stephen Wash.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'custom software, business automation, software development, decision guide, stephen wash'
    });
    this.meta.updateTag({ property: 'og:title', content: 'Custom Software Decision Guide | Stephen Wash' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'A practical guide to deciding when custom software makes sense, what it costs, and how to avoid expensive mistakes.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Track page navigation
    this.ga.trackNavigation('/guide');
  }

  trackPdfDownload() {
    this.ga.trackEvent('pdf_download', {
      file_name: 'System-Chaos-to-Clarity-Decision-Guide.pdf',
      source: 'guide_overview_page',
      event_category: 'engagement'
    });
  }

  trackConsultationClick() {
    this.ga.trackEvent('consultation_click', {
      source: 'guide_overview_page',
      cta_type: 'primary',
      event_category: 'engagement'
    });
  }

  trackSecondaryConsultationClick() {
    this.ga.trackEvent('consultation_click', {
      source: 'guide_overview_page',
      cta_type: 'secondary',
      event_category: 'engagement'
    });
  }

  trackWorksheetNavigation() {
    this.ga.trackEvent('navigation', {
      destination: 'worksheet',
      source: 'guide_overview_page'
    });
  }

  trackEmailClick() {
    this.ga.trackEvent('email_click', {
      source: 'guide_overview_page',
      email: 'stevewash123@gmail.com'
    });
  }
}