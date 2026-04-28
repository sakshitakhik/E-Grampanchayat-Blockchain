import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockchainService } from '../../services/blockchain';

@Component({
  selector: 'app-blockchain-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blockchain-explorer.html',
  styleUrl: './blockchain-explorer.css'
})
export class BlockchainExplorer implements OnInit {
  blocks: any[] = [];
  status: any = null;
  isLoading = true;

  constructor(
    private blockchainService: BlockchainService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.blockchainService.getBlocks().subscribe(blocks => {
      this.blocks = [...blocks].reverse(); // Latest blocks first
      this.blockchainService.validateChain().subscribe(status => {
        this.status = status;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    });
  }

  formatData(data: any): string {
    return JSON.stringify(data, null, 2);
  }
}
