import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  /**
   * Track a custom event
   */
  trackEvent(eventName: string, parameters?: any): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
  }

  /**
   * Track PDF download
   */
  trackPdfDownload(fileName: string, source: string = 'unknown'): void {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_extension: '.pdf',
      source: source,
      event_category: 'engagement',
      event_label: fileName
    });
  }

  /**
   * Track navigation events
   */
  trackNavigation(destination: string): void {
    this.trackEvent('page_view', {
      page_title: destination,
      event_category: 'navigation'
    });
  }
}