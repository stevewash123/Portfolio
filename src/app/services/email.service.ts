import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

interface WorksheetData {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  currentState: string;
  problemStatement: string;
  currentSolutions: string;
  timeline: string;
  budget: string;
  successMetrics: string;
  additionalInfo?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendWorksheet(data: WorksheetData): Observable<EmailResponse> {
    // For demo purposes, we'll simulate sending an email
    // In production, this would integrate with services like:
    // - EmailJS (emailjs.send())
    // - Formspree
    // - Netlify Forms
    // - Backend API endpoint

    console.log('Sending worksheet data:', data);

    // Simulate API call with delay
    return of({
      success: true,
      message: 'Worksheet submitted successfully!'
    }).pipe(
      delay(1500) // Simulate network delay
    );

    // Example EmailJS implementation:
    /*
    return this.http.post<any>('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: 'your_service_id',
      template_id: 'your_template_id',
      user_id: 'your_user_id',
      template_params: {
        business_name: data.businessName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        current_state: data.currentState,
        problem_statement: data.problemStatement,
        current_solutions: data.currentSolutions,
        timeline: data.timeline,
        budget: data.budget,
        success_metrics: data.successMetrics,
        additional_info: data.additionalInfo
      }
    }).pipe(
      map(() => ({ success: true, message: 'Worksheet submitted successfully!' })),
      catchError(error => {
        console.error('Email sending failed:', error);
        return of({ success: false, message: 'Failed to send worksheet. Please try again.' });
      })
    );
    */

    // Example Formspree implementation:
    /*
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key as keyof WorksheetData]) {
        formData.append(key, data[key as keyof WorksheetData] as string);
      }
    });

    return this.http.post<any>('https://formspree.io/f/your_form_id', formData)
      .pipe(
        map(() => ({ success: true, message: 'Worksheet submitted successfully!' })),
        catchError(error => {
          console.error('Email sending failed:', error);
          return of({ success: false, message: 'Failed to send worksheet. Please try again.' });
        })
      );
    */
  }

  formatWorksheetForEmail(data: WorksheetData): string {
    return `
New Project Specification Worksheet Submission

Business Information:
- Business Name: ${data.businessName}
- Contact Name: ${data.contactName}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Project Details:
1. Current State Assessment:
${data.currentState}

2. Problem Statement:
${data.problemStatement}

3. Current Solutions & Research:
${data.currentSolutions}

4. Timeline:
${data.timeline}

5. Budget:
${data.budget}

6. Success Metrics:
${data.successMetrics}

7. Additional Information:
${data.additionalInfo || 'None provided'}

---
Submitted via Portfolio Website
Date: ${new Date().toLocaleString()}
    `.trim();
  }
}