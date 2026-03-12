import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../services/f1-api.service';

@Component({
  selector: 'app-corridas',
  templateUrl: './corridas.component.html',
  styleUrls: ['./corridas.component.css']
})
export class CorridasComponent implements OnInit {
  // Dados
  races: any[] = [];

  // Estados
  loading = true;
  error: string | null = null;

  // Temporada atual
  currentYear = 2026;

  // Anos disponíveis
  availableYears = [2023, 2024, 2025, 2026];

  // Status das corridas
  now = new Date();

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadCalendar();
  }

  loadCalendar(): void {
    this.loading = true;
    this.error = null;

    console.log(`📅 Carregando calendário ${this.currentYear}...`);

    this.f1Api.getCalendar(this.currentYear).subscribe({
      next: (data) => {
        console.log('✅ Calendário recebido:', data);
        // Filtra apenas corridas (round > 0) e ignora eventos de teste
        this.races = (data.calendar || []).filter((race: any) => race.round > 0);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar calendário:', err);
        this.error = 'Erro ao carregar calendário';
        this.loading = false;
      }
    });
  }

  changeYear(year: number): void {
    this.currentYear = year;
    this.loadCalendar();
  }

  // Determina o status da corrida
  getRaceStatus(raceDate: string): { status: string; color: string; icon: string } {
    const raceDateObj = new Date(raceDate);
    const today = new Date();

    // Zera as horas para comparar apenas datas
    today.setHours(0, 0, 0, 0);
    raceDateObj.setHours(0, 0, 0, 0);

    if (raceDateObj < today) {
      return { status: 'realizada', color: 'bg-green-100 border-green-500', icon: '✅' };
    } else if (raceDateObj.getTime() === today.getTime()) {
      return { status: 'hoje', color: 'bg-yellow-100 border-yellow-500 ring-4 ring-yellow-200', icon: '🏁' };
    } else {
      // Verifica se é a próxima corrida
      const diffTime = raceDateObj.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7 && diffDays > 0) {
        return { status: 'proxima', color: 'bg-blue-100 border-blue-500', icon: '⏳' };
      }
      return { status: 'futura', color: 'bg-gray-50 border-gray-300', icon: '📅' };
    }
  }

  // Formata a data
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Dia da semana
  getDayOfWeek(dateStr: string): string {
    const date = new Date(dateStr);
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    return days[date.getDay()];
  }

  // Bandeira do país
  getCountryFlag(country: string): string {
    const flags: { [key: string]: string } = {
      'Australia': '🇦🇺',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'Bahrain': '🇧🇭',
      'Saudi Arabia': '🇸🇦',
      'USA': '🇺🇸',
      'United States': '🇺🇸',
      'Miami': '🇺🇸',
      'Canada': '🇨🇦',
      'Monaco': '🇲🇨',
      'Spain': '🇪🇸',
      'Austria': '🇦🇹',
      'United Kingdom': '🇬🇧',
      'UK': '🇬🇧',
      'Great Britain': '🇬🇧',
      'Belgium': '🇧🇪',
      'Netherlands': '🇳🇱',
      'Italy': '🇮🇹',
      'Azerbaijan': '🇦🇿',
      'Singapore': '🇸🇬',
      'Mexico': '🇲🇽',
      'Brazil': '🇧🇷',
      'Brasil': '🇧🇷',
      'Qatar': '🇶🇦',
      'Abu Dhabi': '🇦🇪',
      'United Arab Emirates': '🇦🇪'
    };

    return flags[country] || '🏁';
  }
}