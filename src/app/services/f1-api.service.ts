import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F1ApiService {
  // URL do seu backend no Render (produção)
  private apiUrl = 'https://f1-backend-api.onrender.com';

  // Se quiser testar localmente, use esta linha (comente a de cima)
  // private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // ==================== CLASSIFICAÇÕES ====================

  getDriverStandings(year: number = 2024): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/standings/drivers/${year}`);
  }

  getConstructorStandings(year: number = 2024): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/standings/constructors/${year}`);
  }

  // ==================== CALENDÁRIO ====================

  getCalendar(year: number = 2024): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/calendar/${year}`);
  }

  getNextRace(year: number = 2024): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/calendar/next/${year}`);
  }

  // ==================== RESULTADOS ====================

  getRaceResults(year: number, round: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/results/race/${year}/${round}`);
  }

  getFastestLaps(year: number, topN: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/results/fastest-laps/${year}?top_n=${topN}`);
  }

  // ==================== CIRCUITOS ====================

  getCircuitInfo(circuitId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/circuits/info/${circuitId}`);
  }

  getCircuitMap(year: number, gp: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/circuits/map/${year}/${gp}`);
  }

  // ==================== HALL DA FAMA ====================
  getHallOfFameDrivers(yearRange: string = '1950-2024', topN: number = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/hall-of-fame/drivers?year_range=${yearRange}&top_n=${topN}`);
  }

  getHallOfFameConstructors(yearRange: string = '1950-2024', topN: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/hall-of-fame/constructors?year_range=${yearRange}&top_n=${topN}`);
  }

  getF1Records(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/hall-of-fame/records`);
  }

  getCountryStats(country: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/hall-of-fame/by-country/${country}`);
  }
}