import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-technology-demos',
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzToolTipModule,
    NzModalModule
  ],
  templateUrl: './technology-demos.component.html',
  styleUrl: './technology-demos.component.css'
})
export class TechnologyDemosComponent {
  isModalVisible = false;
  selectedProject: any = null;

  constructor(private router: Router) {}

  techProjects = [
    {
      title: 'LongRunningJobs',
      description: 'Background job processing system with real-time status updates and scalable queue management.',
      technologies: ['Angular', 'C#', '.NET', 'SignalR', 'Hangfire', 'Background Services'],
      liveDemo: 'https://longrunningjobs-ui.onrender.com',
      github: 'https://github.com/your-username/longrunningjobs',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/longrunningjobs-preview.png',
      category: 'Architecture Pattern',
      highlights: [
        'Real-time job progress tracking with SignalR',
        'Scalable background job processing',
        'Queue management and prioritization',
        'Error handling and retry mechanisms'
      ]
    },
    {
      title: 'Recipe Parser V2',
      description: 'Boolean query parser demonstration with N-tier architecture, featuring advanced query parsing, parse tree visualization, and SQL generation.',
      technologies: ['Angular', 'C#', '.NET', 'Boolean Query Parser', 'Superpower Library', 'TheMealDB API'],
      liveDemo: 'https://recipeparserv2-ui.onrender.com',
      github: 'https://github.com/stevewash123/RecipeParserV2_UI',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/recipeparserv2-preview.png',
      category: 'Algorithm & Parsing',
      highlights: [
        'Advanced boolean query parsing engine',
        'Parse tree visualization and debugging',
        'SQL query generation from natural language',
        'Integration with external APIs'
      ]
    },
    {
      title: 'Table Wrapper',
      description: 'Declarative table wrapper component demonstrating enterprise-grade data grid configuration.',
      technologies: ['Angular', 'TypeScript', 'NgZorro', 'PrimeNg', 'Declarative Configuration'],
      liveDemo: 'https://tablewrapper.onrender.com',
      github: 'https://github.com/your-username/tablewrapper',
      status: 'Live Demo',
      statusNote: 'Interactive demo available immediately',
      image: '/assets/tablewrapper-preview.png',
      category: 'Component Library',
      highlights: [
        'Declarative data grid configuration',
        'Reusable enterprise component patterns',
        'Multiple UI library integration',
        'Performance optimizations for large datasets'
      ]
    }
  ];

  techStack = [
    { category: 'Frontend', technologies: ['Angular', 'TypeScript', 'NgZorro', 'PrimeNg', 'Angular Material', 'RxJS'] },
    { category: 'Backend', technologies: ['C#', '.NET Core', 'SignalR', 'CQRS', 'Web APIs', 'Background Services'] },
    { category: 'Database', technologies: ['PostgreSQL', 'SQLite', 'Entity Framework'] },
    { category: 'Tools & Libraries', technologies: ['Superpower Parser', 'TheMealDB API', 'Render.com', 'GitHub Actions'] }
  ];

  goBack(): void {
    this.router.navigate(['/portfolio']);
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Architecture Pattern': return '🏗️';
      case 'Algorithm & Parsing': return '🔍';
      case 'Component Library': return '🗂️';
      default: return '🔧';
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

  openDemo(project: any): void {
    if (project.liveDemo.startsWith('http')) {
      window.open(project.liveDemo, '_blank');
    } else {
      this.router.navigate([project.liveDemo]);
    }
  }
}