import { Component } from '@angular/core';

@Component({
  selector: 'app-announcements',
  standalone: false,
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})
export class Announcements {
 announcements = [
    {
      title: 'Water Supply Interruption',
      description: 'Water supply will be unavailable on 18 Jan 2025 due to pipeline maintenance.',
      date: '18-Jan-2025',
      priority: 'High'
    },
    {
      title: 'Property Tax Payment Deadline',
      description: 'Citizens are requested to pay property tax before 31 Jan 2025 to avoid penalties.',
      date: '31-Jan-2025',
      priority: 'Medium'
    },
    {
      title: 'Gram Sabha Meeting',
      description: 'Monthly Gram Sabha meeting will be held on 22 Jan 2025 at Panchayat Hall.',
      date: '22-Jan-2025',
      priority: 'Low'
    }
  ];
}
