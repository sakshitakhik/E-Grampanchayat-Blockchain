import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitizenService } from '../../services/citizen';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-apply-certificate',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './apply-certificate.html',
  styleUrl: './apply-certificate.css',
})
export class ApplyCertificate {
  applyForm: FormGroup;
  isSubmitting = false;
  applicationId = '';

  constructor(private fb: FormBuilder, private citizenService: CitizenService) {
    this.applyForm = this.fb.group({
      certificateType: ['', Validators.required],
      fullName: ['', Validators.required],
      aadharNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      reason: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.applyForm.valid) {
      this.isSubmitting = true;
      this.citizenService.applyCertificate(this.applyForm.value)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: (response: any) => {
            this.applicationId = response.id || response.applicationId;
            this.applyForm.reset();
            alert('Application successfully submitted! Your ID is: ' + this.applicationId);
          },
          error: (err) => {
            console.error('Submission failed:', err);
            alert('Error: Could not submit application. Please check if the backend is running and the data is valid.');
          }
        });
    }
  }
}
