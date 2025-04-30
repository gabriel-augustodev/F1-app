import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Formula1Service {
  private apiUrl = 'http://localhost:3001'; // Substituir pela API real de F1 depois

  constructor(private http: HttpClient) {}

  getPilotos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pilotos`);
  }

  getClassificacaoPilotos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current/driverStandings.json`);
  }
}
