import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GramsevakService } from '../../../services/gramsevak';

@Component({
  selector: 'app-complaints-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaints-review.html',
  styleUrl: './complaints-review.css'
})
export class ComplaintsReview implements OnInit {
  complaints: any[] = [];

  constructor(
    private gramsevakService: GramsevakService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gramsevakService.getComplaints().subscribe(data => {
      this.complaints = data;
      this.cdr.detectChanges();
    });
  }

  resolve(id: string): void {
    this.gramsevakService.resolveComplaint(id).subscribe(() => {
      const complaint = this.complaints.find(c => c.id === id);
      if (complaint) complaint.status = 'Resolved';
      this.cdr.detectChanges();
    });
  }
}
