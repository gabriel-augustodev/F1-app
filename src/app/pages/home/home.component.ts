import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../../services/f1-api.service';
import { nationalityMap } from '../../utils/nationality-map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Dados
  leader: any = null;
  constructors: any[] = [];
  nextRace: any = null;

  // Temporada atual (mude para 2026)
  currentYear = 2026;  // ✅ ALTERADO PARA 2026

  totalRaces: number = 24; // Valor padrão, será atualizado quando carregar o calendário

  // Estados
  loading = true;
  error: string | null = null;

  // Lista de anos disponíveis (para futuro seletor)
  availableYears = [2023, 2024, 2025, 2026];

  // Utils
  nationalityMap = nationalityMap;

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadHomeData();
  }

  loadHomeData(): void {
    this.loading = true;
    this.error = null;

    console.log(`📅 Carregando dados da temporada ${this.currentYear}...`);

    // Busca líder (primeiro lugar na classificação de pilotos)
    this.f1Api.getDriverStandings(this.currentYear).subscribe({
      next: (data) => {
        console.log('✅ Dados de pilotos recebidos:', data);
        if (data.standings && data.standings.length > 0) {
          this.leader = data.standings[0];
        }
      },
      error: (err) => {
        console.error('❌ Erro ao carregar líder:', err);
        this.error = 'Erro ao carregar dados dos pilotos';
      }
    });

    // Busca classificação de construtores
    this.f1Api.getConstructorStandings(this.currentYear).subscribe({
      next: (data) => {
        console.log('✅ Dados de construtores recebidos:', data);
        this.constructors = data.standings || [];
      },
      error: (err) => {
        console.error('❌ Erro ao carregar construtores:', err);
        this.error = 'Erro ao carregar dados dos construtores';
      }
    });

    // Busca próxima corrida
    this.f1Api.getNextRace(this.currentYear).subscribe({
      next: (data) => {
        console.log('✅ Próxima corrida:', data);
        this.nextRace = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar próxima corrida:', err);
        this.error = 'Erro ao carregar calendário';
        this.loading = false;
      }
    });
  }

  // Método para trocar de temporada (útil se quiser adicionar um seletor)
  changeSeason(year: number): void {
    this.currentYear = year;
    this.loadHomeData();
  }

  getFlagUrl(nationality: string): string {
    const code = this.nationalityMap[nationality] || 'unknown';
    return `https://flagcdn.com/w320/${code}.png`;
  }
  getCountryCode(country: string): string {
    const countryCodes: { [key: string]: string } = {
      'Australia': 'au',
      'Bahrain': 'bh',
      'China': 'cn',
      'United Arab Emirates': 'ae',
      'United Kingdom': 'gb',
      'Great Britain': 'gb',
      'UK': 'gb',
      'Italy': 'it',
      'Monaco': 'mc',
      'Spain': 'es',
      'Canada': 'ca',
      'Austria': 'at',
      'France': 'fr',
      'Hungary': 'hu',
      'Belgium': 'be',
      'Netherlands': 'nl',
      'Netherland': 'nl',
      'Holland': 'nl',
      'USA': 'us',
      'United States': 'us',
      'Mexico': 'mx',
      'Brazil': 'br',
      'Brasil': 'br',
      'Saudi Arabia': 'sa',
      'Japan': 'jp',
      'Singapore': 'sg',
      'Qatar': 'qa',
      'Portugal': 'pt',
      'Turkey': 'tr',
      'Russia': 'ru',
      'Germany': 'de',
      'Azerbaijan': 'az',
      'Malaysia': 'my',
      'Korea': 'kr',
      'South Korea': 'kr',
      'India': 'in',
      'South Africa': 'za',
      'Argentina': 'ar',
      'New Zealand': 'nz'
    };

    // Tenta encontrar pelo nome exato, senão procura por substring
    let code = countryCodes[country];

    if (!code) {
      // Busca case-insensitive
      const countryLower = country.toLowerCase();
      const found = Object.entries(countryCodes).find(([key]) =>
        key.toLowerCase().includes(countryLower) ||
        countryLower.includes(key.toLowerCase())
      );
      code = found ? found[1] : 'unknown';
    }

    return code || 'unknown';
  }
  handleImageError(event: any): void {
    event.target.src = 'https://flagcdn.com/w160/unknown.png';
  }
}