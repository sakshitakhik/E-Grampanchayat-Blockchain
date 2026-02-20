import { Component } from '@angular/core';
@Component({
  selector: 'app-voting',
  standalone: false,
  templateUrl: './voting.html',
  styleUrl: './voting.css',
})
export class Voting {

  decisions = [
    { id: 1, title: 'Water supply timing change', yes: 0, no: 0 },
    { id: 2, title: 'Install new street lights', yes: 0, no: 0 }
  ];

  vote(decision: any, type: 'yes' | 'no') {
    if (type === 'yes') {
      decision.yes++;
    } else {
      decision.no++;
    }
  }
}