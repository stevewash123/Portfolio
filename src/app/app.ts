import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzToolTipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  projects = [
    {
      title: 'LongRunningJobs',
      description: 'Background job processing system with real-time status updates and scalable queue management.',
      technologies: ['Angular', 'C#', '.NET', 'SignalR', 'Background Services'],
      liveDemo: 'https://longrunningjobs-ui.onrender.com',
      github: 'https://github.com/your-username/longrunningjobs',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/longrunningjobs-preview.png'
    },
    {
      title: 'LessonTree',
      description: 'Full SaaS web application for educational content management with interactive lesson planning and progress tracking.',
      technologies: ['Angular', 'C#', '.NET', 'Entity Framework', 'PostgreSQL', 'Hangfire', 'Job Scheduling', 'SyncFusion Data Tree', 'Full Calendar', 'Rapid AI Development'],
      liveDemo: 'https://lessontree-ui.onrender.com',
      github: 'https://github.com/your-username/lessontree',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/lessontree-preview.png'
    },
    {
      title: 'Recipe Parser V2',
      description: 'Boolean query parser demonstration with N-tier architecture, featuring advanced query parsing, parse tree visualization, and SQL generation.',
      technologies: ['Angular', 'C#', '.NET', 'Boolean Query Parser', 'Superpower Library', 'TheMealDB API'],
      liveDemo: 'https://recipeparserv2-ui.onrender.com',
      github: 'https://github.com/stevewash123/RecipeParserV2_UI',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/recipeparserv2-preview.png'
    },
    {
      title: 'Table Wrapper',
      description: 'Declarative table wrapper component demonstrating enterprise-grade data grid configuration.',
      technologies: ['Angular', 'TypeScript', 'NgZorro', 'PrimeNg', 'Declarative Configuration'],
      liveDemo: 'https://tablewrapper.onrender.com',
      github: 'https://github.com/your-username/tablewrapper',
      status: 'Live Demo',
      statusNote: 'Interactive demo available immediately',
      image: '/assets/tablewrapper-preview.png'
    }
  ];

  techStack = [
    { category: 'Frontend', technologies: ['Angular', 'TypeScript', 'NgZorro', 'PrimeNg', 'Angular Material', 'SyncFusion Data Tree', 'Full Calendar', 'RxJS'] },
    { category: 'Backend', technologies: ['C#', '.NET Core', 'Entity Framework', 'SignalR', 'Hangfire', 'CQRS', 'Web APIs'] },
    { category: 'Database', technologies: ['PostgreSQL', 'Oracle', 'NHibernate', 'SQLite', 'SQL Server'] },
    { category: 'Cloud & Hosting', technologies: ['Render.com', 'GitHub Actions', 'WSL'] },
    { category: 'Tools', technologies: ['Git', 'Visual Studio Code', 'Postman', 'Chrome DevTools'] }
  ];

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

}