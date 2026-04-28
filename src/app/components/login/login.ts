import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../services/citizen';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  errorMsg = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private citizenService: CitizenService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      selectedRole: ['Citizen'] // Role override for dev hassle-free switching
    });
  }

  onLogin(): void {
    console.log('Login component: onLogin triggered');
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';
      
      console.log('Login component: Calling API with:', this.loginForm.value);
      this.citizenService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          const dbRole = response.user.role; // e.g. 'Citizen' or 'Gramsevak'
          const selectedRole = this.loginForm.value.selectedRole;
          
          // Role matching logic
          if (selectedRole && dbRole !== selectedRole) {
            this.errorMsg = `Access Denied: Your account is registered as ${dbRole}, but you are trying to log in as ${selectedRole}.`;
            this.cdr.detectChanges();
            return;
          }

          localStorage.setItem('user', JSON.stringify(response.user));
          
          if (dbRole === 'Gramsevak' || dbRole === 'Admin') {
            this.router.navigate(['/gramsevak-dashboard']);
          } else {
            this.router.navigate(['/']);
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error?.message || 'Login failed. Please check your credentials.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
