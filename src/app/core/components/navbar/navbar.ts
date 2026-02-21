import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      this.isLoggedIn = !!user;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}