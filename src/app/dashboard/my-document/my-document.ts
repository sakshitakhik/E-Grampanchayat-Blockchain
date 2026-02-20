import { Component } from '@angular/core';
interface Document {
  name: string;
  type: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  issuedDate: string;
}
@Component({
  selector: 'app-my-document',
  standalone: false,
  templateUrl: './my-document.html',
  styleUrl: './my-document.css',
})
export class MyDocument {
 documents = [
    {
      id: 'DOC001',
      name: 'Birth Certificate',
      type: 'PDF',
      status: 'Approved',
      date: '12-Jan-2025'
    },
    {
      id: 'DOC002',
      name: 'Income Certificate',
      type: 'PDF',
      status: 'Pending',
      date: ''
    },
    {
      id: 'DOC003',
      name: 'Residence Certificate',
      type: 'PDF',
      status: 'Rejected',
      date: ''
    }
  ];

}
