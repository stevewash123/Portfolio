import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ChartTitle,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-guide-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './guide-overview.component.html',
  styleUrls: ['./guide-overview.component.css']
})
export class GuideOverviewComponent {

  // Chart configuration
  public barChartType = 'bar' as const;
  public barChartData: ChartData<'bar'> = {
    labels: ['Small Automation', 'Forms & Data Collection', 'Workflow Systems', 'Full Applications', 'Off-the-Shelf Suite'],
    datasets: [
      {
        label: 'Starting Point',
        data: [1, 3, 5, 10, 15], // Minimum values
        backgroundColor: 'transparent',
        borderWidth: 0,
        barPercentage: 0.7
      },
      {
        label: 'Range',
        data: [4, 5, 15, 40, 20], // Range spans (max - min)
        backgroundColor: ['#28a745', '#007acc', '#6f42c1', '#fd7e14', '#dc3545'],
        borderWidth: 0,
        barPercentage: 0.7
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 50,
        stacked: true,
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
        stacked: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        filter: function(tooltipItem) {
          return tooltipItem.datasetIndex === 1; // Only show tooltip for visible range part
        },
        callbacks: {
          label: (context) => {
            const categoryIndex = context.dataIndex;
            const ranges = [
              { min: 1, max: 5 },   // Small Automation
              { min: 3, max: 8 },   // Forms & Data Collection
              { min: 5, max: 20 },  // Workflow Systems
              { min: 10, max: 50 }, // Full Applications
              { min: 15, max: 35 }  // Off-the-Shelf Suite
            ];
            const range = ranges[categoryIndex];
            return `Cost Range: $${range.min}K - $${range.max}K${range.max === 50 ? '+' : ''}`;
          }
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