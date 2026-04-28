import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../services/citizen';

@Component({
  selector: 'app-votes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './votes.html',
  styleUrl: './votes.css',
})
export class Votes implements OnInit {
  polls: any[] = [];
  votedPolls: Set<any> = new Set();
  isVoting = false;

  constructor(
    private citizenService: CitizenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.citizenService.getPolls().subscribe(data => {
      this.polls = data;
      this.cdr.detectChanges();
    });
  }

  onVote(pollId: any, optionIndex: number): void {
    if (!this.votedPolls.has(pollId)) {
      this.isVoting = true;
      this.citizenService.castVote(pollId, optionIndex).subscribe(() => {
        this.isVoting = false;
        this.votedPolls.add(pollId);
        this.cdr.detectChanges();
      });
    }
  }
}
