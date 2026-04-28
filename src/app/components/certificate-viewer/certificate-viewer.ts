import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-viewer.html',
  styleUrl: './certificate-viewer.css',
})
export class CertificateViewer {
  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  get today() {
    return new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  printCertificate() {
     window.print();
  }
}
