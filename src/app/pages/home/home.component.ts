import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../../services/f1-api.service';
import { nationalityMap } from '../../utils/nationality-map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Dados existentes
  leader: any = null;
  constructors: any[] = [];
  nextRace: any = null;
  currentYear = 2026;

  // NOVOS DADOS
  lastRace: any = null;              // Última corrida realizada
  nextRaces: any[] = [];              // Próximas 3 corridas
  brazilianDrivers: any[] = [];       // Pilotos brasileiros
  stats = {                           // Estatísticas rápidas
    totalRaces: 0,
    completedRaces: 0,
    remainingRaces: 0,
    avgPitStops: 0,
    mostWins: '',
    mostPoles: ''
  };

  // Estados
  loading = true;
  error: string | null = null;

  // Contagem regressiva
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Utils
  nationalityMap = nationalityMap;
  private countdownInterval: any;

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadHomeData();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  loadHomeData(): void {
    this.loading = true;

    // 1. Carrega classificação de pilotos (para líder e brasileiros)
    this.f1Api.getDriverStandings(this.currentYear).subscribe({
      next: (data) => {
        if (data.standings) {
          this.leader = data.standings[0];
          // Filtra pilotos brasileiros
          this.brazilianDrivers = data.standings.filter((d: any) =>
            d.driverNationality?.toLowerCase().includes('brazil')
          );
        }
      }
    });

    // 2. Carrega classificação de construtores
    this.f1Api.getConstructorStandings(this.currentYear).subscribe({
      next: (data) => {
        this.constructors = data.standings || [];
      }
    });

    // 3. Carrega calendário completo
    this.f1Api.getCalendar(this.currentYear).subscribe({
      next: (data) => {
        if (data.calendar) {
          const races = data.calendar.filter((r: any) => r.round > 0);
          this.stats.totalRaces = races.length;

          // Separa corridas passadas e futuras
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const pastRaces = races.filter((r: any) => {
            const raceDate = new Date(r.event_date);
            raceDate.setHours(0, 0, 0, 0);
            return raceDate < today;
          });

          const futureRaces = races.filter((r: any) => {
            const raceDate = new Date(r.event_date);
            raceDate.setHours(0, 0, 0, 0);
            return raceDate >= today;
          });

          this.stats.completedRaces = pastRaces.length;
          this.stats.remainingRaces = futureRaces.length;

          // Última corrida realizada
          if (pastRaces.length > 0) {
            this.lastRace = pastRaces[pastRaces.length - 1];
            this.loadRaceResult(this.lastRace.round);
          }

          // Próximas 3 corridas
          this.nextRaces = futureRaces.slice(0, 3);

          // Se tem próxima corrida, inicia contagem regressiva
          if (this.nextRaces.length > 0) {
            this.startCountdown(this.nextRaces[0].event_date);
          }
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro:', err);
        this.error = 'Erro ao carregar dados';
        this.loading = false;
      }
    });
  }

  loadRaceResult(round: number): void {
    this.f1Api.getRaceResults(this.currentYear, round).subscribe({
      next: (data) => {
        if (this.lastRace) {
          this.lastRace.winner = data.results?.[0];
          this.lastRace.results = data.results?.slice(0, 3); // Top 3
        }
      }
    });
  }

  startCountdown(raceDate: string): void {
    const targetDate = new Date(raceDate).getTime();

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        return;
      }

      this.countdown = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    }, 1000);
  }

  getFlagUrl(nationality: string): string {
    const code = this.nationalityMap[nationality] || 'unknown';
    return `https://flagcdn.com/w320/${code}.png`;
  }

  // Método para bandeiras dos países
  getCountryCode(country: string): string {
    const codes: { [key: string]: string } = {
      'Australia': 'au',
      'China': 'cn',
      'Japan': 'jp',
      'Bahrain': 'bh',
      'Saudi Arabia': 'sa',
      'USA': 'us',
      'Canada': 'ca',
      'Monaco': 'mc',
      'Spain': 'es',
      'Austria': 'at',
      'United Kingdom': 'gb',
      'UK': 'gb',
      'Great Britain': 'gb',
      'Belgium': 'be',
      'Netherlands': 'nl',
      'Italy': 'it',
      'Azerbaijan': 'az',
      'Singapore': 'sg',
      'Mexico': 'mx',
      'Brazil': 'br',
      'Qatar': 'qa',
      'Abu Dhabi': 'ae',
      'United Arab Emirates': 'ae'
    };
    return codes[country] || 'unknown';
  }

  // Método seguro para verificar se há pilotos brasileiros
  hasBrazilianDrivers(): boolean {
    return this.brazilianDrivers !== null && this.brazilianDrivers.length > 0;
  }

  // Método melhorado para tratar erro de imagem
  handleImageError(event: any): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      // Tenta usar um placeholder gratuito
      imgElement.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'30\' viewBox=\'0 0 40 30\'%3E%3Crect width=\'40\' height=\'30\' fill=\'%23cccccc\'/%3E%3Ctext x=\'8\' y=\'20\' font-family=\'Arial\' font-size=\'14\' fill=\'%23666666\'%3E🏁%3C/text%3E%3C/svg%3E';

      // Opcional: mostra um log para debug
      console.warn('Bandeira não encontrada, usando placeholder');
    }
  }
}