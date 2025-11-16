import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-microsaas-landing',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzTagModule
  ],
  templateUrl: './microsaas-landing.component.html',
  styleUrls: ['./microsaas-landing.component.css']
})
export class MicrosaaSLandingComponent {

  services = [
    {
      icon: 'search',
      title: 'Consulting',
      description: 'Not sure what you need? We\'ll assess your workflows, identify bottlenecks, and recommend solutions that fit your budget and goals.',
      tags: ['Discovery', 'Planning', 'Requirements', 'Strategy']
    },
    {
      icon: 'desktop',
      title: 'Multi-User Web Applications',
      description: 'Custom platforms built for your business - customer tracking, scheduling, inventory control, client portals. Unlimited users, one price.',
      tags: ['Full-Stack', 'Web Apps', 'Unlimited Users', 'Custom Built']
    },
    {
      icon: 'apartment',
      title: 'System Integration Hubs & Dashboards',
      description: 'Stop jumping between different tools. We\'ll connect your systems and create unified dashboards so you see everything in one place.',
      tags: ['Integration', 'Real-time Data', 'Unified View', 'Automation']
    },
    {
      icon: 'bar-chart',
      title: 'Data & Reporting Solutions',
      description: 'Turn your data into clear, actionable insights. Automated reports and visual analytics without the complexity or high costs.',
      tags: ['Reporting', 'Analytics', 'Automation', 'Insights']
    }
  ];

  whyChooseUs = [
    {
      icon: 'setting',
      title: 'Modern Development Practices',
      description: 'AI-assisted workflows and proven architecture patterns mean faster delivery with improved quality. Get your solution in weeks, not months.'
    },
    {
      icon: 'unlock',
      title: 'No Vendor Lock-In',
      description: 'Build it. Own it. Scale it as much as you like. No recurring license fees, no per-user charges, no forced upgrades.'
    },
    {
      icon: 'project',
      title: 'Well-Scoped Projects',
      description: 'Fixed-price deliverables with clearly defined milestones and completion points'
    },
    {
      icon: 'trophy',
      title: '28+ Years Cross-Industry Experience',
      description: 'Three decades solving diverse business challenges - from tax preparation to telecommunications to inventory management. Deep understanding of how different industries operate.'
    }
  ];

  featuredProjects = [
    {
      title: 'LessonTree - SaaS for Educators',
      tech: ['Angular', '.NET', 'SyncFusion', 'FullCalendar'],
      description: 'Lesson planning application for teachers with drag-and-drop scheduling',
      route: '/business-applications',
      buttonText: 'View Project'
    },
    {
      title: 'Async Job Processing System',
      tech: ['Hangfire', 'SignalR', 'Angular'],
      description: 'Real-time progress tracking for long-running background operations',
      route: '/technology-demos',
      buttonText: 'View Demo'
    },
    {
      title: 'Custom Data Table Component',
      tech: ['Angular', 'Component Library'],
      description: 'Reusable Angular component for advanced data table operations',
      route: '/technology-demos',
      buttonText: 'View Demo'
    },
    {
      title: 'RecipeParser - Query Conversion Tool',
      tech: ['C#', 'Lexical Parsing'],
      description: 'Intelligent parsing tool for converting natural language queries',
      route: '/technology-demos',
      buttonText: 'View Demo'
    }
  ];

  constructor(private router: Router) {}

  navigateToPortfolio(): void {
    this.router.navigate(['/portfolio']);
  }

  navigateToContact(): void {
    window.location.href = 'mailto:steve@microsaasbuilders.com';
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  openCalendly(): void {
    window.open('https://calendly.com/stevewash123/30min', '_blank');
  }
}