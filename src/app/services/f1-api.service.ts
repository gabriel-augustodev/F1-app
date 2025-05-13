import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F1ApiService {
  private baseUrl = 'https://ergast.com/api/f1';

  constructor(private http: HttpClient) {}

  getPilotos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/drivers.json`);
  }

  getCorridasAno(ano: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ano}.json`);
  }

  getResultadoCorrida(ano: number, numeroCorrida: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ano}/${numeroCorrida}/results.json`);
  }

  getClassificacaoPilotos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/current/driverStandings.json`);
  }

  getClassificacaoConstrutores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/current/constructorStandings.json`);
  }

  // 🔥 ADICIONADO: Buscar todas as corridas do ano atual
  getProximasCorridas(): Observable<any> {
    const today = new Date().toISOString().split('T')[0]; // formato: yyyy-mm-dd
    return this.http.get(`${this.baseUrl}/current.json?limit=1000&dateFrom=${today}`);
  }

  getCalendarioTemporada(): Observable<any> {
    return this.http.get(`${this.baseUrl}/current.json`);
  }

  getVoltaMaisRapidaUltimaCorrida(): Observable<any> {
    return this.http.get(`${this.baseUrl}/current/last/results.json`);
  }




}
