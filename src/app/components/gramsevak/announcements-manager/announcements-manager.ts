import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GramsevakService } from '../../../services/gramsevak';

@Component({
  selector: 'app-announcements-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './announcements-manager.html',
  styleUrl: './announcements-manager.css'
})
export class AnnouncementsManager implements OnInit {
  announcementForm: FormGroup;
  announcements: any[] = [];
  isSubmitting = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder, 
    private gramsevakService: GramsevakService,
    private cdr: ChangeDetectorRef
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['Normal']
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.gramsevakService.getAnnouncements().subscribe(data => {
      this.announcements = data;
      this.cdr.detectChanges();
    });
  }

  deleteAnnouncement(id: string): void {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.gramsevakService.deleteAnnouncement(id).subscribe(() => {
        this.loadAnnouncements();
        this.cdr.detectChanges();
      });
    }
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      this.isSubmitting = true;
      this.gramsevakService.postAnnouncement(this.announcementForm.value).subscribe(() => {
        this.isSubmitting = false;
        this.successMessage = 'Announcement posted successfully!';
        this.announcementForm.reset({ priority: 'Normal' });
        this.loadAnnouncements();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      });
    }
  }
}
