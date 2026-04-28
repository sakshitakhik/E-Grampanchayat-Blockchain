import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../services/citizen';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})
export class Announcements implements OnInit {
  announcements: any[] = [];
  isLoading = true;

  constructor(
    private citizenService: CitizenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.citizenService.getAnnouncements().subscribe(data => {
      this.announcements = data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }
}
