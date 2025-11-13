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
      currentState: ['', Validators.required],
      problemStatement: ['', Validators.required],
      currentSolutions: ['', Validators.required],
      timeline: ['', Validators.required],
      budget: ['', Validators.required],
      successMetrics: ['', Validators.required],
      additionalInfo: ['']
    });
  }

  ngOnInit() {
    this.ga.trackNavigation('/worksheet');
  }

  onSubmit() {
    if (this.worksheetForm.valid) {
      this.isSubmitting = true;
      this.showErrorMessage = false;

      // Track form submission
      this.ga.trackEvent('form_submission', {
        form_name: 'project_worksheet',
        business_name: this.worksheetForm.value.businessName
      });

      // Send email via email service
      this.emailService.sendWorksheet(this.worksheetForm.value).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.showSuccessMessage = true;
            // Track successful submission
            this.ga.trackEvent('form_success', {
              form_name: 'project_worksheet',
              business_name: this.worksheetForm.value.businessName
            });
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

  resetForm() {
    this.worksheetForm.reset();
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }
}