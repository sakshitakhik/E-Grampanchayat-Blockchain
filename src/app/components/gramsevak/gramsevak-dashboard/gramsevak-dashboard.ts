import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsReview } from '../applications-review/applications-review';
import { ComplaintsReview } from '../complaints-review/complaints-review';
import { AnnouncementsManager } from '../announcements-manager/announcements-manager';
import { VotesManager } from '../votes-manager/votes-manager';

@Component({
  selector: 'app-gramsevak-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    ApplicationsReview, 
    ComplaintsReview, 
    AnnouncementsManager, 
    VotesManager
  ],
  templateUrl: './gramsevak-dashboard.html',
  styleUrl: './gramsevak-dashboard.css'
})
export class GramsevakDashboard {
  activeSection: 'applications' | 'complaints' | 'announcements' | 'votes' = 'applications';

  setSection(section: any): void {
    this.activeSection = section;
  }
}
