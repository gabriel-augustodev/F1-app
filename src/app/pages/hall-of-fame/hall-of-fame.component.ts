import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../../services/f1-api.service';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css']
})
export class HallOfFameComponent implements OnInit {
  activeTab: 'drivers' | 'constructors' | 'records' = 'drivers';

  hallOfFameDrivers: any[] = [];
  hallOfFameConstructors: any[] = [];
  records: any = null;

  loading = true;
  error: string | null = null;

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Carrega Hall da Fama de pilotos
    this.f1Api.getHallOfFameDrivers('1950-2024', 20).subscribe({
      next: (data) => {
        console.log('📊 Dados recebidos:', data); // ✅ LOG PARA VERIFICAR
        this.hallOfFameDrivers = data.hall_of_fame || [];
      },
      error: (err) => console.error('Erro pilotos:', err)
    });

    // Carrega construtores
    this.f1Api.getHallOfFameConstructors('1950-2024', 10).subscribe({
      next: (data) => {
        this.hallOfFameConstructors = data.hall_of_fame || [];
      },
      error: (err) => console.error('Erro construtores:', err)
    });

    // Carrega recordes
    this.f1Api.getF1Records().subscribe({
      next: (data) => {
        this.records = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados';
        this.loading = false;
      }
    });
  }
}