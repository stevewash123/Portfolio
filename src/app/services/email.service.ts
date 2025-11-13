import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import * as emailjs from 'emailjs-com';
import { environment } from '../../environments/environment';

interface WorksheetData {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  currentProcess: string;
  idealProcess: string;
  userTypes: string;
  dataTracking: string;
  coreWorkflows: string;
  reportsOutputs: string;
  existingSystems: string;
  timelineBudget: string;
  sendCopyToEmail?: boolean;
  copyEmailAddress?: string;
  scheduleConsultation?: boolean;
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
    console.log('Sending worksheet data:', data);

    const templateParams = {
      to_email: 'stevewash123@gmail.com',
      to_name: 'Steve Wash',
      business_name: data.businessName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone || 'Not provided',
      current_process: data.currentProcess,
      ideal_process: data.idealProcess,
      user_types: data.userTypes,
      data_tracking: data.dataTracking,
      core_workflows: data.coreWorkflows,
      reports_outputs: data.reportsOutputs,
      existing_systems: data.existingSystems,
      timeline_budget: data.timelineBudget,
      submission_date: new Date().toLocaleString(),
      consultation_requested: data.scheduleConsultation ? 'YES - Customer requested consultation' : 'No'
    };

    // Only send to Steve if consultation is requested
    if (data.scheduleConsultation) {
      return new Observable<EmailResponse>(observer => {
        emailjs.send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          templateParams,
          environment.emailjs.userId
        ).then(
          (response) => {
            console.log('Email sent successfully', response.status, response.text);
            observer.next({ success: true, message: 'Worksheet submitted successfully!' });
            observer.complete();
          },
          (error) => {
            console.error('Email sending failed:', error);
            observer.next({ success: false, message: 'Failed to send worksheet. Please try again.' });
            observer.complete();
          }
        );
      });
    } else {
      // If no consultation requested, just return success without sending to Steve
      console.log('No consultation requested - not sending to Steve');
      return of({
        success: true,
        message: 'Worksheet processed successfully!'
      }).pipe(
        delay(500) // Small delay for UX
      );
    }
  }

  sendWorksheetCopy(data: WorksheetData, copyEmail: string): Observable<EmailResponse> {
    console.log('Sending worksheet copy to:', copyEmail);

    const templateParams = {
      to_email: copyEmail,
      to_name: data.contactName,
      business_name: data.businessName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone || 'Not provided',
      current_process: data.currentProcess,
      ideal_process: data.idealProcess,
      user_types: data.userTypes,
      data_tracking: data.dataTracking,
      core_workflows: data.coreWorkflows,
      reports_outputs: data.reportsOutputs,
      existing_systems: data.existingSystems,
      timeline_budget: data.timelineBudget,
      submission_date: new Date().toLocaleString(),
      consultation_requested: data.scheduleConsultation ? 'YES - Consultation requested' : 'No'
    };

    return new Observable<EmailResponse>(observer => {
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams,
        environment.emailjs.userId
      ).then(
        (response) => {
          console.log('Copy email sent successfully', response.status, response.text);
          observer.next({ success: true, message: 'Worksheet copy sent successfully!' });
          observer.complete();
        },
        (error) => {
          console.error('Copy email sending failed:', error);
          observer.next({ success: false, message: 'Failed to send copy. Worksheet was still submitted.' });
          observer.complete();
        }
      );
    });
  }

  formatWorksheetForEmail(data: WorksheetData): string {
    const consultationNote = data.scheduleConsultation
      ? '\n\n⭐ CONSULTATION REQUESTED: Customer is interested in scheduling a consultation call.'
      : '';

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
${data.additionalInfo || 'None provided'}${consultationNote}

---
Submitted via Portfolio Website
Date: ${new Date().toLocaleString()}
    `.trim();
  }

  formatWorksheetCopyForCustomer(data: WorksheetData): string {
    return `
Your Project Specification Worksheet

Thank you for submitting your project specification worksheet. Here's a copy of what you provided:

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
What happens next?
We'll review your requirements and get back to you within 2 business days with insights and recommendations tailored to your specific situation.

Questions? Reply to this email or visit https://calendar.app.google/hFTk1RU3zLhHkLop6 to schedule a consultation.

Best regards,
Stephen Wash
    `.trim();
  }
}