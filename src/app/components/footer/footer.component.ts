import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../../services/f1-api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = 2026;
  totalRaces = 24;
  completedRaces = 0;
  seasonProgress = 0;
  seasonStart: Date | null = null;
  seasonEnd: Date | null = null;
  nextRaceName = '';
  nextRaceDate: Date | null = null;

  quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/pilotos', label: 'Pilotos' },
    { path: '/equipes', label: 'Equipes' },
    { path: '/corridas', label: 'Corridas' },
    { path: '/hall-of-fame', label: 'Hall da Fama' }
  ];

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadSeasonData();
  }

  loadSeasonData(): void {
    this.f1Api.getCalendar(this.currentYear).subscribe({
      next: (data) => {
        if (data.calendar) {
          const races = data.calendar.filter((r: any) => r.round > 0);
          this.totalRaces = races.length;

          if (races.length > 0) {
            this.seasonStart = new Date(races[0].event_date);
            this.seasonEnd = new Date(races[races.length - 1].event_date);
          }

          const today = new Date();
          const completed = races.filter((r: any) => new Date(r.event_date) < today);
          this.completedRaces = completed.length;
          this.seasonProgress = (this.completedRaces / this.totalRaces) * 100;

          // Próxima corrida
          const nextRace = races.find((r: any) => new Date(r.event_date) > today);
          if (nextRace) {
            this.nextRaceName = nextRace.event_name;
            this.nextRaceDate = new Date(nextRace.event_date);
          }
        }
      }
    });
  }
}