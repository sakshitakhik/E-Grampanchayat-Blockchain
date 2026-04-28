import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GramsevakService } from '../../../services/gramsevak';

@Component({
  selector: 'app-votes-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './votes-manager.html',
  styleUrl: './votes-manager.css'
})
export class VotesManager implements OnInit {
  voteForm: FormGroup;
  voteResults: any[] = [];
  activeTab: 'create' | 'results' = 'create';

  constructor(
    private fb: FormBuilder, 
    private gramsevakService: GramsevakService,
    private cdr: ChangeDetectorRef
  ) {
    this.voteForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ])
    });
  }

  ngOnInit(): void {
    this.loadResults();
  }

  get options() {
    return this.voteForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.control('', Validators.required));
    this.cdr.detectChanges();
  }

  removeOption(index: number): void {
    if (this.options.length > 2) {
      this.options.removeAt(index);
      this.cdr.detectChanges();
    }
  }

  loadResults(): void {
    this.gramsevakService.getVoteResults().subscribe(data => {
      this.voteResults = data;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.voteForm.valid) {
      this.gramsevakService.createVote(this.voteForm.value).subscribe(() => {
        alert('Vote created successfully!');
        this.voteForm.reset();
        // Reset form array to 2 options
        while (this.options.length > 2) this.options.removeAt(2);
        this.loadResults();
        this.cdr.detectChanges();
      });
    }
  }

  calculatePercentage(votes: number, options: any[]): number {
    const total = options.reduce((sum, opt) => sum + opt.votes, 0);
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  }
}
