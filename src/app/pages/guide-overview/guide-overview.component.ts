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
        label: 'Cost Range',
        data: [
          { x: [1, 5], y: 0 },   // Small Automation: $1K-$5K
          { x: [3, 8], y: 1 },   // Forms & Data: $3K-$8K
          { x: [5, 20], y: 2 },  // Workflow Systems: $5K-$20K
          { x: [10, 50], y: 3 }, // Full Applications: $10K-$50K+
          { x: [15, 35], y: 4 }  // Off-the-Shelf Suite: $15K-$35K
        ],
        backgroundColor: ['#28a745', '#007acc', '#6f42c1', '#fd7e14', '#dc3545'],
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
            const data = context.raw as { x: [number, number], y: number };
            const min = data.x[0];
            const max = data.x[1];
            return `Cost Range: $${min}K - $${max}K`;
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