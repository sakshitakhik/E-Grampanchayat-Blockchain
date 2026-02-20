import { Component } from '@angular/core';

@Component({
  selector: 'app-apply-certificate',
  standalone: false,
  templateUrl: './apply-certificate.html',
  styleUrl: './apply-certificate.css',
})
export class ApplyCertificate {
  certificateTypes = [
    'Birth Certificate',
    'Death Certificate',
    'Income Certificate',
    'Residence Certificate',
    'Caste Certificate'
  ];

  application = {
    certificateType: '',
    fullName: '',
    aadhar: '',
    address: '',
    document: null
  };

  onFileSelect(event: any) {
    this.application.document = event.target.files[0];
  }

  submitApplication() {
    console.log('Application Submitted:', this.application);
    alert('Certificate application submitted successfully!');
  }

}
