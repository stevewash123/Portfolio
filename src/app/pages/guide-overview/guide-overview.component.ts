import { Component, HostListener } from '@angular/core';
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
        data: [1, 3, 5, 10, 10], // Minimum values - changed Off-the-Shelf from 15 to 10
        backgroundColor: 'transparent',
        borderWidth: 0,
        barPercentage: 0.7
      },
      {
        label: 'Range',
        data: [4, 5, 15, 40, 25], // Range spans (max - min) - Off-the-Shelf: 35-10=25
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
    interaction: {
      intersect: false,
      mode: 'index'
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 50,
        stacked: true,
        ticks: {
          callback: function(value) {
            return '$' + value + 'K';
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
        title: {
          display: true,
          text: 'Cost Range (USD)',
          font: {
            size: window.innerWidth < 768 ? 11 : 13
          }
        },
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)'
        }
      },
      y: {
        stacked: true,
        display: false  // Hide Y-axis labels completely
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          generateLabels: function(chart) {
            const labels = ['Small Automation', 'Forms & Data Collection', 'Workflow Systems', 'Full Applications', 'Off-the-Shelf Suite'];
            const colors = ['#28a745', '#007acc', '#6f42c1', '#fd7e14', '#dc3545'];
            return labels.map((label, index) => ({
              text: label,
              fillStyle: colors[index],
              strokeStyle: colors[index],
              lineWidth: 0,
              pointStyle: 'rect'
            }));
          },
          usePointStyle: true,
          padding: window.innerWidth < 768 ? 10 : 15,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      tooltip: {
        filter: function(tooltipItem) {
          return tooltipItem.datasetIndex === 1; // Only show tooltip for visible range part
        },
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13
        },
        callbacks: {
          title: function(context) {
            const fullLabels = ['Small Automation', 'Forms & Data Collection', 'Workflow Systems', 'Full Applications', 'Off-the-Shelf Suite'];
            return fullLabels[context[0].dataIndex];
          },
          label: (context) => {
            const categoryIndex = context.dataIndex;
            const ranges = [
              { min: 1, max: 5 },   // Small Automation
              { min: 3, max: 8 },   // Forms & Data Collection
              { min: 5, max: 20 },  // Workflow Systems
              { min: 10, max: 50 }, // Full Applications
              { min: 10, max: 35 }  // Off-the-Shelf Suite - changed from 15 to 10
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

    // Update chart options for current screen size
    this.updateChartForScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update chart configuration when window is resized
    this.updateChartForScreenSize();
  }

  private updateChartForScreenSize() {
    const isMobile = window.innerWidth < 768;

    // Update chart options for responsive behavior
    if (this.barChartOptions?.scales?.['x']?.ticks) {
      this.barChartOptions.scales['x'].ticks.font = { size: isMobile ? 10 : 12 };
    }
    if (this.barChartOptions?.scales?.['x']?.title) {
      this.barChartOptions.scales['x'].title.font = { size: isMobile ? 11 : 13 };
    }
    // Update legend font size
    if (this.barChartOptions?.plugins?.legend?.labels) {
      this.barChartOptions.plugins.legend.labels.font = { size: isMobile ? 10 : 12 };
      this.barChartOptions.plugins.legend.labels.padding = isMobile ? 10 : 15;
    }
    if (this.barChartOptions?.plugins?.tooltip) {
      this.barChartOptions.plugins.tooltip.titleFont = { size: isMobile ? 12 : 14 };
      this.barChartOptions.plugins.tooltip.bodyFont = { size: isMobile ? 11 : 13 };
    }
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