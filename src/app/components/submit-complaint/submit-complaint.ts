import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitizenService } from '../../services/citizen';

@Component({
  selector: 'app-submit-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './submit-complaint.html',
  styleUrl: './submit-complaint.css',
})
export class SubmitComplaint {
  complaintForm: FormGroup;
  isSubmitting = false;
  success = false;

  constructor(private fb: FormBuilder, private citizenService: CitizenService) {
    this.complaintForm = this.fb.group({
      subject: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['']
    });
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      this.isSubmitting = true;
      this.citizenService.submitComplaint(this.complaintForm.value).subscribe(() => {
        this.isSubmitting = false;
        this.success = true;
        this.complaintForm.reset();
      });
    }
  }
}
