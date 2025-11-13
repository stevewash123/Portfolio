import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-worksheet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent {
  worksheetForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private ga: GoogleAnalyticsService,
    private emailService: EmailService
  ) {
    this.worksheetForm = this.fb.group({
      businessName: ['', Validators.required],
      contactName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentProcess: ['', Validators.required],
      idealProcess: ['', Validators.required],
      userTypes: ['', Validators.required],
      dataTracking: ['', Validators.required],
      coreWorkflows: ['', Validators.required],
      reportsOutputs: ['', Validators.required],
      existingSystems: ['', Validators.required],
      timelineBudget: ['', Validators.required],
      sendCopyToEmail: [true],
      copyEmailAddress: ['', [Validators.required, Validators.email]],
      scheduleConsultation: [false]
    });
  }

  ngOnInit() {
    this.ga.trackNavigation('/worksheet');
  }

  onSubmit() {
    if (this.worksheetForm.valid && this.isSubmissionOptionsValid()) {
      this.isSubmitting = true;
      this.showErrorMessage = false;

      const formData = this.worksheetForm.value;

      // Track form submission with additional options
      this.ga.trackEvent('form_submission', {
        form_name: 'project_worksheet',
        business_name: formData.businessName,
        send_copy: formData.sendCopyToEmail,
        schedule_consultation: formData.scheduleConsultation
      });

      // Send email via email service with additional options
      this.emailService.sendWorksheet(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.showSuccessMessage = true;

            // Track successful submission
            this.ga.trackEvent('form_success', {
              form_name: 'project_worksheet',
              business_name: formData.businessName
            });

            // Send copy email if requested
            if (formData.sendCopyToEmail && formData.copyEmailAddress) {
              this.emailService.sendWorksheetCopy(formData, formData.copyEmailAddress).subscribe({
                next: (copyResponse) => {
                  if (copyResponse.success) {
                    this.ga.trackEvent('copy_email_sent', {
                      form_name: 'project_worksheet',
                      copy_email: formData.copyEmailAddress
                    });
                  }
                },
                error: (copyError) => {
                  console.warn('Copy email failed:', copyError);
                }
              });
            }
          } else {
            this.showErrorMessage = true;
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showErrorMessage = true;
          console.error('Email submission failed:', error);

          // Track failed submission
          this.ga.trackEvent('form_error', {
            form_name: 'project_worksheet',
            error: 'email_send_failed'
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.worksheetForm);
      this.showErrorMessage = true;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  trackPdfDownload() {
    this.ga.trackEvent('pdf_download', {
      file_name: 'Project-Specification-Worksheet.pdf',
      source: 'worksheet_page'
    });
  }

  trackGuideNavigation() {
    this.ga.trackEvent('navigation', {
      destination: 'decision_guide',
      source: 'worksheet_page'
    });
  }

  onConsultationChange() {
    if (this.worksheetForm.get('scheduleConsultation')?.value) {
      // Track consultation interest
      this.ga.trackEvent('consultation_interest', {
        source: 'worksheet_form',
        event_category: 'engagement'
      });

      // Open calendar scheduling link
      window.open('https://calendar.app.google/hFTk1RU3zLhHkLop6', '_blank');
    }
  }

  onSendCopyChange() {
    const sendCopyChecked = this.worksheetForm.get('sendCopyToEmail')?.value;
    const emailControl = this.worksheetForm.get('copyEmailAddress');

    if (sendCopyChecked) {
      // Add email validation when checkbox is checked
      emailControl?.setValidators([Validators.required, Validators.email]);
      emailControl?.enable();
    } else {
      // Remove validation and clear value when unchecked
      emailControl?.clearValidators();
      emailControl?.setValue('');
      emailControl?.disable();
    }
    emailControl?.updateValueAndValidity();
  }

  resetForm() {
    this.worksheetForm.reset();
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  isSubmissionOptionsValid(): boolean {
    const formData = this.worksheetForm.value;
    const sendCopy = formData.sendCopyToEmail;
    const scheduleConsultation = formData.scheduleConsultation;

    // At least one checkbox must be selected
    if (!sendCopy && !scheduleConsultation) {
      return false;
    }

    // If send copy is selected, email must be valid
    if (sendCopy) {
      const emailControl = this.worksheetForm.get('copyEmailAddress');
      return emailControl?.valid || false;
    }

    return true;
  }

  get isSubmitDisabled(): boolean {
    return this.isSubmitting ||
           this.showSuccessMessage ||
           !this.worksheetForm.valid ||
           !this.isSubmissionOptionsValid();
  }
}