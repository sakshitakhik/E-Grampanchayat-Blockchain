import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../services/citizen';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;
  errorMsg = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private citizenService: CitizenService,
    private cdr: ChangeDetectorRef
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Citizen', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';
      
      this.citizenService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('user', JSON.stringify(response.user));
          
          if (response.user.role === 'Gramsevak' || response.user.role === 'Admin') {
            this.router.navigate(['/gramsevak-dashboard']);
          } else {
            this.router.navigate(['/']);
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error?.message || 'Signup failed. Please try again.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
