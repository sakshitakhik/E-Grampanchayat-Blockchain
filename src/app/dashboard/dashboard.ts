import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  dashboardItems = [
  { title: "Apply for Certificates", desc: "Apply for Birth, Death, Residence & more certificates.", link: "/apply-certificates" },
  { title: "Track Certificate Status", desc: "Check your certificate application progress.", link: "/track-status" },
  { title: "My Documents", desc: "Download approved certificates stored on blockchain.", link: "/my-documents" },
  { title: "Complaints / Grievances", desc: "Submit complaints and track their status.", link: "/complaints" },
  { title: "Announcements", desc: "Stay updated with notices & government schemes.", link: "/announcements" },
  { title: "Blockchain Records", desc: "View transaction details for transparency.", link: "/blockchain-records" },
  { title: "My Profile", desc: "View or update your personal details.", link: "/profile" }
];


}
