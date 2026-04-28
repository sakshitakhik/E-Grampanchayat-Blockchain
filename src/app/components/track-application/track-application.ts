import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitizenService } from '../../services/citizen';
import { finalize } from 'rxjs';
import { CertificateViewer } from '../certificate-viewer/certificate-viewer';

@Component({
  selector: 'app-track-application',
  standalone: true,
  imports: [CommonModule, FormsModule, CertificateViewer],
  templateUrl: './track-application.html',
  styleUrl: './track-application.css',
})
export class TrackApplication {
  searchId = '';
  applicationData: any = null;
  errorMsg = '';
  isSearching = false;

  showCert = false;
  certData: any = null;

  constructor(
    private citizenService: CitizenService,
    private cdr: ChangeDetectorRef
  ) {}

  onTrack(): void {
    if (this.searchId) {
      this.isSearching = true;
      this.errorMsg = '';
      this.applicationData = null;
      
      this.citizenService.trackApplication(this.searchId.trim())
        .pipe(finalize(() => {
           this.isSearching = false;
           this.cdr.detectChanges(); // Force UI update after search finishes
        }))
        .subscribe({
          next: (data) => {
            console.log('Track Data Received:', data);
            this.applicationData = data;
            if (!data) {
              this.errorMsg = 'No application found with the provided ID.';
            }
            this.cdr.detectChanges(); // Force UI update
          },
          error: (err) => {
            console.error('Track error:', err);
            this.errorMsg = 'Error searching for application. Ensure the ID is a valid UUID or exists.';
            this.cdr.detectChanges();
          }
        });
    }
  }

  viewCertificate(): void {
    if (this.applicationData && this.applicationData.status === 'Approved') {
      this.citizenService.getCertificateData(this.applicationData.id).subscribe(data => {
        this.certData = data;
        this.showCert = true;
        this.cdr.detectChanges();
      });
    }
  }

  reset(): void {
    this.applicationData = null;
    this.searchId = '';
    this.errorMsg = '';
    this.cdr.detectChanges();
  }
}
