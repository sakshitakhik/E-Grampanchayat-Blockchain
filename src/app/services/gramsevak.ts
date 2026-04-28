import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GramsevakService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Applications Management
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certificates`);
  }

  updateApplicationStatus(id: any, status: string, remarks: string = ''): Observable<any> {
    const payload = { status, remarks };
    return this.http.put(`${this.apiUrl}/certificates/${id}/status`, payload);
  }

  // Complaints Management
  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/complaints`);
  }

  resolveComplaint(id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/complaints/${id}/resolve`, {});
  }

  // Announcements Management
  postAnnouncement(announcement: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/announcements`, announcement);
  }

  getAnnouncements(): Observable<any[]> {
    // Backend: GET /announcements
    return this.http.get<any[]>(`${this.apiUrl}/announcements`);
  }

  deleteAnnouncement(id: any): Observable<any> {
    // Backend: DELETE /announcements/{id}
    return this.http.delete(`${this.apiUrl}/announcements/${id}`);
  }

  // Voting Management
  createVote(voteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/polls`, voteData);
  }

  getVoteResults(pollId?: any): Observable<any> {
    if (pollId) {
      return this.http.get(`${this.apiUrl}/polls/${pollId}/results`);
    }
    // Fallback: Just return all polls if no specific ID is given
    return this.http.get(`${this.apiUrl}/polls`);
  }
}
