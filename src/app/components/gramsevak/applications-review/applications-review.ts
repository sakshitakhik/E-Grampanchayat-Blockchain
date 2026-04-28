import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GramsevakService } from '../../../services/gramsevak';

@Component({
  selector: 'app-applications-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications-review.html',
  styleUrl: './applications-review.css',
})
export class ApplicationsReview implements OnInit {
  applications: any[] = [];

  constructor(
    private gramsevakService: GramsevakService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gramsevakService.getApplications().subscribe(data => {
      this.applications = data;
      this.cdr.detectChanges();
    });
  }

  approve(id: string): void {
    this.gramsevakService.updateApplicationStatus(id, 'Approved').subscribe(() => {
      const app = this.applications.find(a => a.id === id);
      if (app) app.status = 'Approved';
      this.cdr.detectChanges();
    });
  }

  reject(id: string): void {
    this.gramsevakService.updateApplicationStatus(id, 'Rejected').subscribe(() => {
      const app = this.applications.find(a => a.id === id);
      if (app) app.status = 'Rejected';
      this.cdr.detectChanges();
    });
  }
}
