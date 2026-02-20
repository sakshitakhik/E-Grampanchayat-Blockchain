import { Component } from '@angular/core';

@Component({
  selector: 'app-complaints',
  standalone: false,
  templateUrl: './complaints.html',
  styleUrl: './complaints.css',
})
export class Complaints {
complaint = {
    category: '',
    description: ''
  };

  complaintsList = [
    {
      id: 'CMP-101',
      category: 'Water Supply',
      status: 'Resolved',
      date: '05-Jan-2025'
    },
    {
      id: 'CMP-102',
      category: 'Road Maintenance',
      status: 'InProgress',
      date: '11-Jan-2025'
    }
  ];

  submitComplaint() {
    if (!this.complaint.category || !this.complaint.description) {
      alert('Please fill all required fields');
      return;
    }

    alert('Complaint submitted successfully');

    this.complaint = {
      category: '',
      description: ''
    };
  }
}
