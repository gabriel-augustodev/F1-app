import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../services/f1-api.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  // Dados
  constructors: any[] = [];

  // Estados
  loading = true;
  error: string | null = null;

  // Temporada atual
  currentYear = 2026;

  // Anos disponíveis
  availableYears = [2023, 2024, 2025, 2026];

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadConstructorStandings();
  }

  loadConstructorStandings(): void {
    this.loading = true;
    this.error = null;

    console.log(`🏭 Carregando classificação de construtores ${this.currentYear}...`);

    this.f1Api.getConstructorStandings(this.currentYear).subscribe({
      next: (data) => {
        console.log('✅ Dados recebidos:', data);
        this.constructors = data.standings || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar construtores:', err);
        this.error = 'Erro ao carregar dados dos construtores';
        this.loading = false;
      }
    });
  }

  changeYear(year: number): void {
    this.currentYear = year;
    this.loadConstructorStandings();
  }

  // Cor da posição (Top 3)
  getPositionClass(position: number): string {
    if (position === 1) return 'bg-yellow-400 text-gray-900'; // Ouro
    if (position === 2) return 'bg-gray-300 text-gray-800';  // Prata
    if (position === 3) return 'bg-orange-400 text-gray-900'; // Bronze
    return 'bg-gray-100 text-gray-600';
  }

  // Bandeira do país da equipe
  getCountryFlag(nationality: string): string {
    const countryCodes: { [key: string]: string } = {
      'British': 'gb',
      'German': 'de',
      'Italian': 'it',
      'French': 'fr',
      'Austrian': 'at',
      'American': 'us',
      'Swiss': 'ch',
      'Japanese': 'jp',
      'Indian': 'in'
    };

    const code = countryCodes[nationality] || 'unknown';
    return `https://flagcdn.com/w160/${code}.png`;
  }
}