import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-business-applications',
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzModalModule
  ],
  templateUrl: './business-applications.component.html',
  styleUrl: './business-applications.component.css'
})
export class BusinessApplicationsComponent {
  isModalVisible = false;
  selectedProject: any = null;

  constructor(private router: Router) {}

  businessProjects = [
    {
      title: 'LessonTree',
      description: 'Full SaaS web application for educational content management with interactive lesson planning and progress tracking.',
      technologies: ['Angular', 'C#', '.NET', 'Entity Framework', 'PostgreSQL', 'Hangfire', 'Job Scheduling', 'SyncFusion Data Tree', 'Full Calendar', 'Rapid AI Development'],
      liveDemo: 'https://lessontree-ui.onrender.com',
      github: 'https://github.com/your-username/lessontree',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/lessontree-preview.png',
      category: 'Educational Platform',
      features: [
        'Complete educational content management system',
        'Interactive lesson planning with drag-and-drop interface',
        'Real-time progress tracking and analytics',
        'Multi-user authentication and role management',
        'Automated scheduling and notifications',
        'Full calendar integration for lesson scheduling',
        'PostgreSQL database with comprehensive data modeling'
      ],
      businessValue: [
        'Reduces lesson planning time by 60%',
        'Improves student engagement tracking',
        'Streamlines educational workflow management',
        'Provides actionable insights through analytics'
      ]
    },
    {
      title: 'QuickBooks Demo',
      description: 'Comprehensive QuickBooks integration demonstration showcasing real-world accounting workflow automation and data synchronization.',
      technologies: ['Angular', 'C#', '.NET', 'QuickBooks API', 'OAuth 2.0', 'Entity Framework', 'PostgreSQL', 'Intuit SDK'],
      liveDemo: '#',
      github: 'https://github.com/your-username/quickbooks-demo',
      status: 'Deploying',
      statusNote: 'Currently deploying to Render - will be live shortly',
      image: '/assets/quickbooks-demo-preview.png',
      category: 'Financial Integration',
      features: [
        'Complete QuickBooks Online API integration',
        'OAuth 2.0 authentication and token management',
        'Real-time invoice and payment synchronization',
        'Customer and vendor data management',
        'Comprehensive error handling and logging',
        'Automated reconciliation workflows',
        'Multi-company support and data isolation'
      ],
      businessValue: [
        'Eliminates manual data entry between systems',
        'Reduces accounting errors by 95%',
        'Provides real-time financial data visibility',
        'Streamlines invoice and payment processing'
      ]
    }
  ];

  techStack = [
    { category: 'Frontend', technologies: ['Angular', 'TypeScript', 'SyncFusion Data Tree', 'Full Calendar', 'RxJS'] },
    { category: 'Backend', technologies: ['C#', '.NET Core', 'Entity Framework', 'Hangfire', 'Web APIs'] },
    { category: 'Database', technologies: ['PostgreSQL', 'Entity Framework Migrations'] },
    { category: 'Integrations', technologies: ['QuickBooks API', 'OAuth 2.0', 'Intuit SDK'] },
    { category: 'Cloud & Hosting', technologies: ['Render.com', 'GitHub Actions'] }
  ];

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Educational Platform': return '📚';
      case 'Financial Integration': return '💼';
      default: return '🏢';
    }
  }

  showDetails(project: any): void {
    this.selectedProject = project;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedProject = null;
  }
}