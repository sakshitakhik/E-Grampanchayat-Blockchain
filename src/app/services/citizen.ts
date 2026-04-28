import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Announcements
  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/announcements`);
  }

  // Certificates
  applyCertificate(data: any): Observable<any> {
    // Map UI values to Backend ENUM values
    const typeMapping: any = {
      'Income Certificate': 'Income',
      'Caste Certificate': 'Caste',
      'Birth Certificate': 'Birth',
      'Death Certificate': 'Death',
      'Residential Certificate': 'Residence'
    };
    
    const payload = {
      type: typeMapping[data.certificateType] || data.type || 'Income',
      applicantName: data.fullName,
      aadharNumber: data.aadharNumber,
      documents: data.documents || [],
      remarks: data.reason || data.remarks || '',
      userId: data.userId || null
    };
    return this.http.post(`${this.apiUrl}/certificates`, payload);
  }

  trackApplication(applicationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/certificates/${applicationId}`);
  }

  getCertificateData(applicationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/certificates/${applicationId}/certificate`);
  }

  // Complaints
  submitComplaint(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complaints`, data);
  }

  // Votes/Polls
  getPolls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/polls`);
  }

  castVote(pollId: any, optionIndex: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/polls/${pollId}/vote`, { optionIndex });
  }

  // Auth (Placeholder)
  signup(userData: any): Observable<any> {
    // Backend: POST /auth/signup
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }

  login(credentials: any): Observable<any> {
    // Backend: POST /auth/login
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }
}
