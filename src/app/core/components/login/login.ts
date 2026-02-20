import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = "";
  password: string = "";

  constructor(private router: Router) { }

  login() {

    if (this.email === 'sakshi@gmail.com' && this.password === '12345') {
      alert("Login Successful!");
      this.router.navigate(['/dashboard/announcements']);
    } else {
      alert("Invalid Credentials");
    }
  }
}





