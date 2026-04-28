import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  getBlocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blocks`);
  }

  validateChain(): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate`);
  }
}
