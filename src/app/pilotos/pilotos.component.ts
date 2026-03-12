import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../services/f1-api.service';
import { nationalityMap } from '../utils/nationality-map';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent implements OnInit {
  // Dados
  drivers: any[] = [];

  // Estados
  loading = true;
  error: string | null = null;

  // Temporada atual
  currentYear = 2026;

  // Anos disponíveis para navegação
  availableYears = [2023, 2024, 2025, 2026];

  // Utils
  nationalityMap = nationalityMap;

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadDriverStandings();
  }

  loadDriverStandings(): void {
    this.loading = true;
    this.error = null;

    console.log(`🏎️ Carregando classificação de pilotos ${this.currentYear}...`);

    this.f1Api.getDriverStandings(this.currentYear).subscribe({
      next: (data) => {
        console.log('✅ Dados recebidos:', data);
        this.drivers = data.standings || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar pilotos:', err);
        this.error = 'Erro ao carregar dados dos pilotos';
        this.loading = false;
      }
    });
  }

  changeYear(year: number): void {
    this.currentYear = year;
    this.loadDriverStandings();
  }

  getFlagUrl(nationality: string): string {
    const code = this.nationalityMap[nationality] || 'unknown';
    return `https://flagcdn.com/w320/${code}.png`;
  }

  // Cor da posição (Top 3)
  getPositionClass(position: number): string {
    if (position === 1) return 'bg-yellow-400 text-gray-900'; // Ouro
    if (position === 2) return 'bg-gray-300 text-gray-800';  // Prata
    if (position === 3) return 'bg-orange-400 text-gray-900'; // Bronze
    return 'bg-gray-100 text-gray-600'; // Demais posições
  }
}