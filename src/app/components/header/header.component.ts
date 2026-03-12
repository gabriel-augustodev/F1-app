import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../../services/f1-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuAberto = false;
  currentYear = 2026;
  seasonProgress = 0;
  statsText = '';

  menuItems = [
    { path: '/', label: 'Home', icon: '🏠', exact: true },
    { path: '/pilotos', label: 'Pilotos', icon: '🏎️', exact: false },
    { path: '/equipes', label: 'Equipes', icon: '🏭', exact: false },
    { path: '/corridas', label: 'Corridas', icon: '📅', exact: false },
    { path: '/hall-of-fame', label: 'Hall da Fama', icon: '🏆', exact: false }
  ];

  constructor(private f1Api: F1ApiService) { }

  ngOnInit(): void {
    this.loadSeasonProgress();
  }

  loadSeasonProgress(): void {
    this.f1Api.getCalendar(this.currentYear).subscribe({
      next: (data) => {
        if (data.calendar) {
          const races = data.calendar.filter((r: any) => r.round > 0);
          const today = new Date();

          const completedRaces = races.filter((r: any) =>
            new Date(r.event_date) < today
          ).length;

          this.seasonProgress = (completedRaces / races.length) * 100;
          this.statsText = `${completedRaces}/${races.length} corridas`;
        }
      }
    });
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;

    // Previne scroll quando menu mobile está aberto
    if (this.menuAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}